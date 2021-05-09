const router = require("express").Router();
const thesisAuthorModel = require("../models/spThesisAuthorModel");

router.post("/create", async (req,res)=>{
    try{
        const {book_id, author_fname, author_lname} = req.body; 

        // sample verification: incomplete fields
        if(!book_id || !author_fname || !author_lname){
            return res.status(400).json({errorMessage:"Please enter all required fields."});
        };
    
        // save to database
        const newThesisKey = new thesisAuthorModel ({
            book_id, author_fname, author_lname
        });

        const savedThesisKey = await newThesisKey.save();
        res.json(savedThesisKey);
    } catch(err){
        console.log(err);
        res.status(500).send();
    }
});

router.get("/read", async (req, res)=> {
    thesisAuthorModel.find({}, (err,result) => {
        if(err){
            res.send(err);
        }
        res.send(result);
    })
});

module.exports = router;