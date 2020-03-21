/**
 * HWBUTTON-VOLUP
 * on volup, change the flashlight level if it's already on
 * on fully bright, set to 0 | otherwise, add .25 to its level
 * if no button presses for 10 seconds, go back to default functionality
 * 
 * will be updated once option to get+set volume is added
 */

var curr = flashlight.currentLevel();
var timeout = setTimeout(() => {
    isRunning = void 0; // the cooler undefined
}, 10 * 1000);

if(!isRunning && curr > 0) {
    var isRunning = true; // run on first button press
}

if(isRunning) {
    timeout = null; // since clearTimeout is not implemented
    if(curr === 1) {
        flashlight.setLevel(0);
    } else {
        flashlight.setLevel(curr + .25);
    }
}