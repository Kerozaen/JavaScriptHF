const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Keszito = db.model('Kezmuves', {
    nev: String,
    cim: String,
    tel: String,
    mail: String
});

module.exports = Keszito;