let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let FixSchema = new Schema({
  master: {
    type: String,
    required: false
  },
  service: {
    type: String,
    required: false
  },
  object: {
    type: String,
    required: false
  },
  client: {
    type: String,
    required: false
  },
  dateStart: {
    type: String,
    required: false
  },
  dateCirca: {
    type: String,
    required: false
  },
  dateEnd: {
    type: String,
    required: false
  },
  price: {
    type: Number,
    required: false
  },
  status: {
    type: String,
    required: false
  },
  etc: {
    type: String,
    required: false
  },

});

module.exports = mongoose.model('Fix', FixSchema);
