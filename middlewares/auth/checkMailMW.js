const requireOption = require('../requireOption');

module.exports = function(objectRepository) {
    return function(req, res, next) {
        if (typeof req.body.mail === 'undefined') {
            return next();
        }

        if (req.body.mail === 'valakiember@email.hu') {
            req.session.belepes = true;
            return req.session.save(err => res.redirect('/raidebere'));
        }

        res.locals.error = 'Hibás email!';
        return next();
    };
};