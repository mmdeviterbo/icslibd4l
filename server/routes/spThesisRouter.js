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
// https://www.section.io/engineering-education/uploading-files-using-multer-nodejs/
// https://dev.to/aimalm/upload-single-file-in-node-js-using-express-and-multer-in-6-steps-4o9p
// https://stackoverflow.com/questions/36096805/uploading-multiple-files-with-multer-but-from-different-fields
// https://stackoverflow.com/questions/58173677/error-the-database-connection-must-be-open-to-store-files

// File filter function
const fileFilter = (req, file, cb) => {
    if (file.fieldname === "manuscript" || file.fieldname === "journal") {
        if (file.mimetype.includes("pdf")) {
            cb(null, true);
        } else {
            cb(new Error("Not a PDF File!!"), false);
        }
    } else if (file.fieldname == "poster") {
        if (
            file.mimetype.includes("jpeg") ||
            file.mimetype.includes("png") ||
            file.mimetype.includes("jpg")
        ) {
            cb(null, true);
        } else {
            cb(new Error("Not a IMG File!!"), false);
        }
    } else if (file.fieldname == "source code") {
        cb(null, true);
    }
};

// Create mongo connection
// const conn = mongoose.createConnection(database, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

const promise = mongoose.connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const conn = mongoose.connection;

// Init gfs
let gfs;

