import "./styles.css";
import { drawBoard } from "./gameDOM.js";

const startMenu = document.getElementById('startMenu');
const gameMenu = document.getElementById('gameMenu');

let onePlayerMode = false;
let twoPlayerMode = false;

let playerBoard = null;
let enemyBoard = null;

const startBtns = document.querySelectorAll('.startBtn');
startBtns.forEach((button) => {
    button.addEventListener('click', () => {
        startMenu.classList.add('hidden');
        gameMenu.classList.remove('hidden');

        playerBoard = drawBoard(gameMenu);
        enemyBoard = drawBoard(gameMenu);

        if (button.classList.contains('onePlayerBtn')) {
            onePlayerMode = true;
            playerBoard.classList.add('playerOne');
            enemyBoard.classList.add('computer');
        } else if (button.classList.contains('twoPlayerBtn')) {
            twoPlayerMode = true;
            playerBoard.classList.add('playerOne');
            enemyBoard.classList.add('playerTwo');
        }
    })
});