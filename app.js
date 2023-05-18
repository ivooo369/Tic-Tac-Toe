const playerContainers = document.querySelectorAll('.player-containers');

let selectedSigns = [];

playerContainers.forEach((container, index) => {
    const signs = container.querySelectorAll('.signs');
    signs.forEach(sign => {
        sign.addEventListener('click', function () {
            const isSelected = this.classList.contains('active');
            if (selectedSigns[index]) {
                selectedSigns[index].classList.remove('active');
            }
            if (!isSelected) {
                this.classList.add('active');
                selectedSigns[index] = this;
            } else {
                selectedSigns[index] = null;
            }
        });
    });
});

const Gameboard = {
    gameboardArray: []
};