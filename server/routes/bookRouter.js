const router = require("express").Router();
const bookModel = require("../models/booksModel");

router.post("/", async (req,res)=>{
    try{
        const {title, author} = req.body; 

        // sample verification: incomplete fields
        if(!title||!author){
            return res.status(400).json({errorMessage:"Please enter all required fields."});
        };
    
        // save to database
        const newBook = new bookModel ({
            title, author
        });

        const savedBook = await newBook.save();
        
    } catch(err){
        console.log(err);
        res.status(500).send();
    }
});

module.exports = router;