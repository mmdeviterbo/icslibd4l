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
// unique ID generator
const uniqid = require("uniqid");

// ---------------------------------------- HTTP REQUESTS
// create new sp entry
/**************************************************** 
Request Object:
req object: Multipart form
body: {
    REQUIRED:
        type: "Thesis" or "Special Problem"
        title: title,
        abstract abstract,
        year: year,
        manuscript: manuscript,
        journal: journal,
        poster: poster,
        keywords : ["keywords1",...],
        authors : [ {fname, lname}, ... ]
        advisers: [ {fname, lname}, ... ]
    NOT REQUIRED:
        source_code,
        manuscript,
        journal,
        poster,
}

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
router.post("/create", authFaculty, async (req, res) => {
    try {
        const {
            // REQUIRED
            type,
            title,
            abstract,
            year,
            advisers, // thesisAdviserModel
            authors, // thesisAuthorModel
            keywords, // thesisKeyModel

            // NOT REQUIRED
            source_code,
            manuscript,
            journal,
            poster, // thesisModel
        } = req.body;

        // sample verification: incomplete fields
        if (
            !type ||
            !title ||
            !abstract ||
            !year ||
            !advisers ||
            !authors ||
            !keywords
        ) {
            console.log("Error here");
            return res.status(400).json({
                errorMessage: "Please enter all required fields.",
            });
        }

        // search if thesis exists
        const existingThesis = await thesisModel.findOne({
            title: title,
            type: type,
            year: year,
        });

        // if does not exist, proceed in creating entry
        if (!existingThesis) {
            var unique_ID = " ";

            if (type == "Special Problem") {
                var unique_ID = uniqid("SP_"); //generate a unique id for the book
            } else if (type == "Thesis") {
                var unique_ID = uniqid("Thesis_"); //generate a unique id for the book
            }

            // save thesisModel
            const newThesis = new thesisModel({
                sp_thesis_id: unique_ID,
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
                    sp_thesis_id: unique_ID,
                    adviser_fname,
                    adviser_lname,
                    adviser_name,
                });

                const savedThesisAdv = await newThesisAdv.save();
            });

            // save thesisAuthorModel
            authors.forEach(async function (entry) {
                const author_fname = entry.fname;
                const author_lname = entry.lname;
                const author_name = author_fname.concat(" ", author_lname);

                const newThesisAu = new thesisAuthorModel({
                    sp_thesis_id: unique_ID,
                    author_fname,
                    author_lname,
                    author_name,
                });
                const savedThesisAu = await newThesisAu.save();
            });

            // save thesisKeyModel
            keywords.forEach(async function (entry) {
                const sp_thesis_keyword = entry;

                const newThesisKey = new thesisKeyModel({
                    sp_thesis_id: unique_ID,
                    sp_thesis_keyword,
                });

                const savedThesisKey = await newThesisKey.save();
            });

            // recheck if correctly sent by sending entry : thesisModel
            return res.json(savedThesis);
        } else {
            return res.status(400).send({
                existingThesis,
                errorMessage: "It already exists!",
            });
        }
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ errorMessage: "Cannot create resource." });
    }
});

// get the manuscript, journal, or source code of a particular sp/thesis
/**************************************************** 
Request Query:
    title: 
    type: ["manuscript", "journal", "source code", "poster"]

Response:
    * String (link of the entry) 
********************************************************/
router.get("/download", async (req, res) => {
    thesisModel.findOne(
        { title: { $regex: req.query.search, $options: "i" } },
        (err, result) => {
            if (err) {
                res.send(err);
            } else {
                if (req.query.type == "manuscript") {
                    res.send(result.manuscript);
                } else if (req.query.type == "journal") {
                    res.send(result.journal);
                } else if (req.query.type == "source code") {
                    res.send(result.source_code);
                } else if (req.query.type == "poster") {
                    res.send(result.poster);
                }
            }
        }
    );
});

