function removePianoKey(keyValue) {
	// Get the piano keyboard div using its id
	let keyboard = document.getElementById("piano-keyboard");
	// Get the childNodes of the keyboard
	let keys = keyboard.getElementsByTagName("button");
	// Then find and remove the key from the childNodes array using the keyValue argument
	
	// Loop through the keys to find and remove the one matching keyValue
    for (let i = 0; i < keys.length; i++) {
        if (keys[i].value === keyValue) {
            // Remove the matching key
            keys[i].remove();
            // Since we modified the live collection, we can break out of the loop
            break;
        }
    }
	
	
	return keyboard;
}