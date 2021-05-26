const router = require("express").Router();
const UserModel = require("../models/userModel");
const UserLogModel = require("../models/userLogModel");
const config = require("config");
const jwtEncrypt = require("jwt-token-encrypt");

const jwt = require("jsonwebtoken");
const authFaculty = require("../middleware/authFaculty");
const authStudent = require("../middleware/authStudent");

const jwtPrivateKey = config.get("jwtPrivateKey");
const jwtPublicKey = config.get("jwtPublicKey");
//create or login account
router.post("/create", async (req, res) => {
    //get date
    //code snippet was taken from https://usefulangle.com/post/187/nodejs-get-date-time
    let date_ob = new Date();
    let day = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    const date =
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds;

    var loggedUser;
    let userType = 4;
    try {
        const { googleId, email, fullName } = req.body;

        //validation
        if (!googleId || !email || !fullName)
            return res.status(400).json({
                errMessage: "Please enter All required fields. ",
            });

        const existingUser = await UserModel.findOne({ googleId });
        //user exists
        if (existingUser) {
            loggedUser = existingUser;
        } else {
            const nickname = fullName;
            const newUser = new UserModel({
                googleId,
                email,
                fullName,
                userType,
                nickname,
            });

            //save new user entry in mongoDB
            //returns object with entry details
            const savedUser = await newUser.save();
            loggedUser = savedUser;
        }
        //logs user login to collection
        const newUserLog = new UserLogModel({
            googleId: loggedUser.googleId,
            email: loggedUser.email,
            fullName: loggedUser.fullName,
            userType: loggedUser.userType,
            activity: "User login",
            date,
        });
        await newUserLog.save();

        //NEW IMPLEMENTATION
        //TODO: MARTY AYUSIN MO TO
        const publicData = null;
        // Data that will only be available to users who know encryption details.
        const privateData = {
            googleId: loggedUser.googleId,
            email: loggedUser.email,
            fullName: loggedUser.fullName,
            nickname: loggedUser.nickname,
            userType: loggedUser.userType,
        };

        // Encryption settings
        const encryption = {
            key: jwtPrivateKey,
            algorithm: "aes-256-cbc",
        };

        // JWT Settings
        const jwtDetails = {
            secret: jwtPublicKey, // to sign the token
            // Default values that will be automatically applied unless specified.
            // algorithm: 'HS256',
            expiresIn: "24h",
            // notBefore: '0s',
            // Other optional values
        };

        const token = await jwtEncrypt.generateJWT(
            jwtDetails,
            publicData,
            encryption,
            privateData,
            "ICSlibrary"
        );

        res.cookie("token", token, {
            httpOnly: false,
        }).send(token);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

//read all students (Faculty and above only)
router.get("/readStudents", authFaculty, async (req, res) => {
    UserModel.find({ userType: 4 }, (err, result) => {
        //reads all the documents and sends as response
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

//update
router.put("/update", authStudent, async (req, res) => {
    try {
        const { googleId, newNickname } = req.body; //get googleId and newNickname from body

        if (newNickname) {
            //update nickname field
            await UserModel.updateOne(
                { googleId: googleId },
                { nickname: newNickname },
                {
                    new: true,
                }
            );
        }

        UserModel.find({ googleId: googleId }, async (err, result) => {
            //send the edited user as response
            if (err) {
                res.send(err);
            } else {
                //create new cookie for updated token
                const publicData = null;
                // Data that will only be available to users who know encryption details.
                const privateData = await {
                    googleId: result[0].googleId,
                    email: result[0].email,
                    fullName: result[0].fullName,
                    nickname: result[0].nickname,
                    userType: result[0].userType,
                };
                // Encryption settings
                const encryption = {
                    key: jwtPrivateKey,
                    algorithm: "aes-256-cbc",
                };

                // JWT Settings
                const jwtDetails = {
                    secret: jwtPublicKey, // to sign the token
                    // Default values that will be automatically applied unless specified.
                    // algorithm: 'HS256',
                    expiresIn: "24h",
                    // notBefore: '0s',
                    // Other optional values
                };

                const token = await jwtEncrypt.generateJWT(
                    jwtDetails,
                    publicData,
                    encryption,
                    privateData,
                    "ICSlibrary"
                );

                res.cookie("token", token, {
                    httpOnly: false,
                }).send(result);
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

//delete
router.delete("/delete", authStudent, async (req, res) => {
    const googleId = req.body.googleId;
    await UserModel.findOneAndDelete({ googleId });
    res.send("Entry Deleted");
});

//logout current signed in user. deletes cookie for user
router.post("/logout", authStudent, async (req, res) => {
    //get date
    //code snippet was taken from https://usefulangle.com/post/187/nodejs-get-date-time
    let date_ob = new Date();
    let day = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    const date =
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds;

    const googleId = req.body.googleId;
    try {
        const loggedUser = await UserModel.findOne({ googleId });
        //logs user login to collection
        const newUserLog = new UserLogModel({
            googleId: loggedUser.googleId,
            email: loggedUser.email,
            fullName: loggedUser.fullName,
            userType: loggedUser.userType,
            activity: "User logout",
            date,
        });
        await newUserLog.save();

        res.cookie("token", "", {
            httpOnly: false,
            expires: new Date(0),
        }).send("User Logged Out");
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

module.exports = router;
