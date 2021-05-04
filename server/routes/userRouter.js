const router = require('express').Router();
const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config")

const jwtPrivateKey = config.get('jwtPrivateKey');

//npm install bcryptjs
//npm unstall jsonwebtokencx
//register 


router.get("/", async (req, res) => {
    console.log("hello")
    res.send("hello")
});

router.post("/", async (req,res) => {
    console.log(req.body)
    // {
    //     googleId: "dsddsads"
    //     email
    //     full name
    //     surname
    //     date
    //    }
    try{
        const {name, email, password, passwordVerify} = req.body

        //validation
        //all fields have values 
        if (!name || !email || !password || !passwordVerify)
            return res
                    .status(400)
                    .json({
                        errMessage: "Please enter All required fields. "
                    });
        //password is longer than 6 characters 
        if (password.length < 6)
            return res
                    .status(400)
                    .json({
                        errMessage: "Please enter longer password. "
                    });
        //password is same as verification
        if (password !== passwordVerify)
            return res
                    .status(400)
                    .json({
                        errMessage: "Please enter the same password. "
                    });
        
        const existingUser = await UserModel.findOne({ email });
        //if email already in database
        if (existingUser)
            return res
                .status(400)
                .json({
                    errMessage: "Email already exists. "
                });
        
        //encrypt password through hashing
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        
        //display hashed password in console
        console.log(passwordHash);

        //save new user account in database
        const newUser = new UserModel ({
            name, email, passwordHash
        });

        //save new user entry in mongoDB
        //returns object with entry details
        const savedUser = await newUser.save();
        
        //log user in
        const token = jwt.sign({
            user: savedUser._id
        }, jwtPrivateKey
        );  

        res.cookie("token", token, {
            httpOnly: true,
        }).send();
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