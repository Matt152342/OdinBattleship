class Ship {
    constructor(length) {
        this.length = length;
        this.numberOfHits = 0;
        this.isSunk = false;
    }

    hit () {
        this.numberOfHits++;
        return;
    }
}

module.exports = { Ship };