/**
 * HWBUTTON-VOLUP
 * On press:
 *  1. If 2 presses within 500ms are detected and the code was not running, turn on flashlight.
 *  2. Otherwise, add 1 to the flashlight level, or if it's max, set to 0.
 * After 10 seconds, revert to default functionality, until the 2 presses are detected.
 * 
 * Will be updated when get/set volume is added. 
 */

var curr = flashlight.currentLevel();
var VOLUP_PRESSES = typeof VOLUP_PRESSES === 'undefined' ? 0 : VOLUP_PRESSES;

// reset presses after 500ms
setTimeout(() => VOLUP_PRESSES = 0, 500);

var isRunning = curr > 0 || isRunning === true;

if(isRunning) {
    // set isRunning to undefined
    setTimeout(() => isRunning = void 0, 10 * 1000);
    
    if(curr === 1) {
        flashlight.setLevel(0);
    } else {
        flashlight.setLevel(curr + .25);
    }
} else if(!isRunning && ++VOLUP_PRESSES >= 2) {
    isRunning = true;
    flashlight.setLevel(.25);
}