// browse all entries, default sort: alphabetical by title
router.post("/browse", async (req, res) => {
    var spName = ["Special Problem", "sp", "SP"];
    var thesisName = ["Thesis", "thesis"];

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
                        $or: [
                            {
                                type: { $in: spName },
                            },
                            {
                                type: { $in: thesisName },
                            },
                        ],
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
        year,
        source_code,
        manuscript,
        journal,
        poster
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
        bookCoverLink,
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

    var spName = ["Special Problem", "sp", "SP", "SpecialProblem"];
    var thesisName = ["Thesis", "thesis"];

    // ---------------------------------------- SUB FUNCTIONS
    function filterEntries() {
        // get unique entries
        let final_arr = [...new Set(total)];

        // separate books and spthesis
        let book_arr = final_arr.filter((item) => "bookId" in item);
        let spthesis_arr = final_arr.filter((item) => "sp_thesis_id" in item);

        // get unique entries
        function getUniqueListBy(arr, key) {
            return [...new Map(arr.map((item) => [item[key], item])).values()];
        }
        book_arr = getUniqueListBy(book_arr, "bookId");
        spthesis_arr = getUniqueListBy(spthesis_arr, "sp_thesis_id");

        // sort by title
        function compareByTitle(a, b) {
            let titleA = a.title.toLowerCase();
            let titleB = b.title.toLowerCase();
            if (titleA < titleB) {
                return -1;
            }
            if (titleA > titleB) {
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
                if (!item.datePublished){
                    return false;
                }else{
                    return item.datePublished.getFullYear() == yearFilter;
                }
            });
        }

        // Filter by publisher (case insensitive, checks for substring match)
        if ("publisher" in req.query) {
            let publisherFitler = req.query.publisher.toLowerCase();
            book_arr = book_arr.filter((item) => {
                return item.publisher.toLowerCase().includes(publisherFitler);
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
                    return subj.subject.toLowerCase().includes(subjectFilter);
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
            res.send(spthesis_arr.concat(book_arr)); //concat arrays
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

    // ------- SEARCH WITH EMPTY REQ.QUERY.SEARCH
    function noBook(mode) {
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
            ],
            (err, result) => {
                if (err) {
                    res.send(err);
                } else {
                    // iterate each element and push to total array
                    result.forEach((item) => {
                        total.push(item);
                    });

                    // mode 0 is browse by book, else it is browse by all 3 types
                    if (mode == 0) {
                        filterEntries();
                    } else {
                        noSP(mode);
                    }
                }
            }
        );
    }
    function noSP(mode) {
        thesisModel.aggregate(
            [
                { $match: { type: { $in: spName } } },
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
            ],
            (err, result) => {
                if (err) {
                    res.send(err);
                } else {
                    // iterate each element and push to total array
                    result.forEach((item) => {
                        total.push(item);
                    });

                    // mode 0 is browse by SP, else it is browse by all 3 types
                    if (mode == 0) {
                        filterEntries();
                    } else {
                        noThesis();
                    }
                }
            }
        );
    }
    function noThesis() {
        thesisModel.aggregate(
            [
                { $match: { type: { $in: thesisName } } },
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
            ],
            (err, result) => {
                if (err) {
                    res.send(err);
                } else {
                    // iterate each element and push to total array
                    result.forEach((item) => {
                        total.push(item);
                    });

                    // regardless if browse by Thesis or all, it is the last part.
                    // hence continue to filterEntries()
                    filterEntries();
                }
            }
        );
    }

    // ---------------------------------------- MAIN
    if (!req.query.search) {
        // if req.query.search is empty, it will return all values within a type
        if (req.query.type == "any") {
            // noBook() -> noSP() -> noThesis() -> filterEntries()
            noBook(1);
        } else if (req.query.type == "book") {
            // noBook() -> filterEntries()
            noBook(0);
        } else if (spName.includes(req.query.type)) {
            // noSP() -> filterEntries()
            noSP(0);
        } else if (thesisName.includes(req.query.type)) {
            // noThesis() -> filterEntries()
            noThesis();
        }
    } else {
        // else, continue with search
        if (req.query.type == "any") {
            // spMain() -> spAuthor() -> spAdviser() -> spKeyword() -> ...
            // ...spMain() -> spAuthor() -> spAdviser() -> spKeyword() -> ...
            // ...bookMain() -> bookAuthor() -> bookSubject() -> filterEntries()
            spMain(1);
        } else if (req.query.type == "book") {
            // bookMain() -> bookAuthor() -> bookSubject() -> filterEntries()
            bookMain(0);
        } else if (spName.includes(req.query.type)) {
            // spMain() -> spAuthor() -> spAdviser() -> spKeyword() -> filterEntries()
            spMain(0);
        } else if (thesisName.includes(req.query.type)) {
            // spMain() -> spAuthor() -> spAdviser() -> spKeyword() -> filterEntries()
            thesisMain(0);
        }
    }
});

// search data by id
/**************************************************** 
Request Query:
    id :
    type: ["Special Problem", "Book", "Thesis"]
Response:
    * 1 object
********************************************************/
// REFERENCE:
// https://stackoverflow.com/questions/37582331/how-to-return-only-the-first-occurrence-of-an-id-with-mongoose

router.get("/search-id", async (req, res) => {
    var spName = ["Special Problem", "sp", "SP"];
    var thesisName = ["Thesis", "thesis"];
    // ---------------------------------------- SUB FUNCTIONS

    function spMain() {
        thesisModel.aggregate(
            [
                {
                    $match: {
                        sp_thesis_id: req.query.id,
                        type: { $in: spName },
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
                { $limit: 1 },
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

    function thesisMain() {
        thesisModel.aggregate(
            [
                {
                    $match: {
                        sp_thesis_id: req.query.id,
                        type: { $in: thesisName },
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
                { $limit: 1 },
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

    function bookMain() {
        // get book matches on bookModel based from req.query.id
        bookModel.aggregate(
            [
                { $match: { bookId: req.query.id } },
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
                { $limit: 1 },
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

    // ---------------------------------------- MAIN

    if (req.query.type == "Special Problem") {
        spMain();
    } else if (req.query.type == "Book") {
        bookMain();
    } else if (req.query.type == "Thesis") {
        thesisMain();
    }
});

// RESOURCES:
// https://stackoverflow.com/questions/40931821/how-to-combine-two-collection-based-on-idtransectionid-using-node-js
// https://stackoverflow.com/questions/50495674/get-all-elements-with-matching-id-in-array-of-id
// https://stackoverflow.com/questions/15834336/how-to-check-if-a-parameter-is-present-in-the-querystring-in-node-js
// https://stackoverflow.com/questions/53185847/multiple-condition-in-match-use-or-or-and

// https://stackoverflow.com/questions/46122557/how-can-i-make-a-assign-mongoose-result-in-global-variable-in-node-js
// https://stackoverflow.com/questions/30636547/how-to-set-retrieve-callback-in-mongoose-in-a-global-variable/30636635

// get spt entry based on parameter
/********************************************************
Request Object:
req object: address parameter
{
    sp_thesis_id
}
Response String:
Array containing SP / Thesis object, Authors, Advisers, Keywords
[
    {
        sp_thesis_id: sp_thesis_id,
        type: type,
        title: title,
        abstract: abstract,
        year: year,
        source_code: source_code,
        manuscript: manuscript,
        poster: poster,
        journal: journal,
    },
    [
        NOTE: can be multiple
        {
            sp_thesis_id: sp_thesis_id,
            author_fname: author_fname,
            author_lname: author_lname,
            author_name: author_name
        } 
    ],
    [
        NOTE: can be multiple
        {
            sp_thesis_id: sp_thesis_id,
            adviser_fname: adviser_fname,
            adviser_lname: adviser_lname,
            adviser_name: adviser_name
        } 
    ],
    [
        NOTE: can be multiple
        {
            sp_thesis_id: sp_thesis_id,
            sp_thesis_keyword: sp_thesis_keyword
        } 
    ]
]
********************************************************/
router.get("/search-spthesis/:sp_thesis_id", async (req, res) => {
    var returnObject = [];
    const sp_thesis_id = req.params.sp_thesis_id;

    try {
        const SPTEntry = await thesisModel.findOne({ sp_thesis_id });
        const SPTAuthors = await thesisAuthorModel.find({ sp_thesis_id });
        const SPTAdvisers = await thesisAdviserModel.find({ sp_thesis_id });
        const SPTKeywords = await thesisKeyModel.find({ sp_thesis_id });
        if (!SPTEntry) {
            return res.status(404).json({ errorMessage: "Entry not found." });
        }
        returnObject.push(SPTEntry);
        returnObject.push(SPTAuthors);
        returnObject.push(SPTAdvisers);
        returnObject.push(SPTKeywords);
        res.send(returnObject);
    } catch {
        return res.status(404).json({ errorMessage: "Not found." });
    }
});

// update thesis data
// AUTHENTICATION REMOVED

/**************************************************** 
Request Object:
req object: JSON Object
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
    poster: poster,
    journal: journal,
    authors : [ {fname, lname}, ... ],
    advisers: [ {fname, lname}, ... ],
    keywords : ["keywords1",...]
}

Response String:
"Entry Updated"
********************************************************/
router.put("/update", authAdmin, async (req, res) => {
    const {
        old_sp_thesis_id,
        sp_thesis_id,
        type,
        title,
        abstract,
        year,
        source_code,
        manuscript,
        poster,
        journal,
        authors,
        advisers,
        keywords,
    } = req.body;
    try {
        // looks for the sp/thesis based on the json object passed, then updates it
        await thesisModel.findOne(
            { sp_thesis_id: old_sp_thesis_id },
            (err, updatedThesisSp) => {
                if (
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
                updatedThesisSp.type = type;
                updatedThesisSp.title = title;
                updatedThesisSp.abstract = abstract;
                updatedThesisSp.year = year;
                updatedThesisSp.source_code = source_code;
                updatedThesisSp.manuscript = manuscript;
                updatedThesisSp.poster = poster;
                updatedThesisSp.journal = journal;
                // updates
                updatedThesisSp.save();
            }
        );

        // deletes author entries with corresponding id, then adds new values
        await thesisAuthorModel.deleteMany({
            sp_thesis_id: old_sp_thesis_id,
        });

        authors.forEach(async function (updatedEntry) {
            const author_fname = updatedEntry.author_fname;
            const author_lname = updatedEntry.author_lname;
            const author_name = author_fname.concat(" ", author_lname);

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
            const adviser_fname = updatedEntry.adviser_fname;
            const adviser_lname = updatedEntry.adviser_lname;
            const adviser_name = adviser_fname.concat(" ", adviser_lname);

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
            const sp_thesis_keyword = updatedEntry;

            const newKey = new thesisKeyModel({
                sp_thesis_id,
                sp_thesis_keyword,
            });
            await newKey.save();
        });

        return res.send("Entry Updated");
    } catch {
        return res.send(500).json({ errorMessage: "Cannot Update." });
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
router.delete("/delete/:sp_thesis_id", authAdmin, async (req, res) => {
    const sp_thesis_id_holder = req.params.sp_thesis_id;

    if (!sp_thesis_id_holder) {
        return res.status(404).json({ errorMessage: "Not found." });
    }

    const SPTEntry = await thesisModel.findOne({
        sp_thesis_id: sp_thesis_id_holder,
    });
    if (!SPTEntry) {
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
        res.status(404).json({ errorMessage: "Cannot Delete." });
    }
});

module.exports = router;
