const mongoose = require("mongoose");

const bookSubjectSchema = new mongoose.Schema({
    bookId: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
});

const BookSubjectModel = mongoose.model("book_subjects", bookSubjectSchema);

module.exports = BookSubjectModel;