const router = require("express").Router();
const express = require('express');
const TestDataModel = require("../models/testDataModel");
const authStudent = require("../middleware/authStudent");
const authFaculty = require("../middleware/authFaculty");
const authAdmin = require("../middleware/authAdmin");

//test http requests that go through the middleware function which checks if a user is currently logged on
router.post("/", authFaculty, async (req, res) => {
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

router.get("/", authAdmin, async (req, res) => {
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