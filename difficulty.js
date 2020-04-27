import { setupView, countdown } from "./render.js";
import { renderImage, playSound, getSoundArray} from "./rendersound.js";

const $root = $("#game");
let difficulty = "";
let temp;

function renderDifficultyButtons() {
    let difficulty = `
        <div>
            <button class="button is-large" id="easy-button" style="height:100px;width:200px"> Easy </button>
        </div>

        <br>

        <div>
            <button class="button is-large" id="medium-button" style="height:100px;width:200px"> Medium </button>
        </div>

        <br>

        <div>
            <button class="button is-large" id="hard-button" style="height:100px;width:200px"> Hard </button>
        </div>

        <br>
    `;
    $root.append(difficulty);

}

//To Add: Using selected an selectable class

function difficultySelect() {
    $('#easy-button').on('click', function(e) {
        $(`#easy-button`).remove();
        $(`#medium-button`).remove();
        $(`#hard-button`).remove();
        $(`#header`).remove();

        difficulty = "easy";
        temp = getSoundArray();
        
        renderImage();
        countdown();
        setupView();
       
        e.preventDefault();
      });

      $('#medium-button').on('click', function(e) {
        $(`#easy-button`).remove();
        $(`#medium-button`).remove();
        $(`#hard-button`).remove();
        $(`#header`).remove();

        difficulty = "medium"; 
        temp = getSoundArray();

        renderImage();
        setupView();
        e.preventDefault();
      });

      $('#hard-button').on('click', function(e) {
        $(`#easy-button`).remove();
        $(`#medium-button`).remove();
        $(`#hard-button`).remove();
        $(`#header`).remove();

        difficulty = "hard";
        temp = getSoundArray();

        renderImage();
        setupView();
       

        e.preventDefault();
      });

      $('#easy-button').focus();
      readOutLoud("Easy");
}

renderDifficultyButtons();
difficultySelect();

export function getDifficulty() {
    return difficulty;
}

export function getSArray() {
    return temp;
}

/**
 * Intent: To select the buttons by using arrow key presses instead of clicking
 * 40 - Down ; 38 - Up
 * Also outputs audio for the currently selected difficulty
 */
$('#game').on('keydown', '#easy-button', function(e) {
    if (e.keyCode === 40) {
        $('#medium-button').focus();
        readOutLoud("Medium");
    } else if (e.keyCode === 38) {
        $('#hard-button').focus();
        readOutLoud("Hard");
    }
});

$('#game').on('keydown', '#medium-button', function(e) {
    if (e.keyCode === 40) {
        $('#hard-button').focus();
        readOutLoud("Hard");
    } else if (e.keyCode === 38) {
        $('#easy-button').focus();
        readOutLoud("Easy");
    }
});

$('#game').on('keydown', '#hard-button', function(e) {
    if (e.keyCode === 40) {
        $('#easy-button').focus();
        readOutLoud("Easy");
    } else if (e.keyCode === 38) {
        $('#medium-button').focus();
        readOutLoud("Medium");

    }
});

export function readOutLoud(message) {
    var speech = new SpeechSynthesisUtterance();
    speech.text = message;
    speech.volume = 5;
    speech.rate = 0.5;
    speech.pitch = 5;
  
    window.speechSynthesis.speak(speech);
}

