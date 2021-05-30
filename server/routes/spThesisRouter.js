// ---------------------------------------- IMPORTS
// web
const router = require("express").Router();
const authFaculty = require("../middleware/authFaculty");
const authAdmin = require("../middleware/authAdmin");
// thesis
const thesisModel = require("../models/spThesisModel");
const thesisAdviserModel = require("../models/spThesisAdviserModel");
const thesisAuthorModel = require("../models/spThesisAuthorModel");
const thesisKeyModel = require("../models/spThesisKeyModel");
// book
const bookModel = require("../models/bookModel");
const bookAuthorModel = require("../models/bookAuthorModel");
const bookSubjectModel = require("../models/bookSubjectModel");
// file database
const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");

const database = process.env.db;

// ---------------------------------------- FILE STORAGE INITIALIZATION
// Create mongo connection
const conn = mongoose.createConnection(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Init gfs
let gfs;

conn.once("open", () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("sp_pdf");
});

// Create storage engine
const storage = new GridFsStorage({
    url: database,
    file: (req, file) => {
        return new Promise(async (resolve, reject) => {
            //get the sp_thesis_id from the multipart form of http request
            const sp_thesis_id = JSON.parse(req.body.body).sp_thesis_id;

            // check if sp is existing
            const existingThesis = await thesisModel.findOne({ sp_thesis_id });
            // return error as thesis already exists
            if (existingThesis) {
                return reject("Thesis already exists!");
            }

            //gives the file a different name
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename =
                    buf.toString("hex") + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    metadata: sp_thesis_id, //store the book id in the metadata
                    bucketName: "sp_pdf",
                };
                resolve(fileInfo);
            });
        });
    },
});
const upload = multer({ storage });

// ---------------------------------------- HTTP REQUESTS
// create new sp entry
/**************************************************** 
Request Object:
req object: Multipart form
body: {
  sp_thesis_id: sp_thesis_id,
  type: type,
  title" title,
  abstract" abstract,
  year: year,
  source_code: source_code,
  manuscript: manuscript,
  journal: journal,
  poster: poster,
  keywords : ["keywords1",...],
  authors : [ {fname, lname}, ... ]
  advisers: [ {fname, lname}, ... ]
}
file : pdf

Response Object:
{
  "advisers": [ {fname, lname}, ... ],
  "authors": [ {fname, lname}, ... ],
  "keywords": ["keywords1",...],
  "_id": "60af1328d7eebc0068eac4c5",
  "sp_thesis_id": sp_thesis_id,
  "type": type,
  "title": title,
  "abstract": abstract,
  "year":year,
  "source_code": source_code,
  "manuscript": "manuscrip,
  "journal": journal,
  "poster": poster,
  "__v": 0
}
********************************************************/
// AUTHENTICATION REMOVED FROM THE PARAMeTERES
router.post("/create", async (req, res) => {
    try {
        const {
            sp_thesis_id, // common ID
            type,
            title,
            abstract,
            year,
            source_code,
            manuscript,
            journal,
            poster, // thesisModel
            advisers, // thesisAdviserModel
            authors, // thesisAuthorModel
            keywords, // thesisKeyModel
        } = req.body;

        // sample verification: incomplete fields
        if (
            !sp_thesis_id ||
            !type ||
            !title ||
            !abstract ||
            !year ||
            !source_code ||
            !manuscript ||
            !journal ||
            !poster ||
            !advisers ||
            !authors ||
            !keywords
        ) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }

        // search if book exists
        const existingThesis = await thesisModel.findOne({ sp_thesis_id });

        console.log(sp_thesis_id);

        if (!existingThesis) {
            // if does not exist, proceed in creating entry
            // save thesisModel
            const newThesis = new thesisModel({
                sp_thesis_id,
                type,
                title,
                abstract,
                year,
                source_code,
                manuscript,
                journal,
                poster,
            });
            const savedThesis = await newThesis.save();

            // save thesisAdviserModel
            advisers.forEach(async function (entry) {
                const adviser_fname = entry.fname;
                const adviser_lname = entry.lname;
                const adviser_name = adviser_fname.concat(" ", adviser_lname);

                const newThesisAdv = new thesisAdviserModel({
                    sp_thesis_id,
                    adviser_fname,
                    adviser_lname,
                    adviser_name,
                });

                const savedThesisAdv = await newThesisAdv.save();
                console.log(newThesisAdv);
                console.log(savedThesisAdv);
            });

            // save thesisAuthorModel
            authors.forEach(async function (entry) {
                const author_fname = entry.fname;
                const author_lname = entry.lname;
                const author_name = author_fname.concat(" ", author_lname);

                const newThesisAu = new thesisAuthorModel({
                    sp_thesis_id,
                    author_fname,
                    author_lname,
                    author_name,
                });
                const savedThesisAu = await newThesisAu.save();
                // console.log(newThesisAu)
                // console.log(savedThesisAu)
            });

            // save thesisKeyModel
            keywords.forEach(async function (entry) {
                const sp_thesis_keyword = entry;

                const newThesisKey = new thesisKeyModel({
                    sp_thesis_id,
                    sp_thesis_keyword,
                });

                const savedThesisKey = await newThesisKey.save();
            });

            // recheck if correctly sent by sending entry : thesisModel
            res.json(savedThesis);
        } else {
            res.status(400).send({ errorMessage: "SP already exists!" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ errorMessage: "Cannot create resource." });
    }
});

