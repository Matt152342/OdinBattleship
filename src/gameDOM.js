import { Ship } from './Ship.js';

const displayData = (player, playerBlock) => {
    const oldDataBlock = playerBlock.querySelector('.dataBlock');
    if (oldDataBlock) {
        oldDataBlock.remove();
    }

    const dataBlock = document.createElement('div');
    const hitsDiv = document.createElement('div');
    const missesDiv = document.createElement('div');
    const numOfSinksDiv = document.createElement('div');

    dataBlock.classList.add('dataBlock');
    hitsDiv.classList.add('hits');
    missesDiv.classList.add('misses');
    numOfSinksDiv.classList.add('numberOfSinks');

    hitsDiv.textContent = `Hits: ${player.playerBoard.hitAttacks}`;
    missesDiv.textContent = `Misses: ${player.playerBoard.missedAttacks}`;
    numOfSinksDiv.textContent = `Ships sunk: ${player.playerBoard.shipsSunk}`;

    dataBlock.append(hitsDiv, missesDiv, numOfSinksDiv);
    playerBlock.appendChild(dataBlock);
};

const drawBoard = (playerBlock, playerBoard, drawShips = false) => {
    const oldBoard = playerBlock.querySelector('.gameboard');
    if (oldBoard) {
        oldBoard.remove();
    }

    const gameboard = document.createElement('div');
    gameboard.classList.add('gameboard');

    for (let row = 0; row < playerBoard.length; row++) {
        for (let col = 0; col < playerBoard.length; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            cell.dataset.x = col; // this is supposed to row, I know, but I was too lazy to fix.
            cell.dataset.y = row;

            const cellData = playerBoard.gameboard[col][row];
            if (drawShips && typeof cellData === 'object') {
                cell.classList.add('ship');
            }

            if (cellData === 'hit') {
                cell.classList.add('hit');
            } else if (cellData === 'miss') {
                cell.classList.add('miss');
            }

            gameboard.appendChild(cell);
        }
    }

    playerBlock.appendChild(gameboard);
    return gameboard;
};

const showEndScreen = (message) => {
    const endScreen = document.getElementById('endMenu');
    const messageDiv = document.querySelector('.endMessage');
    const gameScreen = document.getElementById('gameMenu');

    gameScreen.classList.toggle('hidden');

    messageDiv.textContent = message;
    endScreen.classList.toggle('hidden');
}

const showStartScreen = () => {
    const endScreen = document.getElementById('endMenu');
    const gameScreen = document.getElementById('gameMenu');
    const startScreen = document.getElementById('startMenu');

    if (!endScreen.classList.contains('hidden')) {
        endScreen.classList.toggle('hidden');
    }

    if (!gameScreen.classList.contains('hidden')) {
        gameScreen.classList.toggle('hidden');
    }

    startScreen.classList.toggle('hidden');
}

export { displayData, drawBoard, showEndScreen, showStartScreen };