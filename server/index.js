//starting file of the backend
const express = require('express');
const config = require("config")
const dotenv = require("dotenv");

const app = express();
const PORT = config.get('port');

dotenv.config();

//database USER:
//username: sampleuser
//password: password1234
//implements code in startup/db.js
require('./startup/db')();
require('./startup/routes')(app);

app.use(express.json());

//starts listening in PORT 3001
app.listen(PORT, () => {
    console.log(`Listening to Port ${PORT}`);
});


