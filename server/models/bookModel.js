const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    bookId: {
        type: String,
        required: true
    },
    title: {
        type: String, 
        required: true
    },
    physicalDesc: {
        type: String, 
        required: true
    },
    publisher: {
        type: String, 
        required: true
    },
    numberOfCopies: {
        type: Number, 
        required: true
    },
    // // empty array for population
    author: [],
    subject: []
});

const BookModel = mongoose.model("book", bookSchema);

module.exports = BookModel;
