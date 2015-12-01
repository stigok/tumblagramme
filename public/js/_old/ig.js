function handleData(data) {

  $.each(data, function(idx, el) {
    var $holder = $('<div />')
      .css({
        width: size,
        height: size,
        display: 'inline-block',
        position: 'relative'
      })

    $('<img />')
      .attr({
        "data-id" : el.id,
        "data-link" : el.link,
        "data-source" : el.image,
        "data-username" : el.username,
        "data-userid" : el.userid,
        "src" : el.image,
        width: size,
        height: size
      })
      .appendTo($holder);

    $('<a />')
      .attr('href', '/user/' + el.username)
      .attr("title", "View feed for " + el.username)
      .text("View feed for " + el.username)
      .css({
        width: size,
        position: 'absolute',
        top: 0,
        left: 0,
        padding: '.5em',
        backgroundColor: '#fff',
        opacity: 0,
        textAlign: 'center'
      })
      .appendTo($holder);

    $("#images").append($holder);

  });
}
