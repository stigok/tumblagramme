require(["tumblr"], function(tumblrClient) {
  var tumblr = new tumblrClient();

  $(document)
    .on("click", "#images img", function(e) {
      // Confirm posting
      if (!confirm("Add to queue?")) return;

      var $el = $(this);

      var username = $el.attr('data-username');
      var nameappend = ((username.slice(-1) == "s") ? "'" : "'s") + " Instagram";
      var caption = '<pre><a href="http://livejiujitsu.tumblr.com/">eat, live, breathe jiu-jitsu</a></pre>' +
                    'via <a href="' + $el.attr('data-link') + '" target="_blank">' + $el.attr('data-username') + nameappend + '</a>';
      var tags = "bjj,brazilian jiu-jitsu,jiu jitsu,roll,bjj lifestyle,martial arts,jits,jitslife,sharejiujitsu";
      var instagramId = $el.attr('data-id');

      // Post image to tumblr
      tumblr.postPhoto($el.attr('data-source'), caption, tags, function(err, data) {
        if (err) {
          console.error("Posting failed with error", err);
          window.alert(JSON.stringify(data, null, 2));
          return;
        }
        return appendStatus('<li>Successfully posted #' + data.id + '</li>');
      })

      // Like media on instagram
      tumblr.likeMedia(instagramId, function(err, data) {
        if (err) return console.error("Didn't manage to like that thing");
        return appendStatus("<3 ! (" + instagramId + ")");
      });
    })

  // Append a new list-item with status text to #post-status list element
  function appendStatus(text) {
    var $item = $('<li />').html(text);
    $("#post-status ul").append($item);
    setTimeout(function() { $item.fadeOut() }, 5000);
  }
})
