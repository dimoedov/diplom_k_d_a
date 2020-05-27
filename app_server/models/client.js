let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ClientSchema = new Schema({
    name: {
        type: String,
        required: false,
        unique: true,
    },
    type: {
        type: String,
        required: false
    },
    contacts: {
        type: String,
        required: false
    },
    current_master_id: {
        type: String,
        required: false
    },
});

module.exports = mongoose.model('Client', ClientSchema);