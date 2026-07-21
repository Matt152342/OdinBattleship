import "./styles.css";
import { drawBoard } from "./gameDOM.js";

const startMenu = document.getElementById('startMenu');
const gameMenu = document.getElementById('gameMenu');

const startBtn = document.querySelector('#onePlayerBtn');
startBtn.addEventListener('click', () => {
    startMenu.classList.add('hidden');
    gameMenu.classList.remove('hidden');

    drawBoard(gameMenu);
});