//middleware for user authentication
//npm install body-parser
//npm install bcrypt
//npm install cookie-parser
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');  
const bodyParser = require('body-parser')
const config = require("config")

const jwtPrivateKey = config.get('jwtPrivateKey');

const app = express();

module.exports = (app) => {
    //parser tools 
    app.use(express.json());
    app.use(bodyParser.json());
    app.use(cookieParser());

    app.use("/test", require('../routes/testDataRouter'))
    app.use("/authentication", require('../routes/userRouter'));
    
    //set up user activity router       
    app.use("/auth", require('../routes/userActivityRouter'));
}