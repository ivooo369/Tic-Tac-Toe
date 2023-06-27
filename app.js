const playerOne_X = document.querySelector('#playerOne-X');
const playerOne_O = document.querySelector('#playerOne-O');
const playerTwo_X = document.querySelector('#playerTwo-X');
const playerTwo_O = document.querySelector('#playerTwo-O');
const inputPlayerOneName = document.querySelector('#input-playerOne-name');
const inputPlayerTwoName = document.querySelector('#input-playerTwo-name');
const signs = document.querySelectorAll('.signs');
const counterTotalRounds = document.querySelector('#counter-total-rounds');
const counterPlayerOneScore = document.querySelector('#counter-playerOne-score');
const counterPlayerTwoScore = document.querySelector('#counter-playerTwo-score');
const counterNumberOfTies = document.querySelector('#counter-number-of-ties');
const boardDiv = document.querySelector('#game-board');

const Interface = () => {
    const startPageContainer = document.querySelector('.start-page-container');
    const mainPageContainer = document.querySelector('.main-page-container');

    let isPlayerOne_X = false;
    let isPlayerOne_O = false;
    let isPlayerTwo_X = false;
    let isPlayerTwo_O = false;
    let playerOneChoice = '';
    let playerTwoChoice = '';

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
    };

    function handleEventListeners() {
        const startButton = document.querySelector('#start-button');
        const exitButton = document.querySelector('#exit-button');
        const buttonNewRound = document.querySelector('#button-new-round');
        const buttonNewGame = document.querySelector('#button-new-game');

        playerOne_X.addEventListener('click', () => {
            signs.forEach(sign => sign.style.border = '');
            isPlayerOne_X = true;
            isPlayerOne_O = false;
            isPlayerTwo_X = false;
            isPlayerTwo_O = false;
            selectSign();
        });

        playerOne_O.addEventListener('click', () => {
            signs.forEach(sign => sign.style.border = '');
            isPlayerOne_O = true;
            isPlayerOne_X = false;
            isPlayerTwo_X = false;
            isPlayerTwo_O = false;
            selectSign();
        });

        playerTwo_X.addEventListener('click', () => {
            signs.forEach(sign => sign.style.border = '');
            isPlayerTwo_X = true;
            isPlayerOne_X = false;
            isPlayerOne_O = false;
            isPlayerTwo_O = false;
            selectSign();
        });

        playerTwo_O.addEventListener('click', () => {
            signs.forEach(sign => sign.style.border = '');
            isPlayerTwo_O = true;
            isPlayerOne_X = false;
            isPlayerOne_O = false;
            isPlayerTwo_X = false;
            selectSign();
        });

        startButton.addEventListener('click', playNewRound);
        exitButton.addEventListener('click', () => {
            createExitPopup();
            const buttonYes = document.querySelector('#button-yes');
            const buttonNo = document.querySelector('#button-no');
            if (buttonYes) {
                buttonYes.addEventListener('click', () => {
                    leaveGame();
                    closeExitPopup();
                });
            } if (buttonNo) {
                buttonNo.addEventListener('click', () => {
                    closeExitPopup();
                });
            }
            openExitPopup();
        });

        if (buttonNewRound) {
            buttonNewRound.addEventListener('click', () => {
                handleEventListeners();
                playNewRound();
                closeResultPopup();
            });
        } if (buttonNewGame) {
            buttonNewGame.addEventListener('click', () => {
                handleEventListeners();
                leaveGame();
                closeResultPopup();
            });
        }

        inputPlayerOneName.addEventListener('input', () => inputPlayerOneName.setCustomValidity(''));
        inputPlayerTwoName.addEventListener('input', () => inputPlayerTwoName.setCustomValidity(''));
    }

    function playNewRound() {
        const spanPlayerOneName = document.querySelector('#span-playerOne-name');
        const spanPlayerTwoName = document.querySelector('#span-playerTwo-name');
        const playerOneScore = document.querySelector('#playerOne-score');
        const numberOfTies = document.querySelector('#number-of-ties');
        const playerTwoScore = document.querySelector('#playerTwo-score');

        const validation = Validation();

        switchPlayerSign();

        if (validation.validateNames() && validation.validateSignSelection()) {
            startPageContainer.style.display = 'none';
            mainPageContainer.style.display = 'flex';
            spanPlayerOneName.textContent = `${inputPlayerOneName.value}`;
            spanPlayerTwoName.textContent = `${inputPlayerTwoName.value}`;
            playerOneScore.textContent = inputPlayerOneName.value;
            numberOfTies.textContent = 'Ties';
            playerTwoScore.textContent = inputPlayerTwoName.value;
            const game = GameController(inputPlayerOneName.value, inputPlayerTwoName.value, playerOneChoice, playerTwoChoice);

            function updateScreen() {
                boardDiv.textContent = '';
                const board = game.getBoard();
                board.forEach((row, rowIndex) => {
                    row.forEach((cell, columnIndex) => {
                        const cellButton = document.createElement('button');
                        cellButton.classList.add('cell');
                        cellButton.textContent = cell.getValue();
                        cellButton.addEventListener('click', (e) => clickHandlerBoard(e, rowIndex, columnIndex));
                        boardDiv.appendChild(cellButton);
                    });
                });
            };

            function clickHandlerBoard(e, row, column) {
                const cellButton = e.target;
                if (cellButton.classList.contains('cell')) {
                    game.playMove(row, column);
                    updateScreen();
                }
            }

            updateScreen();
        }
    }

    function switchPlayerSign() {
        switch (true) {
            case playerOne_X.classList.contains('active'):
                playerOneChoice = 'X';
                playerTwoChoice = 'O';
                break;
            case playerOne_O.classList.contains('active'):
                playerOneChoice = 'O';
                playerTwoChoice = 'X';
                break;
        }

        switch (parseInt(counterTotalRounds.textContent) % 2 === 1) {
            case playerOneChoice === 'X':
                playerOneChoice = 'O';
                playerTwoChoice = 'X';
                break;
            case playerOneChoice === 'O':
                playerOneChoice === 'X';
                playerTwoChoice === 'O';
                break;
        }
    }

    function leaveGame() {
        mainPageContainer.style.display = 'none';
        startPageContainer.style.display = 'flex';
        inputPlayerOneName.value = '';
        inputPlayerTwoName.value = '';
        counterTotalRounds.textContent = 0;
        counterPlayerOneScore.textContent = 0;
        counterPlayerTwoScore.textContent = 0;
        counterNumberOfTies.textContent = 0;
        signs.forEach(sign => {
            sign.classList.remove('active');
            sign.style.border = '';
        });
    }

    function removeExistingResultPopups() {
        const existingResultPopups = document.querySelectorAll('.result-popup');
        existingResultPopups.forEach(popup => popup.remove());
    }

    function createResultPopup(isTie, activePlayer) {
        removeExistingResultPopups();
        const resultPopup = document.createElement('div');
        resultPopup.classList.add('result-popup');
        mainPageContainer.appendChild(resultPopup);
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        mainPageContainer.appendChild(overlay);
        const resultPopupMessage = document.createElement('h1');
        resultPopupMessage.classList.add('popup-message');
        if (isTie) {
            resultPopupMessage.textContent = "It's a tie!";
        } else {
            resultPopupMessage.textContent = `${activePlayer.name} wins this round!`;
        }
        resultPopup.appendChild(resultPopupMessage);
        const resultPopupButtonsContainer = document.createElement('div');
        resultPopupButtonsContainer.classList.add('popup-buttons-container');
        resultPopup.appendChild(resultPopupButtonsContainer);
        const buttonNewRound = document.createElement('button');
        buttonNewRound.classList.add('popup-buttons');
        buttonNewRound.setAttribute('id', 'button-new-round');
        buttonNewRound.textContent = 'New Round';
        resultPopupButtonsContainer.appendChild(buttonNewRound);
        const buttonNewGame = document.createElement('button');
        buttonNewGame.classList.add('popup-buttons');
        buttonNewGame.setAttribute('id', 'button-new-game');
        buttonNewGame.textContent = 'New Game';
        resultPopupButtonsContainer.appendChild(buttonNewGame);
    }

    function openResultPopup() {
        const resultPopup = document.querySelector('.result-popup');
        const overlay = document.querySelector('.overlay');
        boardDiv.style.zIndex = 0;
        resultPopup.classList.add('open-result-popup');
        overlay.classList.add('active');
    }

    function closeResultPopup() {
        const resultPopup = document.querySelector('.result-popup');
        const overlay = document.querySelector('.overlay');
        resultPopup.classList.remove('open-result-popup');
        overlay.classList.remove('active');
    }

    function createExitPopup() {
        const exitPopup = document.createElement('div');
        exitPopup.classList.add('exit-popup');
        mainPageContainer.appendChild(exitPopup);
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        mainPageContainer.appendChild(overlay);
        const exitPopupMessage = document.createElement('h1');
        exitPopupMessage.classList.add('popup-message');
        exitPopupMessage.textContent = 'Are you sure you want to leave the game?';
        exitPopup.appendChild(exitPopupMessage);
        const exitPopupButtonsContainer = document.createElement('div');
        exitPopupButtonsContainer.classList.add('popup-buttons-container');
        exitPopup.appendChild(exitPopupButtonsContainer);
        const buttonYes = document.createElement('button');
        buttonYes.classList.add('popup-buttons');
        buttonYes.setAttribute('id', 'button-yes');
        buttonYes.textContent = 'Yes';
        exitPopupButtonsContainer.appendChild(buttonYes);
        const buttonNo = document.createElement('button');
        buttonNo.classList.add('popup-buttons');
        buttonNo.setAttribute('id', 'button-no');
        buttonNo.textContent = 'No';
        exitPopupButtonsContainer.appendChild(buttonNo);
    }

    function openExitPopup() {
        const exitPopup = document.querySelector('.exit-popup');
        const overlay = document.querySelector('.overlay');
        boardDiv.style.zIndex = 0;
        exitPopup.classList.add('open-exit-popup');
        overlay.classList.add('active');
    }

    function closeExitPopup() {
        const exitPopup = document.querySelector('.exit-popup');
        const overlay = document.querySelector('.overlay');
        exitPopup.classList.remove('open-exit-popup');
        overlay.classList.remove('active');
    }
    return { handleEventListeners, createResultPopup, openResultPopup };
};

