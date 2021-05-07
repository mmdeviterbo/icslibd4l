//starting file of the backend
const express = require('express');
const config = require("config")
const dotenv = require("dotenv");
const cors = require('cors')

const app = express();
const PORT = config.get('port');

dotenv.config();

//database USER:
//username: sampleuser
//password: password1234
//implements code in startup/db.js
require('./startup/db')();
require('./startup/routes')(app);

app.use(cors())
//starts listening in PORT 3001
app.listen(PORT, () => {
    console.log(`Listening to Port ${PORT}`);
});

app.use(express.json());

// set up routes
app.use("/books", require("./routes/bookRouter"))
app.use("/addThesis", require("./routes/thesisRouter"))
