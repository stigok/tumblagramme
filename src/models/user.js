var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

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
  // Don't remove empty row properties
  minimize: true
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
