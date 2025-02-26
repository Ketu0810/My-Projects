// Predefined bot responses with strict type safety
var responses = {
    "hello": "Hello there! 😊 How can I assist you?",
    "hi": "Hello there! 😊 How can I assist you?",
    "how are you": "I'm just a chatbot, but I'm doing great! How about you?",
    "what is your name": "I'm ChatBuddy! Your virtual assistant. 🤖",
    "bye": "Goodbye! Have a wonderful day! 👋",
    "default": "I'm not sure how to respond to that. Can you try something else?"
};
// Get references to DOM elements with type safety
var userInput = document.getElementById("user-input");
var chatBox = document.getElementById("chat-box");
// Function to process user message and respond
function sendMessage() {
    var inputText = userInput.value.trim().toLowerCase();
    if (inputText === "")
        return;
    // Append user message
    chatBox.innerHTML += "<div class=\"user-message\">".concat(inputText, "</div>");
    // Find the best matching response
    var botResponse = responses["default"];
    for (var key in responses) {
        if (inputText.includes(key)) {
            botResponse = responses[key];
            break;
        }
    }
    // Append bot message with a slight delay
    setTimeout(function () {
        chatBox.innerHTML += "<div class=\"bot-message\">\n                                <span class=\"bot-icon\">\uD83E\uDD16</span>\n                                <p>".concat(botResponse, "</p>\n                              </div>");
        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the latest message
    }, 500);
    // Clear input field
    userInput.value = "";
}
// Function to handle Enter key press
function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}
