const mongoose = require("mongoose");


const AdminSchema = new mongoose.Schema({
    adminName: {
        type: String,
        required: true,
    },
    adminPassword: {
        type: String,
        required: true,
    },
    adminEmail: {
        type: String,
        required: true,
    },
});

const icsAdmin = mongoose.model("icsAdmin", AdminSchema);
module.exports = icsAdmin;


