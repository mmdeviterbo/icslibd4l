const router = require("express").Router();
const UserModel = require("../models/userModel");
const UserLogModel = require("../models/userLogModel");
const authAdmin = require("../middleware/authAdmin");

//for generating reports
const puppeteer = require("puppeteer");
const fs = require("fs-extra");
const hbs = require("handlebars");
const path = require("path");
const pdfMerge = require("pdf-merger-js");
const BookModel = require("../models/bookModel");
const ThesisModel = require("../models/spThesisModel");

//read all admin entries
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
router.delete("/deleteAllUserLogs", async (req, res) => {
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
/**************************************************** 
Req object: 
    query: search (optional)
Res object:
    If search query is not empty: 
        Array of objects with all of the attributes of users.
    If empty:
        Returns all users in the collection.
********************************************************/
router.get("/search", async (req, res) => {
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

//compile function for pdf format
/****************************************************
 parameters: 
    templateName, data 
 output: 
    html in string format
 **************************************************/
const compile = async function (templateName, data) {
    const filePath = path.join(
        process.cwd(),
        `./server/reportTemplate/${templateName}.hbs`
    );
    console.log(data);
    const html = await fs.readFile(filePath, "utf-8");
    return hbs.compile(html)(data);
};
//summary report function
/**************************************************** 
Req object: 
    query: type
    values: [books, spThesis, all]
TODO:
    complete templates in the reportTemplate folder (add placeholders)
    complete the function
GUIDE:
    https://www.youtube.com/watch?v=9VgghGKx_1c
TIP:
    how to generate pdf from multiple html:
    https://stackoverflow.com/questions/48510210/puppeteer-generate-pdf-from-multiple-htmls
********************************************************/
router.get("/report", async (req, res) => {
    //type of report to be generated
    const type = req.query.type;

    console.log(type);
    try {
        //init
        const browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox"],
        });
        const page = await browser.newPage();
        let books, spThesis;
        //books
        if (type === "all" || type === "books") {
            //query for all book information
            //copied from book router search book function
            books = await BookModel.aggregate([
                { $match: {} },
                {
                    $lookup: {
                        from: "book_authors",
                        localField: "bookId",
                        foreignField: "bookId",
                        as: "author",
                    },
                },
                {
                    $lookup: {
                        from: "book_subjects",
                        localField: "bookId",
                        foreignField: "bookId",
                        as: "subject",
                    },
                },
            ]);
        }

        //sp and thesis
        if (type === "all" || type === "spThesis") {
            //query for all sp and thesis information
            //copied from spThesisRouter browse function
            spThesis = await ThesisModel.aggregate([
                {
                    $match: {
                        type: {
                            $in: [
                                "Thesis",
                                "Special Problem",
                                "thesis",
                                "sp",
                                "SP",
                            ],
                        },
                    },
                },
                {
                    $lookup: {
                        from: "sp_thesis_advisers",
                        localField: "sp_thesis_id",
                        foreignField: "sp_thesis_id",
                        as: "adviser",
                    },
                },
                {
                    $lookup: {
                        from: "sp_thesis_authors",
                        localField: "sp_thesis_id",
                        foreignField: "sp_thesis_id",
                        as: "author",
                    },
                },
                {
                    $lookup: {
                        from: "sp_thesis_keywords",
                        localField: "sp_thesis_id",
                        foreignField: "sp_thesis_id",
                        as: "keywords",
                    },
                },
                {
                    $sort: {
                        title: 1,
                        type: 1,
                    },
                },
            ]);
        }

        //users, not a priority
        if (type === "users") {
            const users = await UserModel.find().sort({ userType: 1 });
            console.log(users);
        }

        //user logs, not a priority
        if (type === "userLogs") {
            const userLogs = await UserModel.aggregate([
                { $match: {} },
                {
                    $lookup: {
                        from: "userlogs",
                        localField: "googleId",
                        foreignField: "googleId",
                        as: "logs",
                    },
                    $sort: {},
                },
                {
                    $sort: {
                        userType: -1,
                    },
                },
            ]);
        }

        const bookContent = await compile("book", books);
        const bookPage = await browser.newPage();
        await bookPage.setContent(bookContent);
        await bookPage.pdf({
            path: "./Books.pdf",
            format: "A4",
            printBackground: true,
        });

        const spThesisContent = await compile("spThesis", spThesis);
        const spThesisPage = await browser.newPage();
        await spThesisPage.setContent(spThesisContent);
        await spThesisPage.pdf({
            path: "./spThesis.pdf",
            format: "A4",
            printBackground: true,
        });

        const merger = new pdfMerge();

        merger.add("Books.pdf");
        merger.add("spThesis.pdf");

        await merger.save("Merged.pdf");

        await browser.close();

        res.send(spThesis);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

module.exports = router;
