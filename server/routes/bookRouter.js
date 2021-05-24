const request = require("request");
const cheerio = require("cheerio");
const router = require("express").Router();
const bookModel = require("../models/bookModel");
const bookAuthorModel = require("../models/bookAuthorModel");
const bookSubjectModel = require("../models/bookSubjectModel");
const authFaculty = require("../middleware/authFaculty");
const authAdmin = require("../middleware/authAdmin");

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

router.post("/create", async (req, res) => {
    try {
        const {
            bookId,
            title,
            authors,
            subjects,
            physicalDesc,
            publisher,
            numberOfCopies,
        } = req.body;

        // sample verification: incomplete fields
        if (
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

        //search if book exists
        const existingBook = await bookModel.findOne({ bookId });

        if (!existingBook) {
            //if book does not exist, add the book

            const newBook = new bookModel({
                //add the non-array fields to the books collection
                bookId,
                title,
                physicalDesc,
                publisher,
                numberOfCopies,
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

// search data
router.get("/search", async (req, res) => {
    let final_array = [];

    if (req.query.type == "Book") {
        // RESOURCE: Book
        if (req.query.field == "title") {
            // search by TITLE
            bookModel.aggregate(
                [
                    { $match: { title: { $regex: req.query.search } } },
                    {
                        $lookup: {
                            from: "book_authors",
                            localField: "bookId",
                            foreignField: "bookId",
                            as: "author",
                        },
                    },
                    {
                        $lookup: {
                            from: "book_subjects",
                            localField: "bookId",
                            foreignField: "bookId",
                            as: "subject",
                        },
                    },
                ],

                (err, result) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send(result);
                    }
                }
            );
        } else if (req.query.field == "subject") {
            // search by SUBJECT
            bookSubjectModel.aggregate(
                // get matches based from queries
                [{ $match: { subject: { $regex: req.query.search } } }],
                (err, result) => {
                    if (err) {
                        res.send(err);
                    } else {
                        // extract all IDs from matches
                        result.forEach((item, index) => {
                            final_array.push(item.bookId);
                        });

                        // get unique IDs
                        let unique_ID = [...new Set(final_array)];

                        // extract equivalent entries from bookModel
                        bookModel.aggregate(
                            [
                                { $match: { bookId: { $in: unique_ID } } },
                                {
                                    $lookup: {
                                        from: "book_authors",
                                        localField: "bookId",
                                        foreignField: "bookId",
                                        as: "author",
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "book_subjects",
                                        localField: "bookId",
                                        foreignField: "bookId",
                                        as: "subject",
                                    },
                                },
                            ],

                            (error, results) => {
                                if (error) {
                                    res.send(error);
                                } else {
                                    res.send(results);
                                }
                            }
                        );
                    }
                }
            );
        } else if (req.query.field == "author") {
            // search by AUTHOR
            bookAuthorModel.aggregate(
                // get matches based from queries
                [{ $match: { author_name: { $regex: req.query.search } } }],
                (err, result) => {
                    if (err) {
                        res.send(err);
                    } else {
                        // extract all IDs from matches
                        result.forEach((item, index) => {
                            final_array.push(item.bookId);
                        });

                        // get unique IDs
                        let unique_ID = [...new Set(final_array)];

                        // extract equivalent entries from bookModel
                        bookModel.aggregate(
                            [
                                { $match: { bookId: { $in: unique_ID } } },
                                {
                                    $lookup: {
                                        from: "book_authors",
                                        localField: "bookId",
                                        foreignField: "bookId",
                                        as: "author",
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "book_subjects",
                                        localField: "bookId",
                                        foreignField: "bookId",
                                        as: "subject",
                                    },
                                },
                            ],

                            (error, results) => {
                                if (error) {
                                    res.send(error);
                                } else {
                                    res.send(results);
                                }
                            }
                        );
                    }
                }
            );
        }
    }
});

router.put("/update-book", authAdmin, async (req, res) => {
    const {
        oldBookId,
        bookId,
        title,
        authors,
        subjects,
        physicalDesc,
        publisher,
        numberOfCopies,
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
                    updatedBook.physicalDesc = physicalDesc;
                    updatedBook.publisher = publisher;
                    updatedBook.numberOfCopies = numberOfCopies;

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

router.delete("/delete-book", authAdmin, async (req, res) => {
    try {
        const bookId = req.body.bookId;

        // search if book exists
        const existingBook = await bookModel.findOne({ bookId });

        // if book exists, delete its entries from book, book_author, and book_subject
        if (existingBook) {
            await bookModel.findOneAndDelete({ bookId });
            await bookAuthorModel.deleteMany({ bookId });
            await bookSubjectModel.deleteMany({ bookId });
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
