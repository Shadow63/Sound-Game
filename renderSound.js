import { getDifficulty } from "./difficulty.js"

const $root = $("#game");
let soundArray = [];
let testArray = [];
//Add countdown + buzzer

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
        <img width="500" height="500" src="Pictures/questionMark.jpg" alt="Question Mark" id="image"></img> 
    </div>  
    `;
    
    $root.append(hold);
}

/**
 * Gets the sounds from JSON file and puts it into one big array called testArray
 */
$.getJSON("sounds.json", function(json) {
    testArray = json.Sounds;
    for (let i = 0; i < testArray.length; i++) {
        testArray[i].audio = new Audio('Sounds/' + testArray[i].name + '.mp3');
        testArray[i].image = 'Pictures/' + testArray[i].name + '.jpeg';
    }
    console.log("test1", testArray);
});

/**
 * Takes the sounds from the testArray and put them into soundArray depending on difficulty
 */
export function createSoundArray() {

    let d = getDifficulty();
    switch(d) {
        case "easy":
            putIn(5);
            console.log("test2",testArray);
            console.log("sound", soundArray)
            break;

        case "medium":
            soundArray.push(new Sound('penguin'));
            soundArray.push(new Sound('dog'));
            soundArray.push(new Sound('pig'));
            soundArray.push(new Sound('rooster'));
            soundArray.push(new Sound('train'));
            soundArray.push(new Sound('thunder'));
            soundArray.push(new Sound('water'));
            break;

        case "hard":

            break;

    }
}

/** Intent: Plays the sounds randomly
 *  Add: Make it play randomly
 **/
export function playSound(soundArray) {
    let temp = Math.floor(Math.random() * (soundArray.length));

    while(soundArray[temp].played == true) {
        temp = Math.floor(Math.random() * (soundArray.length))
        console.log(temp);
    }
    soundArray[temp].audio.play();
    soundArray[temp].played = true;
    soundArray[temp].isPlaying = true;
}

/** 
 * Gets the current sound that is playing
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

function putIn(num) {
    while(soundArray.length != num) {
        let temp = Math.floor(Math.random() * 5);
        if (!testArray[temp].isIn) {
            soundArray.push(testArray[temp]);
            testArray[temp].isIn = true;
        }
        
    }
}


