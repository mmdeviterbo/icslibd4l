const router = require("express").Router();
const bookModel = require("../models/bookModel");


router.get("/get-news", async (req,res)=>{
    console.log("here")
});

router.post("/create", async (req,res)=>{
    try{
        const {title, author, subject, physicalDesc, publisher, numberOfCopies} = req.body; 

        // sample verification: incomplete fields
        if(!title||!author||!subject||!physicalDesc||!publisher||!numberOfCopies){
            return res.status(400).json({errorMessage:"Please enter all required fields."});
        };
    
        // save to database
        const newBook = new bookModel ({
            title, physicalDesc, publisher, numberOfCopies
        });

        const savedBook = await newBook.save();
        res.json(savedBook);
    } catch(err){
        console.log(err);
        res.status(500).send();
    }
});

module.exports = router;