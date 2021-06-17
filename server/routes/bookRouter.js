const request = require("request");
const cheerio = require("cheerio");
const router = require("express").Router();
const bookModel = require("../models/bookModel");
const bookAuthorModel = require("../models/bookAuthorModel");
const bookSubjectModel = require("../models/bookSubjectModel");
const authFaculty = require("../middleware/authFaculty");
const authAdmin = require("../middleware/authAdmin");
var uniqid = require("uniqid");

router.post("/get-news", async (req, res) => {
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
                        let i = 0;

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
router.post("/create", authAdmin, async (req, res) => {
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
            !ISBN ||
            !authors ||
            !subjects ||
            !physicalDesc ||
            !publisher ||
            !numberOfCopies
        ) {
            return res
                .status(400)
                .send({ errorMessage: "Please enter all required fields." });
        }
        
        const isbnLen = ISBN.replace(/\D/g, "").length;

        if (isbnLen != 10 && isbnLen != 13){
            return res.status(400).send({ errorMessage: "ISBN must contain 10 or 13 digits." });
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
            res.status(400).send({ errorMessage: "ISBN already exists!" });
        }
    } catch (err) {
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
req object: address parameter
{
    bookId
}

res object: array containing book, book_authors, and book_subjects
[
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
        dateAcquired
    },
    [
        NOTE: can be multiple
        {
            bookId,
            author_fname,
            author_lname,
            author_name
        } 
    ],
    [
        NOTE: can be multiple
        {
            bookId,
            subject
        } 
    ]
]

res String: 
"Entry Updated"
********************************************************/

router.get("/search-book/:bookId", async (req, res) => {
    var returnObject = [];
    const bookIdHolder = req.params.bookId;
    if (!bookIdHolder) {
        return res
            .status(404)
            .json({ errorMessage: "Not found. No bookID in parameters." });
    }

    try {
        const BookEntry = await bookModel.findOne({ bookId: bookIdHolder });
        if (!BookEntry) {
            return res.status(404).json({ errorMessage: "Entry not found." });
        }
  
        const BookAuthors = await bookAuthorModel.find({
            bookId: bookIdHolder,
        });
        const BookSubjects = await bookSubjectModel.find({
            bookId: bookIdHolder,
        });

        returnObject.push(BookEntry);
        returnObject.push(BookAuthors);
        returnObject.push(BookSubjects);
        res.send(returnObject);
    } catch {
        return res.status(404).json({ errorMessage: "Not found." });
    }
});

/**************************************************** 
Request Object:
req object:JSON
book: {
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
    dateAcquired
}

res String: 
"Entry Updated"
********************************************************/
router.put("/update", authAdmin, async (req, res) => {
    const {
        bookId,
        title,
        ISBN,
        author,
        subjects,
        physicalDesc,
        publisher,
        numberOfCopies,
        bookCoverLink,
        datePublished,
        dateAcquired,
    } = req.body;

    // verification: incomplete fields
    if (
        !bookId ||
        !title ||
        !author ||
        !subjects ||
        !physicalDesc ||
        !publisher ||
        !numberOfCopies
    ) {
        return res
            .status(400)
            .json({ errorMessage: "Please enter all required fields." });
    }

    const isbnLen = ISBN.replace(/\D/g, "").length;

    if (isbnLen != 10 && isbnLen != 13){
        return res.status(400).send({ errorMessage: "ISBN must contain 10 or 13 digits." });
    }

    try {
        //search if book exists
        const existingBook = await bookModel.findOne({ bookId: bookId });

        if (existingBook) {
            // if user wants to update the ISBN, check first if the new ISBN already exists
            if(existingBook.ISBN != ISBN){
                existingISBN = await bookModel.findOne({"ISBN":ISBN });
                if(existingISBN){
                    return res.status(400).send({ errorMessage: "ISBN already exists!" });
                }
            }

            // edit fields in the book collection
            // look for the book using its bookId and set new values for the fields
            await bookModel.findOne({ bookId: bookId }, (err, updatedBook) => {
                updatedBook.title = title;
                updatedBook.ISBN = ISBN;
                updatedBook.physicalDesc = physicalDesc;
                updatedBook.publisher = publisher;
                updatedBook.numberOfCopies = numberOfCopies;
                updatedBook.bookCoverLink = bookCoverLink;
                updatedBook.datePublished = datePublished;
                updatedBook.dateAcquired = dateAcquired;

                updatedBook.save();
            });

            // edit fields in the book_author collection
            // delete the current entries of authors
            await bookAuthorModel.deleteMany({ bookId: bookId });

            // iterate on the json array and create new entries
            author.forEach(async function (entry) {
                const author_fname = entry.author_fname;
                const author_lname = entry.author_lname;
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
            await bookSubjectModel.deleteMany({ bookId: bookId });

            // iterate on the json array and create new entries
            subjects.forEach(async function (entry) {
                const subject = entry;

                const newBookSubject = new bookSubjectModel({
                    bookId,
                    subject,
                });
                await newBookSubject.save();
            });

            res.status(200).send("Entry Updated");
        } else {
            //sends a 400 status if book already exists
            res.status(400).send({ errorMessage: "This book does not exist! Cannot update."});
        }
    } catch (err) {
        res.status(500).send();
    }
});

/**************************************************** 
Request Object:
req object: address parameter
{
    bookId
}
res String: 
"Entry Deleted"
********************************************************/

router.delete("/delete/:bookId", authAdmin, async (req, res) => {
    const bookIdHolder = req.params.bookId;
    if (!bookIdHolder) {
        return res
            .status(404)
            .json({ errorMessage: "Not found. No bookID in parameters." });
    }

    try {
        // search if book exists in book collection
        const existingBook = await bookModel.findOne({ bookId: bookIdHolder });

        // if book exists, delete its entries from book, book_author, book_subject, and book_cover
        if (existingBook) {
            await bookModel.findOneAndDelete({ bookId: bookIdHolder });
            await bookAuthorModel.deleteMany({ bookId: bookIdHolder });
            await bookSubjectModel.deleteMany({ bookId: bookIdHolder });

            res.status(200).send("Entry Deleted");
        } else {
            res.status(400).json({
                errorMessage: "This book does not exist! Cannot delete.",
            });
        }
    } catch (err) {
        res.status(500).send();
    }
});
module.exports = router;
