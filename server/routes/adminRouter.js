const router = require("express").Router();
const UserModel = require("../models/userModel");
const UserLogModel = require("../models/userLogModel");
const authAdmin = require("../middleware/authAdmin");

//read all admin entries
router.get("/readAdmins", authAdmin, async (req, res) => {
    UserModel.find({ userType: 1 }, (err, result) => {
        //reads all the documents and sends as response
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

//read all users
router.get("/readAllUsers", authAdmin, async (req, res) => {
    UserModel.find({}, (err, result) => {
        //reads all the documents and sends as response
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

//read all users
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

//update
router.put("/updateOtherUser", authAdmin, async (req, res) => {
    try {
        const { googleId, userType } = req.body; //get googleId and newNickname from body
        let updatedUser;

        if (userType) {
            //update nickname field
            await UserModel.updateOne(
                { googleId: googleId },
                { userType: userType },
                {
                    new: true,
                }
            );
        }

        UserModel.find({ googleId: googleId }, (err, result) => {
            //send the edited user as response
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

//search function
router.get("/search", authAdmin, async (req, res) => {
    let idList = [];
    let init_output;
    let final_output;

    function saveId(item, index) {
        if (!idList) {
            idList = item._id;
        } else {
            idList = [].concat(idList, item._id);
        }
    }

    if (req.query.search) {
        //seach queries for email, name, and nickname attributes\
        //googleId
        init_output = await UserModel.find({
            googleId: {
                $regex: req.query.search,
                $options: "i",
            },
        });
        //add to final list
        final_output = init_output;
        //add _id to idList
        init_output.forEach(saveId);
        //email
        init_output = await UserModel.find({
            email: {
                $regex: req.query.search,
                $options: "i",
            },
            _id: {
                $nin: idList,
            },
        });
        //add to final list
        final_output = [].concat(final_output, init_output);
        //add _id to idList
        init_output.forEach(saveId);

        //fullName
        init_output = await UserModel.find({
            fullName: {
                $regex: req.query.search,
                $options: "i",
            },

            _id: {
                $nin: idList,
            },
        });
        //add to final list
        final_output = [].concat(final_output, init_output);
        //add _id to idList
        init_output.forEach(saveId);

        //nickName
        init_output = await UserModel.find({
            nickName: {
                $regex: req.query.search,
                $options: "i",
            },

            _id: {
                $nin: idList,
            },
        });
        //add to final list
        final_output = [].concat(final_output, init_output);
        //add _id to idList
        init_output.forEach(saveId);
    } else {
        final_output = await UserModel.find();
    }
    try {
        res.send(final_output);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error Getting query");
    }
});

module.exports = router;
