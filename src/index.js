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
playerOne.playerBoard = new GameBoard();
const playerTwo = new Player();
playerTwo.playerBoard = new GameBoard();

const playerOneBlock = document.querySelector('.playerOneBlock');
const playerTwoBlock = document.querySelector('.playerTwoBlock');

const startBtns = document.querySelectorAll('.startBtn');
startBtns.forEach((button) => {
    button.addEventListener('click', () => {
        startMenu.classList.add('hidden');
        gameMenu.classList.remove('hidden');

        drawBoard(playerOneBlock, playerOne.playerBoard);
        displayData(playerOne, playerOneBlock);
        drawBoard(playerTwoBlock, playerTwo.playerBoard);
        displayData(playerTwo, playerTwoBlock);

        if (button.classList.contains('onePlayerBtn')) {
            onePlayerMode = true;
        } else if (button.classList.contains('twoPlayerBtn')) {
            twoPlayerMode = true;
        }
    })
});

while (onePlayerMode) {
    
}