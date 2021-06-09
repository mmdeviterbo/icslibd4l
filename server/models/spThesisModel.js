const mongoose = require("mongoose");

const thesisSchema = new mongoose.Schema({
    sp_thesis_id: { type: String, required: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    abstract: { type: String, required: true },
    year: { type: Number, required: true },
<<<<<<< HEAD

    source_code: {type:String},
    manuscript: {type:String},
    journal: {type:String},
    poster: {type:String},
    
=======
    source_code: {type:String, required: true},
    manuscript: {type:String, required: true},
    journal: {type:String, required: true},
    poster: {type:String, required: true},
>>>>>>> sprint5-resoles
    advisers: [], // for populating the collection
    authors: [],
    keywords: [],
});

const thesisModel = mongoose.model("sp_thesis", thesisSchema);

module.exports = thesisModel;