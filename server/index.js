//starting file of the backend
const express = require('express');
const config = require("config")

const app = express();
const PORT = config.get('port');
//database USER:
//username: sampleuser
//password: password1234
//implements code in startup/db.js
require('./startup/db')();
<<<<<<< HEAD
require('./startup/routes');
=======
require('./startup/routes')(app);

>>>>>>> sprint1-custodio
//starts listening in PORT 3001
app.listen(PORT, () => {
    console.log(`Listening to Port ${PORT}`);
});


