const player1_X = document.querySelector('#player1-X');
const player1_O = document.querySelector('#player1-O');
const player2_X = document.querySelector('#player2-X');
const player2_O = document.querySelector('#player2-O');
const startButton = document.querySelector('#start-button');
const startPageContainer = document.querySelector('.start-page-container');
const mainPageContainer = document.querySelector('.main-page-container');
const contestantsNames = document.querySelector('#contestants-names');
const inputPlayer1Name = document.querySelector('#input-player1-name');
const inputPlayer2Name = document.querySelector('#input-player2-name');
const spanPlayer1Name = document.querySelector('#span-player1-name');
const spanPlayer2Name = document.querySelector('#span-player2-name');
const signs = document.querySelectorAll('.signs');
const player1Score = document.querySelector('#player1-score');
const numberOfTies = document.querySelector('#number-of-ties');
const player2Score = document.querySelector('#player2-score');
const exit = document.querySelector('#exit');

let isPlayer1_X = false;
let isPlayer1_O = false;
let isPlayer2_X = false;
let isPlayer2_O = false;

player1_X.addEventListener('click', function () {
    isPlayer1_X = true;
    isPlayer1_O = false;
    isPlayer2_X = false;
    isPlayer2_O = false;
    selectSign();
});

player1_O.addEventListener('click', function () {
    isPlayer1_O = true;
    isPlayer1_X = false;
    isPlayer2_X = false;
    isPlayer2_O = false;
    selectSign();
});

player2_X.addEventListener('click', function () {
    isPlayer2_X = true;
    isPlayer1_X = false;
    isPlayer1_O = false;
    isPlayer2_O = false;
    selectSign();
});

player2_O.addEventListener('click', function () {
    isPlayer2_O = true;
    isPlayer1_X = false;
    isPlayer1_O = false;
    isPlayer2_X = false;
    selectSign();
});

startButton.addEventListener('click', function (e) {
    if (validateNames() && validateSignSelection()) {
        e.preventDefault();
        startPageContainer.style.display = 'none';
        mainPageContainer.style.display = 'flex';
        spanPlayer1Name.innerText = `${inputPlayer1Name.value}`;
        spanPlayer2Name.innerText = `${inputPlayer2Name.value}`;
        player1Score.innerText = inputPlayer1Name.value;
        numberOfTies.innerText = 'Ties';
        player2Score.innerText = inputPlayer2Name.value;
    }
});

inputPlayer1Name.addEventListener('input', () => inputPlayer1Name.setCustomValidity(''));
inputPlayer2Name.addEventListener('input', () => inputPlayer2Name.setCustomValidity(''));

exit.addEventListener('click', function () {
    mainPageContainer.style.display = 'none';
    startPageContainer.style.display = 'flex';
    inputPlayer1Name.value = '';
    inputPlayer2Name.value = '';
    signs.forEach(sign => {
        sign.classList.remove('active');
    });
});

function selectSign() {
    if (isPlayer1_X) {
        player1_X.classList.toggle('active');
        player1_O.classList.remove('active');
        player2_X.classList.remove('active');
    } else if (isPlayer1_O) {
        player1_O.classList.toggle('active');
        player1_X.classList.remove('active');
        player2_O.classList.remove('active');
    } else if (isPlayer2_X) {
        player2_X.classList.toggle('active');
        player1_X.classList.remove('active');
        player2_O.classList.remove('active');
    } else if (isPlayer2_O) {
        player2_O.classList.toggle('active');
        player1_O.classList.remove('active');
        player2_X.classList.remove('active');
    }
}

function validateNames() {
    if (inputPlayer1Name.value === '') {
        inputPlayer1Name.setCustomValidity('Please enter a name for Player 1.');
        inputPlayer1Name.reportValidity();
        return false;
    } else if (inputPlayer2Name.value === '') {
        inputPlayer2Name.setCustomValidity('Please enter a name for Player 2.');
        inputPlayer2Name.reportValidity();
        return false;
    } else if (inputPlayer1Name.value === inputPlayer2Name.value) {
        inputPlayer2Name.setCustomValidity('Please enter different names for both players.');
        inputPlayer2Name.reportValidity();
        return false;
    }
    if (!(inputPlayer1Name.value.length >= 3 && inputPlayer1Name.value.length <= 15)) {
        inputPlayer1Name.setCustomValidity('The name of the player must be between 3 and 15 characters.');
        inputPlayer1Name.reportValidity();
        return false;
    } else if (!(inputPlayer2Name.value.length >= 3 && inputPlayer2Name.value.length <= 15)) {
        inputPlayer2Name.setCustomValidity('The name of the player must be between 3 and 15 characters.');
        inputPlayer2Name.reportValidity();
        return false;
    }
    return true;
}

function validateSignSelection() {
    if (!(player1_X.classList.contains('active') || player1_O.classList.contains('active')) ||
        !(player2_X.classList.contains('active') || player2_O.classList.contains('active'))) {
        signs.forEach(sign => {
            sign.style.border = '3px solid red';
        });
        return false;
    }
    return true;
}

const Gameboard = {
    gameboardArray: []
};
