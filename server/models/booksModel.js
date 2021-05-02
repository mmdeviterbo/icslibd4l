const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {type:String, required: true},
    author: {type:String, required: true},
    edition: {type:Number, required:true}
});

const BookModel = mongoose.model("book", bookSchema);

module.exports = BookModel;
