const router = require("express").Router();
const thesisAuthorModel = require("../models/spThesisAuthorModel");

router.post("/create", async (req,res)=>{
    try{
        const {sp_thesis_id, author_fname, author_lname} = req.body; 

        // sample verification: incomplete fields
        if(!sp_thesis_id || !author_fname || !author_lname){
            return res.status(400).json({errorMessage:"Please enter all required fields."});
        };
    
        // save to database
        const newThesisKey = new thesisAuthorModel ({
            sp_thesis_id, author_fname, author_lname
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

router.put("/update-sp-thesis-author", async (req, res) => {
    const {sp_thesis_id, author_fname, author_lname} = req.body; 
    
    try{
        // looks for the sp/thesis based on the json object passed, then updates it
        await thesisAuthorModel.findOne({sp_thesis_id}, (err, updatedThesisSpAuthor) => {
            if(sp_thesis_id){ updatedThesisSpAuthor.sp_thesis_id = sp_thesis_id }
            if(author_fname){ updatedThesisSpAuthor.author_fname = author_fname }
            if(author_lname){ updatedThesisSpAuthor.author_lname = author_lname }
            
            // updates
            updatedThesisSpAuthor.save();
            res.send("Entry Updated");
        });
    } catch {
        res.status(500).send;
    }
});

module.exports = router;