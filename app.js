const player1_X = document.querySelector('#player1-X');
const player1_O = document.querySelector('#player1-O');
const player2_X = document.querySelector('#player2-X');
const player2_O = document.querySelector('#player2-O');
const startButton = document.querySelector('#start-button');
const startPageContainer = document.querySelector('.start-page-container');
const mainPageContainer = document.querySelector('.main-page-container');
const contestantsNames = document.querySelector('#contestants-names');
const player1Name = document.querySelector('#player1-name');
const player2Name = document.querySelector('#player2-name');
const signs = document.querySelectorAll('.signs');

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
        mainPageContainer.style.display = 'block';
        contestantsNames.innerText = `${player1Name.value} vs ${player2Name.value}`;
    }
});

player1Name.addEventListener('input', () => player1Name.setCustomValidity(''));
player2Name.addEventListener('input', () => player2Name.setCustomValidity(''));

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
    if (player1Name.value === '') {
        player1Name.setCustomValidity('Please enter a name for Player 1.');
        player1Name.reportValidity();
        return false;
    } else if (player2Name.value === '') {
        player2Name.setCustomValidity('Please enter a name for Player 2.');
        player2Name.reportValidity();
        return false;
    }
    if (!(player1Name.value.length >= 3 && player1Name.value.length <= 15)) {
        player1Name.setCustomValidity('The name of the player must be between 3 and 15 characters.');
        player1Name.reportValidity();
        return false;
    } else if (!(player2Name.value.length >= 3 && player2Name.value.length <= 15)) {
        player2Name.setCustomValidity('The name of the player must be between 3 and 15 characters.');
        player2Name.reportValidity();
        return false;
    }
    return true;
}

function validateSignSelection() {
    if (!(player1_X.classList.contains('active') || player1_O.classList.contains('active')) &&
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
