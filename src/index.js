import "./styles.css";
import { Player } from './Player.js';
import { GameBoard } from './GameBoard.js';
import { displayData, drawBoard, showEndScreen, showStartScreen } from "./gameDOM.js";
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

const homeBtn = document.querySelector('.homeBtn');
homeBtn.addEventListener('click', () => {
    showStartScreen();
    resetGame();
});

const resetGame = () => {
    onePlayerMode = false;
    twoPlayerMode = false;
    playerOneTurn = true;

    playerOne.playerBoard = new GameBoard();
    playerTwo.playerBoard = new GameBoard();

    playerOneBlock.innerHTML = '<h2>Player One\'s Board</h2>';
    playerTwoBlock.innerHTML = '<h2>Player Two\'s Board</h2>';

    const setupControls = document.getElementById('setupControls');
    setupControls.classList.remove('hidden');
    
    const startBtn = document.getElementById('startBtn');
    if (startBtn) startBtn.disabled = true;

    document.getElementById('gameMenu').classList.add('hidden');
    document.getElementById('endMenu').classList.add('hidden');
    document.getElementById('startMenu').classList.remove('hidden');
};

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

                    if (playerTwo.playerBoard.checkEndGame()) {
                        showEndScreen('Player 1 wins.');
                    }

                    displayData(playerTwo, playerOneBlock);

                    playerOneTurn = false;

                    // Bots turn
                    setTimeout(() => {
                        playerTwo.botAttack(playerOne.playerBoard, playerOneBlock);
                        displayData(playerOne, playerTwoBlock);

                        if (playerOne.playerBoard.checkEndGame()) {
                            showEndScreen('Player 2 wins.');
                        }

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
                if (!cell) return;

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

    const turnBuffer = () => {
        return new Promise ((resolve) => {
            const bufferScreen = document.getElementById('bufferMenu');

            gameMenu.classList.add('hidden');
            bufferScreen.classList.remove('hidden');
            
            let count = 3;
            bufferScreen.textContent = `${count}`;

            const timer = setInterval(() => {
                count--;

                if (count > 0) {
                    bufferScreen.textContent = `${count}`;
                } else {
                    clearInterval(timer);   

                    bufferScreen.classList.add('hidden');
                    gameMenu.classList.remove('hidden');

                    resolve();
                }
            }, 1000);
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
                showEndScreen('Player 1 Wins.');
                break;
            }
            await turnBuffer();

            drawBoard(playerOneBlock, playerOne.playerBoard, false);
            displayData(playerTwo, playerOneBlock);

            drawBoard(playerTwoBlock, playerTwo.playerBoard, true);
            displayData(playerOne, playerTwoBlock);

            await playerAttack(playerTwoBlock, playerOne, playerOneBlock);
            if (playerOne.playerBoard.checkEndGame()) {
                showEndScreen('Player 2 Wins.');
                break;
            }
            await turnBuffer();
        }
    }

    await placePhase();
    gameLoop();
}