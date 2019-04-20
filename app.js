// Game Function
//
// player guesses a number
// player gets a certain amount of guesses
// notify player of guesses remaining
// let the player chose to play again

//Game Values
let min=1,
    max=10,
    winningNum = getRandomNum(min,max),
    guessesLeft = 3;

//UI element
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

//Assign ui min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play again event listener
game.addEventListener('mousedown',function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
})

//Listen for guess
guessBtn.addEventListener('click',function(){
  let guess = parseInt(guessInput.value);

  // Validate
  if(isNaN(guess) || guess<min || guess>max){
    setMessage(`Please enter a number between ${min} and ${max}`,'red');
  }

  //check if won
  if(guess === winningNum){
    //Game over won

    gameOver(true,`${winningNum} is correct, YOU WIN!`)
  }
  else{
    //Wrong guess
    guessesLeft -= 1;

    if(guessesLeft === 0){
      //Game over Lost

      gameOver(false,` Game Over , you lost. The correct answer was ${winningNum}`);
    }
    else{
      //Game continues - answer wrong

      //Change border
      guessInput.style.borderColor = 'red';

      //Clear input
      guessInput.value='';

      //set message
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`,'red');
    }
  }
});

//Game Over
function gameOver(won,msg){
  let color;
  won === true ? color = 'green' : color = 'red';
  //Disabel input
  guessInput.disabled = true;
  //Change border
  guessInput.style.borderColor = color;
  //text color
  message.style.color = color;
  //Set Message
  setMessage(msg);

  //Play Again
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}


//Get winning num
function getRandomNum(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

//Set Message
function setMessage(msg,color){
  message.style.color = color;
  message.textContent = msg;
}
