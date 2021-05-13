const router = require("express").Router();
const bookModel = require("../models/bookModel");
const bookAuthorModel = require("../models/bookAuthorModel");
const bookSubjectModel = require("../models/bookSubjectModel");
const authFaculty = require("../middleware/authFaculty");


router.get("/get-news", async (req,res)=>{
    console.log("here")
});

router.post("/create", authFaculty, async (req,res)=>{
    try{
        const {bookId, title, authors, subjects, physicalDesc, publisher, numberOfCopies} = req.body; 

        // sample verification: incomplete fields
        if(!bookId||!title||!authors||!subjects||!physicalDesc||!publisher||!numberOfCopies){
            return res.status(400).json({errorMessage:"Please enter all required fields."});
        };

        //search if book exists
        const existingBook = await bookModel.findOne({ bookId });
    
        if(!existingBook){
            const newBook = new bookModel ({
                bookId, title, physicalDesc, publisher, numberOfCopies
            });
            const savedBook = await newBook.save();
            
            authors.forEach(async function(entry) {
                const author = entry;
                const newBookAuthor = new bookAuthorModel ({
                    bookId, author
                });
                const savedBookAuthor = await newBookAuthor.save();
            });

            subjects.forEach(async function(entry) {
                const subject = entry;
                const newBookSubject = new bookSubjectModel ({
                    bookId, subject
                });
                const savedBookSubject = await newBookSubject.save();
            });
            
            res.json(savedBook);
        }
        else{
            res.send("Book already exists!");
        }
        
    } catch(err){
        console.log(err);
        res.status(500).send();
    }
});



module.exports = router;