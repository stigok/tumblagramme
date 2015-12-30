var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Preset = new Schema({
  name: {type: String, required: true},
  blogId: {type: Number, required: true},
  instagramAccountId: {type: Number, required: true},
  autoLike: Boolean,
  caption: String,
  instagramTags: [String],
  defaultTags: [String]
});

module.exports = mongoose.model('Preset', Preset);
