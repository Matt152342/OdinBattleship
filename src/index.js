import "./styles.css";
import { Player } from './Player.js';
import { GameBoard } from './GameBoard.js';
import { displayData, drawBoard } from "./gameDOM.js";
import { playerShipPlacement } from './placeShipDOM.js';

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

const playerOneBlock = document.querySelector('.playerOneBlock');
const playerTwoBlock = document.querySelector('.playerTwoBlock');

const modeBtns = document.querySelectorAll('.startBtn');
modeBtns.forEach((button) => {
    button.addEventListener('click', () => {
        startMenu.classList.add('hidden');
        gameMenu.classList.remove('hidden');

        drawBoard(playerOneBlock, playerOne.playerBoard);
        displayData(playerTwo, playerOneBlock);

        drawBoard(playerTwoBlock, playerTwo.playerBoard);
        displayData(playerOne, playerTwoBlock);

        if (button.classList.contains('onePlayerBtn')) {
            onePlayerMode = true;
            playerTwo.botPlaceShips();

            playerShipPlacement(playerOne, playerOneBlock, () => {
                document.getElementById('setupControls').classList.add('hidden');
                singlePlayer();
            });
        } else if (button.classList.contains('twoPlayerBtn')) {
            twoPlayerMode = true;
            twoPlayer();
        }
    });
});

const singlePlayer = () => {
    const cells = document.querySelectorAll('.cell');

    cells.forEach((cell) => {
        cell.addEventListener('click', () => {
            if (playerOneTurn && !cell.classList.contains('clicked')) { // Prevents spamming
                if (cell.closest('.playerTwoBlock') && !cell.classList.contains('miss')) {
                    cell.classList.add('miss');

                    const x = Number(cell.dataset.x);
                    const y = Number(cell.dataset.y);

                    playerTwo.playerBoard.receiveAttack([x, y]);
                    if (playerTwo.playerBoard.gameboard[x][y] === 'hit') {
                        cell.classList.add('hit');
                    }

                    displayData(playerTwo, playerOneBlock);

                    playerOneTurn = false;

                    // Bots turn
                    setTimeout(() => {
                        playerTwo.botAttack(playerOne.playerBoard, playerOneBlock);
                        displayData(playerOne, playerTwoBlock);
                        playerOneTurn = true;
                    }, 500);
                } 
            }
        });
    });
}

const twoPlayer = async () => {
    const placePhase = async () => {
        drawBoard(playerOneBlock, playerOne.playerBoard, true);
        displayData(playerOne, playerOneBlock);

        await new Promise((resolve) => {
            playerShipPlacement(playerOne, playerOneBlock, resolve);
        })

        drawBoard(playerOneBlock, playerOne.playerBoard, false);
        displayData(playerTwo, playerOneBlock);

        drawBoard(playerTwoBlock, playerTwo.playerBoard, true);
        displayData(playerOne, playerTwoBlock);

        await new Promise((resolve) => {
            playerShipPlacement(playerTwo, playerTwoBlock, resolve);
        });

        drawBoard(playerTwoBlock, playerTwo.playerBoard, false);
        displayData(playerOne, playerTwoBlock);

        drawBoard(playerOneBlock, playerOne.playerBoard, true);
        displayData(playerOne, playerOneBlock);

        document.getElementById('setupControls').classList.add('hidden');
    }

    const playerAttack = (attackerBlock, targetPlayer, targetBlock) => {
        return new Promise((resolve) => {
            const handleAttack = (e) => {
                const cell = e.target.closest('.cell');

                if (cell.classList.contains('hit') || cell.classList.contains('miss')) {
                    return;
                }

                const x = Number(cell.dataset.x);
                const y = Number(cell.dataset.y);

                try {
                    targetPlayer.playerBoard.receiveAttack([x, y]);

                    targetBlock.removeEventListener('click', handleAttack);
                    displayData(targetPlayer, attackerBlock);

                    resolve(); // Tell the function that it has ended when player clicks valid cell.
                } catch (error) {
                }
            }

            targetBlock.addEventListener('click', handleAttack);
        });
    }

    const gameLoop = async () => {
        let gameOver = false;

        while (!gameOver) {
            drawBoard(playerOneBlock, playerOne.playerBoard, true);
            displayData(playerTwo, playerOneBlock);

            drawBoard(playerTwoBlock, playerTwo.playerBoard, false);
            displayData(playerOne, playerTwoBlock);

            await playerAttack(playerOneBlock, playerTwo, playerTwoBlock);
            if (playerTwo.playerBoard.checkEndGame()) {
                console.log('Player 1 wins.');
                break;
            }

            drawBoard(playerOneBlock, playerOne.playerBoard, false);
            displayData(playerTwo, playerOneBlock);

            drawBoard(playerTwoBlock, playerTwo.playerBoard, true);
            displayData(playerOne, playerTwoBlock);

            await playerAttack(playerTwoBlock, playerOne, playerOneBlock);
            if (playerOne.playerBoard.checkEndGame()) {
                console.log('Player 2 wins.');
                break;
            }
        }
    }

    await placePhase();
    gameLoop();
}