const router = require("express").Router();
const thesisModel = require("../models/spThesisModel");

router.post("/create", async (req,res)=>{
    try{
        const {sp_thesis_id, type, title, abstract, year, source_code, manuscript, journal, poster} = req.body; 

        // sample verification: incomplete fields
        if(!sp_thesis_id || !type || !title || !abstract || !year || !source_code 
            || !manuscript ||  !journal || !poster){
                return res.status(400).json({errorMessage:"Please enter all required fields."});
            };
            
        // save to database
        const newThesis = new thesisModel ({
            sp_thesis_id, type, title, abstract, year, source_code, manuscript, journal, poster
        });


        const savedThesis = await newThesis.save();
        res.json(savedThesis);
    } catch(err){
        console.log(err);
        res.status(500).send();
    }
});

router.get("/read", async (req, res)=> {
    thesisModel.find({}, (err,result) => {
        if(err){
            res.send(err);
        }
        res.send(result);
    })
});

module.exports = router;