# crudify-mongoose

>

### Example

    const crudify = require('crudify-mongoose');

    app.use('/blogs', crudify({
      // mongoose model
      model: require('./models/blogs.js'),
      // letters of CRUD, specifying available modes
      mode: 'cru'
    }));

In the above example the delete operation is disabled because of missing character `d`.

*mode: c*

    POST /blogs/

*mode: r*

    GET /blogs/
    GET /blogs/:id

*mode: u*

    PUT /blogs/:id

*mode: d*

    DELETE /blogs/:id


### Thoughts

All modes are disabled by default
Constructor can take different types of argument for available modes.

#### Array [c, r, u, d]
`let modes = [true, true, false, false]`

#### Object { create: Boolean, read: Boolean, update: Boolean, delete: Boolean}
`let modes = {create: true}`
