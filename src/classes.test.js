const {Ship} = require('./ship.js');

describe("Ship class", () => {
    test('After one hit, number of hits should be 1', () => {
        const testShip = new Ship(5);
        testShip.hit();
        expect(testShip.numberOfHits).toBe(1);
    });

    test('Should return true after two hits with the ship length being 2', () => {
        const testShip = new Ship(2);
        testShip.hit();
        testShip.hit();
        expect(testShip.isSunk).toBe(true);
    });
});