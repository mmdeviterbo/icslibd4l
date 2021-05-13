const mongoose = require("mongoose");

const bookAuthorSchema = new mongoose.Schema({
    bookId: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
});

const BookAuthorModel = mongoose.model("book_authors", bookAuthorSchema);

module.exports = BookAuthorModel;