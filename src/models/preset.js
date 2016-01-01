var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Preset = new Schema({
  name: {type: String, required: true},
  blogId: {type: Number, required: true},
  caption: String,
  instagramTags: {type: [String], default: [], required: true},
  postTags: {type: [String], default: [], required: true}
});

module.exports = mongoose.model('Preset', Preset);
