const {
    expect
} = require('chai');
const path = require('path');

const {getStuff,getStuffInState} = require(path.join(__dirname,'test.js'))

describe('returns an object with the right stuff', function () {
    this.timeout(10000);
    it('etherium test', (done) => {
        getStuff('ETH').then((value) => {
            expect(value).to.have.all.keys('Ethereum')
            expect(value.Ethereum).to.have.all.keys( 'name', 'price', 'changeInDay', 'id');
            done();
        });
    });
    it('bitcoin test', (done) => {
        getStuff('BTC').then((value) => {
            expect(value).to.have.all.keys('Bitcoin');
            expect(value.Bitcoin).to.have.all.keys( 'name', 'price', 'changeInDay', 'id');
            done();
        });
    });
    it('bitcoin test', (done) => {
        getStuffInState('BTC').then((value) => {
            expect(value).to.have.all.keys('Bitcoin');
            expect(value.Bitcoin).to.have.all.keys( 'name', 'price', 'changeInDay', 'id');
            done();
        });
    });
});