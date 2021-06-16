const mongoose = require("mongoose");

const userLogSchema = new mongoose.Schema(
    {
        //insert schema from the database team
        googleId: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        userType: {
            type: Number,
            required: true,
        },
        activity: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const UserLog = mongoose.model("userLog", userLogSchema);

module.exports = UserLog;
