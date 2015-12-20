const express = require('express');
const router = new express.Router();
const path = require('path');
const fs = require('fs');
const jade = require('jade');
const _ = require('underscore');

router.use('/', function (req, res, next) {
  let templateDir = path.join(__dirname, '../angular/templates');
  fs.readdir(templateDir, function (err, files) {
    if (err) {
      next(err);
    }

    let templates = _.map(files, function (filename) {
      let html = jade.renderFile(path.join(templateDir, filename), {pretty: '  '});
      let obj = {
        name: filename.split('.')[0],
        html: html
      };
      return obj;
    });

    return res.render('views/angular', {
      templates: templates
    });
  });
});

module.exports = router;
