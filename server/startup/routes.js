//user file from the models directory
const ics = require('../models/adminModel');
const express = require('express');
const app = express();

app.use(express.json());

module.exports = function(app){
    app.use(express.json());

    app.use("/test", require('../routes/testDataRouter'))
    app.use("/authentication", require('../routes/userRouter'));
    
    //set up user activity router       
    app.use("/auth", require('../routes/userActivityRouter'));

    // set up routes
    app.use("/books", require("../routes/bookRouter"))
    app.use("/thesis", require("../routes/thesisRouter"))
    app.use("/admin", require("../routes/adminRouter"))
}