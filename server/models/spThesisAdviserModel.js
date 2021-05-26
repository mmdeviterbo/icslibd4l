const mongoose = require("mongoose");

const thesisAdviserSchema = new mongoose.Schema({
    sp_thesis_id : {type:String, required: true},
    adviser_fname : {type:String, required: true},
    adviser_lname : {type:String, required: true},
    adviser_name: {type:String, required: true}
});

const thesisAdviserModel = mongoose.model("sp_thesis_adviser", thesisAdviserSchema);

module.exports = thesisAdviserModel;
