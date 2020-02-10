import { setupView } from "./render.js";
import { renderImage, playSound, createSoundArray} from "./rendersound.js";
const $root = $("#game");


function renderDifficultyButtons() {
    let difficulty = `
        <div>
            <button id="easy-button"> Easy </button>
        </div>

        <div>
            <button id="medium-button"> Medium </button>
        </div>

        <div>
            <button id="hard-button"> Hard </button>
        </div>
    `;
    $root.append(difficulty);

}

function difficultySelect() {
    $('#easy-button').on('click', function(e) {
        $(`#easy-button`).remove();
        $(`#medium-button`).remove();
        $(`#hard-button`).remove();
        renderImage();
        setupView();
        playSound();
        console.log("test");
        e.preventDefault();
      });

      $('#medium-button').on('click', function(e) {
        $(`#easy-button`).remove();
        $(`#medium-button`).remove();
        $(`#hard-button`).remove();
        renderImage();
        setupView();
        playSound();
        
        console.log("test");
        e.preventDefault();
      });

      $('#hard-button').on('click', function(e) {
        $(`#easy-button`).remove();
        $(`#medium-button`).remove();
        $(`#hard-button`).remove();
        renderImage();
        setupView();
        playSound();
        console.log("test");
        e.preventDefault();
      });
}

renderDifficultyButtons();
difficultySelect();

//test