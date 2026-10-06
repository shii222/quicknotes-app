const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");
let notes = [];
function render() {
  notesList.textContent = "";

  notes.forEach(function (note) {
    const li = document.createElement("li");
    li.classList.add(`category-${note.category}`);

    const noteText = document.createElement("p");
    noteText.textContent = note.text;

    const category = document.createElement("small");
    category.textContent = `Category: ${note.category}`;

    const date = document.createElement("small");
    date.textContent = `Created: ${note.createdAt}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    li.appendChild(noteText);
    li.appendChild(category);
    li.appendChild(date);
    li.appendChild(deleteButton);

    notesList.appendChild(li);
  });
}
