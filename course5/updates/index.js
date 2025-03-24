const form = document.querySelector("#form");
const text = document.querySelector("#receive-input");
form.addEventListener("submit",submitHandler);


function submitHandler(e) {
  e.preventDefault(); 
  text.textContent = form.querySelector("input").value;
  form.querySelector("input").value = "";

};