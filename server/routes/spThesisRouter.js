const router = require("express").Router();
const thesisModel = require("../models/spThesisModel");
const thesisAdviserModel = require("../models/spThesisAdviserModel");
const thesisAuthorModel = require("../models/spThesisAuthorModel");
const thesisKeyModel = require("../models/spThesisKeyModel");


// create new sp entry
router.post("/create", async (req,res)=>{
    try{
        const {sp_thesis_id, // common ID
            type, title, abstract, year, source_code, manuscript, journal, poster, // thesisModel
            adviser_fname, adviser_lname,   // thesisAdviserModel
            author_fname, author_lname,     // thesisAuthorModel
            sp_thesis_keyword               // thesisKeyModel
        } = req.body; 

        // sample verification: incomplete fields
        if(!sp_thesis_id || !type || !title || !abstract || !year || !source_code 
            || !manuscript ||  !journal || !poster || !adviser_fname || !adviser_lname 
            || !author_fname || !author_lname || !sp_thesis_keyword){
            return res.status(400).json({errorMessage:"Please enter all required fields."});
        };
    
        // save thesisModel
        const newThesis = new thesisModel ({
            sp_thesis_id, type, title, abstract, year, source_code, manuscript, journal, poster
        });
        const savedThesis = await newThesis.save();

        // save thesisAdviserModel
        const newThesisAdv = new thesisAdviserModel ({
            sp_thesis_id, adviser_fname, adviser_lname
        });
        const savedThesisAdv = await newThesisAdv.save();

        // save thesisAuthorModel
        const newThesisAu = new thesisAuthorModel ({
            sp_thesis_id, author_fname, author_lname
        });
        const savedThesisAu = await newThesisAu.save();

        // save thesisKeyModel
        const newThesisKey = new thesisKeyModel ({
            sp_thesis_id, sp_thesis_keyword
        });
        const savedThesisKey = await newThesisKey.save();

        // recheck if correctly sent by sending last save : thesisKeyModel
        res.json(savedThesisKey);

    } catch(err){
        console.log(err);
        res.status(500).send();
    }
});

// add additonal author entries
router.post("/addadviser", async (req,res)=>{
    try{
        const {sp_thesis_id, adviser_fname, adviser_lname} = req.body; 

        // sample verification: incomplete fields
        if(!sp_thesis_id || !adviser_fname || !adviser_lname){
            return res.status(400).json({errorMessage:"Please enter all required fields."});
        };
    
        // save thesisKeyModel
        const newThesisAdviser = new thesisAdviserModel ({
            sp_thesis_id, adviser_fname, adviser_lname
        });
        const savedThesisAdviser = await newThesisAdviser.save();
        res.json(savedThesisAdviser);

    } catch(err){
        console.log(err);
        res.status(500).send();
    }
});
// add additonal adviser entries
router.post("/addauthor", async (req,res)=>{
    try{
        const {sp_thesis_id, author_fname, author_lname} = req.body; 

        // sample verification: incomplete fields
        if(!sp_thesis_id || !author_fname || !author_lname){
            return res.status(400).json({errorMessage:"Please enter all required fields."});
        };
    
        // save thesisKeyModel
        const newThesisAuthor = new thesisAuthorModel ({
            sp_thesis_id, author_fname, author_lname
        });
        const savedThesisAuthor = await newThesisAuthor.save();
        res.json(savedThesisAuthor);

    } catch(err){
        console.log(err);
        res.status(500).send();
    }
});
// add additonal keyword entries
router.post("/addkeyword", async (req,res)=>{
    try{
        const {sp_thesis_id, sp_thesis_keyword} = req.body; 

        // sample verification: incomplete fields
        if(!sp_thesis_id || !sp_thesis_keyword){
            return res.status(400).json({errorMessage:"Please enter all required fields."});
        };
    
        // save thesisKeyModel
        const newThesisKey = new thesisKeyModel ({
            sp_thesis_id, sp_thesis_keyword
        });
        const savedThesisKey = await newThesisKey.save();
        res.json(savedThesisKey);

    } catch(err){
        console.log(err);
        res.status(500).send();
    }
});

// search data
router.get("/search", async (req, res)=> {
    let final_array;

    // RESOURCE : SP
    if(req.query.type == "SP"){
        if(req.query.field == "title"){
        // search by TITLE
        // http://localhost:3001/thesis/search?type=SP&field=title&search=red
            thesisModel.aggregate(
                [{$match: {"type":"SP", "title":{$regex:req.query.search} }},
                {$lookup: {from:"sp_thesis_advisers", localField:"sp_thesis_id", foreignField:"sp_thesis_id", as:"adviser"}},
                {$lookup: {from:"sp_thesis_authors", localField:"sp_thesis_id", foreignField:"sp_thesis_id", as:"author"}},
                {$lookup: {from:"sp_thesis_keywords", localField:"sp_thesis_id", foreignField:"sp_thesis_id", as:"keywords"}}
                ], 
                
                (err,result) => {
                    if(err){
                        res.send(err);
                    } else {
                    res.send(result);
                }
            });
        }else if (req.query.field == "year"){
        // search by YEAR
        // http://localhost:3001/thesis/search?type=SP&field=year&search=2020
            thesisModel.aggregate(
                [{$match: {"type":"SP", "year":{$regex:req.query.search} }},
                {$lookup: {from:"sp_thesis_advisers", localField:"sp_thesis_id", foreignField:"sp_thesis_id", as:"adviser"}},
                {$lookup: {from:"sp_thesis_authors", localField:"sp_thesis_id", foreignField:"sp_thesis_id", as:"author"}},
                {$lookup: {from:"sp_thesis_keywords", localField:"sp_thesis_id", foreignField:"sp_thesis_id", as:"keywords"}}
                ], 
                
                (err,result) => {
                    if(err){
                        res.send(err);
                    } else {
                    res.send(result);
                }
            });
        }else if(req.query.field == "author") {
        // search by AUTHOR
        }else{
           
           // search by ADVISER 
        }
    }else{
    // search all fields
    };
});

module.exports = router;