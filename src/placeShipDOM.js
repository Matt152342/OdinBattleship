import { drawBoard } from './gameDOM.js';

const playerShipPlacement = (player, playerBlock, onPlacementComplete) => {
    let shipIndex = 0;
    let isHorizontal = true;

    const shipInfo = document.querySelector('#shipInfo');
    const rotateBtn = document.querySelector('#rotateBtn');
    const startBtn = document.querySelector('#startBtn');

    const playerShips = player.playerBoard.ships;

    const updatePlacementUI = () => {
        if (shipIndex < playerShips.length) {
            const ship = playerShips[shipIndex];
            if (playerBlock.classList.contains('playerOneBlock')) {
                shipInfo.textContent = `Player 1 - Place your ${ship.name} (Length: ${ship.length})`;
            } else {
                shipInfo.textContent = `Player 2 - Place your ${ship.name} (Length: ${ship.length})`;
            }

            startBtn.disabled = true;
        } else {
            shipInfo.textContent = 'All ships have been placed.';
            startBtn.disabled = false;
        }
    }

    rotateBtn.addEventListener('click', () => {
        isHorizontal = !isHorizontal;
        if (isHorizontal) {
            rotateBtn.textContent = 'Axis: Horizontal';
        } else {
            rotateBtn.textContent = 'Axis: Vertical';
        }
    });

    const placementHandler = (e) => {
        if (shipIndex >= playerShips.length) {
            return;
        }

        const cell = e.target.closest('.cell');
        if (!cell) {
            return;
        }

        const x = Number(cell.dataset.x);
        const y = Number(cell.dataset.y);
        const currentShip = playerShips[shipIndex];

        try {
            player.playerBoard.placeShip([x, y], currentShip, isHorizontal);

            for (let i = 0; i < currentShip.length; i++) {
                const targetX = isHorizontal ? x + i : x;
                const targetY = isHorizontal ? y : y + i;

                const targetCell = playerBlock.querySelector(`[data-x="${targetX}"][data-y="${targetY}"]`);
                if (targetCell) {
                    targetCell.classList.add('ship');
                }
            }

            shipIndex++;
            updatePlacementUI();
        } catch (error) {
            console.warn("Invalid ship placement spot!");
        }
    };

    playerBlock.addEventListener('click', placementHandler);

    startBtn.onclick = () => {
        playerBlock.removeEventListener('click', placementHandler);
        
        if (onPlacementComplete) {
            onPlacementComplete();
        }
    };

    updatePlacementUI();
}

export { playerShipPlacement };