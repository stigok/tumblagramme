var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Preset = new Schema({
  _userId: Schema.Types.ObjectId,
  name: {type: String, required: true},
  blogName: {type: String, required: true},
  caption: String,
  instagramTags: {type: [String], default: [], required: true},
  postTags: {type: [String], default: [], required: true}
});

module.exports = mongoose.model('Preset', Preset);
