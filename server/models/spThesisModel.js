const mongoose = require("mongoose");

const thesisSchema = new mongoose.Schema({
    sp_thesis_id: { type: String, required: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    abstract: { type: String, required: true },
    year: { type: Number, required: true },

    source_code: {type:String},
    manuscript: {type:String},
    journal: {type:String},
    poster: {type:String},
    
    advisers: [], // for populating the collection
    authors: [],
    keywords: [],
});

const thesisModel = mongoose.model("sp_thesis", thesisSchema);

module.exports = thesisModel;
