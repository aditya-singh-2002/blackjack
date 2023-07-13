//define cards
let deck = [];
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

for (let suit of suits) {
  for (let rank of ranks) {
    let card = rank + ' ' + suit;
    deck.push(card);
  }
}

let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let gameOver = false;

//function to start game
function startGame() {
  deck = shuffleDeck(deck);
  playerHand = [getNextCard(), getNextCard()];
  dealerHand = [getNextCard(), getNextCard()];
  playerScore = getHandScore(playerHand);
  dealerScore = getHandScore(dealerHand);
  gameOver = false;

  document.getElementById('result').textContent = '';
  document.getElementById('player-hand').textContent = 'Player Hand: ' + playerHand.join(', ');
  document.getElementById('dealer-hand').textContent = 'Dealer Hand: ' + dealerHand[0] + ' _';
}

//function to shuffle the deck
function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

//get the next card from the deck
function getNextCard() {
  return deck.shift();
}

//function to calculate hand
function getHandScore(hand) {
  let score = 0;
  let hasAce = false;

//function which allows ace to be a 1 or 11
for (let card of hand) {
  let rank = card.split(' ')[0];
  if (rank === 'A') {
    score += 11;
    hasAce = true;
  } else if (['K', 'Q', 'J'].includes(rank)) {
    score += 10;
  } else {
    score += parseInt(rank);
  }
}

if (score > 21 && hasAce) {
  score -= 10;
}
  return score;
}

//function for hitting
function hit() {
  if (!gameOver) {
    playerHand.push(getNextCard());
    playerScore = getHandScore(playerHand);
    document.getElementById('player-hand').textContent = 'Player Hand: ' + playerHand.join(',');

    if (playerScore > 21) {
      gameOver = true;
      document.getElementById('result').textContent = 'You Bust! Dealer Wins!';
    }
  }
}

//function for standing
function stand() {
  if (!gameOver) {

    while (dealerScore < 17) {
      dealerHand.push(getNextCard());
      dealerScore = getHandScore(dealerHand);
      document.getElementById('dealer-hand').textContent = 'Dealer Hand: ' + dealerHand.join(', ');
    }

    if (dealerScore > 21 || dealerScore < playerScore) {
      document.getElementById('result').textContent = 'You Win!';
    } else if (dealerScore > playerScore) {
      document.getElementById('result').textContent = 'Dealer Wins!';
    } else {
      document.getElementById('result').textContent = 'Push! It\'s a tie!';
    }

    gameOver = true;
  }
}
