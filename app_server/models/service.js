let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ServiceSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    dostyp: {
        type: Boolean,
        required: false
    }
});

module.exports = mongoose.model('Service', ServiceSchema);