// get the pdf of a particular sp
// version 1: display file
/**************************************************** 
Request Object:
req object: JSON
body: {
  sp_thesis_id,
}

Response Object:
pdf Filestream
********************************************************/
router.get("/download1", async (req, res) => {
    const { sp_thesis_id } = req.body;

    gfs.files.findOne({ metadata: sp_thesis_id }, (err, file) => {
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
  sp_thesis_id,
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
  "metadata": "sp_thesis_id
}
********************************************************/
router.get("/download2", async (req, res) => {
    const { sp_thesis_id } = req.body;

    gfs.files.findOne({ metadata: sp_thesis_id }, (err, file) => {
        if (err) {
            res.send(err);
        } else {
            return res.json(file);
        }
    });
});

// browse all entries, default sort: alphabetical by title
/**************************************************** 
Request Object:
req object: JSON
body: {
 type,
}

Response Object: Array
[
    {
    "_id": _id,
    "length": length,
    "chunkSize": chunkSize,
    "uploadDate": uploadDate,
    "filename": filename,
    "md5": md5,
    "contentType": contentType,
    "metadata": "sp_thesis_id
    },
    ...
]
********************************************************/
router.post("/browse", async (req, res) => {
    const { type } = req.body;
    if (type === "book") {
        // type value: SP or Thesis
        bookModel.aggregate(
            [
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
                { $sort: { title: 1 } },
            ],
            (err, result) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send(result);
                }
            }
        );
    } else {
        // type value: Special Problem or Thesis
        thesisModel.aggregate(
            [
                {
                    $match: {
                        type: {
                            $in: [
                                "Thesis",
                                "Special Problem",
                                "thesis",
                                "sp",
                                "SP",
                            ],
                        },
                    },
                },
                {
                    $lookup: {
                        from: "sp_thesis_advisers",
                        localField: "sp_thesis_id",
                        foreignField: "sp_thesis_id",
                        as: "adviser",
                    },
                },
                {
                    $lookup: {
                        from: "sp_thesis_authors",
                        localField: "sp_thesis_id",
                        foreignField: "sp_thesis_id",
                        as: "author",
                    },
                },
                {
                    $lookup: {
                        from: "sp_thesis_keywords",
                        localField: "sp_thesis_id",
                        foreignField: "sp_thesis_id",
                        as: "keywords",
                    },
                },
                { $sort: { title: 1 } },
            ],
            (err, result) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send(result);
                }
            }
        );
    }
});

