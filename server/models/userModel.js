const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    userType: {
        type: Number,
        required: true
    },
    nickname: {
        type: String,
        required: true
    }
});
//creates a database in mongoose using User Model Structure
const UserModel = mongoose.model("alluser", userSchema);

module.exports = UserModel;
