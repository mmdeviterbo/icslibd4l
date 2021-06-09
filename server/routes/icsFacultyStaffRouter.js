const router = require('express').Router();
const UserModel = require("../models/userModel");
const UserLogModel = require("../models/userLogModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { useTheme } = require('@material-ui/core');
const authFaculty = require("../middleware/authFaculty");
const authAdmin = require("../middleware/authAdmin");
const jwtPrivateKey = config.get('jwtPrivateKey');

//read all Faculty (admins only)
router.get("/readFaculty", authAdmin, async (req, res) => {
    UserModel.find({userType: 2}, (err, result) => { //reads all the documents and sends as response
        if (err) {
            res.send(err);
        } else {
        res.send(result);
        }
    });
});

module.exports = router;            