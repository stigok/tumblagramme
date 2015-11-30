$(function() {

  $(document).on('click', '#images img', function(e) {

    // Confirm post
    if (!confirm('Add to queue?')) {
      return;
    }

    var $el = $(this);

    var username = $el.attr('data-username');
    var nameappend = ((username.slice(-1) == "s") ? "'" : "'s") + " Instagram";
    var caption = '<pre><a href="http://livejiujitsu.tumblr.com/">eat, live, breathe jiu-jitsu</a></pre> ' +
                  'via <a href="' + $el.attr('data-link') + '" target="_blank">' + $el.attr('data-username') + nameappend + '</a>';

    var post = {
      type: "photo",
      state: "queue",
      tags: "bjj,brazilian jiu-jitsu,jiu jitsu,roll,bjj lifestyle,martial arts,jits,jitslife,sharejiujitsu",
      format: "html",
      caption: caption,
      source: $el.attr('data-source')
      // link: $el.attr('data-link')
    };

    $.post('/tumblr/post', post, function(data, status) {
      if (data.error) {
        window.alert(data.error);
        console.error(data);
      } else {
        console.log("Content posted successfully with following return values:");
        console.log(data);
        console.log(status);
      }
    });

  });

});
