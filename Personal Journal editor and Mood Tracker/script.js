// Select elements
var entryDate = document.getElementById("entryDate");
var entryText = document.getElementById("entryText");
var moods = document.querySelectorAll(".mood");
var saveEntryBtn = document.getElementById("saveEntry");
var entriesContainer = document.getElementById("entries");
var selectedMood = "😊";
// Select mood
moods.forEach(function (mood) {
    mood.addEventListener("click", function () {
        moods.forEach(function (m) { return m.classList.remove("selected"); });
        mood.classList.add("selected");
        selectedMood = mood.getAttribute("data-mood") || "😊";
    });
});
// Save journal entry
saveEntryBtn.addEventListener("click", function () {
    var date = entryDate.value;
    var text = entryText.value.trim();
    if (!date || !text) {
        alert("Please select a date and write something!");
        return;
    }
    var newEntry = { date: date, text: text, mood: selectedMood };
    var entries = JSON.parse(localStorage.getItem("journalEntries") || "[]");
    entries.push(newEntry);
    localStorage.setItem("journalEntries", JSON.stringify(entries));
    displayEntries();
    entryText.value = "";
});
// Display entries
function displayEntries() {
    entriesContainer.innerHTML = "";
    var entries = JSON.parse(localStorage.getItem("journalEntries") || "[]");
    entries.forEach(function (entry) {
        var entryDiv = document.createElement("div");
        entryDiv.classList.add("entry");
        entryDiv.innerHTML = "<strong>".concat(entry.date, "</strong> - ").concat(entry.mood, " <p>").concat(entry.text, "</p>");
        entriesContainer.appendChild(entryDiv);
    });
}
// Load existing entries on page load
document.addEventListener("DOMContentLoaded", displayEntries);
