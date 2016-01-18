var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Preset = new Schema({
  _userId: Schema.Types.ObjectId,
  name: {type: String, required: true},
  blog: {
    name: {type: String, required: true}
  },
  post: {
    type: {type: String, required: true},
    caption: String,
    format: {type: String, default: 'markdown'},
    state: {type: String, required: true},
    tags: {type: [String], default: []}
  },
  instagram: {
    tags: {type: [String], default: []},
    autoLike: Boolean,
    autoFollow: Boolean
  }
});

module.exports = mongoose.model('Preset', Preset);
