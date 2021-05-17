// ---------------------------------------- IMPORTS
// web
const router = require("express").Router();
const authFaculty = require("../middleware/authFaculty");
// thesis
const thesisModel = require("../models/spThesisModel");
const thesisAdviserModel = require("../models/spThesisAdviserModel");
const thesisAuthorModel = require("../models/spThesisAuthorModel");
const thesisKeyModel = require("../models/spThesisKeyModel");
// book
const bookModel = require("../models/bookModel");
const bookAuthorModel = require("../models/bookAuthorModel");
const bookSubjectModel = require("../models/bookSubjectModel");

// ---------------------------------------- HTTP REQUESTS

// create new sp entry
router.post("/create", authFaculty, async (req,res)=>{
    try{
        const {sp_thesis_id, // common ID
            type, title, abstract, year, source_code, manuscript, journal, poster, // thesisModel
            advisers,   // thesisAdviserModel
            authors,     // thesisAuthorModel
            keywords               // thesisKeyModel
        } = req.body; 

        // sample verification: incomplete fields
        if(!sp_thesis_id || !type || !title || !abstract || !year || !source_code 
            || !manuscript ||  !journal || !poster || !advisers || !authors || !keywords){
            return res.status(400).json({errorMessage:"Please enter all required fields."});
        };
    
        // search if book exists
        const existingThesis = await thesisModel.findOne({sp_thesis_id});
        

        if (!existingThesis){ // if does not exist, proceed in creating entry

            // save thesisModel
            const newThesis = new thesisModel ({
                sp_thesis_id, type, title, abstract, year, source_code, manuscript, journal, poster
            });
            const savedThesis = await newThesis.save();

            // save thesisAdviserModel
            advisers.forEach(async function(entry){
                const adviser_fname = entry.fname;
                const adviser_lname = entry.lname;
                const adviser_name = entry.lname;

                const newThesisAdv = new thesisAdviserModel ({
                    sp_thesis_id, adviser_fname, adviser_lname
                });
                const savedThesisAdv = await newThesisAdv.save();
            });

            // save thesisAuthorModel
            authors.forEach(async function(entry){
                const author_fname = entry.fname;
                const author_lname = entry.lname;
                const author_name = entry.lname;

                const newThesisAu = new thesisAuthorModel ({
                    sp_thesis_id, author_fname, author_lname
                });
                const savedThesisAu = await newThesisAu.save();
            });

            // save thesisKeyModel
            keywords.forEach(async function(entry){
                const sp_thesis_keyword = entry;

                const newThesisKey = new thesisKeyModel ({
                    sp_thesis_id, sp_thesis_keyword
                });
                const savedThesisKey = await newThesisKey.save();
            })


            // recheck if correctly sent by sending entry : thesisModel
            res.json(savedThesis);
        }else{
            res.status(400).send("SP already exists!");
        }

    } catch(err){
        console.log(err);
        res.status(500).send();
    }
});

// browse all entries, default sort: alphabetical by title
router.get("/browse", async (req,res)=> {
    const {type} = req.body;

    if (type == "Book"){
        // type value: SP or Thesis
        bookModel.aggregate(
            [{$match: {"bookId":{"$in":idArr_book} }},
            {$lookup: {from:"book_authors", localField:"bookId", foreignField:"bookId", as:"author"}},
            {$lookup: {from:"book_subjects", localField:"bookId", foreignField:"bookId", as:"subject"}},
            {$sort : {"title": 1}}
            ], 

            (err,result) => {
                if(err){
                    res.send(err);
                }else{
                    res.send(result);
                }
            }
        );
    }else{
        // type value: SP or Thesis
        thesisModel.aggregate(
            [{$match: {"type":type}},
            {$lookup: {from:"sp_thesis_advisers", localField:"sp_thesis_id", foreignField:"sp_thesis_id", as:"adviser"}},
            {$lookup: {from:"sp_thesis_authors", localField:"sp_thesis_id", foreignField:"sp_thesis_id", as:"author"}},
            {$lookup: {from:"sp_thesis_keywords", localField:"sp_thesis_id", foreignField:"sp_thesis_id", as:"keywords"}},
            {$sort : {"title": 1}}
            ], 
            
            (err,result) => {
                if(err){
                    res.send(err);
                }else{
                    res.send(result);
                }
            }
        );
    }
})

