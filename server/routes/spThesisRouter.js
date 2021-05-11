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
        res.json(savedThesis);

        // save thesisAdviserModel
        const newThesisAdv = new thesisAdviserModel ({
            sp_thesis_id, adviser_fname, adviser_lname
        });
        const savedThesisAdv = await newThesisAdv.save();
        res.json(savedThesisAdv);

        // save thesisAuthorModel
        const newThesisAu = new thesisAuthorModel ({
            sp_thesis_id, author_fname, author_lname
        });
        const savedThesisAu = await newThesisAu.save();
        res.json(savedThesisAu);

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
router.get("/findId", async (req, res)=> {
    const {sp_thesis_id} = req.body; //get googleId and newNickname from body

    thesisKeyModel.find({googleId: googleId}, (err, result) => { //send the edited user as response
        if (err) {
            res.send(err);
        } else {
        res.send(result);
        }
    });
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

//  print all authors
router.get("/authors", async (req, res)=> {
    thesisAuthorModel.find({}, (err,result) => {
        if(err){
            res.send(err);
        }
        res.send(result);
    })
});

module.exports = router;