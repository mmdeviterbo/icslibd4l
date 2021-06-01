//starting file of the backend
const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT_SERVER;

//database USER:
//username: sampleuser
//password: password1234
//implements code in startup/db.js
require("./startup/db")();
require("./startup/routes")(app);

app.use(express.json());

//starts listening in PORT 3001
app.listen(PORT, () => {
    console.log(`Listening to Port ${PORT}`);
});