// search data
router.get("/search", async (req, res)=> {

    var idArr_book = [];        // array for BookIDs
    var idArr_thesis = [];      // array for ThesisIDs
    var total = [];             // array for resulting entries

    // ---------------------------------------- SUB FUNCTIONS
    function filterEntries(){
        // get unique entries
        let final_arr = [...new Set(total)];
        res.send(final_arr);
    }

    function spTitle(mode){
        // get THESIS entries
        thesisModel.aggregate(
            // get thesis matches based from queries on title
            [{$match: {"title":{$regex:req.query.search, $options:'i'} }},
            {$lookup: {from:"sp_thesis_advisers", localField:"sp_thesis_id", foreignField:"sp_thesis_id", as:"adviser"}},
            {$lookup: {from:"sp_thesis_authors", localField:"sp_thesis_id", foreignField:"sp_thesis_id", as:"author"}},
            {$lookup: {from:"sp_thesis_keywords", localField:"sp_thesis_id", foreignField:"sp_thesis_id", as:"keywords"}}
            ], 
            (err,result) => {
                if(err) { res.send(err)
                }else{
                    // iterate each element and push to total array
                    result.forEach((item)=> {
                        total.push(item);
                    });

                    // jump to BOOK counterpart
                    bookTitle(mode);
                }
            }
        );
    }
    function bookTitle(mode){
        // get BOOK entries
        bookModel.aggregate(
            // get book matches based from queries on title
            [{$match: {"title":{$regex:req.query.search, $options:'i'} }},
            {$lookup: {from:"book_authors", localField:"bookId", foreignField:"bookId", as:"author"}},
            {$lookup: {from:"book_subjects", localField:"bookId", foreignField:"bookId", as:"subject"}}
            ], 
            (error, results) => {
                if(error){ res.send(error);
                }else{
                    // iterate each element and push to total array
                    results.forEach((item)=> {
                        total.push(item);
                    });

                    // mode 0 is search by Title, else it is search by All Fields
                    if(mode == 0){
                        filterEntries();
                    }else{
                        spAuthor(mode);
                    }
                }
            }
        );
    }
    function spAuthor(mode){
        // get THESIS entries
        thesisAuthorModel.aggregate(
            // get thesis matches based from queries on author
            [{$match: {"author_name":{$regex:req.query.search, $options:'i'}} }],
            (err,result) => {
                if(err){ res.send(err);
                }else{
                    // extract all IDs from matches
                    result.forEach((item)=> {
                        idArr_thesis.push(item.sp_thesis_id);
                    });

                    // extract equivalent entries from thesisModel
                    thesisModel.aggregate(
                        [{$match: {"sp_thesis_id":{"$in":idArr_thesis} }},
                        {$lookup: {from:"sp_thesis_advisers", localField:"sp_thesis_id", foreignField:"sp_thesis_id", as:"adviser"}},
                        {$lookup: {from:"sp_thesis_authors", localField:"sp_thesis_id", foreignField:"sp_thesis_id", as:"author"}},
                        {$lookup: {from:"sp_thesis_keywords", localField:"sp_thesis_id", foreignField:"sp_thesis_id", as:"keywords"}}
                        ],
                        (error,results) => {
                            if(error) { res.send(error)
                            }else{
                                // iterate each element and push to total array
                                results.forEach((item)=> {
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
    function bookAuthor(mode){
        // get BOOK entries
        bookAuthorModel.aggregate(
            // get book matches based from queries on author
            [{$match: {"author_name":{$regex:req.query.search, $options:'i'}} }],
            (err,result) => {
                if(err){ res.send(result);
                }else{
                    // extract all IDs from matches
                    result.forEach((item)=> {
                        idArr_book.push(item.bookId);
                    });

                    // extract equivalent entries from bookModel
                    bookModel.aggregate(
                        [{$match: {"bookId":{"$in":idArr_book} }},
                        {$lookup: {from:"book_authors", localField:"bookId", foreignField:"bookId", as:"author"}},
                        {$lookup: {from:"book_subjects", localField:"bookId", foreignField:"bookId", as:"subject"}}
                        ], 
                        (error, results) =>{
                            if(error){ res.send(error)
                            }else{
                                // iterate each element and push to total array
                                results.forEach((item)=> {
                                    total.push(item)
                                });
                                
                                // mode 0 is search by Author, else it is search by All Fields
                                if(mode == 0){
                                    filterEntries();
                                }else{
                                    // empty ID arrays
                                    idArr_book = [];
                                    idArr_thesis = [];

                                    spAdviser(mode);
                                }
                            }
                        }
                    )
                }
            }
        )
    }
    // walang adviser sa books
    function spAdviser(mode){
        thesisAdviserModel.aggregate(
            // get thesis matches based from queries on adviser
            [{$match: {"adviser_name":{$regex:req.query.search, $options:'i'}} }],
            (err,result) => {
                if(err){ res.send(err);
                }else{
                    // extract all IDs from matches
                    result.forEach((item)=> {
                        idArr_thesis.push(item.sp_thesis_id);
                    });

                    // extract equivalent entries from thesisModel
                    thesisModel.aggregate(
                        [{$match: {"sp_thesis_id":{"$in":idArr_thesis} }},
                        {$lookup: {from:"sp_thesis_advisers", localField:"sp_thesis_id", foreignField:"sp_thesis_id", as:"adviser"}},
                        {$lookup: {from:"sp_thesis_authors", localField:"sp_thesis_id", foreignField:"sp_thesis_id", as:"author"}},
                        {$lookup: {from:"sp_thesis_keywords", localField:"sp_thesis_id", foreignField:"sp_thesis_id", as:"keywords"}}
                        ],
                        (error,results) => {
                            if(error) { res.send(error)
                            }else{
                                // iterate each element and push to total array
                                results.forEach((item)=> {
                                    total.push(item);
                                });
                                
                                // mode 0 is search by Adviser, else it is search by All Fields
                                if(mode == 0){
                                    filterEntries();
                                }else{
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
    function spKeyword(){
        // get THESIS entries
        thesisKeyModel.aggregate(
            // get thesis matches based from queries on subject
            [{$match: {"sp_thesis_keyword": {$regex: req.query.search, $options:'i'}} }],
            (err,result) => {
                if(err){ res.send(err);
                }else{
                    // extract all IDs from matches
                    result.forEach((item)=> {
                        idArr_thesis.push(item.sp_thesis_id);
                    });
            
                    // extract equivalent entries from thesisModel
                    thesisModel.aggregate(
                        [{$match: {"sp_thesis_id":{"$in":idArr_thesis} }},
                        {$lookup: {from:"sp_thesis_advisers", localField:"sp_thesis_id", foreignField:"sp_thesis_id", as:"adviser"}},
                        {$lookup: {from:"sp_thesis_authors", localField:"sp_thesis_id", foreignField:"sp_thesis_id", as:"author"}},
                        {$lookup: {from:"sp_thesis_keywords", localField:"sp_thesis_id", foreignField:"sp_thesis_id", as:"keywords"}}
                        ], 
                        
                        (error, results) => {
                            if(error) { res.send(error)
                            }else{
                                // iterate each element and push to total array
                                results.forEach((item)=> {
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
    function bookSubject(){
        // get BOOK entries
        bookSubjectModel.aggregate(
            // get book matches based from queries on subject
            [{$match: {"subject": {$regex: req.query.search, $options:'i'}} }],
            (err,result) => {
                if(err){ res.send(err);
                }else{
                    // extract all IDs from matches
                    result.forEach((item)=> {
                        idArr_book.push(item.bookId);
                    });
            
                    // extract equivalent entries from bookModel
                    bookModel.aggregate(
                        [{$match: {"bookId":{"$in":idArr_book} }},
                        {$lookup: {from:"book_authors", localField:"bookId", foreignField:"bookId", as:"author"}},
                        {$lookup: {from:"book_subjects", localField:"bookId", foreignField:"bookId", as:"subject"}}
                        ],
                        
                        (error, results) => {
                            if(error){ res.send(error)
                            }else{
                                // iterate each element and push to total array
                                results.forEach((item)=> {
                                    total.push(item)
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
    if(req.query.type =="All"){
        // spTitle() -> bookTitle() -> spAuthor() -> bookAuthor() -> ...
        // ...spAdviser() -> spKeyword() -> bookSubject() -> filterEntries()
        spTitle(1);
   
    }else if(req.query.type == "title"){
        // spTitle() -> bookTitle() -> filterEntries()
        spTitle(0);

    }else if(req.query.type == "author"){
        // spAuthor() -> bookAuthor() -> filterEntries()
        spAuthor(0);

    }else if(req.query.type=="adviser"){
        // spAdviser() -> filterEntries()
        spAdviser(0);

    }else if(req.query.type=="subject"){
        // spKeyword() -> bookSubject() -> filterEntries()
        spKeyword();
    }
});

module.exports = router;

// RESOURCES:
// https://stackoverflow.com/questions/40931821/how-to-combine-two-collection-based-on-idtransectionid-using-node-js
// https://stackoverflow.com/questions/50495674/get-all-elements-with-matching-id-in-array-of-id
// https://stackoverflow.com/questions/15834336/how-to-check-if-a-parameter-is-present-in-the-querystring-in-node-js

// https://stackoverflow.com/questions/46122557/how-can-i-make-a-assign-mongoose-result-in-global-variable-in-node-js
// https://stackoverflow.com/questions/30636547/how-to-set-retrieve-callback-in-mongoose-in-a-global-variable/30636635
