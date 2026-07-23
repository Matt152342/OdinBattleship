class Ship {
    constructor(name, length) {
        this.name = name;
        this.length = length;
        this.numberOfHits = 0;
        this.isSunk = false;
    }

    hit () {
        this.numberOfHits++;
        
        return;
    }

    isSunk() {
        if (this.numberOfHits === this.length) {
            this.isSunk = true;
        }
        
        return this.isSunk;
    }
}

export { Ship };