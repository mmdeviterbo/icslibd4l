const router = require('express').Router();
const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config")

const jwtPrivateKey = config.get('jwtPrivateKey');

//register
router.post("/", async (req,res) => {

    try{
        const { googleId, email, firstName, lastName, date} = req.body
        // var date_now, model_data;

        // //inserts current date
        // if (!date){
        //     // current timestamp in milliseconds
        //     let ts = Date.now();

        //     let date_ob = new Date(ts);
        //     let day = date_ob.getDate();
        //     let month = date_ob.getMonth() + 1;
        //     let year = date_ob.getFullYear();

        //     date_now = year + "-" + month + "-" + day;
        // }

        console.log(req.body)
        //validation
        if (!googleId || !email || !firstName || !lastName)
            return res
                    .status(400)
                    .json({
                        errMessage: "Please enter All required fields. "
                    });

        const newUser = new UserModel ({
            googleId, email, lastName, firstName, date
        });

        //save new user entry in mongoDB
        //returns object with entry details
        const savedUser = await newUser.save();
        loggedUser = savedUser;
        //   
        //log user in
        const token = jwt.sign({
            user: loggedUser._id
        }, jwtPrivateKey
        );  

        res.cookie("token", token, {
            httpOnly: true,
        }).send("User logged. logging you in.");
    }
    catch (err){
        console.error(err)
        res.status(500).send();
    }
});



//log in
router.post("/login", async (req, res) => {
    try{
        const {email, password} = req.body;

        //validation
        //all fields have values 
        if (!email || !password)
            return res
                    .status(400)
                    .json({
                        errMessage: "Please enter All required fields. "
                    });
        
        const existingUser = await UserModel.findOne({ email });
        if (!existingUser)
            return res
                    .status(401)
                    .json({
                        errMessage: "Wrong Email or Password. "
                    });
        
        //check if password is correct
        const passwordCorrect = bcrypt.compare(password, existingUser.passwordHash)
        if (!passwordCorrect)
        return res
                .status(401)
                .json({
                    errMessage: "Wrong Email or Password. "
                });
        
        //log user in
        const token = jwt.sign({
            user: existingUser._id
        }, jwtPrivateKey
        );

        res.cookie("token", token, {
            httpOnly: true,
        }).send();

    }
    catch(err){
        console.error(err)
        res.status(500).send();
    }
})

//logout current signed in user. deletes cookie for user
router.get("/logout", (req,res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
    }).send();
})
module.exports = router;        