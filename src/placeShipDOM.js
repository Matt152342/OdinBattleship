import { drawBoard } from './gameDOM.js';

let shipIndex = 0;
let isHorizontal = true;

const playerShipPlacement = (player, playerBlock, onPlacementComplete) => {
    const shipInfo = document.querySelector('#shipInfo');
    const rotateBtn = document.querySelector('#rotateBtn');
    const startBtn = document.querySelector('#startBtn');

    const playerShips = player.playerBoard.ships;

    rotateBtn.addEventListener('click', () => {
        isHorizontal = !isHorizontal;
        if (isHorizontal) {
            rotateBtn.textContent = 'Axis: Horizontal';
        } else {
            rotateBtn.textContent = 'Axis: Vertical';
        }
    })

    const updatePlacementUI = () => {
        if (shipIndex < playerShips.length) {
            const ship = playerShips[shipIndex];
            shipInfo.textContent = `Place your ${ship.name} (Length: ${ship.length})`;
            startBtn.disabled = true;
        } else {
            shipInfo.textContent = 'All ships have been placed.';
            startBtn.disabled = false;
        }
    }

    playerBlock.addEventListener('click', (e) => {
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
            shipIndex++;
            updatePlacementUI();
        } catch (error) {
            console.warn("Invalid ship placement spot!");
        }
    });

    startBtn.addEventListener('click', () => {
        if (onPlacementComplete) {
            onPlacementComplete();
        }
    });

    updatePlacementUI();
}

export { playerShipPlacement };