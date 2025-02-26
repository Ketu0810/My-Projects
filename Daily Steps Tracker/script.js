// Select elements
var goalInput = document.getElementById("goal");
var stepsInput = document.getElementById("steps");
var addStepsBtn = document.getElementById("addSteps");
var resetBtn = document.getElementById("reset");
var progressBar = document.getElementById("progress-bar");
var progressText = document.getElementById("progress-text");
var badgesContainer = document.getElementById("badges");
// Load saved data
var goal = Number(localStorage.getItem("goal")) || 10000;
var steps = Number(localStorage.getItem("steps")) || 0;
goalInput.value = goal.toString();
updateUI();
// Add steps
addStepsBtn.addEventListener("click", function () {
    var enteredSteps = Number(stepsInput.value);
    if (enteredSteps > 0) {
        steps += enteredSteps;
        localStorage.setItem("steps", steps.toString());
        stepsInput.value = "";
        updateUI();
        checkAchievements();
    }
});
// Set goal
goalInput.addEventListener("change", function () {
    goal = Number(goalInput.value) || 10000;
    localStorage.setItem("goal", goal.toString());
    updateUI();
});
// Reset
resetBtn.addEventListener("click", function () {
    steps = 0;
    localStorage.setItem("steps", "0");
    updateUI();
});
// Update UI
function updateUI() {
    progressBar.style.width = "".concat((steps / goal) * 100, "%");
    progressText.textContent = "".concat(steps, " / ").concat(goal, " steps");
}
// Check Achievements
function checkAchievements() {
    badgesContainer.innerHTML = ""; // Clear existing badges
    var milestones = [5000, 10000, 20000, 30000];
    milestones.forEach(function (milestone) {
        if (steps >= milestone) {
            var badge = document.createElement("div");
            badge.classList.add("badge");
            badge.textContent = "".concat(milestone, " Steps \uD83C\uDFC6");
            badgesContainer.appendChild(badge);
        }
    });
}
// Reminders using notifications
function sendReminder() {
    if (Notification.permission === "granted") {
        new Notification("Don't forget to log your steps! 🚶‍♂️");
    }
    else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                new Notification("Don't forget to log your steps! 🚶‍♀️");
            }
        });
    }
}
// Set a reminder every 4 hours
setInterval(sendReminder, 4 * 60 * 60 * 1000);
