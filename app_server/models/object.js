let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ObjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date_start: {
        type: Date,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    project: {
        type: String,
        required: true
    },
    calle: {
        type: String,
        required: true
    },
    etc: {
        type: String,
        required: false
    },
});

module.exports = mongoose.model('Object', ObjectSchema);