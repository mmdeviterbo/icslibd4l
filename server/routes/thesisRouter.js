const router = require("express").Router();
const thesisModel = require("../models/thesisModel");

router.post("/", async (req,res)=>{
    try{
        // console.log("went here sa post")
        const {title, author, year} = req.body; 

        // sample verification: incomplete fields
        if(!title||!author||!year){
            return res.status(400).json({errorMessage:"Please enter all required fields."});
        };
    
        // save to database
        const newThesis = new thesisModel ({
            title, author, year
        });

        const savedThesis = await newThesis.save();
        res.json(savedThesis);
    } catch(err){
        console.log(err);
        res.status(500).send();
    }
});

module.exports = router;