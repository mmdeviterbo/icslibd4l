const router = require("express").Router();
const UserModel = require("../models/userModel");
const UserLogModel = require("../models/userLogModel");
const jwtEncrypt = require("jwt-token-encrypt");

const jwt = require("jsonwebtoken");
const authFaculty = require("../middleware/authFaculty");
const authStudent = require("../middleware/authStudent");

const jwtPrivateKey = process.env.jwtPrivateKey;
const jwtPublicKey = process.env.jwtPublicKey;

//create or login account
/**************************************************** 
Request Object:
{
   googleId: googleId,
   email: email,
   fullName: fullName 
}
Response Object:
{
    googleId: googleId,
    email: email,
    fullName: fullName,
    nickname: nickname,
    userType: userType,
}
********************************************************/
router.post("/create", async (req, res) => {
    var loggedUser;
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
                userType: 4,
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
        });
        await newUserLog.save();

        //NEW IMPLEMENTATION=
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

        //cookie set for 1 year until expiration
        return res
            .cookie("token", token, {
                httpOnly: false,
                maxAge: 365 * 24 * 60 * 60 * 1000,
            })
            .status(200)
            .send(token);
    } catch (err) {
        console.error(err);
        return res.status(500).send();
    }
});

//read all students (Faculty and above only)
/**************************************************** 
Request Object:
NULL
Response Object:
{
    googleId: googleId,
    email: email,
    fullName: fullName,
    nickname: nickname,
    userType: userType,
}
********************************************************/
router.get("/readStudents", authFaculty, async (req, res) => {
    await UserModel.find({ userType: 4 }, (err, result) => {
        //reads all the documents and sends as response
        if (err) {
            return res.status(200).send(err);
        } else {
            return res.status(500).send(result);
        }
    });
});

//update
/**************************************************** 
Request Object:
{
    googleId: googleId,
    newNickname: newNickname,
}
Response Object:
{
    googleId: googleId,
    email: email,
    fullName: fullName,
    nickname: nickname,
    userType: userType,
}
********************************************************/
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

        await UserModel.find({ googleId: googleId }, async (err, result) => {
            //send the edited user as response
            if (err) {
                return res.send(err);
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

                return res
                    .cookie("token", token, {
                        httpOnly: false,
                    })
                    .send(result);
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send();
    }
});

//delete
/**************************************************** 
Request Object:
{
    googleId: googleId,
}
Response String: 
"Entry Deleted"
********************************************************/
router.delete("/delete", authStudent, async (req, res) => {
    const googleId = req.body.googleId;
    await UserModel.findOneAndDelete({ googleId });
    return res.status(200).send("Entry Deleted");
});

//logout current signed in user. deletes cookie for user
/**************************************************** 
Request Object:
{
    googleId: googleId,
}
Response String:
"User Logged Out"
********************************************************/
router.post("/logout", authStudent, async (req, res) => {
    try {
        const token = req.cookies.token;
        // Encryption settings
        const encryption = {
            key: jwtPrivateKey,
            algorithm: "aes-256-cbc",
        };

        // decrypt token and verifies jwt payload
        const decrypted = jwtEncrypt.readJWT(token, encryption, "ICSlibrary");
        const loggedUser = decrypted.data;
        //logs user login to collection
        const newUserLog = new UserLogModel({
            googleId: loggedUser.googleId,
            email: loggedUser.email,
            fullName: loggedUser.fullName,
            userType: loggedUser.userType,
            activity: "User logout",
        });
        await newUserLog.save();
        return res
            .cookie("token", "", {
                httpOnly: false,
                expires: new Date(0),
            })
            .send("User Logged Out");
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
});

//find specific person
/**************************************************** 
Request Object:
googleId
Response Object: 
"Specific person"
********************************************************/
router.post("/findperson", authStudent, async (req, res) => {
    try {
        const { googleId } = req.body;

        if (!googleId)
            return res.status(400).json({
                errMessage: "Please enter All required fields. ",
            });
        const existingUser = await UserModel.findOne({ googleId });

        //NEW IMPLEMENTATION=
        const publicData = null;
        // Data that will only be available to users who know encryption details.
        const privateData = {
            googleId: existingUser.googleId,
            email: existingUser.email,
            fullName: existingUser.fullName,
            nickname: existingUser.nickname,
            userType: existingUser.userType,
        };

        // Encryption settings
        const encryption = {
            key: jwtPrivateKey,
            algorithm: "aes-256-cbc",
        };

        // JWT Settings
        const jwtDetails = {
            secret: jwtPublicKey, // to sign the token
            expiresIn: "24h",
        };
        const token = await jwtEncrypt.generateJWT(
            jwtDetails,
            publicData,
            encryption,
            privateData,
            "ICSlibrary"
        );
        return res.status(200).send(token);
    } catch (err) {
        return status(404).json({ errMessage: "Not foundddd" });
    }
});

module.exports = router;
