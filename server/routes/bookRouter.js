const request = require("request");
const cheerio = require("cheerio");
const router = require("express").Router();
const bookModel = require("../models/bookModel");
const bookAuthorModel = require("../models/bookAuthorModel");
const bookSubjectModel = require("../models/bookSubjectModel");
const authFaculty = require("../middleware/authFaculty");
const authAdmin = require("../middleware/authAdmin");
var uniqid = require("uniqid");
const config = require("config");
const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
var uniqid = require("uniqid");

const database = process.env.db;

router.post("/get-news", async (req, res) => {
    // console.log('hello')
    let options = {
        url: "https://uplb.edu.ph/news-and-updates-2/",
        headers: {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36",
        },
    };
    try {
        function doGetNewsLinks() {
            return new Promise(function (resolve, reject) {
                request(options, function (err, resp, html) {
                    var newsLinks = [],
                        newsTitle = [],
                        newsDate = [],
                        newsImg = [];
                    if (!err) {
                        const $ = cheerio.load(html);
                        let finalTagLink =
                            ".jet-smart-listing__post-content > .jet-smart-listing__post-title > a"; // get the news links
                        let finalTagDate = ".post__date-link  > time"; // get the news date
                        let finalTagImg =
                            ".jet-smart-listing__post-thumbnail  > a > img"; // get the news date
                        let lenNewsLinks = $(finalTagLink, html).length; // length of array

                        for (i = 0; i < lenNewsLinks; i++)
                            newsLinks.push(
                                $(finalTagLink, html)[i].attribs.href
                            ); //loop the result of the data (link)
                        for (i = 0; i < lenNewsLinks; i++)
                            newsImg.push($(finalTagImg, html)[i].attribs.src); //loop the result of the data (link)
                        $(finalTagLink).each((index, li) => {
                            newsTitle[index] = $(li).text();
                        }); //loop the result of the data (title)
                        $(finalTagDate).each((index, li) => {
                            newsDate[index] = $(li).text();
                        }); //loop the result of the data (date)
                    }
                    var newsInformation = {
                        newsLinks,
                        newsTitle,
                        newsDate,
                        newsImg,
                    };
                    resolve(newsInformation); //acts as return statement
                });
            });
        }
        let respond = await doGetNewsLinks();
        res.send(respond);
    } catch (err) {
        res.status(404).send("404 Not Found");
    }
});

