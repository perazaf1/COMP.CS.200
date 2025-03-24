// Get references to the DOM elements
const form = document.getElementById("form");
const todoInput = document.getElementById("type-input");
const todoList = document.getElementById("todo");

// Add event listeners
form.addEventListener("submit", submitHandler);
todoList.addEventListener("click", listClickHandler);

/**
 * Creates and adds a new list item to the todo list
 * @param {string} text - The text content for the new todo item
 */
function addListItem(text) {
  // Create a new list item
  const listItem = document.createElement("li");
  
  // Set the text content of the list item
  listItem.textContent = text;
  
  // Append the new list item to the todo list
  todoList.append(listItem);
}

/**
 * Handles the form submission event
 * @param {Event} e - The submit event object
 */
function submitHandler(e) {
  // Prevent the default form submission behavior
  e.preventDefault();
  
  // Get the value from the input field
  const inputValue = todoInput.value.trim();
  
  // Check if the input value is not empty
  if (inputValue !== "") {
    // Add the new item to the list
    addListItem(inputValue);
    
    // Reset the input field
    todoInput.value = "";
  }
}

/**
 * Handles clicks on list items
 * @param {Event} e - The click event object
 */
function listClickHandler(e) {
  // Check if the clicked element is a list item
  if (e.target.tagName === "LI") {
    // Check if the list item already has the "done" class
    if (e.target.classList.contains("done")) {
      // If it has the class, remove the list item
      e.target.remove();
    } else {
      // If it doesn't have the class, add it
      e.target.classList.add("done");
    }
  }
}