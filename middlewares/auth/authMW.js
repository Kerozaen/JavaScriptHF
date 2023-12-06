const requireOption = require('../requireOption');

module.exports = function(objectRepository) {
    return function(req, res, next) {
        if (typeof req.session.belepes === 'undefined' || req.session.belepes !== true) {
            return res.redirect('/raidebere');
        }

        next();
    };
};