// search data
router.get("/search", async (req, res) => {
    // Search and Filter Resources
    // http://localhost:3001/thesis/search
    // REQUEST:
    // - req.query: type, search [, title, year, publisher, author, adviser, subject, keyword]
    // RESPONSE:
    // - array of objects (book/sp/thesis)

    var idArr_book = []; // array for BookIDs
    var idArr_thesis = []; // array for ThesisIDs
    var total = []; // array for resulting entries

    // ---------------------------------------- SUB FUNCTIONS
    function filterEntries() {
        // get unique entries
        let final_arr = [...new Set(total)];

        // FILTER ENTRIES in final_arr

        // Filter by title (case insensitive, checks for substring match)
        if ("title" in req.query) {
            let titleFilter = req.query.title.toLowerCase();
            final_arr = final_arr.filter((item) => {
                return item.title.toLowerCase().includes(titleFilter);
            });
        }

        // Filter by year (year in request can be string or number)
        if ("year" in req.query) {
            let yearFilter = req.query.year;
            final_arr = final_arr.filter((item) => {
                if ("year" in item) {
                    return item.year == yearFilter;
                }else if ("datePublished" in item) {
                    return item.datePublished.getFullYear() == yearFilter;
                }
            });
        }

        // Filter by publisher (case insensitive, checks for substring match)
        if ("publisher" in req.query) {
            let publisherFitler = req.query.publisher.toLowerCase();
            final_arr = final_arr.filter((item) => {
                if ("publisher" in item) {
                    return item.publisher
                        .toLowerCase()
                        .includes(publisherFitler);
                }
            });
        }

        // Filter by 1 author (case insensitive, checks for substring match)
        if ("author" in req.query) {
            let authorFilter = req.query.author.toLowerCase();
            final_arr = final_arr.filter((item) => {
                return item.author.some((auth) => {
                    return auth.author_name
                        .toLowerCase()
                        .includes(authorFilter);
                });
            });
        }

        // Filter by 1 adviser (case insensitive, checks for substring match)
        if ("adviser" in req.query) {
            let adviserFilter = req.query.adviser.toLowerCase();
            final_arr = final_arr.filter((item) => {
                if ("adviser" in item) {
                    return item.adviser.some((advi) => {
                        return advi.adviser_name
                            .toLowerCase()
                            .includes(adviserFilter);
                    });
                }
            });
        }

        // Filter by 1 subject (case insensitive, checks for substring match)
        if ("subject" in req.query) {
            let subjectFilter = req.query.subject.toLowerCase();
            final_arr = final_arr.filter((item) => {
                if ("subject" in item) {
                    return item.subject.some((subj) => {
                        return subj.subject
                            .toLowerCase()
                            .includes(subjectFilter);
                    });
                }
            });
        }

        // Filter by keywords (case insensitive, checks for substring match)
        // req.query.keyword: array of keyword strings (use double quotes in request)
        // sample: keyword=["keyw1","keyw2","keyw3"]
        if ("keyword" in req.query) {
            let keywordArrayFilter = JSON.parse(req.query.keyword);
            keywordArrayFilter = keywordArrayFilter.map(k => k.toLowerCase());
            final_arr = final_arr.filter((item) => {
                if ("keywords" in item) {
                    return item.keywords.some((keyw) => {
                        return keywordArrayFilter.some((keyFilter) => {
                            return keyw.sp_thesis_keyword
                                .toLowerCase()
                                .includes(keyFilter);
                        });
                    });
                }
            });
        }

        res.send(final_arr); // filtered search results
    }
    // REFERENCES for search filter:
    // Array.filter() https://stackoverflow.com/questions/2722159/how-to-filter-object-array-based-on-attributes
    // String.includes() https://stackoverflow.com/questions/48145432/javascript-includes-case-insensitive/48145521
    // Array.some() https://stackoverflow.com/questions/22844560/check-if-object-value-exists-within-a-javascript-array-of-objects-and-if-not-add
    // JSON.parse() https://stackoverflow.com/questions/22080770/i-need-to-create-url-for-get-which-is-going-to-accept-array-how-in-node-js-expr
    // Array.map() https://attacomsian.com/blog/javascript-array-lowercase-uppercase

    function spTitle(mode) {
        // get THESIS entries
        thesisModel.aggregate(
            // get thesis matches based from queries on title
            [
                {
                    $match: {
                        title: { $regex: req.query.search, $options: "i" },
                    },
                },
                {
                    $lookup: {
                        from: "sp_thesis_advisers",
                        localField: "sp_thesis_id",
                        foreignField: "sp_thesis_id",
                        as: "adviser",
                    },
                },
                {
                    $lookup: {
                        from: "sp_thesis_authors",
                        localField: "sp_thesis_id",
                        foreignField: "sp_thesis_id",
                        as: "author",
                    },
                },
                {
                    $lookup: {
                        from: "sp_thesis_keywords",
                        localField: "sp_thesis_id",
                        foreignField: "sp_thesis_id",
                        as: "keywords",
                    },
                },
            ],
            (err, result) => {
                if (err) {
                    res.send(err);
                } else {
                    // iterate each element and push to total array
                    result.forEach((item) => {
                        total.push(item);
                    });

                    // jump to BOOK counterpart
                    bookTitle(mode);
                }
            }
        );
    }

    function bookTitle(mode) {
        // get BOOK entries
        bookModel.aggregate(
            // get book matches based from queries on title
            [
                {
                    $match: {
                        title: { $regex: req.query.search, $options: "i" },
                    },
                },
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
                    // iterate each element and push to total array
                    results.forEach((item) => {
                        total.push(item);
                    });

                    // mode 0 is search by Title, else it is search by All Fields
                    if (mode == 0) {
                        filterEntries();
                    } else {
                        spAuthor(mode);
                    }
                }
            }
        );
    }
    function spAuthor(mode) {
        // get THESIS entries
        thesisAuthorModel.aggregate(
            // get thesis matches based from queries on author
            [
                {
                    $match: {
                        author_name: {
                            $regex: req.query.search,
                            $options: "i",
                        },
                    },
                },
            ],
            (err, result) => {
                if (err) {
                    res.send(err);
                } else {
                    // extract all IDs from matches
                    result.forEach((item) => {
                        idArr_thesis.push(item.sp_thesis_id);
                    });

                    // extract equivalent entries from thesisModel
                    thesisModel.aggregate(
                        [
                            { $match: { sp_thesis_id: { $in: idArr_thesis } } },
                            {
                                $lookup: {
                                    from: "sp_thesis_advisers",
                                    localField: "sp_thesis_id",
                                    foreignField: "sp_thesis_id",
                                    as: "adviser",
                                },
                            },
                            {
                                $lookup: {
                                    from: "sp_thesis_authors",
                                    localField: "sp_thesis_id",
                                    foreignField: "sp_thesis_id",
                                    as: "author",
                                },
                            },
                            {
                                $lookup: {
                                    from: "sp_thesis_keywords",
                                    localField: "sp_thesis_id",
                                    foreignField: "sp_thesis_id",
                                    as: "keywords",
                                },
                            },
                        ],
                        (error, results) => {
                            if (error) {
                                res.send(error);
                            } else {
                                // iterate each element and push to total array
                                results.forEach((item) => {
                                    total.push(item);
                                });

                                // jump to BOOK counterpart
                                bookAuthor(mode);
                            }
                        }
                    );
                }
            }
        );
    }
    function bookAuthor(mode) {
        // get BOOK entries
        bookAuthorModel.aggregate(
            // get book matches based from queries on author
            [
                {
                    $match: {
                        author_name: {
                            $regex: req.query.search,
                            $options: "i",
                        },
                    },
                },
            ],
            (err, result) => {
                if (err) {
                    res.send(result);
                } else {
                    // extract all IDs from matches
                    result.forEach((item) => {
                        idArr_book.push(item.bookId);
                    });

                    // extract equivalent entries from bookModel
                    bookModel.aggregate(
                        [
                            { $match: { bookId: { $in: idArr_book } } },
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
                                // iterate each element and push to total array
                                results.forEach((item) => {
                                    total.push(item);
                                });

                                // mode 0 is search by Author, else it is search by All Fields
                                if (mode == 0) {
                                    filterEntries();
                                } else {
                                    // empty ID arrays
                                    idArr_book = [];
                                    idArr_thesis = [];

                                    spAdviser(mode);
                                }
                            }
                        }
                    );
                }
            }
        );
    }
    // walang adviser sa books
    function spAdviser(mode) {
        thesisAdviserModel.aggregate(
            // get thesis matches based from queries on adviser
            [
                {
                    $match: {
                        adviser_name: {
                            $regex: req.query.search,
                            $options: "i",
                        },
                    },
                },
            ],
            (err, result) => {
                if (err) {
                    res.send(err);
                } else {
                    // extract all IDs from matches
                    result.forEach((item) => {
                        idArr_thesis.push(item.sp_thesis_id);
                    });

                    // extract equivalent entries from thesisModel
                    thesisModel.aggregate(
                        [
                            { $match: { sp_thesis_id: { $in: idArr_thesis } } },
                            {
                                $lookup: {
                                    from: "sp_thesis_advisers",
                                    localField: "sp_thesis_id",
                                    foreignField: "sp_thesis_id",
                                    as: "adviser",
                                },
                            },
                            {
                                $lookup: {
                                    from: "sp_thesis_authors",
                                    localField: "sp_thesis_id",
                                    foreignField: "sp_thesis_id",
                                    as: "author",
                                },
                            },
                            {
                                $lookup: {
                                    from: "sp_thesis_keywords",
                                    localField: "sp_thesis_id",
                                    foreignField: "sp_thesis_id",
                                    as: "keywords",
                                },
                            },
                        ],
                        (error, results) => {
                            if (error) {
                                res.send(error);
                            } else {
                                // iterate each element and push to total array
                                results.forEach((item) => {
                                    total.push(item);
                                });

                                // mode 0 is search by Adviser, else it is search by All Fields
                                if (mode == 0) {
                                    filterEntries();
                                } else {
                                    // empty ID array
                                    idArr_thesis = [];

                                    spKeyword();
                                }
                            }
                        }
                    );
                }
            }
        );
    }
    function spKeyword() {
        // get THESIS entries
        thesisKeyModel.aggregate(
            // get thesis matches based from queries on subject
            [
                {
                    $match: {
                        sp_thesis_keyword: {
                            $regex: req.query.search,
                            $options: "i",
                        },
                    },
                },
            ],
            (err, result) => {
                if (err) {
                    res.send(err);
                } else {
                    // extract all IDs from matches
                    result.forEach((item) => {
                        idArr_thesis.push(item.sp_thesis_id);
                    });

                    // extract equivalent entries from thesisModel
                    thesisModel.aggregate(
                        [
                            { $match: { sp_thesis_id: { $in: idArr_thesis } } },
                            {
                                $lookup: {
                                    from: "sp_thesis_advisers",
                                    localField: "sp_thesis_id",
                                    foreignField: "sp_thesis_id",
                                    as: "adviser",
                                },
                            },
                            {
                                $lookup: {
                                    from: "sp_thesis_authors",
                                    localField: "sp_thesis_id",
                                    foreignField: "sp_thesis_id",
                                    as: "author",
                                },
                            },
                            {
                                $lookup: {
                                    from: "sp_thesis_keywords",
                                    localField: "sp_thesis_id",
                                    foreignField: "sp_thesis_id",
                                    as: "keywords",
                                },
                            },
                        ],

                        (error, results) => {
                            if (error) {
                                res.send(error);
                            } else {
                                // iterate each element and push to total array
                                results.forEach((item) => {
                                    total.push(item);
                                });

                                // jump to BOOK counterpart
                                bookSubject();
                            }
                        }
                    );
                }
            }
        );
    }
    function bookSubject() {
        // get BOOK entries
        bookSubjectModel.aggregate(
            // get book matches based from queries on subject
            [
                {
                    $match: {
                        subject: { $regex: req.query.search, $options: "i" },
                    },
                },
            ],
            (err, result) => {
                if (err) {
                    res.send(err);
                } else {
                    // extract all IDs from matches
                    result.forEach((item) => {
                        idArr_book.push(item.bookId);
                    });

                    // extract equivalent entries from bookModel
                    bookModel.aggregate(
                        [
                            { $match: { bookId: { $in: idArr_book } } },
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
                                // iterate each element and push to total array
                                results.forEach((item) => {
                                    total.push(item);
                                });

                                // regardless if search by Subject or All Fields, this function is at the last part
                                // hence mode note needed for both spKeyword() and bookSubject()
                                filterEntries();
                            }
                        }
                    );
                }
            }
        );
    }

    // ---------------------------------------- SUB FUNCTIONS
    if (req.query.type == "All") {
        // spTitle() -> bookTitle() -> spAuthor() -> bookAuthor() -> ...
        // ...spAdviser() -> spKeyword() -> bookSubject() -> filterEntries()
        spTitle(1);
    } else if (req.query.type == "title") {
        // spTitle() -> bookTitle() -> filterEntries()
        spTitle(0);
    } else if (req.query.type == "author") {
        // spAuthor() -> bookAuthor() -> filterEntries()
        spAuthor(0);
    } else if (req.query.type == "adviser") {
        // spAdviser() -> filterEntries()
        spAdviser(0);
    } else if (req.query.type == "subject") {
        // spKeyword() -> bookSubject() -> filterEntries()
        spKeyword();
    }
});

