const generateCoord = () => {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);

    return [x, y];
}

class Player {
    constructor(gameboard = null) {
        this.playerBoard = gameboard;
        this.playersTurn = false;
    }

    botPlaceShips = () => {
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

    botAttack = (playerboard, playerboardDiv) => {
        let hasAttacked = false;

        while (!hasAttacked) {
            try {
                const [x, y] = generateCoord();
                playerboard.receiveAttack([x, y]);

                const targetCell = playerboardDiv.querySelector(`[data-x="${x}"][data-y="${y}"]`);
                if (targetCell) {
                    targetCell.classList.add('clicked');
                }
                hasAttacked = true;
            } catch (error) {
                // Let it just run
            }
        }
    }
}

export { Player };