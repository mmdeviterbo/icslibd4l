const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    }
});
//creates a database in mongoose using User Model Structure
const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