// RESOURCES:
// https://stackoverflow.com/questions/40931821/how-to-combine-two-collection-based-on-idtransectionid-using-node-js
// https://stackoverflow.com/questions/50495674/get-all-elements-with-matching-id-in-array-of-id
// https://stackoverflow.com/questions/15834336/how-to-check-if-a-parameter-is-present-in-the-querystring-in-node-js

// https://stackoverflow.com/questions/46122557/how-can-i-make-a-assign-mongoose-result-in-global-variable-in-node-js
// https://stackoverflow.com/questions/30636547/how-to-set-retrieve-callback-in-mongoose-in-a-global-variable/30636635

// update thesis data
// AUTHENTICATION REMOVED

/**************************************************** 
Request Object:
req object: JSON
body: 
{
    old_sp_thesis_id: old_sp_thesis_id,
    sp_thesis_id: sp_thesis_id,
    type: type,
    title: title,
    abstract: abstract,
    year: year,
    source_code: source_code,
    manuscript: manuscript,
    journal: journal,
    poster: poster,
    authors : [ {fname, lname}, ... ],
    advisers: [ {fname, lname}, ... ],
    keywords : ["keywords1",...]
}
Response String:
"Entry Updated"
********************************************************/
router.put("/update-sp-thesis", async (req, res) => {
    const {
        old_sp_thesis_id,
        sp_thesis_id,
        type,
        title,
        abstract,
        year,
        source_code,
        manuscript,
        journal,
        poster,
        authors,
        advisers,
        keywords,
    } = req.body;
    try {
        // looks for the sp/thesis based on the json object passed, then updates it
        await thesisModel.findOne(
            { sp_thesis_id: old_sp_thesis_id },
            (err, updatedThesisSp) => {
                // await thesisModel.findOne({sp_thesis_id: old_sp_thesis_id}, (err, updatedThesisSp) => {
                if (
                    !sp_thesis_id ||
                    !type ||
                    !title ||
                    !abstract ||
                    !year ||
                    !source_code ||
                    !manuscript ||
                    !journal ||
                    !poster ||
                    !advisers ||
                    !authors ||
                    !keywords
                ) {
                    return res.status(400).json({
                        errorMessage: "Please enter all required fields.",
                    });
                }
                console.log("====START UPDATE HERE=====");
                console.log(req.body);
                // changing values
                updatedThesisSp.sp_thesis_id = sp_thesis_id;
                updatedThesisSp.type = type;
                updatedThesisSp.title = title;
                updatedThesisSp.abstract = abstract;
                updatedThesisSp.year = year;
                updatedThesisSp.source_code = source_code;
                updatedThesisSp.manuscript = manuscript;
                updatedThesisSp.journal = journal;
                updatedThesisSp.poster = poster;

                console.log(updatedThesisSp);
                // updates
                updatedThesisSp.save();
            }
        );

        // deletes all authors with corresponding thesis/sp id
        // await thesisAuthorModel.deleteMany({"sp_thesis_id":old_sp_thesis_id});
        // await thesisAdviserModel.deleteMany({"sp_thesis_id":old_sp_thesis_id});
        // await thesisKeyModel.deleteMany({"sp_thesis_id":old_sp_thesis_id});

        // await thesisAuthorModel.deleteMany({sp_thesis_id: old_sp_thesis_id});
        // await thesisAdviserModel.deleteMany({sp_thesis_id: old_sp_thesis_id});
        // await thesisKeyModel.deleteMany({sp_thesis_id: old_sp_thesis_id});

        // console.log(authors)
        // console.log(adviser)
        // console.log(keywords)

        // save updated thesisAuthorModel
        authors.forEach(async function (updatedEntry) {
            console.log("AUTHORS");
            // console.log(updatedEntry)
            // console.log(updatedEntry.fname)
            // console.log(updatedEntry.lname)

            const author_fname = updatedEntry.fname;
            const author_lname = updatedEntry.lname;
            const author_name = author_fname.concat(" ", author_lname);

            console.log(author_fname);
            console.log(author_lname);

            const newAuthor = new thesisAuthorModel({
                sp_thesis_id,
                author_fname,
                author_lname,
                author_name,
            });
            await newAuthor.save();
        });

        // save updated thesisAdviserModel
        advisers.forEach(async function (updatedEntry) {
            console.log("ADVISERS");
            // console.log(updatedEntry)
            const adviser_fname = updatedEntry.fname;
            const adviser_lname = updatedEntry.lname;
            const adviser_name = adviser_fname.concat(" ", adviser_lname);

            console.log(adviser_fname);
            console.log(adviser_lname);

            const newAdviser = new thesisAdviserModel({
                sp_thesis_id,
                adviser_fname,
                adviser_lname,
                adviser_name,
            });
            await newAdviser.save();
        });

        // save updated thesisAdviserModel
        keywords.forEach(async function (updatedEntry) {
            console.log("KEYWORDS");
            console.log(updatedEntry);
            const sp_thesis_keyword = updatedEntry;

            console.log(sp_thesis_keyword);
            const newKey = new thesisKeyModel({
                sp_thesis_id,
                sp_thesis_keyword,
            });
            await newKey.save();
        });

        res.send("Entry Updated");
    } catch {
        res.send(500).json({ errorMessage: "Cannot Update." });
    }
});

