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


// update thesis data
router.put("/update-sp-thesis", async (req, res) => {
    const {old_sp_thesis_id, sp_thesis_id, type, title, abstract, year, source_code, manuscript, journal, poster, authors, advisers, keywords} = req.body; 
    
    try{
        // looks for the sp/thesis based on the json object passed, then updates it
        await thesisModel.findOne({"sp_thesis_id": old_sp_thesis_id}, (err, updatedThesisSp) => {
            if(!sp_thesis_id || !type || !title || !abstract || !year || !source_code || !manuscript ||  !journal || !poster || !advisers || !authors || !keywords){
                return res.status(400).json({errorMessage: "Please enter all required fields."});
            }

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

            // updates
            updatedThesisSp.save();
        });

        // deletes all authors with corresponding thesis/sp id
        await thesisAuthorModel.deleteMany({"sp_thesis_id":old_sp_thesis_id});
        await thesisAdviserModel.deleteMany({"sp_thesis_id":old_sp_thesis_id});
        await thesisKeyModel.deleteMany({"sp_thesis_id":old_sp_thesis_id});

        // save updated thesisAuthorModel
        authors.forEach(async function(updatedEntry){
            const author_fname = updatedEntry.author_fname;
            const author_lname = updatedEntry.author_lname;

            const newAuthor = new thesisAuthorModel ({
                sp_thesis_id, author_fname, author_lname
            });
            await newAuthor.save();
        });

        // save updated thesisAdviserModel
        advisers.forEach(async function(updatedEntry){
            const adviser_fname = updatedEntry.adviser_fname;
            const adviser_lname = updatedEntry.adviser_lname;

            const newAdviser = new thesisAdviserModel ({
                sp_thesis_id, adviser_fname, adviser_lname
            });
            await newAdviser.save();
        });

        // save updated thesisAdviserModel
        keywords.forEach(async function(updatedEntry){
            const sp_thesis_keyword = updatedEntry.sp_thesis_keyword;
            
            const newKey = new thesisKeyModel ({
                sp_thesis_id, sp_thesis_keyword
            });
            await newKey.save();
        });

        res.send("Entry Updated");

    } catch {
        res.send(500).json({ errorMessage: "Cannot Update."});
    }
});


// delete entire sp/thesis entry
router.delete('/remove-sp-thesis', async (req, res) => {
    const sp_thesis_id_holder = req.body;
    if(!sp_thesis_id_holder){
        return res.status(400).json({errorMessage: "Entry does not exist."});
    }
    try {
        await thesisModel.findOneAndDelete(sp_thesis_id_holder);
        await thesisAuthorModel.deleteMany(sp_thesis_id_holder);
        await thesisKeyModel.deleteMany(sp_thesis_id_holder);
        res.send("Entry Deleted");
    } catch {
        res.send(500).json({ errorMessage: "Cannot Delete."});
    }

});

module.exports = router;