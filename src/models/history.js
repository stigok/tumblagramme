var mongoose = require('mongoose');

var Model = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  blogName: String,
  instagramMediaId: String,
  tumblrMediaId: String,
  createdDate: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('History', Model);
