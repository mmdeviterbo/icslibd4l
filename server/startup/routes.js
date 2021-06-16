//middleware for user authentication
//npm install body-parser
//npm install bcrypt
//npm install cookie-parser
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const methodOverride = require("method-override");
var path = require("path");

module.exports = function (app) {
    //parser tools

    // ===For file upload===
    // app.use(express.json({limit: '50mb'}));
    // app.use(express.urlencoded({limit: '50mb'}));
    // =======================
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    // app.use(express.json());
    // app.use(
    //     express.urlencoded({
    //         extended: true,
    //     })
    // );
    app.use(cookieParser());
    app.use(methodOverride("_method"));
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Methods",
            "GET, POST, OPTIONS, PUT, DELETE"
        );
        res.header(
            "Access-Control-Allow-Headers",
            "Content-Type, Access-Control-Allow-Headers, X-Requested-With"
        );
        next();
    });
    app.use(
        cors({
            allowedHeaders: ["sessionId", "Content-Type"],
            exposedHeaders: ["sessionId"],
            origin: "http://localhost:3000",
            methods: ["POST", "GET", "PUT", "DELETE"],
            credentials: true,
        })
    );
    app.engine("jsx", require("express-react-views").createEngine());
    app.set("view engine", "jsx");
    app.set("views", path.join(__dirname, "../../src/components/homepage/"));

    // set up routes
    app.use("/admin", require("../routes/adminRouter"));
    app.use("/facultystaff", require("../routes/icsFacultyStaffRouter"));
    app.use("/users", require("../routes/userRouter"));
    app.use("/userlogs", require("../routes/userLogRouter"));
    app.use("/books", require("../routes/bookRouter"));
    app.use("/thesis", require("../routes/spThesisRouter"));
    app.use("/reports", require("../routes/reportRouter"));
};
