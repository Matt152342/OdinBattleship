class Player {
    constructor(gameboard = null) {
        this.playerBoard = gameboard;
        this.playersTurn = false;
    }

    botPlaceShips = () => {
        const generateCoord = () => {
            const x = Math.floor(Math.random() * 9);
            const y = Math.floor(Math.random() * 9);

            return [x, y];
        }


        this.playerBoard.ships.forEach((ship) => {
            let placed = false;

            while (!placed) {
                try {
                    const coordinate = generateCoord();
                    this.playerBoard.placeShip(coordinate, ship);
                    placed = true;
                } catch (error) {
                }
            }
        });
    }
}

export { Player };