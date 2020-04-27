import { playSound, getIsPlaying, getplayedAll} from "./rendersound.js";
import { getSArray, getDifficulty, readOutLoud } from "./difficulty.js";
const $root = $("#game");


var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var recognition = new SpeechRecognition();
let answer = "";
let d;
let temp;
let tries = 0;
let win = "GAME OVER";

let correctSound = new Audio('assets/Sounds/correctAnswer.mp3');
let wrondSound = new Audio('assets/Sounds/wrongAnswer.mp3');
let won = new Audio('assets/Sounds/win.mp3');
let lose = new Audio('assets/Sounds/lose.mp3');



/**
 * Sets up what is seen on the screen as well as starts the game
 * Also handles start guess click
 */
export async function setupView() {
  temp = getSArray();
  d = getDifficulty();
  countdown();
  await sleep(4500); 

  playSound(temp);
  $root.append(renderAnswerBox());
  document.getElementById("start-record-btn").focus();  
  
  $('#start-record-btn').on('click', function(e) {
      recognition.start();
      e.preventDefault();
    });
}

/**
 * Renders the answer box where the players guesses goes as well as the start guess button
 */
function renderAnswerBox() {
    let hold = `
        <div id="ans">
            <textarea id='answer' style="resize:none">Your answer</textarea>
            <form>
              <button id='start-record-btn'> Guess! </button>
            </form>
        </div>
    `;
    return hold;
}

/**
 * Recognition functions to handles some possible errors
 */
recognition.onstart = function() { 
  $('#answer').text('Voice recognition activated. Try speaking into the microphone.');
}
recognition.onspeechend = function() {
  $('#answer').text('You were too quiet, please try again.');
  recognition.stop();
}
recognition.onerror = function(event) {
  if(event.error == 'no-speech') {
      $('#answer').text('No speech was detected. Try again.');  
      console.log(event.error);
      console.log(event.message);
      readOutLoud("No speech was detected. Try again.");
  };
}

/**
 * Recognition function where everything is handled, such as
 * 1) Continues the game when guess is correct
 * 2) Handle games loss/win
 * 3) Gets the result from player's guess
 */
recognition.onresult = async function(event) {
  let noteContent = "";

  let current = event.resultIndex;

  let transcript = event.results[current][0].transcript;

  noteContent += transcript;
  $('#answer').text(noteContent);
  answer = noteContent;

  let playing = getIsPlaying(temp);
 
  /**
   * This part handles the game correct/incorrect and win/loss
   */

  if ( answer.toLowerCase() === playing.name + "s" || playing.name === answer.toLowerCase()) {

    document.getElementById("image").src = playing.image;
    playing.audio.pause();
    playing.isPlaying = false;
    correctSound.play();


    let done = getplayedAll(temp);

    if (done) {
      win = "YOU WIN!";
      renderGameComplete();
      won.play();
      readOutLoud(win);
    } else {

      await sleep(3000);
      $("#ans").remove();
      countdown();
      await sleep(4500);
      $root.append(renderAnswerBox());
      document.getElementById("start-record-btn").focus();  
      $('#start-record-btn').on('click', function(e) {
          recognition.start();
          e.preventDefault();
        });

      if (d == "easy" || d == "medium") {
        tries = 0;
      }

      playSound(temp);
    }
    
  } else {

    playing.audio.pause();
    wrondSound.play();
    
    await sleep(1500);

    
    
    if (d === "easy") {
      readOutLoud("Hint "+ (tries + 1) + ", " + playing.Hints[tries]);
      await sleep(5000);
      playing.audio.play();

    } else if (d === "medium") {
      readOutLoud("Hint " + playing.Hints[0]);
      await sleep(5000);
      playing.audio.play();
    } else if (d === "hard") {
      playing.audio.play();
    }

    if (tries === 2) {
      playing.audio.pause();
      renderGameComplete();
      lose.play();
      readOutLoud("Game Over!");
    }

    tries++;
  }
  
}

/**
 * Countdown before you can start guessing
 */
export async function countdown() {
  document.getElementById("image").src = "assets/Pictures/three.jpeg";

  fadeIn();
  await sleep(1500);

  document.getElementById("image").src = "assets/Pictures/two.jpeg";
  fadeIn();

  await sleep(1500);

  document.getElementById("image").src = "assets/Pictures/one.png";
  fadeIn();

  await sleep(1500);

  document.getElementById("image").src = "assets/Pictures/questionMark.jpg";
}

/**
 * Gets the answer 
 */
export function getAnswer() {
  return answer;
};

/**
 * Does the animation of countdown, making the numbers come in
 */
async function fadeIn() {
let elem = document.getElementById("image");
let height = 0;
let width = 0;
let id = setInterval(frame, 1);
function frame() {
  if (height === 300 && width === 300) {
    clearInterval(id);
  } else {
    height++;
    width++;
    elem.style.height = height + 'px';
    elem.style.width = width + 'px';
  }
}
}

/**
 * Helper function to make lines of code pause before continuing
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Renders win and lose screens
 */
function renderGameComplete() {
  let victory = `
    <div id="game-done"> 
      <div id="setWinLose" class="is-size-1"> ` + win + ` </div>

      <div>
      <button id="restart-btn" onClick="window.location.reload()" > Restart </button>
      </div>

    </div>
  `;

  $("#ans").remove();
  $("#image").remove();
  $root.append(victory);

  $("#restart-btn").focus();
}