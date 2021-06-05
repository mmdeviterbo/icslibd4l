const request = require("request");
const cheerio = require("cheerio");
const router = require("express").Router();
const bookModel = require("../models/bookModel");
const bookAuthorModel = require("../models/bookAuthorModel");
const bookSubjectModel = require("../models/bookSubjectModel");
const authFaculty = require("../middleware/authFaculty");
const authAdmin = require("../middleware/authAdmin");
const config = require("config");
const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");

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

// Create mongo connection
let gfs;
let conn;
mongoose.connection.on("connected", () => {
    conn = mongoose.createConnection(
        database,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            socketTimeoutMS: 10000,
        },
        (err) => {
            if (err) return console.error(err);
        }
    );

    // Init gfs

    conn.once("open", () => {
        // Init stream
        gfs = Grid(conn.db, mongoose.mongo);
        gfs.collection("book_covers");
    });
});

// Create storage engine
const storage = new GridFsStorage({
    url: database,
    file: (req, file) => {
        return new Promise(async (resolve, reject) => {
            const bookId = JSON.parse(req.body.body).bookId; //parse the book id from the multipart form
            const dateAcquired = JSON.parse(req.body.body).dateAcquired; //parse the date acquired from the multipart form
            const existingBook = await bookModel.findOne({ bookId }); //check if the book already exists
            if (existingBook) {
                // for book create (no oldBookId in input)
                if (JSON.parse(req.body.body).oldBookId == undefined) {
                    return reject("Book already exists!");
                } else {
                    //for book update
                    // delete the book cover's entry from .files and .chunks (book_id == metadata.bookId in book_covers.files)
                    // check first if the book has a saved book cover
                    gfs.files.findOne(
                        { "metadata.bookId": bookId },
                        (err, existingBookCover) => {
                            if (existingBookCover) {
                                // .chunks
                                mongoose.connection.db
                                    .collection("book_covers.chunks")
                                    .deleteOne({
                                        files_id: existingBookCover._id,
                                    });
                                // .files
                                gfs.files.deleteOne({
                                    "metadata.bookId": bookId,
                                });
                            }
                        }
                    );
                }
            }

            crypto.randomBytes(16, (err, buf) => {
                //gives the file a different name
                if (err) {
                    return reject(err);
                }
                const filename =
                    buf.toString("hex") + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    metadata: { bookId, dateAcquired }, //store the book id in the metadata
                    bucketName: "book_covers",
                };
                resolve(fileInfo);
            });
        });
    },
});
const upload = multer({ storage });

//creates a book and uploads its book cover
/**************************************************** 
Request Object:
req object:
Multipart form
book: {
    bookId,
    title,
    authors,
    subjects,
    physicalDesc,
    publisher,
    numberOfCopies,
    datePublished,
    dateAcquired,
}
file: jpeg/png
res object:
{
    bookId,
    title,
    authors,
    subjects,
    physicalDesc,
    publisher,
    numberOfCopies,
    datePublished,
    dateAcquired,
}
********************************************************/
router.post("/create", authFaculty, upload.any(), async (req, res) => {
    console.log(req.body);
    try {
        const {
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
        } = JSON.parse(req.body.body);

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
            return res.status(400).send("Please enter all required fields.");
        }

        //search if book exists
        const existingBook = await bookModel.findOne({ bookId });

        if (!existingBook) {
            //if book does not exist, add the book

            const newBook = new bookModel({
                //add the non-array fields to the books collection
                bookId,
                title,
                ISBN,
                physicalDesc,
                publisher,
                numberOfCopies,
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

//display the latest 12 book covers on the homepage
router.get("/display_covers", async (req, res) => {
    gfs.files
        .find()
        .limit(12)
        .sort({ "metadata.dateAcquired": -1 })
        .toArray((err, files) => {
            // Check if files
            if (!files || files.length === 0) {
                res.render("index", { files: false });
            } else {
                files.map((file) => {
                    if (
                        file.contentType === "image/jpeg" ||
                        file.contentType === "image/png"
                    ) {
                        file.isImage = true;
                    } else {
                        file.isImage = false;
                    }
                });
                //   res.render('index', { files: files });
                res.send(files);
            }
        });
});

//display the latest 12 book infos on the homepage
router.get("/display_infos", async (req, res) => {
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

// get the pdf of a particular sp
/**************************************************** 
Request Object:
req object: JSON
body: {
  book_id,
}
Response Object:
pdf Filestream
********************************************************/
// version 1: display file
router.get("/download1", async (req, res) => {
    const { bookId } = req.body;

    gfs.files.findOne({ "metadata.bookId": bookId }, (err, file) => {
        if (err) {
            res.send(err);
        } else {
            // Read output to browser
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        }
    });
});
// version 2: display file object
/**************************************************** 
Request Object:
req object: JSON
body: {
  book_id,
}
Response Object:
{
  "_id": _id,
  "length": length,
  "chunkSize": chunkSize,
  "uploadDate": uploadDate,
  "filename": filename,
  "md5": md5,
  "contentType": contentType,
  "metadata": book_id
}
********************************************************/
router.get("/download2", async (req, res) => {
    const { bookId } = req.body;

    gfs.files.findOne({ "metadata.bookId": bookId }, (err, file) => {
        if (err) {
            res.send(err);
        } else {
            return res.json(file);
        }
    });
});

// search data
/**************************************************** 
Request Object:
req query: JSON
body: {
  type,
  search
}
Response Object: Array of Objects
{
  "_id": _id,
  "length": length,
  "chunkSize": chunkSize,
  "uploadDate": uploadDate,
  "filename": filename,
  "md5": md5,
  "contentType": contentType,
  "metadata": book_id
}
********************************************************/
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
router.put("/update", authAdmin, upload.any(), async (req, res) => {
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
    } = JSON.parse(req.body.body);

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
                        mongoose.connection.db
                            .collection("book_covers.chunks")
                            .deleteOne({ files_id: existingBookCover._id });
                        // .files
                        gfs.files.deleteOne({ "metadata.bookId": bookId });
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