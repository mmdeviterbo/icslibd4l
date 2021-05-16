//middleware for user authentication
//npm install body-parser
//npm install bcrypt
//npm install cookie-parser
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');  
const bodyParser = require('body-parser');
const config = require("config");
const cors = require('cors');

const jwtPrivateKey = config.get('jwtPrivateKey');



module.exports = function(app){
    //parser tools 
    app.use(express.json());
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(function (req,res,next){
        res.header('Access-Control-Allow-Origin', '*');
        res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
        res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, X-Requested-With");
        next();
    })
    app.use(cors({origin: 'http://localhost:3000', methods: ['POST', 'GET', 'PUT', 'DELETE'], credentials: true}));
    

    // set up routes
    
    app.use("/books", require("../routes/bookRouter"))
    app.use("/admin", require("../routes/adminRouter"))

    // set up routes: thesis
    app.use("/thesis", require("../routes/spThesisRouter"))
}