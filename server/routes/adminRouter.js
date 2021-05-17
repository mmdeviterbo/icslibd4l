const router = require('express').Router();
const UserModel = require("../models/userModel");
const UserLogModel = require("../models/userLogModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { useTheme } = require('@material-ui/core');
const authAdmin = require("../middleware/authAdmin");
const jwtPrivateKey = config.get('jwtPrivateKey');

//read all admin entries
router.get("/readAdmins", authAdmin, async (req, res) => {
    UserModel.find({userType: 1}, (err, result) => { //reads all the documents and sends as response
        if (err) {
            res.send(err);
        } else {
        res.send(result);
        }
    });
});

//read all users
router.get("/readAllUsers", authAdmin, async (req, res) => {
    UserModel.find({}, (err, result) => { //reads all the documents and sends as response
        if (err) {
            res.send(err);
        } else {
        res.send(result);
        }
    });
});


//update
router.put("/updateOtherUser", authAdmin, async (req, res) => {
    try{
        const {googleId, userType} = req.body; //get googleId and newNickname from body
        let updatedUser;
        
        if(userType){ //update nickname field
             await UserModel.updateOne({googleId: googleId}, {userType: userType}, {
                new: true
            });
        }
        
        UserModel.find({googleId: googleId}, (err, result) => { //send the edited user as response
            if (err) {
                res.send(err);
            } else {
            res.send(result);
            }
        });

    }
    catch (err){
        console.error(err)
        res.status(500).send();
    }
});

//search function
router.get("/search", authAdmin, async (req, res) => {
    let query;
    let final_output;
    let attributes = 0;
    
    if (req.query.search){
        //seach quries for all attributes
        while(attributes < 3){
            query = {};
            //fullName
            if (attributes === 0){
                query.fullName = {
                    $regex: req.query.search,
                    $options: 'i'
                }
            }
            //email
            else if (attributes == 1){
                query.email = {
                    $regex: req.query.search,
                    $options: 'i'
                }
            }
            //googleId
            else if(attributes == 2){
                query.googleId = {
                    $regex: req.query.search,
                    $options: 'i'
                }
            }
            //query to database
            let users = await UserModel.find(query);
            //concatenate to final array of objcets
            if (!final_output)
                final_output = users;
            else
            final_output =[].concat(final_output,users);
            attributes = attributes + 1;
        }
       
    }
    else{
        final_output = await UserModel.find();
    }
    try{
        res.send(final_output);
    }
    catch(error){
        console.log(error);
        res.status(500).send("Error Getting query");
    }

});

module.exports = router;            