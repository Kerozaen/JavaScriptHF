const authMW = require('../middlewares/auth/authMW');
const checkMailMW = require('../middlewares/auth/checkMailMW');
const renderMW = require('../middlewares/renderMW');
const delKezmuvesMW = require('../middlewares/kezmuves/delKezmuvesMW');
const getSorMW = require('../middlewares/kezmuves/getSorMW');
const getKezmuvesMW = require('../middlewares/kezmuves/getKezmuvesMW');
const saveProfilMW = require('../middlewares/kezmuves/saveProfilMW');

const KeszitoModel = require('../modellek/kezmuvesek');
const SorModel = require('../modellek/sorok');

module.exports = function(app) {
    const objRepo = {
        KeszitoModel: KeszitoModel,
        SorModel: SorModel
    };

    app.use(
      '/login',
      checkMailMW(objRepo),
      renderMW(objRepo,'login')
    );

    app.use(
        '/raidebere/new',
        authMW(objRepo),
        saveProfilMW(objRepo),
        renderMW(objRepo, 'keszitoeditnew')
    );
    app.use(
        '/raidebere/edit/:kezmuvesek',
        authMW(objRepo),
        getKezmuvesMW(objRepo),
        saveProfilMW(objRepo),
        renderMW(objRepo, 'keszitoedit')
    );
    app.get(
        '/nagymama/del/:nagymamaid',
        authMW(objRepo),
        getKezmuvesMW(objRepo),
        delKezmuvesMW(objRepo)
    );
    app.get(
        '/raidebere',
        authMW(objRepo),
        getSorMW(objRepo),
        renderMW(objRepo, 'kezmuvesek')
    );

};