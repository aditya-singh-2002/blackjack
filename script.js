//Define cards
let deck = [];
const suits= ['Hearts, 'Diamonds, 'Clubs', 'Spades'];
const ranks= ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

for (let suit of suits){
  for (let rank of ranks){
    let card= rank + ' ' + suit;
    deck.push(card);
  }
}

let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let gameOver = false;

//function to start game
function startGame(){
  deck = shuffleDeck(deck);
  playerHand = [getNextCard(), getNextCard()];
  dealerHand = [getNextCard(), getNextCard()];
  playerScore = getHandScore(playerHand);
  dealerScore = getHandScore(dealerHand);
  gameOver = false;

document.getElementById('result').textContent = ' ';
document.getElementById('player-hand').textContent = 'Player Hand: ' + playerHand.join(',');
document.getElementByID('dealer-hand').textContent = 'Dealer Hand: ' + dealerHand[0] + ', _ ';
}

//function to shuffle the deck
