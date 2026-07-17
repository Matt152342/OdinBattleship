const {Ship} = require('./ship.js');

describe("Ship class", () => {
    test('Ships number of hits should return 1', () => {
        const testShip = new Ship(5);
        testShip.hit();
        expect(testShip.numberOfHits).toBe(1);
    });
});