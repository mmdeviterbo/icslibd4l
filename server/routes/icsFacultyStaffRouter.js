const router = require("express").Router();
const UserModel = require("../models/userModel");
const authAdmin = require("../middleware/authAdmin");

//read all Faculty (admins only)
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
router.get("/readFaculty", authAdmin, async (req, res) => {
    UserModel.find({ userType: 2 }, (err, result) => {
        //reads all the documents and sends as response
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

//read all Staff (admins only)
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
router.get("/readStaff", authAdmin, async (req, res) => {
    UserModel.find({ userType: 3 }, (err, result) => {
        //reads all the documents and sends as response
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

module.exports = router;