//creates a book and uploads its book cover
/**************************************************** 
Request Object:
req object:
json
book: {
    title,
    ISBN,
    authors,
    subjects,
    physicalDesc,
    publisher,
    numberOfCopies,
    bookCoverLink,
    datePublished,
    dateAcquired,
}

res object:
{
    bookId,
    title,
    ISBN,
    authors,
    subjects,
    physicalDesc,
    publisher,
    numberOfCopies,
    bookCoverLink,
    datePublished,
    dateAcquired,
}
********************************************************/
router.post("/create", authFaculty, async (req, res) => {
    console.log(req.body);
    try {
        const {
            title,
            ISBN,
            authors,
            subjects,
            physicalDesc,
            publisher,
            numberOfCopies,
            bookCoverLink,
            datePublished,
            dateAcquired,
        } = req.body;

        // sample verification: incomplete fields
        if (
            !title ||
            !authors ||
            !subjects ||
            !physicalDesc ||
            !publisher ||
            !numberOfCopies
        ) {
            return res.status(400).send("Please enter all required fields.");
        }

        //search if book exists
        const existingBook = await bookModel.findOne({ ISBN });

        if (!existingBook) {
            //if book does not exist, add the book

            const bookId = uniqid("BOOK_"); //generate a unique id for the book

            const newBook = new bookModel({
                //add the non-array fields to the books collection
                bookId,
                title,
                ISBN,
                physicalDesc,
                publisher,
                numberOfCopies,
                bookCoverLink,
                datePublished,
                dateAcquired,
            });
            const savedBook = await newBook.save();

            authors.forEach(async function (entry) {
                //add each author to the book_authors collection
                const author_fname = entry.fname;
                const author_lname = entry.lname;
                const author_name = author_fname.concat(" ", author_lname);

                const newBookAuthor = new bookAuthorModel({
                    bookId,
                    author_fname,
                    author_lname,
                    author_name,
                });
                const savedBookAuthor = await newBookAuthor.save();
            });

            subjects.forEach(async function (entry) {
                //add each subject to the book_subjects collection
                const subject = entry;

                const newBookSubject = new bookSubjectModel({
                    bookId,
                    subject,
                });
                const savedBookSubject = await newBookSubject.save();
            });

            res.json(savedBook);
        } else {
            //sends a 400 status if book already exists
            res.status(400).send("Book already exists!");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

//display the latest 12 book infos on the homepage
router.get("/display_latest", async (req, res) => {
    bookModel.aggregate(
        [{ $sort: { dateAcquired: -1 } }, { $limit: 12 }],
        (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        }
    );
});

/**************************************************** 
Request Object:
req object:JSON
book: {
    oldBookId,
    bookId,
    title,
    ISBN,
    authors,
    subjects,
    physicalDesc,
    publisher,
    numberOfCopies,
}
file: jpeg/png
res String: 
"Entry Updated"
********************************************************/
router.put("/update", authAdmin, async (req, res) => {
    const {
        oldBookId,
        bookId,
        title,
        ISBN,
        authors,
        subjects,
        physicalDesc,
        publisher,
        numberOfCopies,
        datePublished,
        dateAcquired,
    } = req.body;

    // verification: incomplete fields
    if (
        !oldBookId ||
        !bookId ||
        !title ||
        !authors ||
        !subjects ||
        !physicalDesc ||
        !publisher ||
        !numberOfCopies
    ) {
        return res
            .status(400)
            .json({ errorMessage: "Please enter all required fields." });
    }

    // if user wants to update bookId, check first if the given bookId (new) already exists
    if (oldBookId != bookId) {
        await bookModel.findOne({ bookId: bookId }, (err, exists) => {
            if (exists) {
                return res
                    .status(400)
                    .json({ errorMessage: "New bookId already exists." });
            }
        });
    }

    try {
        //search if book exists
        const existingBook = await bookModel.findOne({ bookId: oldBookId });

        if (existingBook) {
            // edit fields in the book collection
            // look for the book using its bookId and set new values for the fields
            await bookModel.findOne(
                { bookId: oldBookId },
                (err, updatedBook) => {
                    updatedBook.bookId = bookId;
                    updatedBook.title = title;
                    updatedBook.ISBN = ISBN;
                    updatedBook.physicalDesc = physicalDesc;
                    updatedBook.publisher = publisher;
                    updatedBook.numberOfCopies = numberOfCopies;
                    updatedBook.datePublished = datePublished;
                    updatedBook.dateAcquired = dateAcquired;

                    updatedBook.save();
                }
            );

            // edit fields in the book_author collection
            // delete the current entries of authors
            await bookAuthorModel.deleteMany({ bookId: oldBookId });

            // iterate on the json array and create new entries
            authors.forEach(async function (entry) {
                const author_fname = entry.fname;
                const author_lname = entry.lname;
                const author_name = author_fname.concat(" ", author_lname);

                const newBookAuthor = new bookAuthorModel({
                    bookId,
                    author_fname,
                    author_lname,
                    author_name,
                });
                await newBookAuthor.save();
            });

            // edit fields in the book_subject collection
            // delete the current entries of subject
            await bookSubjectModel.deleteMany({ bookId: oldBookId });

            // iterate on the json array and create new entries
            subjects.forEach(async function (entry) {
                const subject = entry;

                const newBookSubject = new bookSubjectModel({
                    bookId,
                    subject,
                });
                await newBookSubject.save();
            });

            res.send("Entry Updated");
        } else {
            //sends a 400 status if book already exists
            res.status(400).send("This book does not exist! Cannot update.");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

/**************************************************** 
Request Object:
req object:JSON
book: {
    bookId
}
res String: 
"Entry Deleted"
********************************************************/
router.delete("/delete", authAdmin, async (req, res) => {
    try {
        const { bookId } = req.body;

        // search if book exists in book collection
        const existingBook = await bookModel.findOne({ bookId });

        // if book exists, delete its entries from book, book_author, book_subject, and book_cover
        if (existingBook) {
            await bookModel.findOneAndDelete({ bookId });
            await bookAuthorModel.deleteMany({ bookId });
            await bookSubjectModel.deleteMany({ bookId });

            // delete the book cover's entry from .files and .chunks (book_id == metadata.bookId in book_covers.files)
            // check first if the book has a saved book cover
            gfs.files.findOne(
                { "metadata.bookId": bookId },
                (err, existingBookCover) => {
                    if (existingBookCover) {
                        // .chunks
                        // mongoose.connection.db
                        //     .collection("book_covers.chunks")
                        //     .deleteOne({ files_id: existingBookCover._id });
                        // // .files
                        // gfs.files.deleteOne({ "metadata.bookId": bookId });
                    }
                }
            );
            res.send("Entry Deleted");
        } else {
            res.status(400).send("This book does not exist! Cannot delete.");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});
module.exports = router;
