import { getDifficulty } from "./difficulty.js"

const $root = $("#game");
let soundArray = [];

export default class Sound {
    constructor(name) {
      this.name = name;
      this.played = false;
      this.isPlaying = false;
      this.audio = new Audio('Sounds/' + name + '.mp3');
      //console.log("played", soundArray);
      this.image = 'Pictures/' + name + '.jpeg';
    }
}


/** Intent: Shows if the guess is correct or wrong 
*   Add: Literally everything 
**/
export function renderImage() {
    createSoundArray();
    let hold = `
    <div id="picture">
        <img width="500" height="1000" src="Pictures/questionMark.jpg" alt="Question Mark" id="image"></img> 
    </div>
    `;
    
    $root.append(hold);
}

//Add the sounds in sound folder into an Array of Sounds
export function createSoundArray() {
    let d = getDifficulty();
    switch(d) {
        case "easy":
            soundArray.push(new Sound('penguin'));
            soundArray.push(new Sound('dog'));
            soundArray.push(new Sound('pig'));
            
            break;

        case "medium":

            break;

        case "hard":

            break;

    }
}

/** Intent: Plays the sounds randomly
 *  Add: Make it play randomly
 **/
export function playSound(soundArray) {
    let temp = Math.floor(Math.random() * 3);

    while(soundArray[temp].played == true) {
        temp = Math.floor(Math.random() * 3)
        console.log(temp);
    }
    soundArray[temp].audio.play();
    soundArray[temp].played = true;
    soundArray[temp].isPlaying = true;
}

/** 
 * Gets the current sound that is playing
 * 
*/
export function getIsPlaying(soundArray) {
    console.log("is it playing?", soundArray);
    for (let i = 0; i < soundArray.length; i++) {
        if (soundArray[i].isPlaying) {
            return soundArray[i];
        }
    }
}

export function getplayedAll(soundArray) {
    for (let i = 0; i < soundArray.length; i++) {
        if (!soundArray[i].played) {
            return false;
        }
    }
    return true;
}

export function getSoundArray() {
    console.log("Returning", soundArray);
    return soundArray;
}


