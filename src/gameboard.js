class GameBoard {
    constructor(length) {
        this.length = length;
        this.gameboard = Array.from({ length: this.length }, () => Array(10).fill());
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
            this.gameboard[x][i] = "SHIP";
        }
    }

    receiveAttack (coordinate) {
        gameboard[coordinate[0]][coordinate[1]] = "X";
    }
}