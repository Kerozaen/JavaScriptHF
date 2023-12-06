var expect = require('chai').expect;
var getSorMW = require('/kezmuves/getSorMW');

describe('getSorMW middleware ', function () {
    it('should  set res.locals.sor with a sor object', function (done) {
        const mw = getSorMW({
            SorModel: {
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({_id:'13'});
                    cb(null, 'mockSor');
                }
            }
        });
        const ResMock = {
            locals: {}
        };
        mw(
            {
                params:{
                    Sorid: '13'
                }
            },
            ResMock,
            (err) => {
                expect(err).to.be.eql(undefined);
                expect(ResMock.locals).to.be.eql({sor:'mockSor'});
                done();
            }
        );
    });
    it('should  call next with error when there is a problem', function (done) {
        const mw = getSorMW({
            SorModel:{
                findOne:(p1,cb) => {
                    expect(p1).to.be.eql({_id: '13'});
                    cb('adatbazishiba', null);
                }
            }
        })
        const ResMock = {
            locals: {}
        };
        mw(
            {
                params:{
                    Sorid: '13'
                }
            },
            ResMock,
            (err) => {
                expect(err).to.be.eql('adatbazishiba');
                expect(ResMock.locals).to.be.eql({Sor:'mockSor'});
                done();
            }
        );
    });
    it('should  call next when no Sor is found', function (done) {
        const mw = getSorMW({
            SorModel:{
                findOne:(p1,cb) => {
                    expect(p1).to.be.eql({_id:'13'});
                    cb(undefined, null);
                }
            }
        });
        const ResMock = {
            locals: {}
        };
        mw(
            {
                params:{
                    Sorid: '13'
                }
            },
            ResMock,
            (err) => {
                expect(err).to.be.eql('adatbazishiba');
                expect(ResMock.locals).to.be.eql({});
                done();
            }
        );
    });
});
