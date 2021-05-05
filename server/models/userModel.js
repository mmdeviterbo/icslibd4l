const mongoose = require('mongoose');
    //     googleId: "dsddsads"
    //     email
    //     full name
    //     surname
    //     date
    //    }
const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
});
//creates a database in mongoose using User Model Structure
const UserModel = mongoose.model("alluser", userSchema);

module.exports = UserModel;
