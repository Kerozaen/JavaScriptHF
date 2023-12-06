const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const KeszitoModel = requireOption(objectrepository, 'KeszitoModel');

    return function(req, res, next) {
        KeszitoModel.findOne({ _id: req.params.keszitoid }, (err, keszito) => {
            if (err || !keszito) {
                return next(err);
            }

            res.locals.keszito = keszito;
            return next();
        });
    };
};