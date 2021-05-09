const router = require("express").Router();
const thesisKeyModel = require("../models/spThesisKeyModel");

router.post("/create", async (req,res)=>{
    try{
        const {sp_thesis_id, sp_thesis_keyword} = req.body; 

        // sample verification: incomplete fields
        if(!sp_thesis_id || !sp_thesis_keyword){
            return res.status(400).json({errorMessage:"Please enter all required fields."});
        };
    
        // save to database
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

router.get("/read", async (req, res)=> {
    thesisKeyModel.find({}, (err,result) => {
        if(err){
            res.send(err);
        }
        res.send(result);
    })
});

module.exports = router;