const playerOne_X = document.querySelector('#playerOne-X');
const playerOne_O = document.querySelector('#playerOne-O');
const playerTwo_X = document.querySelector('#playerTwo-X');
const playerTwo_O = document.querySelector('#playerTwo-O');
const startButton = document.querySelector('#start-button');
const startPageContainer = document.querySelector('.start-page-container');
const mainPageContainer = document.querySelector('.main-page-container');
const contestantsNames = document.querySelector('#contestants-names');
const inputPlayerOneName = document.querySelector('#input-playerOne-name');
const inputPlayerTwoName = document.querySelector('#input-playerTwo-name');
const spanPlayerOneName = document.querySelector('#span-playerOne-name');
const spanPlayerTwoName = document.querySelector('#span-playerTwo-name');
const signs = document.querySelectorAll('.signs');
const playerOneScore = document.querySelector('#playerOne-score');
const numberOfTies = document.querySelector('#number-of-ties');
const playerTwoScore = document.querySelector('#playerTwo-score');
const exit = document.querySelector('#exit');

let isPlayerOne_X = false;
let isPlayerOne_O = false;
let isPlayerTwo_X = false;
let isPlayerTwo_O = false;

let playerOneChoice = '';
let playerTwoChoice = '';

playerOne_X.addEventListener('click', function () {
    isPlayerOne_X = true;
    isPlayerOne_O = false;
    isPlayerTwo_X = false;
    isPlayerTwo_O = false;
    selectSign();
});

playerOne_O.addEventListener('click', function () {
    isPlayerOne_O = true;
    isPlayerOne_X = false;
    isPlayerTwo_X = false;
    isPlayerTwo_O = false;
    selectSign();
});

playerTwo_X.addEventListener('click', function () {
    isPlayerTwo_X = true;
    isPlayerOne_X = false;
    isPlayerOne_O = false;
    isPlayerTwo_O = false;
    selectSign();
});

playerTwo_O.addEventListener('click', function () {
    isPlayerTwo_O = true;
    isPlayerOne_X = false;
    isPlayerOne_O = false;
    isPlayerTwo_X = false;
    selectSign();
});

startButton.addEventListener('click', function (e) {
    if (validateNames() && validateSignSelection()) {
        e.preventDefault();
        startPageContainer.style.display = 'none';
        mainPageContainer.style.display = 'flex';
        spanPlayerOneName.innerText = `${inputPlayerOneName.value}`;
        spanPlayerTwoName.innerText = `${inputPlayerTwoName.value}`;
        playerOneScore.innerText = inputPlayerOneName.value;
        numberOfTies.innerText = 'Ties';
        playerTwoScore.innerText = inputPlayerTwoName.value;
    }
});

inputPlayerOneName.addEventListener('input', () => inputPlayerOneName.setCustomValidity(''));
inputPlayerTwoName.addEventListener('input', () => inputPlayerTwoName.setCustomValidity(''));

exit.addEventListener('click', function () {
    mainPageContainer.style.display = 'none';
    startPageContainer.style.display = 'flex';
    inputPlayerOneName.value = '';
    inputPlayerTwoName.value = '';
    signs.forEach(sign => {
        sign.classList.remove('active');
    });
});

function selectSign() {
    if (isPlayerOne_X) {
        playerOneChoice = 'X';
        playerOne_X.classList.toggle('active');
        playerOne_O.classList.remove('active');
        playerTwo_X.classList.remove('active');
    } else if (isPlayerOne_O) {
        playerOneChoice = 'O';
        playerOne_O.classList.toggle('active');
        playerOne_X.classList.remove('active');
        playerTwo_O.classList.remove('active');
    } else if (isPlayerTwo_X) {
        playerTwoChoice = 'X';
        playerTwo_X.classList.toggle('active');
        playerOne_X.classList.remove('active');
        playerTwo_O.classList.remove('active');
    } else if (isPlayerTwo_O) {
        playerTwoChoice = 'O';
        playerTwo_O.classList.toggle('active');
        playerOne_O.classList.remove('active');
        playerTwo_X.classList.remove('active');
    }
}

