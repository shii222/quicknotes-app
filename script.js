// Select HTML elements
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");

// Array for storing notes
let notes = [];


// Persistence and search features

// Save notes to localStorage
function saveNotes() {
  localStorage.setItem("quicknotes", JSON.stringify(notes));
}


// Load notes from localStorage
function loadNotes() {
  const savedNotes = localStorage.getItem("quicknotes");

  if (savedNotes) {
    notes = JSON.parse(savedNotes);
  }
}


// Update the number of notes
function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}


// Display notes
function render() {
  notesList.textContent = "";

  // Get the search text
  const searchTerm = searchInput.value.trim().toLowerCase();

  // Find notes that match the search
  const filteredNotes = notes.filter(function (note) {
    return note.text.toLowerCase().includes(searchTerm);
  });


  // Show message if search finds nothing
  if (searchTerm !== "" && filteredNotes.length === 0) {
    const message = document.createElement("li");
    message.textContent = "No notes match your search.";
    notesList.appendChild(message);
  }


  // Display each note
  filteredNotes.forEach(function (note) {
    const li = document.createElement("li");

    li.classList.add(`category-${note.category}`);


    // Note text
    const noteText = document.createElement("p");
    noteText.textContent = note.text;


    // Category
    const category = document.createElement("small");
    category.textContent = `Category: ${note.category}`;


    // Date
    const date = document.createElement("small");
    date.textContent = `Created: ${note.createdAt}`;


    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";


    // Delete a note
    deleteButton.addEventListener("click", function () {
      notes = notes.filter(function (item) {
        return item.id !== note.id;
      });

      saveNotes();
      render();
    });


    // Add everything to the note card
    li.appendChild(noteText);
    li.appendChild(category);
    li.appendChild(date);
    li.appendChild(deleteButton);


    // Add note card to the list
    notesList.appendChild(li);
  });


  // Update note count
  updateCount();
}


// Add a new note
noteForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = noteInput.value.trim();
  const category = noteCategory.value;


  // Empty note validation
  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }


  // 200 character validation
  if (text.length > 200) {
    errorMessage.textContent =
      "Notes must be 200 characters or fewer.";
    return;
  }


  // Clear previous error
  errorMessage.textContent = "";


  // Create note object
  const newNote = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString()
  };


  // Add note to array
  notes.push(newNote);


  // Save notes
  saveNotes();


  // Display notes
  render();


  // Clear input
  noteInput.value = "";
  noteInput.focus();
});


// Search notes while typing
searchInput.addEventListener("input", function () {
  render();
});


// Load saved notes when page opens
loadNotes();


// Display notes when page opens
render();