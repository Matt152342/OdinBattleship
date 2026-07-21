import { Ship } from './ship.js';
import { GameBoard } from './gameboard.js';
import { Player } from './player.js';

const testBoard = new GameBoard(10, 5);

const drawBoard = (gameMenu) => {
    const gameboard = document.createElement('div');
    gameboard.classList.add('gameboard');

    for (let row = 0; row < testBoard.length; row++) {
        for (let col = 0; col < testBoard.length; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            cell.dataset.x = row;
            cell.dataset.y = col;

            gameboard.appendChild(cell);
        }
    }

    gameMenu.appendChild(gameboard);
}

export { drawBoard };