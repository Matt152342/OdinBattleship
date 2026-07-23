class Ship {
    constructor(name, length) {
        this.name = name;
        this.length = length;
        this.numberOfHits = 0;
        this.sunk = false;
    }

    hit () {
        this.numberOfHits++;
        
        return;
    }

    isSunk () {
        if (this.numberOfHits >= this.length) {
            this.sunk = true;
        }

        return this.sunk;
    }
}

export { Ship };