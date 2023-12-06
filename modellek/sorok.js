const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Sor = db.model('Sor', {
    iz: String,
    ev: Number,
    _keszito: {
        type: Schema.Types.ObjectId,
        ref: 'Keszito'
    }
});

module.exports = Sor;