function validateNames() {
    if (inputPlayerOneName.value === '') {
        inputPlayerOneName.setCustomValidity('Please enter a name for Player 1.');
        inputPlayerOneName.reportValidity();
        return false;
    } else if (inputPlayerTwoName.value === '') {
        inputPlayerTwoName.setCustomValidity('Please enter a name for Player 2.');
        inputPlayerTwoName.reportValidity();
        return false;
    } else if (inputPlayerOneName.value === inputPlayerTwoName.value) {
        inputPlayerTwoName.setCustomValidity('Please enter different names for both players.');
        inputPlayerTwoName.reportValidity();
        return false;
    }
    if (!(inputPlayerOneName.value.length >= 3 && inputPlayerOneName.value.length <= 15)) {
        inputPlayerOneName.setCustomValidity('The name of the player must be between 3 and 15 characters.');
        inputPlayerOneName.reportValidity();
        return false;
    } else if (!(inputPlayerTwoName.value.length >= 3 && inputPlayerTwoName.value.length <= 15)) {
        inputPlayerTwoName.setCustomValidity('The name of the player must be between 3 and 15 characters.');
        inputPlayerTwoName.reportValidity();
        return false;
    }
    return true;
}

function validateSignSelection() {
    if (!(playerOne_X.classList.contains('active') || playerOne_O.classList.contains('active')) ||
        !(playerTwo_X.classList.contains('active') || playerTwo_O.classList.contains('active'))) {
        signs.forEach(sign => {
            sign.style.border = '3px solid red';
        });
        return false;
    }
    return true;
}

function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const placeSign = (row, column, sign) => {
        const cell = board[row][column];
        if (cell.getValue() === '') {
            cell.placeSign(sign);
            return true;
        }
        return false;
    };

    const printBoard = () => {
        const boardWithCellValues = board.map((row) =>
            row.map((cell) => cell.getValue())
        );
        console.log(boardWithCellValues);
    };

    return { getBoard, placeSign, printBoard };
}

function Cell() {
    let value = '';

    const placeSign = (sign) => {
        value = sign;
    };

    const getValue = () => value;

    return {
        placeSign,
        getValue,
    };
}

function GameController(playerOneName = inputPlayerOneName.value, playerTwoName = inputPlayerTwoName.value, playerOneChoice,
    playerTwoChoice) {
    const board = Gameboard();

    const players = [
        {
            name: playerOneName,
            sign: playerOneChoice,
        },
        {
            name: playerTwoName,
            sign: playerTwoChoice,
        },
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const playRound = (row, column) => {
        console.log(
            `Dropping ${getActivePlayer().name}'s token into column ${column}...`
        );
        board.placeSign(row, column, getActivePlayer().sign);

        switchPlayerTurn();
        printNewRound();
    };

    printNewRound();

    return {
        playRound,
        getActivePlayer,
        getBoard: board.getBoard,
    };
}

function ScreenController() {
    const game = GameController();
    const boardDiv = document.querySelector("#game-board");

    const updateScreen = () => {
        // Clear the board
        boardDiv.innerHTML = "";

        // Get the newest version of the board and active player
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        // Display player's turn
        // const playerTurnDiv = document.createElement("div");
        // playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;
        // boardDiv.appendChild(playerTurnDiv);

        // Render board squares
        board.forEach((row) => {
            row.forEach((cell) => {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                cellButton.textContent = cell.getValue();
                boardDiv.appendChild(cellButton);
            });
        });
    };

    // Add event listener for the board
    function clickHandlerBoard(e) {
        const selectedColumn = e.target.dataset.column;
        if (!selectedColumn) return;
        game.playRound(selectedColumn);
        updateScreen();
    }

    boardDiv.addEventListener("click", clickHandlerBoard);

    // Initial render
    updateScreen();
}

ScreenController();

