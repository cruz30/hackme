import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let accountSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Account', accountSchema);
