let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ObjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date_start: {
        type: String,
        required: false
    },
    company: {
        type: String,
        required: true
    },
    project: {
        type: String,
        required: false
    },
    calls_obj: {
        type: String,
        required: true
    },
    etc: {
        type: String,
        required: false
    },
});

module.exports = mongoose.model('Object', ObjectSchema);