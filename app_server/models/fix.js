let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CarFixSchema = new Schema({
  kind_of_work: {
    type: String,
    required: false
  },
  service: {
    type: String,
    required: false
  },
  engineer: {
    type: String,
    required: false
  },
  customer: {
    type: String,
    required: false
  },
  price: {
    type: Number,
    required: false
  }
});

module.exports = mongoose.model('CarFix', CarFixSchema);
