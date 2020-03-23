import { playSound, getIsPlaying, getplayedAll, getSoundArray } from "./renderSound.js";
import { getSArray } from "./difficulty.js";
const $root = $("#game");


var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var recognition = new SpeechRecognition();
let answer = "";
let temp;
let correctSound = new Audio('Sounds/correctAnswer.mp3');
let wrondSound = new Audio('Sounds/wrongAnswer.mp3');
let tries = 0;



export async function setupView() {
  temp = getSArray();
  countdown();
  await sleep(4500); 

  playSound(temp);
  $root.append(renderAnswerBox());
  
  $('#start-record-btn').on('click', function(e) {
      recognition.start();
      e.preventDefault();
    });
}

function renderAnswerBox() {
    let hold = `
        <div>
            <textarea id='answer'>Your answer</textarea>
            <form>
              <button id='start-record-btn'> Start </button>
            </form>
        </div>
    `;
      
    return hold;
}


recognition.onstart = function() { 
  $('#answer').text('Voice recognition activated. Try speaking into the microphone.');
}
recognition.onspeechend = function() {
  $('#answer').text('You were quiet for a while so voice recognition turned itself off.');
  recognition.stop();
}
recognition.onerror = function(event) {
  if(event.error == 'no-speech') {
      $('#answer').text('No speech was detected. Try again.');  
      console.log(event.error);
      console.log(event.message);
  };
}


recognition.onresult = async function(event) {
  let noteContent = "";

  let current = event.resultIndex;

  let transcript = event.results[current][0].transcript;

  noteContent += transcript;
  $('#answer').text(noteContent);
  answer = noteContent;

  let playing = getIsPlaying(temp);

  /**
   * Intent: Deals with player guesses
   * 
   */

  if ( answer.toLowerCase() === playing.name + "s" || playing.name === answer.toLowerCase()) {
    console.log("Correct!");

    document.getElementById("image").src = playing.image;
    playing.audio.pause();
    playing.isPlaying = false;
    correctSound.play();


    let done = getplayedAll(temp);

    if (done) {
      console.log("Congratulations");
    } else {
      await sleep(3000);
      countdown();
      await sleep(4500);
      tries = 0;
      playSound(temp);
    }
    
  } else {
    playing.audio.pause();
    console.log('Wrong');
    wrondSound.play();
    tries++;
    await sleep(1500);
    playing.audio.play();
  }

  if (tries === 3) {
    playing.audio.pause();
    console.log('You Lose!');
  }
}

/**
 * Countdown before you can start guessing
 */
export async function countdown() {
  document.getElementById("image").src = "Pictures/three.jpeg";

  fadeIn();
  await sleep(1500);

  document.getElementById("image").src = "Pictures/two.jpeg";
  fadeIn();

  await sleep(1500);

  document.getElementById("image").src = "Pictures/one.png";
  fadeIn();

  await sleep(1500);

  document.getElementById("image").src = "Pictures/questionMark.jpg";
}

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
 * Helper method to make lines of code pause before continuing
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
