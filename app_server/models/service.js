let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ServiceSchema = new Schema({
    name: {
        type: String,
        required: false,
        unique: true,
    },
    price: {
        type: Number,
        required: false
    },
    dostyp: {
        type: Boolean,
        required: false
    },
    current_master_id: {
        type: String,
        required: false
    },
});

module.exports = mongoose.model('Service', ServiceSchema);