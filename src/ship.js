class Ship {
    constructor(length) {
        this.length = length;
        this.numberOfHits = 0;
        this.isSunk = false;
    }

    hit () {
        this.numberOfHits++;

        if (this.numberOfHits === this.length) {
            this.isSunk = true;
        }
        
        return;
    }

    isSunk() {
        return this.isSunk;
    }
}

module.exports = { Ship };