const Validation = () => {
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
    return { validateNames, validateSignSelection };
};

const Gameboard = () => {
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
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    };
    return { getBoard, placeSign, printBoard, checkWinner };
};

const Cell = () => {
    let value = '';
    const placeSign = (sign) => value = sign;
    const getValue = () => value;

    return { placeSign, getValue };
};

const GameController = (playerOneName, playerTwoName, playerOneChoice, playerTwoChoice) => {
    const playerTurnDiv = document.querySelector('#player-turn');

    const board = Gameboard();
    const interface = Interface();

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
        playerTurnDiv.textContent = `${activePlayer.name}'s turn`;
    };

    function playMove(row, column) {
        let isTie = false;

        if (checkWinner()) {
            return;
        }
        const signPlaced = board.placeSign(row, column, getActivePlayer().sign);
        if (signPlaced) {
            if (checkWinner()) {
                playerTurnDiv.textContent = `${activePlayer.name} wins!`;
                counterTotalRounds.textContent = parseInt(counterTotalRounds.textContent) + 1;
                if (activePlayer.name === playerOneName) {
                    isTie = false;
                    counterPlayerOneScore.textContent = parseInt(counterPlayerOneScore.textContent) + 1;
                    interface.createResultPopup(isTie, activePlayer);
                    interface.openResultPopup();
                    interface.handleEventListeners();
                    return;
                } else if (activePlayer.name === playerTwoName) {
                    isTie = false;
                    counterPlayerTwoScore.textContent = parseInt(counterPlayerTwoScore.textContent) + 1;
                    interface.createResultPopup(isTie, activePlayer);
                    interface.openResultPopup();
                    interface.handleEventListeners();
                    return;
                }
                return;
            }
            if (checkForTie()) {
                isTie = true;
                playerTurnDiv.textContent = "It's a tie!";
                counterTotalRounds.textContent = parseInt(counterTotalRounds.textContent) + 1;
                counterNumberOfTies.textContent = parseInt(counterNumberOfTies.textContent) + 1;
                interface.createResultPopup(isTie, activePlayer);
                interface.openResultPopup();
                interface.handleEventListeners();
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

    printNewRound();

    return { getBoard: board.getBoard, playMove };
};

const ScreenController = () => {
    const game = GameController();
    const interface = Interface();

    interface.handleEventListeners();

    function updateBoard() {
        boardDiv.textContent = '';
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
            game.playMove(row, column);
            updateBoard();
        }
    }
    boardDiv.addEventListener('click', clickHandlerBoard);
    updateBoard();
};

ScreenController();