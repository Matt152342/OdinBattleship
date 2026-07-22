import "./styles.css";
import { Player } from './Player.js';
import { GameBoard } from './GameBoard.js';
import { displayData, drawBoard } from "./gameDOM.js";

const startMenu = document.getElementById('startMenu');
const gameMenu = document.getElementById('gameMenu');

// Will be used for mode selection
let onePlayerMode = false;
let twoPlayerMode = false;

// Set up playerOne and playerTwo 
const playerOne = new Player();
const playerTwo = new Player();
playerOne.playerBoard = new GameBoard();
playerTwo.playerBoard = new GameBoard();
let playerOneTurn = true;
let playerTwoTurn = false;

const playerOneBlock = document.querySelector('.playerOneBlock');
const playerTwoBlock = document.querySelector('.playerTwoBlock');

const startBtns = document.querySelectorAll('.startBtn');
startBtns.forEach((button) => {
    button.addEventListener('click', () => {
        startMenu.classList.add('hidden');
        gameMenu.classList.remove('hidden');

        drawBoard(playerOneBlock, playerOne.playerBoard);
        displayData(playerTwo, playerOneBlock);
        drawBoard(playerTwoBlock, playerTwo.playerBoard);
        displayData(playerOne, playerTwoBlock);

        if (button.classList.contains('onePlayerBtn')) {
            onePlayerMode = true;
            console.log(onePlayerMode);
        } else if (button.classList.contains('twoPlayerBtn')) {
            twoPlayerMode = true;
        }

        cellInputListener();
    })
});

const cellInputListener = () => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.addEventListener('click', () => {
            if (playerOneTurn && !cell.classList.contains('clicked')) {
                cell.classList.add('clicked');

                const x = cell.dataset.x;
                const y = cell.dataset.y;

                playerTwo.playerBoard.receiveAttack([x, y]);
                displayData(playerTwo, playerOneBlock);

                playerOneTurn = false;
            }
        });
    });
}