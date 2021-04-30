//starting file of the backend
const express = require('express');
const config = require("config")

const app = express();
const PORT = config.get('port');

//implements code in startup/db.js
require('./startup/db')();

//starts listening in PORT 3001
app.listen(PORT, () => {
    console.log(`Listening to Port ${PORT}`);
});

