const router = require("express").Router();
const thesisAdviserModel = require("../models/spThesisAdviserModel");

router.post("/create", async (req,res)=>{
    try{
        const {sp_thesis_id, adviser_fname, adviser_lname} = req.body; 

        // sample verification: incomplete fields
        if(!sp_thesis_id || !adviser_fname || !adviser_lname){
            return res.status(400).json({errorMessage:"Please enter all required fields."});
        };
    
        // save to database
        const newThesisKey = new thesisAdviserModel ({
            sp_thesis_id, adviser_fname, adviser_lname
        });

        const savedThesisKey = await newThesisKey.save();
        res.json(savedThesisKey);
    } catch(err){
        console.log(err);
        res.status(500).send();
    }
});

router.get("/read", async (req, res)=> {
    thesisAdviserModel.find({}, (err,result) => {
        if(err){
            res.send(err);
        }
        res.send(result);
    })
});

module.exports = router;