let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ClientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    contacts: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Client', ClientSchema);