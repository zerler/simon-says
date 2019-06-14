// references to dom objects
const green = document.querySelector('.green');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const blue = document.querySelector('.blue');
const allBlocks = document.querySelector('#all');
const popup = document.querySelector('.popup-wrapper');
const popupText = document.querySelector('.popup-text');
const begin = document.querySelector('a');

// required variables for the game
let colorList = []; // a list of the correct order to press the buttons
let roundColors = [];
let round = 1; // keep track of what round you're on

// create popup to let user know game is starting
popup.style.display = 'block';
popupText.textContent = `ROUND #${round}`;
begin.addEventListener('click', () => {
    popup.style.display = 'none';
    colorIndex = 0;
    nextRound();
});

allBlocks.addEventListener('click', e => {
    // check if the button clicked is the correct next color
    const correct = roundColors.shift();
    if (correct.id === e.target.id){
        if (roundColors.length === 0){
            nextRound();
        }
    } else {
        fail();
    }
});

function nextRound(){

    addRandom();
    showColors();
    roundColors = [...colorList];
    
}

function addRandom(){
    let rand = Math.random() * 4;
    rand = Math.floor(rand);
    
    switch (rand){
        case 0:
            colorList.push(green);
            break;
        case 1:
            colorList.push(red);
            break;
        case 2:
            colorList.push(yellow);
            break;
        case 3:
            colorList.push(blue);
            break;
    }
}

const fail = () => {
    popupText.textContent = 'YOU LOSE! Click anywhere to refresh and try again.';
    begin.textContent = 'RESET';
    popup.style.display = 'block';
    popup.addEventListener('click', () => document.location.reload(true));
};

const showColors = () => nextColor(0);

function nextColor(index){
    if (index === colorList.length){
        return;
    } else {
        colorList[index].style.opacity = .5;
        setTimeout(() => {
            colorList[index].style.opacity = 1;
            nextColor(index+1);
        }, 1000)
    }
}