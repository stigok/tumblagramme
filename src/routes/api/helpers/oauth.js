const express = require('express');
const router = new express.Router();
const parseUrl = require('url').parse;
const util = require('util');
const OAuth = require('oauth').OAuth;
const oa = new OAuth(
  'http://localhost:3000/oauth/request_token',
  'http://localhost:3000/oauth/access_token',
  'JiYmll7CX3AXDgasnnIDeg', 'mWPBRK5kG2Tkthuf5zRV1jYWOEwnjI6xs3QVRqOOg',
  '1.0A', 'http://localhost:3000/api/tumblagramme/callback', 'HMAC-SHA1'
);

let root = function (options) {
  let oa = new OAuth(
    options.requestTokenUrl,
    options.accessTokenUrl,
    options.appToken,
    options.appSecret,
    options.version || '1.0A',
    options.callbackUrl,
    options.hashMethod || 'HMAC-SHA1'
  );

  options.name = options.name || 'oauth';

  router.use('/callback', function (req, res, params) {
    let url = parseUrl(req.originalUrl, true);

    console.log(util.inspect(req.session));

    oa.getOAuthAccessToken(
      url.query.oauth_token,
      req.session.oauth_token_secret,
      url.query.oauth_verifier,
      function(error, oauth_access_token, oauth_access_token_secret, results) {
        oa.getProtectedResource('http://localhost:3000/fetch/unicorns', 'GET', oauth_access_token, oauth_access_token_secret, function(error, data){
          res.writeHead(200, {'Content-type': 'text/html'})
          res.end(data);
        });
      }
    );
  });
};


router.use('/', function (req, res, params) {
  oa.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results){
    console.log( error )
    req.session.oauth_token_secret= oauth_token_secret;
    console.log(require('util').inspect(req.session))

    res.writeHead(303, { 'Location': 'http://localhost:3000/oauth/authorize?oauth_token=' + oauth_token });
    res.end('');
  });
})
  .listen(4000);