// Init stream
conn.once("open", () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("sp_files");
});
// Create storage engine
const storage = new GridFsStorage({
    // url: database,
    db: promise,
    file: (req, file) => {
        return new Promise(async (resolve, reject) => {
            //get the sp_thesis_id from the multipart form of http request
            const sp_thesis_id = JSON.parse(req.body.body).sp_thesis_id;
            // check if sp is existing
            const existingThesis = await thesisModel.findOne({ sp_thesis_id });
            // return error as thesis already exists
            if (existingThesis) {
                if (JSON.parse(req.body.body).old_sp_thesis_id == undefined) {
                    return reject("Thesis already exists!");
                } else {
                    // thesis update
                    gfs.files.findOne(
                        { metadata: [sp_thesis_id, "journal"] },
                        (err, updatedSPT) => {
                            if (updatedSPT) {
                                // .chunks
                                mongoose.connection.db
                                    .collection("sp_files.chunks")
                                    .deleteMany({ files_id: updatedSPT._id });
                                // .files
                                gfs.files.deleteOne({
                                    metadata: [sp_thesis_id, "journal"],
                                });
                            }
                        }
                    );
                    gfs.files.findOne(
                        { metadata: [sp_thesis_id, "poster"] },
                        (err, updatedSPT) => {
                            if (updatedSPT) {
                                // .chunks
                                mongoose.connection.db
                                    .collection("sp_files.chunks")
                                    .deleteMany({ files_id: updatedSPT._id });
                                // .files
                                gfs.files.deleteOne({
                                    metadata: [sp_thesis_id, "poster"],
                                });
                            }
                        }
                    );
                    gfs.files.findOne(
                        { metadata: [sp_thesis_id, "manuscript"] },
                        (err, updatedSPT) => {
                            if (updatedSPT) {
                                // .chunks
                                mongoose.connection.db
                                    .collection("sp_files.chunks")
                                    .deleteMany({ files_id: updatedSPT._id });
                                // .files
                                gfs.files.deleteOne({
                                    metadata: [sp_thesis_id, "manuscript"],
                                });
                            }
                        }
                    );
                    gfs.files.findOne(
                        { metadata: [sp_thesis_id, "source code"] },
                        (err, updatedSPT) => {
                            if (updatedSPT) {
                                // .chunks
                                mongoose.connection.db
                                    .collection("sp_files.chunks")
                                    .deleteMany({ files_id: updatedSPT._id });
                                // .files
                                gfs.files.deleteOne({
                                    metadata: [sp_thesis_id, "source code"],
                                });
                            }
                        }
                    );
                }
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
                    bucketName: "sp_files",
                    metadata: [sp_thesis_id, file.fieldname], //store the book id in the metadata
                };

                console.log(fileInfo);
                console.log(fileInfo.metadata[0]);
                console.log(fileInfo.metadata[1]);
                resolve(fileInfo);
            });
        });
    },
});
const upload = multer({ storage, fileFilter: fileFilter });

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
  manuscript: manuscript,
  journal: journal,
  poster: poster,
  keywords : ["keywords1",...],
  authors : [ {fname, lname}, ... ]
  advisers: [ {fname, lname}, ... ]
}
manuscript : pdf
poster : pdf
journal : img file
source code : file
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
  "__v": 0
}
********************************************************/
// AUTHENTICATION REMOVED FROM THE PARAMETERS
// authFaculty
router.post(
    "/create",
    upload.fields([
        { name: "manuscript", maxCount: 1 },
        { name: "poster", maxCount: 1 },
        { name: "journal", maxCount: 1 },
        { name: "source code", maxCount: 1 },
    ]),
    async (req, res) => {
        try {
            const {
                sp_thesis_id, // common ID
                type,
                title,
                abstract,
                year,
                // source_code,
                // manuscript,
                // journal,
                // poster, // thesisModel
                advisers, // thesisAdviserModel
                authors, // thesisAuthorModel
                keywords, // thesisKeyModel
            } = JSON.parse(req.body.body);

            // sample verification: incomplete fields
            if (
                !sp_thesis_id ||
                !type ||
                !title ||
                !abstract ||
                !year ||
                // !source_code ||
                // !manuscript ||
                // !journal ||
                // !poster ||
                !advisers ||
                !authors ||
                !keywords
            ) {
                return res.status(400).json({
                    errorMessage: "Please enter all required fields.",
                });
            }

            // search if book exists
            const existingThesis = await thesisModel.findOne({ sp_thesis_id });

            // console.log(sp_thesis_id);

            if (!existingThesis) {
                // if does not exist, proceed in creating entry
                // save thesisModel
                const newThesis = new thesisModel({
                    sp_thesis_id,
                    type,
                    title,
                    abstract,
                    year,
                    // source_code,
                    // manuscript,
                    // journal,
                    // poster,
                });
                const savedThesis = await newThesis.save();

                // save thesisAdviserModel
                advisers.forEach(async function (entry) {
                    const adviser_fname = entry.fname;
                    const adviser_lname = entry.lname;
                    const adviser_name = adviser_fname.concat(
                        " ",
                        adviser_lname
                    );

                    const newThesisAdv = new thesisAdviserModel({
                        sp_thesis_id,
                        adviser_fname,
                        adviser_lname,
                        adviser_name,
                    });

                    const savedThesisAdv = await newThesisAdv.save();
                    // console.log(newThesisAdv);
                    // console.log(savedThesisAdv);
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
    }
);

// Reference:
// https://stackoverflow.com/questions/36891931/gridfs-find-file-by-id-download-with-the-name-of-the-file

// get the manuscript, journal, or source code of a particular sp/thesis
/**************************************************** 
Request Query:
    title: 
    type: "manuscript", "journal", "source code"
Response Object:
    * pdf Filestream for manuscript and journal
    * Filestream for sourcecode
********************************************************/
router.get("/download", async (req, res) => {
    thesisModel.findOne(
        { title: { $regex: req.query.search, $options: "i" } },
        (err, result) => {
            if (err) {
                res.send(err);
            } else {
                console.log(result.sp_thesis_id);

                gfs.files.findOne(
                    { metadata: [result.sp_thesis_id, req.query.type] },
                    (err, file) => {
                        if (err) {
                            res.send(err);
                        } else {
                            // Read output to browser
                            const readstream = gfs.createReadStream(
                                file.filename
                            );
                            readstream.pipe(res);
                        }
                    }
                );
            }
        }
    );
});

// get the poster of a particular sp/thesis
/**************************************************** 
Request Query:
    title: 
Response Object:
img Filestream for poster
********************************************************/
router.get("/preview", async (req, res) => {
    thesisModel.findOne(
        { title: { $regex: req.query.search, $options: "i" } },
        (err, result) => {
            if (err) {
                res.send(err);
            } else {
                console.log(result.sp_thesis_id);

                gfs.files.findOne(
                    { metadata: [result.sp_thesis_id, "poster"] },
                    (err, file) => {
                        if (err) {
                            res.send(err);
                        } else {
                            // Read output to browser
                            const readstream = gfs.createReadStream(
                                file.filename
                            );
                            readstream.pipe(res);
                        }
                    }
                );
            }
        }
    );
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
                        as: "advisers",
                    },
                },
                {
                    $lookup: {
                        from: "sp_thesis_authors",
                        localField: "sp_thesis_id",
                        foreignField: "sp_thesis_id",
                        as: "authors",
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

// search and filter resources
/**************************************************** 
http://localhost:3001/thesis/search
Request Object:
query: {
    type (any/book/sp/thesis),
    search,
    year,
    publisher,
    author,
    adviser,
    subject,
    keyword (string array)
}
Response Object: Array of book/sp/thesis
    (sp/thesis sorted by title + books sorted by title)
[
    {
        advisers: [],
        authors: [],
        keywords: [],
        sp_thesis_id,
        type,
        title,
        abstract,
        year
    },
    ...
    {
        author: [],
        subject: [],
        bookId,
        ISBN,
        title,
        physicalDesc,
        publisher,
        numberOfCopies,
        datePublished,
        dateAcquired
    },
    ...
]
********************************************************/
router.get("/search", async (req, res) => {
    var idArr_book = []; // array for BookIDs
    var idArr_thesis = []; // array for ThesisIDs
    var total = []; // array for resulting entries

    var spName = ["Special Problem", "sp", "SP"];
    var thesisName = ["Thesis", "thesis"];

    // ---------------------------------------- SUB FUNCTIONS
    function filterEntries() {
        let final_arr = total;

        // separate books and spthesis
        let book_arr = final_arr.filter(item => "bookId" in item);
        let spthesis_arr = final_arr.filter(item => "sp_thesis_id" in item);

        // get unique entries
        function getUniqueListBy(arr, key) {
            return [...new Map(arr.map(item => [item[key], item])).values()]
        }
        book_arr = getUniqueListBy(book_arr, 'bookId');
        spthesis_arr = getUniqueListBy(spthesis_arr, 'sp_thesis_id');

        // sort by title
        function compareByTitle( a, b ) {
            let titleA = a.title.toLowerCase();
            let titleB = b.title.toLowerCase();
            if (titleA < titleB){
                return -1;
            }
            if (titleA > titleB){
                return 1;
            }
            return 0;
        }
        book_arr.sort(compareByTitle);
        spthesis_arr.sort(compareByTitle);

        // Filter by year (year in request can be string or number)
        if ("year" in req.query) {
            let yearFilter = req.query.year;
            spthesis_arr = spthesis_arr.filter((item) => {
                return item.year == yearFilter;
            });
            book_arr = book_arr.filter((item) => {
                return item.datePublished.getFullYear() == yearFilter;
            });
        }

        // Filter by publisher (case insensitive, checks for substring match)
        if ("publisher" in req.query) {
            let publisherFitler = req.query.publisher.toLowerCase();
            book_arr = book_arr.filter((item) => {
                return item.publisher
                    .toLowerCase()
                    .includes(publisherFitler);
            });
        }

        // Filter by 1 author (case insensitive, checks for substring match)
        if ("author" in req.query) {
            let authorFilter = req.query.author.toLowerCase();
            spthesis_arr = spthesis_arr.filter((item) => {
                return item.authors.some((auth) => {
                    return auth.author_name
                        .toLowerCase()
                        .includes(authorFilter);
                });
            });
            book_arr = book_arr.filter((item) => {
                return item.author.some((auth) => {
                    return auth.author_name
                        .toLowerCase()
                        .includes(authorFilter);
                });
            });
        }

        // Filter by 1 adviser (case insensitive, checks for substring match)
        // format of req.query.adviser = "Lastname, Firstname"
        if ("adviser" in req.query) {
            let adviserFilter = req.query.adviser.toLowerCase();
            let fnameFilter, lnameFilter;
            [lnameFilter, fnameFilter] = adviserFilter.split(", ");
            spthesis_arr = spthesis_arr.filter((item) => {
                return item.advisers.some((advi) => {
                    return (
                        advi.adviser_fname.toLowerCase() == fnameFilter &&
                        advi.adviser_lname.toLowerCase() == lnameFilter
                    );
                });
            });
        }

        // Filter by 1 subject (case insensitive, checks for substring match)
        if ("subject" in req.query) {
            let subjectFilter = req.query.subject.toLowerCase();
            book_arr = book_arr.filter((item) => {
                return item.subject.some((subj) => {
                    return subj.subject
                        .toLowerCase()
                        .includes(subjectFilter);
                });
            });
        }

        // Filter by keywords (case insensitive, checks for substring match)
        // format of req.query.keyword: ?...&keyword[]=keyw1&keyword[]=keyw2...
        if ("keyword" in req.query) {
            try {
                let keywordArrayFilter = req.query.keyword;
                keywordArrayFilter = keywordArrayFilter.map((k) =>
                    k.toLowerCase()
                );
                spthesis_arr = spthesis_arr.filter((item) => {
                    return item.keywords.some((keyw) => {
                        return keywordArrayFilter.some((keyFilter) => {
                            return keyw.sp_thesis_keyword
                                .toLowerCase()
                                .includes(keyFilter);
                        });
                    });
                });
            } catch (error) {
                if (error instanceof SyntaxError) {
                    console.log("SyntaxError: Invalid req.query.keyword");
                } else {
                    console.log(error);
                }
                res.status(400).send(error);
            }
        }

        // Send filtered search results
        if (!res.headersSent) {
            res.send(spthesis_arr.concat(book_arr));  //concat arrays
        }
    }
    /* References for search filter:
        Array.filter() https://stackoverflow.com/questions/2722159/how-to-filter-object-array-based-on-attributes
        String.includes() https://stackoverflow.com/questions/48145432/javascript-includes-case-insensitive/48145521
        Array.some() https://stackoverflow.com/questions/22844560/check-if-object-value-exists-within-a-javascript-array-of-objects-and-if-not-add
        JSON.parse() https://stackoverflow.com/questions/22080770/i-need-to-create-url-for-get-which-is-going-to-accept-array-how-in-node-js-expr
        Array.map() https://attacomsian.com/blog/javascript-array-lowercase-uppercase
        Array.sort() https://devdocs.io/javascript/global_objects/array/sort
        Array.sort() https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
        Array.concat(Array) https://devdocs.io/javascript/global_objects/array/concat
        getUniqueListBy() https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects/56768137#56768137
    */

    // ------- SEARCH SP FUNCTIONS
    function spMain(mode) {
        // get sp matches on thesisModel based from req.query.search
        thesisModel.aggregate(
            [
                {
                    $match: {
                        $and: [
                            {
                                // make sure type is correct
                                type: { $in: spName },
                            },
                            {
                                // compare to other fields to what is searched
                                $or: [
                                    {
                                        title: {
                                            $regex: req.query.search,
                                            $options: "i",
                                        },
                                    },
                                    {
                                        abstract: {
                                            $regex: req.query.search,
                                            $options: "i",
                                        },
                                    },
                                    {
                                        abstract: {
                                            $regex: req.query.search,
                                            $options: "i",
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                },
                {
                    // populate advisers field
                    $lookup: {
                        from: "sp_thesis_advisers",
                        localField: "sp_thesis_id",
                        foreignField: "sp_thesis_id",
                        as: "advisers",
                    },
                },
                {
                    // populate authors field
                    $lookup: {
                        from: "sp_thesis_authors",
                        localField: "sp_thesis_id",
                        foreignField: "sp_thesis_id",
                        as: "authors",
                    },
                },
                {
                    // populate keywords field
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

                    // jump to search thru SP authors
                    spAuthor(mode);
                }
            }
        );
    }
    function spAuthor(mode) {
        // get sp matches on thesisAuthorModel based from req.query.search
        thesisAuthorModel.aggregate(
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
                            {
                                $match: {
                                    $and: [
                                        // crosscheck id with entry type
                                        {
                                            sp_thesis_id: { $in: idArr_thesis },
                                        },
                                        {
                                            type: { $in: spName },
                                        },
                                    ],
                                },
                            },
                            {
                                $lookup: {
                                    // populate advisers field
                                    from: "sp_thesis_advisers",
                                    localField: "sp_thesis_id",
                                    foreignField: "sp_thesis_id",
                                    as: "advisers",
                                },
                            },
                            {
                                $lookup: {
                                    // populate authors field
                                    from: "sp_thesis_authors",
                                    localField: "sp_thesis_id",
                                    foreignField: "sp_thesis_id",
                                    as: "authors",
                                },
                            },
                            {
                                $lookup: {
                                    // populate keywords field
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

                                // reset placeholder array
                                idArr_thesis = [];
                                // jump to search thru SP advisers
                                spAdviser(mode);
                            }
                        }
                    );
                }
            }
        );
    }
    function spAdviser(mode) {
        // get sp matches on thesisAdviserModel based from req.query.search
        thesisAdviserModel.aggregate(
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
                            {
                                $match: {
                                    $and: [
                                        {
                                            // crosscheck id with entry type
                                            sp_thesis_id: { $in: idArr_thesis },
                                        },
                                        {
                                            type: { $in: spName },
                                        },
                                    ],
                                },
                            },
                            {
                                $lookup: {
                                    // populate advisers field
                                    from: "sp_thesis_advisers",
                                    localField: "sp_thesis_id",
                                    foreignField: "sp_thesis_id",
                                    as: "advisers",
                                },
                            },
                            {
                                $lookup: {
                                    // populate authors field
                                    from: "sp_thesis_authors",
                                    localField: "sp_thesis_id",
                                    foreignField: "sp_thesis_id",
                                    as: "authors",
                                },
                            },
                            {
                                $lookup: {
                                    // populate keywords field
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

                                // reset placeholder array
                                idArr_thesis = [];
                                // jump to search thru SP keywords
                                spKeyword(mode);
                            }
                        }
                    );
                }
            }
        );
    }
    function spKeyword(mode) {
        // get sp matches on thesisKeywordModel based from req.query.search
        thesisKeyModel.aggregate(
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
                            {
                                $match: {
                                    $and: [
                                        {
                                            // crosscheck id with entry type
                                            sp_thesis_id: { $in: idArr_thesis },
                                        },
                                        {
                                            type: { $in: spName },
                                        },
                                    ],
                                },
                            },
                            {
                                $lookup: {
                                    // populate advisers field
                                    from: "sp_thesis_advisers",
                                    localField: "sp_thesis_id",
                                    foreignField: "sp_thesis_id",
                                    as: "advisers",
                                },
                            },
                            {
                                $lookup: {
                                    // populate authors field
                                    from: "sp_thesis_authors",
                                    localField: "sp_thesis_id",
                                    foreignField: "sp_thesis_id",
                                    as: "authors",
                                },
                            },
                            {
                                $lookup: {
                                    // populate keywords field
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

                                // mode 0 is search by SP, else it is search by all 3 types
                                if (mode == 0) {
                                    filterEntries();
                                } else {
                                    thesisMain(mode);
                                }
                            }
                        }
                    );
                }
            }
        );
    }
    // ------- SEARCH THESIS FUNCTIONS
    function thesisMain(mode) {
        // get thesis matches on thesisModel based from req.query.search
        thesisModel.aggregate(
            [
                {
                    $match: {
                        $and: [
                            {
                                // make sure type is correct
                                type: { $in: thesisName },
                            },
                            {
                                // compare to other fields to what is searched
                                $or: [
                                    {
                                        title: {
                                            $regex: req.query.search,
                                            $options: "i",
                                        },
                                    },
                                    {
                                        abstract: {
                                            $regex: req.query.search,
                                            $options: "i",
                                        },
                                    },
                                    {
                                        abstract: {
                                            $regex: req.query.search,
                                            $options: "i",
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                },
                {
                    $lookup: {
                        // populate advisers field
                        from: "sp_thesis_advisers",
                        localField: "sp_thesis_id",
                        foreignField: "sp_thesis_id",
                        as: "advisers",
                    },
                },
                {
                    $lookup: {
                        // populate authors field
                        from: "sp_thesis_authors",
                        localField: "sp_thesis_id",
                        foreignField: "sp_thesis_id",
                        as: "authors",
                    },
                },
                {
                    $lookup: {
                        // populate keywords field
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

                    // jump to search thru Thesis authors
                    thesisAuthor(mode);
                }
            }
        );
    }
    function thesisAuthor(mode) {
        // get thesis matches on thesisAuthorModel based from req.query.search
        thesisAuthorModel.aggregate(
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
                            {
                                $match: {
                                    $and: [
                                        // crosscheck id with entry type
                                        {
                                            sp_thesis_id: { $in: idArr_thesis },
                                        },
                                        {
                                            type: { $in: thesisName },
                                        },
                                    ],
                                },
                            },
                            {
                                $lookup: {
                                    // populate advisers field
                                    from: "sp_thesis_advisers",
                                    localField: "sp_thesis_id",
                                    foreignField: "sp_thesis_id",
                                    as: "advisers",
                                },
                            },
                            {
                                $lookup: {
                                    // populate authors field
                                    from: "sp_thesis_authors",
                                    localField: "sp_thesis_id",
                                    foreignField: "sp_thesis_id",
                                    as: "authors",
                                },
                            },
                            {
                                $lookup: {
                                    // populate keywords field
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

                                // reset placeholder array
                                idArr_thesis = [];
                                // jump to search thru Thesis advisers
                                thesisAdviser(mode);
                            }
                        }
                    );
                }
            }
        );
    }
    function thesisAdviser(mode) {
        // get sp matches on thesisAdviserModel based from req.query.search
        thesisAdviserModel.aggregate(
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
                            {
                                $match: {
                                    $and: [
                                        {
                                            // crosscheck id with entry type
                                            sp_thesis_id: { $in: idArr_thesis },
                                        },
                                        {
                                            type: { $in: thesisName },
                                        },
                                    ],
                                },
                            },
                            {
                                $lookup: {
                                    // populate advisers field
                                    from: "sp_thesis_advisers",
                                    localField: "sp_thesis_id",
                                    foreignField: "sp_thesis_id",
                                    as: "advisers",
                                },
                            },
                            {
                                $lookup: {
                                    // populate authors field
                                    from: "sp_thesis_authors",
                                    localField: "sp_thesis_id",
                                    foreignField: "sp_thesis_id",
                                    as: "authors",
                                },
                            },
                            {
                                $lookup: {
                                    // populate keywords field
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

                                // reset placeholder array
                                idArr_thesis = [];
                                // jump to search thru Thesis keywords
                                thesisKeyword(mode);
                            }
                        }
                    );
                }
            }
        );
    }
    function thesisKeyword(mode) {
        // get thesis matches on thesisKeyModel based from req.query.search
        thesisKeyModel.aggregate(
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
                            {
                                $match: {
                                    $and: [
                                        {
                                            // crosscheck id with entry type
                                            sp_thesis_id: { $in: idArr_thesis },
                                        },
                                        {
                                            type: { $in: thesisName },
                                        },
                                    ],
                                },
                            },
                            {
                                $lookup: {
                                    // populate advisers field
                                    from: "sp_thesis_advisers",
                                    localField: "sp_thesis_id",
                                    foreignField: "sp_thesis_id",
                                    as: "advisers",
                                },
                            },
                            {
                                $lookup: {
                                    // populate authors field
                                    from: "sp_thesis_authors",
                                    localField: "sp_thesis_id",
                                    foreignField: "sp_thesis_id",
                                    as: "authors",
                                },
                            },
                            {
                                $lookup: {
                                    // populate keywords field
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

                                // mode 0 is search by Thesis, else it is search by all 3 types
                                if (mode == 0) {
                                    filterEntries();
                                } else {
                                    bookMain(mode);
                                }
                            }
                        }
                    );
                }
            }
        );
    }
    // ------- SEARCH BOOK FUNCTIONS
    function bookMain(mode) {
        // get book matches on bookModel based from req.query.search
        bookModel.aggregate(
            [
                {
                    $match: {
                        $or: [
                            {
                                title: {
                                    $regex: req.query.search,
                                    $options: "i",
                                },
                            },
                            {
                                physicalDesc: {
                                    $regex: req.query.search,
                                    $options: "i",
                                },
                            },
                            {
                                publisher: {
                                    $regex: req.query.search,
                                    $options: "i",
                                },
                            },
                        ],
                    },
                },
                {
                    $lookup: {
                        // populate authors field
                        from: "book_authors",
                        localField: "bookId",
                        foreignField: "bookId",
                        as: "author",
                    },
                },
                {
                    // populate subject field
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

                    // jump to search thru Book authors
                    bookAuthor();
                }
            }
        );
    }
    function bookAuthor() {
        // get book matches on bookAuthorModel based from req.query.search
        bookAuthorModel.aggregate(
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
                                    // populate authors field
                                    from: "book_authors",
                                    localField: "bookId",
                                    foreignField: "bookId",
                                    as: "author",
                                },
                            },
                            {
                                // populate subject field
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

                                // reset placeholder array
                                idArr_book = [];
                                // jump to search thru Thesis keywords
                                bookSubject();
                            }
                        }
                    );
                }
            }
        );
    }
    function bookSubject() {
        // get book matches on bookSubjectModel based from req.query.search
        bookSubjectModel.aggregate(
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
                                    // populate authors field
                                    from: "book_authors",
                                    localField: "bookId",
                                    foreignField: "bookId",
                                    as: "author",
                                },
                            },
                            {
                                $lookup: {
                                    // populate subject field
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

                                // regardless if search by Book or All Fields, this function is at the last part
                                // hence, pass data to filterEntries fxn
                                filterEntries();
                            }
                        }
                    );
                }
            }
        );
    }

    // ---------------------------------------- SUB FUNCTIONS
    if (req.query.type == "any") {
        // spMain() -> spAuthor() -> spAdviser() -> spKeyword() -> ...
        // ...spMain() -> spAuthor() -> spAdviser() -> spKeyword() -> ...
        // ...bookMain() -> bookAuthor() -> bookSubject() -> filterEntries()
        spMain(1);
    } else if (req.query.type == "book") {
        // bookMain() -> bookAuthor() -> bookSubject() -> filterEntries()
        bookMain(0);
    } else if (req.query.type == "sp") {
        // spMain() -> spAuthor() -> spAdviser() -> spKeyword() -> filterEntries()
        spMain(0);
    } else if (req.query.type == "thesis") {
        // spMain() -> spAuthor() -> spAdviser() -> spKeyword() -> filterEntries()
        thesisMain(0);
    }
});

