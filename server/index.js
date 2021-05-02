//starting file of the backend
const express = require('express');
const config = require("config")
const dotenv = require("dotenv");

const app = express();
const PORT = config.get('port');

dotenv.config();

//implements code in startup/db.js
require('./startup/db')();
require('./startup/routes');
//starts listening in PORT 3001
app.listen(PORT, () => {
    console.log(`Listening to Port ${PORT}`);
});

app.use(express.json());

// set up routes
app.use("/books", require("./routes/bookRouter"))
app.use("/thesis", require("./routes/thesisRouter"))