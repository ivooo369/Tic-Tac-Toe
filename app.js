const player1_X = document.querySelector('#player1-X');
const player1_O = document.querySelector('#player1-O');
const player2_X = document.querySelector('#player2-X');
const player2_O = document.querySelector('#player2-O');

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

const Gameboard = {
    gameboardArray: []
};