// delete entire sp/thesis entry
/**************************************************** 
Request Object:
req object: address parameter
{
    sp_thesis_id
}
Response String:
"Entry Updated"
********************************************************/
router.delete("/remove-sp-thesis/:sp_thesis_id", async (req, res) => {
    console.log("del");
    const sp_thesis_id_holder = req.params.sp_thesis_id;
    console.log(sp_thesis_id_holder);
    console.log(req.params.sp_thesis_id);

    if (!sp_thesis_id_holder) {
        return res.status(400).json({ errorMessage: "Entry does not exist." });
    }

    // checks if entry to be deleted exists
    await thesisModel.findOne(
        { sp_thesis_id: sp_thesis_id_holder },
        (err, object) => {
            if (!object) {
                return res
                    .status(404)
                    .json({ errorMessage: "Entry to be deleted not found." });
            }
        }
    );

    // removes entries with corresponding sp_thesis_id
    try {
        await thesisModel.findOneAndDelete({
            sp_thesis_id: sp_thesis_id_holder,
        });
        await thesisAuthorModel.deleteMany({
            sp_thesis_id: sp_thesis_id_holder,
        });
        await thesisAdviserModel.deleteMany({
            sp_thesis_id: sp_thesis_id_holder,
        });
        await thesisKeyModel.deleteMany({ sp_thesis_id: sp_thesis_id_holder });
        res.send("Entry Deleted");
    } catch {
        res.send(404).json({ errorMessage: "Cannot Delete." });
    }

    // removes file that comes along with the sp/thesis entry
    // gfs.remove({ _id: object_id, root: "sp_pdf" }, (err, gridStore) => {
    //     if (err) {
    //         return res.status(404).json({ err: err });
    //     }
    // });
});

module.exports = router;
