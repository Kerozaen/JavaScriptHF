const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/raidebere', { useNewUrlParser: true });

module.exports = mongoose;
