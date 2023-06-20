function initializeGame() {
    const playerOne_X = document.querySelector('#playerOne-X');
    const playerOne_O = document.querySelector('#playerOne-O');
    const playerTwo_X = document.querySelector('#playerTwo-X');
    const playerTwo_O = document.querySelector('#playerTwo-O');
    const startButton = document.querySelector('#start-button');
    const startPageContainer = document.querySelector('.start-page-container');
    const mainPageContainer = document.querySelector('.main-page-container');
    const inputPlayerOneName = document.querySelector('#input-playerOne-name');
    const inputPlayerTwoName = document.querySelector('#input-playerTwo-name');
    const signs = document.querySelectorAll('.signs');
    const playerOneScore = document.querySelector('#playerOne-score');
    const numberOfTies = document.querySelector('#number-of-ties');
    const playerTwoScore = document.querySelector('#playerTwo-score');
    const exit = document.querySelector('#exit');
    const counterTotalRounds = document.querySelector('#counter-total-rounds');
    const counterPlayerOneScore = document.querySelector('#counter-playerOne-score');
    const counterPlayerTwoScore = document.querySelector('#counter-playerTwo-score');
    const counterNumberOfTies = document.querySelector('#counter-number-of-ties');

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
        putSign();
    });

    playerOne_O.addEventListener('click', function () {
        isPlayerOne_O = true;
        isPlayerOne_X = false;
        isPlayerTwo_X = false;
        isPlayerTwo_O = false;
        putSign();
    });

    playerTwo_X.addEventListener('click', function () {
        isPlayerTwo_X = true;
        isPlayerOne_X = false;
        isPlayerOne_O = false;
        isPlayerTwo_O = false;
        putSign();
    });

    playerTwo_O.addEventListener('click', function () {
        isPlayerTwo_O = true;
        isPlayerOne_X = false;
        isPlayerOne_O = false;
        isPlayerTwo_X = false;
        putSign();
    });

    startButton.addEventListener('click', function (e) {
        const spanPlayerOneName = document.querySelector('#span-playerOne-name');
        const spanPlayerTwoName = document.querySelector('#span-playerTwo-name');

        if (validateNames() && validateSignSelection()) {
            e.preventDefault();
            startPageContainer.style.display = 'none';
            mainPageContainer.style.display = 'flex';
            spanPlayerOneName.innerText = `${inputPlayerOneName.value}`;
            spanPlayerTwoName.innerText = `${inputPlayerTwoName.value}`;
            playerOneScore.innerText = inputPlayerOneName.value;
            numberOfTies.innerText = 'Ties';
            playerTwoScore.innerText = inputPlayerTwoName.value;
            const game = GameController(inputPlayerOneName.value, inputPlayerTwoName.value, playerOneChoice, playerTwoChoice);
            const boardDiv = document.querySelector('#game-board');

            function updateScreen() {
                boardDiv.innerHTML = '';
                const board = game.getBoard();
                board.forEach((row, rowIndex) => {
                    row.forEach((cell, columnIndex) => {
                        const cellButton = document.createElement('button');
                        cellButton.classList.add('cell');
                        cellButton.textContent = cell.getValue();
                        cellButton.addEventListener('click', () => clickHandlerBoard(rowIndex, columnIndex));
                        boardDiv.appendChild(cellButton);
                    });
                });
            };

            function clickHandlerBoard(row, column) {
                game.playRound(row, column);
                updateScreen();
            }
            updateScreen();
        }
    });

    inputPlayerOneName.addEventListener('input', () => inputPlayerOneName.setCustomValidity(''));
    inputPlayerTwoName.addEventListener('input', () => inputPlayerTwoName.setCustomValidity(''));

    exit.addEventListener('click', () => {
        mainPageContainer.style.display = 'none';
        startPageContainer.style.display = 'flex';
        inputPlayerOneName.value = '';
        inputPlayerTwoName.value = '';
        counterTotalRounds.innerText = 0;
        counterPlayerOneScore.innerText = 0;
        counterPlayerTwoScore.innerText = 0;
        counterNumberOfTies.innerText = 0;
        signs.forEach(sign => {
            sign.classList.remove('active');
        });
    });

    function putSign() {
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

    function placeSign(row, column, sign) {
        const cell = board[row][column];
        if (cell.getValue() === '') {
            cell.placeSign(sign);
            return true;
        }
        return false;
    };

    function checkWinner(board) {
        const winningCombinations = [
            // Rows
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            // Columns
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            // Diagonals
            [[0, 0], [1, 1], [2, 2]],
            [[0, 2], [1, 1], [2, 0]]
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            const [rowA, colA] = a;
            const [rowB, colB] = b;
            const [rowC, colC] = c;

            // Check if all three cells have the same non-empty value
            if (
                board[rowA][colA].getValue() !== '' &&
                board[rowA][colA].getValue() === board[rowB][colB].getValue() &&
                board[rowA][colA].getValue() === board[rowC][colC].getValue()
            ) {
                return true;
            }
        }
        return false;
    };

    function printBoard() {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue())
        );
        console.log(boardWithCellValues);
    };
    return { getBoard, placeSign, printBoard, checkWinner };
}

function Cell() {
    let value = '';
    const placeSign = (sign) => value = sign;
    const getValue = () => value;

    return {
        placeSign,
        getValue,
    };
}

