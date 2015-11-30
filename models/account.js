var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username: String,
    accounts: { type: Object, default: {} },
    activeAccountIndex: { type: Number, default: 0 },
    meta: {
      instagramPostIdsPosted: { type: Number, default: 0 }
    },
    createdDate: { type: Date, default: Date.now }
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
