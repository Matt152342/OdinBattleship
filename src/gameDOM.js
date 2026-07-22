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

    hitsDiv.textContent = `Hits: ${player.playerBoard.hitAttacks.length ?? player.playerBoard.hitAttacks}`;
    missesDiv.textContent = `Misses: ${player.playerBoard.missedAttacks.length ?? player.playerBoard.missedAttacks}`;
    numOfSinksDiv.textContent = `Ships sunk: ${player.playerBoard.shipsSunk ?? 0}`;

    dataBlock.append(hitsDiv, missesDiv, numOfSinksDiv);
    playerBlock.appendChild(dataBlock);
};

const drawBoard = (playerBlock, playerBoard) => {
    const gameboard = document.createElement('div');
    gameboard.classList.add('gameboard');

    for (let row = 0; row < playerBoard.length; row++) {
        for (let col = 0; col < playerBoard.length; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            cell.dataset.x = row;
            cell.dataset.y = col;

            gameboard.appendChild(cell);
        }
    }

    playerBlock.appendChild(gameboard);
    return gameboard;
};

export { displayData, drawBoard };