const router = require("express").Router();
const UserLogModel = require("../models/userLogModel");
const authAdmin = require("../middleware/authAdmin");

//read all user logs
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
    activity: activity,
    createdAt: date
    updatedAt: date
}
********************************************************/
router.get("/readUserLogs", authAdmin, async (req, res) => {
    UserLogModel.find({}, (err, result) => {
        //reads all the documents and sends as response
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

//delete all User Logs
/**************************************************** 
Request Object:
NULL
Response String: 
"All Entries Deleted"
********************************************************/
router.delete("/deleteAllUserLogs", authAdmin, async (req, res) => {
    try {
        UserLogModel.deleteMany({}, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send("All Entries Deleted");
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

module.exports = router;
