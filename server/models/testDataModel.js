const mongoose = require('mongoose');

const testDataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
});
//creates testData database
const TestData = mongoose.model("testData", testDataSchema);
module.exports = TestData;