var _ = require('underscore')
var instagram = require('instagram-node').instagram()
var settings = require('../settings.json')

var InstagramClient = function() {
  this._client = instagram.use({
    client_id:     settings.instagram.clientId,
    client_secret: settings.instagram.clientSecret
  });
}

var options = {
  timeout: 5 * 1000 // 5 seconds
}
