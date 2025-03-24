const form = document.querySelector("#form");
const text = document.querySelector("#receive-input");
const inputField = document.querySelector("#type-input");

form.addEventListener("submit", submitHandler);

function submitHandler(e) {
  e.preventDefault(); 

  const inputValue = inputField.value.trim(); // Supprime les espaces avant/après

  if (inputValue !== "") {
    text.textContent = inputValue; // Met à jour le paragraphe
    inputField.value = ""; // Réinitialise le champ
  }
}
