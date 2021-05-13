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

router.put("/update-sp-thesis-key", async (req, res) => {
    const {sp_thesis_id, sp_thesis_keyword} = req.body; 
    
    try{
        // looks for the sp/thesis based on the json object passed, then updates it
        await thesisKeyModel.findOne({sp_thesis_id}, (err, updatedThesisSpKey) => {
            updatedThesisSpKey.sp_thesis_id = sp_thesis_id;
            updatedThesisSpKey.sp_thesis_keyword = sp_thesis_keyword;
            
            // updates
            updatedThesisSpKey.save();
            res.send("Entry Updated");
        });
    } catch {
        res.status(500).send;
    }
});

module.exports = router;