import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let postSchema = new Schema({
  user: String
});

module.exports = mongoose.model('Post', postSchema);
