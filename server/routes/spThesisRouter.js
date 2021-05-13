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

// add keyword entries
router.post("/addkeywords", async (req,res)=>{
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

// get all data under a specific id
router.get("/search", async (req, res)=> {
    const {sp_thesis_id} = req.body; //get googleId and newNickname from body

    // if query is sp
    if(req.query.type == "SP"){
        thesisModel.find({"type":req.query.type}, (err,result) => {
            if (err) {
                res.send(err);
            } else {
            res.send(result);
            }
        })
    }
})

// print all keywords with a given ID
router.get("/keyword", async (req, res)=> {
    const {sp_thesis_id} = req.body; //get googleId and newNickname from body

    thesisKeyModel.find({sp_thesis_id: sp_thesis_id}, (err, result) => { //send the edited user as response
        if (err) {
            res.send(err);
        } else {
        res.send(result);
        }
    });
})

router.get("/view", async (req, res) => {
    try{
       const spThesis = await thesisModel.find();
       const spThesisAuthor = await thesisAuthorModel.find();
       const spThesisAdviser = await thesisAdviserModel.find();
       const spThesisKeywords = await thesisKeyModel.find();

       const spThesisDetails = {
            spThesis,
            spThesisAuthor,
            spThesisAdviser,
            spThesisKeywords
       }
    //    console.log('hello')
    //    console.log(spThesisDetails)
       res.json(spThesisDetails);
    }
    catch (err){
        console.error(err)
        res.status(500).send();
    }
})

module.exports = router;