
// DOM Selection
let heading = document.querySelector('h1');
let diceImg1 = document.getElementById('img1');
let diceImg2 = document.getElementById('img2');


// Functions
function randomInteger1(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomInteger2(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Variables of functions
let rN1 = randomInteger1(1 ,6);
let rN2 = randomInteger2(1, 6);


// Change Image Dynamically
diceImg1.setAttribute('src', `img/dice${rN1}.png`);
diceImg2.setAttribute('src', `img/dice${rN2}.png`);


// Console log to check!
console.log(rN1);
console.log(rN2);


// Result Declaration
if (rN1 === rN2) {
	heading.innerHTML = "Match Draw!";
} else if (rN1 > rN2 && rN2 < rN1) {
	heading.innerHTML = "Player 1 Wins!";
} else if (rN2 > rN1 && rN1 < rN2) {
	heading.innerHTML = "Player 2 Wins!";
} else {
	heading.innerHTML = "Refresh Me";
}

