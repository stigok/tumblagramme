define(function(require, exports, module) {
  var postTypes = [
    "photo"
  ];

  var postOptions = {
    type : null,
    state : "queue",
    format : "html",
    caption : null,
    source : null,
    tags : null
  };

  // Constructor
  var client = function(debug) {
    //if (typeof debug !== "undefined") this.debug = true;
  };

  // Post photo to tumblr
  client.prototype.postPhoto = function(source, caption, tags, callback) {
    var that = this;
    var postData = $.extend(postOptions, {
      type: postTypes[0],
      source: source,
      caption: caption,
      tags: tags
    });

    $.post('/tumblr/post', postData, function(data) {
      if (data.error) return callback(data.error);
      return callback(null, data);
    }).fail(function(data) {
      return callback(data)
    });
  }

  client.prototype.likeMedia = function(mediaId, callback) {
    $.post('/tumblr/like', { "mediaId" : mediaId }, function(data) {
      if (data.error) return callback(data.error);
      return callback(null, "Liked media successfully #" + mediaId);
    })
  }

  module.exports = client;
});
