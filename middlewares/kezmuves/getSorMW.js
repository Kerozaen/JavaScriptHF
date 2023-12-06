const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const SorModel = requireOption(objectrepository, 'Sorok');

    return function(req, res, next) {
        if (typeof res.locals.keszito === 'undefined') {
            return next();
        }

        SorModel.find({ _keszito: res.locals.keszito._id }, (err, sorok) => {
            if (err) {
                return next(err);
            }

            res.locals.sorok = sorok;
            return next();
        });
    };
};