const router = require("express").Router();
const thesisModel = require("../models/spThesisModel");
const thesisAdviserModel = require("../models/spThesisAdviserModel");
const thesisAuthorModel = require("../models/spThesisAuthorModel");
const thesisKeyModel = require("../models/spThesisKeyModel");
const authFaculty = require("../middleware/authFaculty");

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

                const newThesisAdv = new thesisAdviserModel ({
                    sp_thesis_id, adviser_fname, adviser_lname
                });
                const savedThesisAdv = await newThesisAdv.save();
            });

            // save thesisAuthorModel
            authors.forEach(async function(entry){
                const author_fname = entry.fname;
                const author_lname = entry.lname;

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
            res.status(400).send("Book already exists!");
        }

    } catch(err){
        console.log(err);
        res.status(500).send();
    }
});

// search data
router.get("/search", async (req, res)=> {
    let final_array = [];

    if(req.query.type == "SP"){
    // RESOURCE : SP
        if(req.query.field == "title"){
        // search by TITLE
            thesisModel.aggregate(
                [{$match: {"type":req.query.type, "title":{$regex:req.query.search} }},
                {$lookup: {from:"sp_thesis_advisers", localField:"sp_thesis_id", foreignField:"sp_thesis_id", as:"adviser"}},
                {$lookup: {from:"sp_thesis_authors", localField:"sp_thesis_id", foreignField:"sp_thesis_id", as:"author"}},
                {$lookup: {from:"sp_thesis_keywords", localField:"sp_thesis_id", foreignField:"sp_thesis_id", as:"keywords"}}
                ], 
                
                (err,result) => {
                    if(err){
                        res.send(err);
                    }else{
                        res.send(result);
                    }
                }
            );
        }else if(req.query.field =="year"){
        // search by YEAR           
            thesisModel.aggregate(
                [{$match: {"type":req.query.type, "year": Number(req.query.search) }},
                {$lookup: {from:"sp_thesis_advisers", localField:"sp_thesis_id", foreignField:"sp_thesis_id", as:"adviser"}},
                {$lookup: {from:"sp_thesis_authors", localField:"sp_thesis_id", foreignField:"sp_thesis_id", as:"author"}},
                {$lookup: {from:"sp_thesis_keywords", localField:"sp_thesis_id", foreignField:"sp_thesis_id", as:"keywords"}}
                ], 
                
                (err,result) => {
                    if(err){
                        res.send(err);
                    }else{
                        res.send(result);
                    }
                }
            );
        }else if(req.query.field =="author"){
        // search by AUTHOR FNAME and LNAME
            thesisAuthorModel.aggregate(
                // get matches based from queries
                [{$match: {"author_fname": {$regex: req.query.fname}, "author_lname": {$regex: req.query.lname} } }],
                (err,result) => {
                    if(err){
                        res.send(err);
                    }else{
                        // extract all IDs from matches
                        result.forEach((item,index)=> {
                            final_array.push(item.sp_thesis_id);
                        });

                        // get unique IDs
                        let unique_ID = [...new Set(final_array)];
                
                        // extract equivalent entries from thesisModel
                        thesisModel.aggregate(
                            [{$match: {"type":req.query.type, "sp_thesis_id":{"$in":unique_ID} }},
                            {$lookup: {from:"sp_thesis_advisers", localField:"sp_thesis_id", foreignField:"sp_thesis_id", as:"adviser"}},
                            {$lookup: {from:"sp_thesis_authors", localField:"sp_thesis_id", foreignField:"sp_thesis_id", as:"author"}},
                            {$lookup: {from:"sp_thesis_keywords", localField:"sp_thesis_id", foreignField:"sp_thesis_id", as:"keywords"}}
                            ],
                            
                            (error, results) => {
                                if(error){
                                    res.send(error);
                                } else {
                                    res.send(results);
                                }
                            }
                        );
                    }
                }
            );
        }else{
        // search ALL FIELDS
        };
    };
});

module.exports = router;

// RESOURCES:
// https://stackoverflow.com/questions/40931821/how-to-combine-two-collection-based-on-idtransectionid-using-node-js
// https://stackoverflow.com/questions/50495674/get-all-elements-with-matching-id-in-array-of-id
// https://stackoverflow.com/questions/15834336/how-to-check-if-a-parameter-is-present-in-the-querystring-in-node-js
