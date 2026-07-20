import { Ship } from './ship.js';
import { GameBoard } from './gameboard.js';
import { Player } from './player.js';

import "./styles.css";

const startMenu = document.getElementById('startMenu');
const gameMenu = document.getElementById('gameMenu');

const startBtn = document.querySelector('#onePlayerBtn');
startBtn.addEventListener('click', () => {
    startMenu.classList.add('hidden');
    gameMenu.classList.remove('hidden');
});