// RESOURCES:
// https://stackoverflow.com/questions/40931821/how-to-combine-two-collection-based-on-idtransectionid-using-node-js
// https://stackoverflow.com/questions/50495674/get-all-elements-with-matching-id-in-array-of-id
// https://stackoverflow.com/questions/15834336/how-to-check-if-a-parameter-is-present-in-the-querystring-in-node-js
// https://stackoverflow.com/questions/53185847/multiple-condition-in-match-use-or-or-and

// https://stackoverflow.com/questions/46122557/how-can-i-make-a-assign-mongoose-result-in-global-variable-in-node-js
// https://stackoverflow.com/questions/30636547/how-to-set-retrieve-callback-in-mongoose-in-a-global-variable/30636635

// update thesis data
// AUTHENTICATION REMOVED

/**************************************************** 
Request Object:
req object: Multipart Form
body: 
{
    old_sp_thesis_id: old_sp_thesis_id,
    sp_thesis_id: sp_thesis_id,
    type: type,
    title: title,
    abstract: abstract,
    year: year,
    authors : [ {fname, lname}, ... ],
    advisers: [ {fname, lname}, ... ],
    keywords : ["keywords1",...]
}
file: pdf
file: jpeg
file: pdf
Response String:
"Entry Updated"
********************************************************/
router.put(
    "/update",
    authAdmin,
    upload.fields([
        { name: "manuscript", maxCount: 1 },
        { name: "poster", maxCount: 1 },
        { name: "journal", maxCount: 1 },
        { name: "source code", maxCount: 1 },
    ]),
    async (req, res) => {
        const {
            old_sp_thesis_id,
            sp_thesis_id,
            type,
            title,
            abstract,
            year,
            authors,
            advisers,
            keywords,
        } = JSON.parse(req.body.body);
        try {
            // looks for the sp/thesis based on the json object passed, then updates it
            await thesisModel.findOne(
                { sp_thesis_id: old_sp_thesis_id },
                (err, updatedThesisSp) => {
                    if (
                        !sp_thesis_id ||
                        !type ||
                        !title ||
                        !abstract ||
                        !year ||
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
                    updatedThesisSp.sp_thesis_id = old_sp_thesis_id;
                    updatedThesisSp.type = type;
                    updatedThesisSp.title = title;
                    updatedThesisSp.abstract = abstract;
                    updatedThesisSp.year = year;

                    console.log(updatedThesisSp);
                    // updates
                    updatedThesisSp.save();
                }
            );

            // deletes author entries with corresponding id, then adds new values
            await thesisAuthorModel.deleteMany({
                sp_thesis_id: old_sp_thesis_id,
            });
            authors.forEach(async function (updatedEntry) {
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

            // deletes adviser entries with corresponding id, then adds new values
            await thesisAdviserModel.deleteMany({
                sp_thesis_id: old_sp_thesis_id,
            });
            advisers.forEach(async function (updatedEntry) {
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

            // deletes keyword entries with corresponding id, then adds new values
            await thesisKeyModel.deleteMany({ sp_thesis_id: old_sp_thesis_id });
            keywords.forEach(async function (updatedEntry) {
                const sp_thesis_keyword = updatedEntry.sp_thesis_keyword;

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
    }
);

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
router.delete("/delete/:sp_thesis_id", authAdmin, async (req, res) => {
    console.log("del");
    const sp_thesis_id_holder = req.params.sp_thesis_id;

    if (!sp_thesis_id_holder) {
        return res.status(404).json({ errorMessage: "Not found." });
    }

    const SPTFile = await thesisModel.findOne({
        sp_thesis_id: sp_thesis_id_holder,
    });
    if (!SPTFile) {
        return res
            .status(404)
            .json({ errorMessage: "Entry to be deleted not found." });
    }

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

    // deletes associated files
    gfs.files.findOne(
        { metadata: [sp_thesis_id_holder, "journal"] },
        (err, updatedSPT) => {
            if (updatedSPT) {
                // .chunks
                mongoose.connection.db
                    .collection("sp_files.chunks")
                    .deleteMany({ files_id: updatedSPT._id });
                // .files
                gfs.files.deleteOne({
                    metadata: [sp_thesis_id_holder, "journal"],
                });
            }
        }
    );

    gfs.files.findOne(
        { metadata: [sp_thesis_id_holder, "poster"] },
        (err, updatedSPT) => {
            if (updatedSPT) {
                // .chunks
                mongoose.connection.db
                    .collection("sp_files.chunks")
                    .deleteMany({ files_id: updatedSPT._id });
                // .files
                gfs.files.deleteOne({
                    metadata: [sp_thesis_id_holder, "poster"],
                });
            }
        }
    );

    gfs.files.findOne(
        { metadata: [sp_thesis_id_holder, "manuscript"] },
        (err, updatedSPT) => {
            if (updatedSPT) {
                // .chunks
                mongoose.connection.db
                    .collection("sp_files.chunks")
                    .deleteMany({ files_id: updatedSPT._id });
                // .files
                gfs.files.deleteOne({
                    metadata: [sp_thesis_id_holder, "manuscript"],
                });
            }
        }
    );

    gfs.files.findOne(
        { metadata: [sp_thesis_id_holder, "source code"] },
        (err, updatedSPT) => {
            if (updatedSPT) {
                // .chunks
                mongoose.connection.db
                    .collection("sp_files.chunks")
                    .deleteMany({ files_id: updatedSPT._id });
                // .files
                gfs.files.deleteOne({
                    metadata: [sp_thesis_id_holder, "source code"],
                });
            }
        }
    );
});

module.exports = router;