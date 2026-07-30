const generateCoord = () => {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);

    return [x, y];
}

const randomAxis = () => {
    const num = Math.floor(Math.random() * 2);

    if (num === 1) {
        return true;
    }

    return false;
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
                    this.playerBoard.placeShip(coordinate, ship, randomAxis());
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
                    if (targetCell.classList.contains('ship')) {
                        targetCell.classList.remove('ship');
                        targetCell.classList.add('hit');
                    }
                    targetCell.classList.add('miss');
                }
                hasAttacked = true;
            } catch (error) {
                // Let it just run
            }
        }
    }
}

export { Player };