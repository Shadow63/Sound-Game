import { getDifficulty } from "./difficulty.js"

const $root = $("#game");
let soundArray = [];
let testArray = [];

/** 
*   Renders the image when the player guesses correctly, also used to display the countdown
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
});

/**
 * Takes the sounds from the testArray and put them into soundArray depending on difficulty
 */
export function createSoundArray() {

    let d = getDifficulty();
    switch(d) {
        case "easy":
            putIn(5);
            break;

        case "medium":
            putIn(10);
            break;

        case "hard":
            putIn(10);
            break;
    }
}

/** 
 *  Plays a sound randomly
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

/**
 * Checks to see if all the sounds have been played
 * Used for win/loss scenario
 */
export function getplayedAll(soundArray) {
    for (let i = 0; i < soundArray.length; i++) {
        if (!soundArray[i].played) {
            return false;
        }
    }
    return true;
}

/**
 * Gets the soundArray
 */
export function getSoundArray() {
    console.log("Returning", soundArray);
    return soundArray;
}

/**
 * Puts a specified number of sounds into the soundArray randomly
 */
function putIn(num) {
    while(soundArray.length != num) {
        let temp = Math.floor(Math.random() * testArray.length);
        if (!testArray[temp].isIn) {
            soundArray.push(testArray[temp]);
            testArray[temp].isIn = true;
        }
        
    }
}


