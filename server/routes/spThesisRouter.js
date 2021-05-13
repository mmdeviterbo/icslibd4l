const router = require("express").Router();
const thesisModel = require("../models/spThesisModel");
const authorModel = require("../models/spThesisAuthorModel");
const thesisKeyModel = require("../models/spThesisKeyModel");

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

router.put("/update-sp-thesis", async (req, res) => {
    const {sp_thesis_id, new_sp_thesis_id, type, title, abstract, year, source_code, manuscript, journal, poster} = req.body; 
    
    try{
        // looks for the sp/thesis based on the json object passed, then updates it
        await thesisModel.findOne({sp_thesis_id}, (err, updatedThesisSp) => {
            if(new_sp_thesis_id){ updatedThesisSp.sp_thesis_id = new_sp_thesis_id; }
            if(type){ updatedThesisSp.type = type }
            if(title){ updatedThesisSp.title = title }
            if(abstract){ updatedThesisSp.abstract = abstract }
            if(year){ updatedThesisSp.year = year }
            if(source_code){ updatedThesisSp.source_code = source_code }
            if(manuscript){ updatedThesisSp.manuscript = manuscript }
            if(journal){ updatedThesisSp.journal = journal }
            if(poster){ updatedThesisSp.poster = poster }
            
            // updates
            updatedThesisSp.save();
            res.send("Entry Updated");
        });
    } catch {
        res.status(500).send;
    }
    
});

router.delete('/remove', async (req, res) => {
    const sp_thesis_id_holder = req.body;
    await thesisModel.findOneAndDelete(sp_thesis_id_holder).exec();
    await authorModel.findOneAndDelete(sp_thesis_id_holder).exec();
    await thesisKeyModel.findOneAndDelete(sp_thesis_id_holder).exec();
    res.send("Entry Deleted");
});

module.exports = router;