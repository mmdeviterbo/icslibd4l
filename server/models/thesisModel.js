const mongoose = require("mongoose");

const thesisSchema = new mongoose.Schema({
    title: {type:String, required: true},
    author: {type:String, required: true},
    year: {type:String, required:true}
});

const ThesisModel = mongoose.model("thesis", thesisSchema);

module.exports = ThesisModel;
