const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const util = require('util');

const regexps = {
  tumblrTag: /^[a-zA-Z0-9\-_?!&' ]{3,}$/i,
  instagramTag: /^[a-zA-Z0-9-_]{3,}$/i,
  postType: /^photo$/,
  captionFormat: /^html|markdown$/,
  state: /^published|draft|queue|private$/
};

const Preset = new Schema({
  userId: Schema.Types.ObjectId,
  name: {type: String, required: true},
  blog: {
    name: {type: String, required: true}
  },
  post: {
    type: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return regexps.postType.test(value);
        },
        message: 'Invalid post type'
      }
    },
    caption: {type: String, default: ''},
    format: {
      type: String,
      default: 'markdown',
      validate: {
        validator: function (value) {
          return regexps.captionFormat.test(value);
        },
        message: 'Invalid post format'
      }
    },
    state: {
      type: String,
      default: 'queue',
      validate: {
        validator: function (value) {
          return regexps.state.test(value);
        },
        message: 'Invalid post format'
      }
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: function (value) {
          if (!util.isArray(value)) {
            return false;
          }
          for (let i = 0; i < value.length; i++) {
            if (!regexps.tumblrTag.test(value[i])) {
              return false;
            }
          }
          return true;
        },
        message: 'Invalid tag'
      }
    }
  },
  instagram: {
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: function (value) {
          if (!util.isArray(value)) {
            return false;
          }
          for (let i = 0; i < value.length; i++) {
            if (!regexps.instagramTag.test(value[i])) {
              return false;
            }
          }
          return true;
        },
        message: 'Invalid tag'
      }
    },
    autoLike: Boolean,
    autoFollow: Boolean
  }
});

module.exports = mongoose.model('Preset', Preset);
