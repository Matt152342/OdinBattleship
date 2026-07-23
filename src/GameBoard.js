import { Ship } from './Ship.js';

class GameBoard {
    constructor() {
        this.length = 10;
        this.gameboard = Array.from({ length: this.length }, () => Array(this.length).fill());
        
        this.hitAttacks = 0;
        this.missedAttacks = 0;
        this.shipsSunk = 0;

        this.ships = [
            new Ship("Carrier", 5),
            new Ship("Battleship", 4),
            new Ship("Cruiser", 3),
            new Ship("Submarine", 3),
            new Ship("Destroyer", 3),
        ]
    }

    placeShip (startCoordinate, ship) {
        if (!ship || !startCoordinate) {
            throw new Error("Please enter required details (start coordinate, end coordinate and ship object.");
        }

        const [x, y] = startCoordinate;
        if (y + ship.length > this.length) { // Check if ship is on y-axis
            throw new Error("Ship placement goes out of bounds.");
        }

        for (let i = y; i < ship.length + y; i++) { // checks if the area is okay to be placed before placing.
            if (this.gameboard[x][i] !== undefined) {
                throw new Error("Cannot place ship on top of another ship!");
            }
        }

        for (let i = y; i < ship.length + y; i++) {
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
            console.log("You hit a ship.");

            if (cell.isSunk()) {
                this.shipsSunk++;
                console.log(`Ship sunk. Total sunk is: ${this.shipsSunk}`);
            }

            this.gameboard[x][y] = "X"; // put it here to not overwrite cell before checking if its sunk
        } else { // Check if miss
            this.missedAttacks++;
            this.gameboard[x][y] = "O";
            console.log("Miss!");
        }
    }
}

export { GameBoard };