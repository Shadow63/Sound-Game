import { playSound, getIsPlaying, getplayedAll, getSoundArray } from "./renderSound.js";
import { getSArray } from "./difficulty.js";
const $root = $("#game");


var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var recognition = new SpeechRecognition();
let answer = "";
let temp;


export function setupView() {
  temp = getSArray();
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
            <textarea id='answer'>
               
            </textarea>
            <form>
              <button id='start-record-btn'> Start </button>
            </form>
        </div>
    `;
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
      recognition.onresult = function(event) {
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

          let done = getplayedAll(temp);
          if (done) {
            console.log("Congratulations");
          } else {
            playSound(temp);
          }
          
        }
      }

    return hold;
}

export function getAnswer() {
  return answer;
};


