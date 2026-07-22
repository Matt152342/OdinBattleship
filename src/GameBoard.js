class GameBoard {
    constructor() {
        this.length = 10;
        this.gameboard = Array.from({ length: this.length }, () => Array(this.length).fill());
        
        this.hitAttacks = 0;
        this.missedAttacks = 0;
        this.numberOfShips = 5;
        this.shipsSunk = 0;
    }

    placeShip (startCoordinate, ship) { // startCoord and endCoord is going to be formatted as [x, y]
        if (!ship || !startCoordinate) {
            throw new Error("Please enter required details (start coordinate, end coordinate and ship object.");
        }

        const [x, y] = startCoordinate;
        if (y + ship.length > this.length) { // Check if ship is on y-axis
            throw new Error("Ship placement goes out of bounds.");
        }

        for (let i = y; i < ship.length + y; i++) {
            if (this.gameboard[x][i] !== undefined) {
                throw new Error("Cannot place ship on top of another ship!");
            }
            this.gameboard[x][i] = ship;
        }
    }

    receiveAttack (coordinate) {
        const [x, y] = coordinate;
        const cell = this.gameboard[x][y]; // get ship object

        if (cell === "X" || cell === "O") {
            throw new Error("Already attacked this coordinate.");
        }
        
        if (typeof cell === 'object' && cell !== null) {
            cell.hit();
            this.hitAttacks++;
            this.gameboard[x][y] = "X";
            console.log("You hit a ship.");

            if (cell.isSunk()) {
                this.shipsSunk++;
                console.log(`Ship sunk. Total sunk is: ${this.shipsSunk}`);
            }
        } else { // Check if miss
            this.missedAttacks++;
            this.gameboard[x][y] = "O";
            console.log("Miss!");
        }
    }
}

export { GameBoard };