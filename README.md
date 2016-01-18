### Installation

You need to install MongoDB locally before starting the app.

    # Install all NPM Package dependencies
    $ npm i
    $ npm start

### Settings

Settings are all around the code at the moment, so look around!

### Todo

- [ ] Search for TODO tokens in project
- [ ] Handle all api route errors on its own for easier debugging. Don't want to return html errors to JSON parsers.
- [ ] Save id's of things shared to tumblr so that it can be reposted on a later date
- [ ] Enable SSL and make cookie secure
- [ ] Make angular handle 404's
- [ ] Make angular template use layout as well with block name append/perpend
- [ ] Navigation.jade with jade mixins
- [ ] Serialize user to id, instead of name, or hash of id
- [ ] Favicon should not be hindered by http 401
- [ ] Create list of templates only once on application start instead of page load as now
- [ ] Directives should clean up after themselves $on('$destroy')
- [ ] Make login modal as an account modal with different views based on auth status
- [ ] Cleanup session data on oauth authentication
- [ ] Make ucfirst filter (if you need it)
- [ ] Save media id of queued media to prevent user from queuing same media twice or more
  - [ ] "Add to queue" button should change to "Remove from queue" when already queued
- [ ] Create a mongoose model for tumblr assets just for simple validation's sake
- [ ] Add image credits to all posts ("via"-credits)
- [ ] Divide the app web server, API & db server, and queing bot on dedicated RasPi's
- [ ] Handle empty collections and objects from API calls
- [ ] Make component of error divs in forms to avoid repeating object property paths
- [ ] Make mongoose documument property defaults be populated to object on call to `new Model()` so it's easier to use with Angular when creating new instances.

### Thoughts

  - This app is a unified blogging tool for Tumblr
    - Reblog pictures and video from Instagram
      - Automatically like or comment on the original post
    - Take pictures directly, apply filters and upload in simple steps
    - Upload existing shit on your phone
  - Keep queue internal instead of using Tumblr`s, for increased control
  - Predefined tags and post bodies for all posts
  - Turn views into very specific micro modules ish
  - Repost your old top posts automatically & manually
  - reblog.media // queue.photos
  - Some kind of pro accounts

### Attributions

  @dave http://stackoverflow.com/a/22854824/90674
