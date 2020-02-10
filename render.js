import { playSound, getIsPlaying, soundArray} from "./renderSound.js";
const $root = $("#game");


var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var recognition = new SpeechRecognition();
let answer = "";
console.log(soundArray);
//console.log(playing)

export function setupView() {
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
        // event is a SpeechRecognitionEvent object.
        // It holds all the lines we have captured so far. 
        // We only need the current one.
        let current = event.resultIndex;
      
        // Get a transcript of what was said.
        let transcript = event.results[current][0].transcript;
      
        // Add the current transcript to the contents of our Note.
        noteContent += transcript;
        $('#answer').text(noteContent);
        answer = noteContent;

        let playing = getIsPlaying();
        /**
         * Intent: Deals with player guesses
         * 
         */
        console.log(playing);
        if ( answer.toLowerCase() === playing.name + "s" || playing.name === answer.toLowerCase()) {
          console.log("Correct!");
          
          $("#picture").append(playing.image);
          playing.audio.pause();
          playing.isPlaying = false;
          playSound();
          
        }
      }

    return hold;
}

export function getAnswer() {
  return answer;
};

// $(function() {
//     setupView();
//   });

