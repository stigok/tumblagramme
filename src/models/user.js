var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
  tumblr: {
    token: String,
    secret: String,
    activeBlogName: String
  },
  instagram: {
    accessToken: String
  },
  activePresetId: String
}, {
  // Don't remove empty row properties
  minimize: false
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
