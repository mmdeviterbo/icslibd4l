const router = require("express").Router();
const bookModel = require("../models/bookModel");
const bookAuthorModel = require("../models/bookAuthorModel");
const bookSubjectModel = require("../models/bookSubjectModel");
const authAdmin = require("../middleware/authAdmin");
const authFaculty = require("../middleware/authFaculty");

router.get("/generate", async (req, res) => {
    console.log("WEll, hello there");
});
module.exports = router;
