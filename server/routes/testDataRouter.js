const router = require("express").Router();
const TestDataModel = require("../models/testDataModel");
const auth = require("../middleware/authentication");

//test http requests that go through the middleware function which checks if a user is currently logged on
router.post("/", auth, async (req, res) => {
    try{
        const {name} = req.body;

        const newTestData = new TestDataModel({
            name
        });

        const savedTestData = await newTestData.save();
        res.json(savedTestData);
    }
    catch (err){
        console.error(err)
        res.status(500).send();
    }
})

router.get("/", auth, async (req, res) => {
    try{
       const testDatas = await TestDataModel.find();
       res.json(testDatas);
    }
    catch (err){
        console.error(err)
        res.status(500).send();
    }
})
module.exports = router;