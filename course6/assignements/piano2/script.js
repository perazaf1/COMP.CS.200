function setKeyboard(keysValues) {
    // Get the piano keyboard div using its id
    let keyboard = document.getElementById("piano-keyboard");
    
    // Get the childNodes of the keyboard
    let keys = keyboard.getElementsByTagName("button");
    
    // Loop through each key (button) and set the value and innerText
    for (let i = 0; i < keys.length; i++) {
        // Set the value attribute of the key to the corresponding value from keysValues
        keys[i].value = keysValues[i];
        
        // Set the innerText of the key to the corresponding value from keysValues
        keys[i].innerText = keysValues[i];
    }
    
    // Return the keyboard div
    return keyboard;
}
