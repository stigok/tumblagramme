var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  tumblr: {
    token: String,
    secret: String,
    profile: Schema.Types.Mixed
  },
  instagram: {
    accessToken: String,
    refreshToken: String,
    profile: Schema.Types.Mixed
  }
}, {
  // Remove empty/undefined properties from returned objects
  minimize: true
});

module.exports = mongoose.model('User', User);