function GameController(playerOneName, playerTwoName, playerOneChoice, playerTwoChoice) {
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

    let activePlayer = players.find(player => player.sign === 'X') || players[0];
    const switchPlayerTurn = () => activePlayer = activePlayer === players[0] ? players[1] : players[0];
    const getActivePlayer = () => activePlayer;

    function checkWinner() {
        const gameBoard = board.getBoard();
        return board.checkWinner(gameBoard);
    };

    function printNewRound() {
        board.printBoard();
        const playerTurnDiv = document.querySelector('#player-turn');
        playerTurnDiv.textContent = `${activePlayer.name}'s turn`;
    };

    function handleButtonClicks() {
        const buttonNewRound = document.querySelector('#button-new-round');
        const buttonNewGame = document.querySelector('#button-new-game');
        const boardDiv = document.querySelector('#game-board');
        buttonNewRound.addEventListener('click', () => {
            const cells = boardDiv.querySelectorAll('.cell');
            cells.forEach(cell => cell.innerHTML = '');
            closePopup();
        });
    }

    function playRound(row, column) {
        const counterTotalRounds = document.querySelector('#counter-total-rounds');
        const counterPlayerOneScore = document.querySelector('#counter-playerOne-score');
        const counterPlayerTwoScore = document.querySelector('#counter-playerTwo-score');
        const counterNumberOfTies = document.querySelector('#counter-number-of-ties');

        let isTie = false;

        if (checkWinner()) {
            return;
        }
        const signPlaced = board.placeSign(row, column, getActivePlayer().sign);
        if (signPlaced) {
            if (checkWinner()) {
                const playerTurnDiv = document.querySelector('#player-turn');
                playerTurnDiv.textContent = `${activePlayer.name} wins!`;
                counterTotalRounds.textContent = parseInt(counterTotalRounds.textContent + 1);
                if (activePlayer.name === playerOneName) {
                    // isTie = false;
                    counterPlayerOneScore.textContent = parseInt(counterPlayerOneScore.textContent + 1);
                    createPopup(isTie);
                    openPopup();
                    handleButtonClicks();
                    return;
                } else if (activePlayer.name === playerTwoName) {
                    // isTie = false;
                    counterPlayerTwoScore.textContent = parseInt(counterPlayerTwoScore.textContent + 1);
                    createPopup(isTie);
                    openPopup();
                    handleButtonClicks();
                    return;
                }
                return;
            }
            if (checkForTie()) {
                isTie = true;
                const playerTurnDiv = document.querySelector('#player-turn');
                playerTurnDiv.textContent = "It's a tie!";
                counterTotalRounds.textContent = parseInt(counterTotalRounds.textContent + 1);
                counterNumberOfTies.textContent = parseInt(counterNumberOfTies.textContent + 1);
                createPopup(isTie);
                openPopup();
                handleButtonClicks();
                return;
            }
            switchPlayerTurn();
            printNewRound();
        }
    };

    function checkForTie() {
        const boardCells = board.getBoard().flat();
        return boardCells.every(cell => cell.getValue() !== '');
    };

    function createPopup(isTie) {
        const mainPageContainer = document.querySelector('.main-page-container');
        const popup = document.createElement('div');
        popup.classList.add('popup');
        mainPageContainer.appendChild(popup);
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        mainPageContainer.appendChild(overlay);
        const popupMessage = document.createElement('h1');
        popupMessage.classList.add('popup-message');
        if (isTie) {
            popupMessage.textContent = "It's a tie!";
        } else {
            popupMessage.textContent = `${activePlayer.name} wins this round!`;
        }
        popup.appendChild(popupMessage);
        const popupButtonsContainer = document.createElement('div');
        popupButtonsContainer.classList.add('popup-buttons-container');
        popup.appendChild(popupButtonsContainer);
        const buttonNewRound = document.createElement('button');
        buttonNewRound.classList.add('popup-button');
        buttonNewRound.setAttribute('id', 'button-new-round');
        buttonNewRound.textContent = 'New Round';
        popupButtonsContainer.appendChild(buttonNewRound);
        const buttonNewGame = document.createElement('button');
        buttonNewGame.classList.add('popup-button');
        buttonNewGame.setAttribute('id', 'button-new-game');
        buttonNewGame.textContent = 'New Game';
        popupButtonsContainer.appendChild(buttonNewGame);
    }

    function openPopup() {
        const boardDiv = document.querySelector('#game-board');
        boardDiv.style.zIndex = 0;
        const popup = document.querySelector('.popup');
        const overlay = document.querySelector('.overlay');
        popup.classList.add('open-popup');
        overlay.classList.add('active');
    }

    function closePopup() {
        const popup = document.querySelector('.popup');
        const overlay = document.querySelector('.overlay');
        popup.classList.remove('open-popup');
        overlay.classList.remove('active');
    }

    printNewRound();

    return {
        playRound,
        getActivePlayer,
        getBoard: board.getBoard,
    };
}

function ScreenController() {
    initializeGame();
    const game = GameController();
    const boardDiv = document.querySelector('#game-board');

    function updateBoard() {
        boardDiv.innerHTML = '';
        const board = game.getBoard();
        board.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                const cellButton = document.createElement('button');
                cellButton.classList.add('cell');
                cellButton.textContent = cell.getValue();
                cellButton.dataset.row = rowIndex;
                cellButton.dataset.column = columnIndex;
                cellButton.addEventListener('click', clickHandlerBoard);
                boardDiv.appendChild(cellButton);
            });
        });
    };

    function clickHandlerBoard(e) {
        const selectedButton = e.target;
        const row = parseInt(selectedButton.dataset.row);
        const column = parseInt(selectedButton.dataset.column);

        if (!isNaN(row) && !isNaN(column)) {
            game.playRound(row, column);
            updateBoard();
        }
    }
    boardDiv.addEventListener('click', clickHandlerBoard);
    updateBoard();
}

ScreenController();