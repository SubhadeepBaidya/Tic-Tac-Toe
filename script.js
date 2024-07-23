const gameBoard = document.getElementById('gameBoard');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');
const statusDisplay = document.getElementById('status');
const currentPlayerSpan = document.getElementById('currentPlayer');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const clickSound = new Audio('click.mp3');
const winSound = new Audio('win.mp3');
const drawSound = new Audio('draw.mp3');

function handleCellClick(e) {
    const cell = e.target;
    const index = parseInt(cell.getAttribute('data-index'));

    if (board[index] !== '' || !gameActive) {
        return;
    }

    updateCell(cell, index);
    checkResult();
}

function updateCell(cell, index) {
    board[index] = currentPlayer;
    cell.innerText = currentPlayer;
    cell.classList.add('animate__animated', 'animate__bounceIn');
    clickSound.play();
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            highlightWinningCells(winningConditions[i]);
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        statusDisplay.innerText = `${currentPlayer} wins! 🎉`;
        winSound.play();
        return;
    }

    if (!board.includes('')) {
        gameActive = false;
        statusDisplay.innerText = `It's a draw! 🤝`;
        drawSound.play();
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    currentPlayerSpan.innerText = currentPlayer;
}

function highlightWinningCells(winningCells) {
    winningCells.forEach(index => {
        cells[index].classList.add('winning-cell');
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    statusDisplay.innerText = `Current Player: `;
    currentPlayerSpan.innerText = currentPlayer;
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('winning-cell', 'animate__animated', 'animate__bounceIn');
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
