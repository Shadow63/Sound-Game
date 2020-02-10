const $root = $("#game");
export let soundArray = [];
window.FOO = soundArray;

export default class Sound {
    constructor(name) {
      this.name = name;
      this.played = false;
      this.isPlaying = false;
      this.audio = new Audio('Sounds/' + name + '.mp3');
      console.log('sound', this);
      //this.image = new Image('Pictures/' + name + '.jpg');
    }
}
createSoundArray();


/** Intent: Shows if the guess is correct or wrong 
*   Add: Literally everything 
**/
export function renderImage() {
    let hold = `
    <div id="picture">
        <img src="Pictures/questionMark.jpg" alt="Question Mark"></img> 
    </div>
    `;
    
    $root.append(hold);
}

//Add the sounds in sound folder into an Array of Sounds
export function createSoundArray() {
    soundArray.push(new Sound('penguin'));
    soundArray.push(new Sound('dog'));
    soundArray.push(new Sound('pig'));
    console.log('create', soundArray);
}

/** Intent: Plays the sounds randomly
 *  Add: Make it play randomly
 **/
export function playSound() {
    let temp = Math.floor(Math.random() * 3);

    while(soundArray[temp].played == true) {
        temp = Math.floor(Math.random() * 3)
    }
    soundArray[temp].audio.play();
    soundArray[temp].played = true;
    soundArray[temp].isPlaying = true;
    console.log('temp=', temp, soundArray[temp], soundArray[temp].isPlaying);

}

/** 
 * Gets the current sound that is playing
 * 
*/
export function getIsPlaying() {
    console.log("is this even being called?", soundArray);
    for (let i = 0; i < soundArray.length; i++) {
        console.log("does it go into here?");
        console.log("this should work", i, soundArray[i], soundArray[i].isPlaying);
        if (soundArray[i].isPlaying) {
            console.log("Why isn't this working?" + soundArray[i]);
            return soundArray[i];
        }
    }
    console.log("exiting the for loop" + soundArray[0]);
}

//renderImage();
//playSound();

