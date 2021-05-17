const mongoose = require("mongoose");

const thesisKeySchema = new mongoose.Schema({
    sp_thesis_id : {type:String, required: true},
    sp_thesis_keyword : {type:String, required: true}
});

const thesisKeyModel = mongoose.model("sp_thesis_keyword", thesisKeySchema);

module.exports = thesisKeyModel;