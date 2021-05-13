const mongoose = require("mongoose");


const icsUserSchema = new mongoose.Schema({
    upMail: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userType: { type: Number, required: true },
});

const icsUser = mongoose.model("icsadmin", icsUserSchema);
module.exports = icsUser;


