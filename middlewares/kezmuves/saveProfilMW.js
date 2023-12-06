const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const KeszitoModel = requireOption(objectrepository, 'Keszito');

    return function(req, res, next) {
        if (
            typeof req.body.nev === 'undefined' ||
            typeof req.body.cim === 'undefined' ||
            typeof req.body.tel === 'undefined'
        ) {
            return next();
        }

        if (typeof res.locals.keszito === 'undefined') {
            res.locals.keszito = new KeszitoModel();
        }

        res.locals.keszito.nev = req.body.nev;
        res.locals.keszito.cim = req.body.cim;
        res.locals.keszito.tel = req.body.tel;

        res.locals.keszito.save(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/kezmuvesek');
        });
    };
};