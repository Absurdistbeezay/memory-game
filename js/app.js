/*
 * Create a list that holds all of your cards
 */
const card = document.getElementsByClassName('card');
let cards = [...card];
const deck = document.querySelector('.deck');


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

let shuffledCards = shuffle(cards);

//listen event click and run functions
for (let shuffledCard of shuffledCards) {
    shuffledCard.addEventListener('click', function () {
        this.classList.toggle('open');
        this.classList.toggle('show');
    });
    shuffledCard.addEventListener('click', clickedCards);
}


let openedCards = [];
let triggerTime = 0;
let matchCount = 0;
let matchedCards = [];
let moves = 0;
function clickedCards(e) {
    openedCards.push(this);

    // trigger timer once clicked
    triggerTime++;

    if (triggerTime === 1) {
        startTimer();
    }

    if (openedCards.length === 2) {
        moves++;
        document.querySelector('.moves').innerHTML = moves;
        starRating();
        if (openedCards[0].innerHTML === openedCards[1].innerHTML) {
            matchCount++;
            matchedCards.push(openedCards[0]);
            matchedCards.push(openedCards[1]);
            if (matchCount === 8) {
                clearInterval();
                displayResult();
            }
            openedCards[0].classList.add('match');
            openedCards[1].classList.add('match');
            openedCards[0].classList.remove('show', 'open');
            openedCards[1].classList.remove('show', 'open');
            openedCards = [];
        }
        else {
            openedCards[0].classList.add('unmatched')
            openedCards[1].classList.add('unmatched')

            setTimeout(function () {
                openedCards[0].classList.remove('open', 'show');
                openedCards[1].classList.remove('open', 'show');
                openedCards = [];
            },
                500
            )
        }
    }

}

//startTime Function
let timeTick;
let time = '00:00';
let seconds = 0;
let minutes = 0;
let hours = 0;
const timer = document.querySelector('.timer');
function startTimer() {
    clearInterval();
    timeTick = setInterval(function () {
        timer.textContent = time;
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
            if (minutes === 60) {
                minutes = 0;
                seconds = 0;
            }
        }
        timer.textContent =
            (minutes < 10 ? '0' + minutes.toString() : minutes) +
            ':' +
            (seconds < 10 ? '0' + seconds.toString() : seconds)
    }, 1000)
}

const changeMovesNumber = document.querySelector('.moves');

//starRating Function
let starN = '';
const oneStar = document.getElementById('one');
const twoStar = document.getElementById('two');
const threeStar = document.getElementById('three');

function starRating() {
    if (moves > 8 && moves < 12) {
        starN = '<i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i>';
    }

    if (moves > 12 && moves < 22) {
        threeStar.style.display = 'none';
        starN = '<i class="fa fa-star"></i> <i class="fa fa-star"></i>';
    }

    if (moves > 22) {
        twoStar.style.display = 'none';
        starN = '<i class="fa fa-star"></i>';
    }
}

//restart game
const restart = document.querySelector('.restart');
restart.addEventListener('click', function () {
    shuffle(cards);
    newGame();
});

const moveCounter = document.querySelector('.moves')
//newGame Function
function newGame() {
    for (let i = 0; i < shuffledCards.length; i++) {
        deck.appendChild(shuffledCards[i])
        shuffledCards[i].classList.remove('show', 'open', 'match')
    }

    //set variables to initial state
    matchCount = 0;
    triggerTime = 0;
    openedCards = [];
    modalMessage.innerHTML = '';

    // set moves to "0"
    moves = 0;
    moveCounter.textContent = moves;
    // set timer to "00:00"
    seconds = 0;
    minutes = 0;
    hours = 0;
    const timer = document.querySelector('.timer');
    timer.innerHTML = '00:00';
    clearInterval(timeTick);

    threeStar.style.display = 'inline';
    twoStar.style.display = 'inline';

}

const modalMessage = document.createElement('p');
const modal = document.querySelector('.modal');

//display Result Stat function
function displayResult() {

    modalMessage.innerHTML = `
    <h3>Congratulations!!</h3>
    <p>
    Total Time: <strong>${timer.textContent}</strong>
    <br>
    Total Moves: <strong>${moves}</strong>
    <br> 
    Total Stars: <strong>${starN}</strong> 
    </p>
    `
    modalMessage.classList.add('modal-text');
    document.getElementById('modalHeading').appendChild(modalMessage);
    modal.style.display = 'block';
}

//restart game when 'play again' clicked
const playAgain = document.getElementById('playAgain');
playAgain.addEventListener('click', function () {
    modal.style.display = 'none';
    shuffle(cards);
    newGame();
});

//new game on load
document.body.onload = newGame();


