const router = require('express').Router();
const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config")

const jwtPrivateKey = config.get('jwtPrivateKey');

//register
router.post("/create", async (req,res) => {

    try{
        const { googleId, email, fullName} = req.body
    
        //validation
        if (!googleId || !email || !fullName)
            return res
                    .status(400)
                    .json({
                        errMessage: "Please enter All required fields. "
                    });

        const existingUser = await UserModel.findOne({ googleId });
        var loggedUser;
        
        //user exists
        if (existingUser){
            loggedUser = existingUser;
        }
        else{   
            const userType = 4
            const newUser = new UserModel ({
                googleId, email, fullName, userType
            });
    
            //save new user entry in mongoDB
            //returns object with entry details
            const savedUser = await newUser.save();
            loggedUser = savedUser;
        }
        
        //log user in
        const token = jwt.sign({
            email: loggedUser.email,
            fullName: loggedUser.fullName,
            userType: loggedUser.userType
        }, jwtPrivateKey
        );  

        res.cookie("token", token, {
            httpOnly: true,
        }).send(loggedUser);
    }
    catch (err){
        console.error(err)
        res.status(500).send();
    }
});

//delete
router.delete("/delete", async (req, res) => {
    const googleId = req.body.googleId;
    await UserModel.findOneAndDelete({ googleId })
    res.send("Entry Deleted")
});

//logout current signed in user. deletes cookie for user
router.get("/logout", (req,res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
    }).send();
})


//TODO
// async function mail()
module.exports = router;        