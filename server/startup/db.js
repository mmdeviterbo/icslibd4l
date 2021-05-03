//this is where monggodb should be set eg. mongoose.connect()
const mongoose = require('mongoose');
const config = require("config")

//gets database link from config/default.json
const database = config.get('db');

module.exports = () => {
    //connects the database with the proper address
    mongoose.connect(
        database,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        (err) => {
            if (err)
                return console.error(err);
        }
    );

    //checks if database is connected to backend
    mongoose.connection.on('connected', ()=>{
        console.log("Database CONNECTED! ");
    })

}