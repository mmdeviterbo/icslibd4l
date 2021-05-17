const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    //insert schema from the database team
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
    date: {
      type: String,
      required: false
    }
});

const User = mongoose.model("userLog", userSchema);

module.exports = User;