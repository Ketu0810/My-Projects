var digitalClock = document.getElementById("digital-clock");
var analogClock = document.getElementById("analog-clock");
var ctx = analogClock.getContext("2d");
var toggleModeBtn = document.getElementById("toggle-mode");
var bgColorPicker = document.getElementById("bg-color-picker");
var fontColorPicker = document.getElementById("font-color-picker");
var fontStyle = document.getElementById("font-style");
var alarmTimeInput = document.getElementById("alarm-time");
var setAlarmBtn = document.getElementById("set-alarm");
var isAnalogMode = false;
var alarmTime = null;
// 🕒 Update Clock
function updateClock() {
    var now = new Date();
    digitalClock.innerText = now.toLocaleTimeString();
    if (isAnalogMode)
        drawAnalogClock(now);
    if (alarmTime === now.toTimeString().slice(0, 5))
        alert("⏰ Alarm!");
}
// 🕰️ Draw Analog Clock
function drawAnalogClock(now) {
    if (!ctx)
        return;
    var radius = analogClock.width / 2;
    ctx.clearRect(0, 0, analogClock.width, analogClock.height);
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(radius, radius, radius - 10, 0, 2 * Math.PI);
    ctx.fill();
    var drawHand = function (angle, length, width) {
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.moveTo(radius, radius);
        ctx.lineTo(radius + length * Math.cos(angle), radius + length * Math.sin(angle));
        ctx.stroke();
    };
    var hours = ((now.getHours() % 12) + now.getMinutes() / 60) * (Math.PI / 6);
    var minutes = (now.getMinutes() + now.getSeconds() / 60) * (Math.PI / 30);
    var seconds = now.getSeconds() * (Math.PI / 30);
    ctx.strokeStyle = "black";
    drawHand(hours, 50, 6);
    drawHand(minutes, 70, 4);
    ctx.strokeStyle = "red";
    drawHand(seconds, 80, 2);
}
// 🔄 Toggle Digital/Analog Mode
toggleModeBtn.addEventListener("click", function () {
    isAnalogMode = !isAnalogMode;
    digitalClock.style.display = isAnalogMode ? "none" : "block";
    analogClock.style.display = isAnalogMode ? "block" : "none";
});
// 🎨 Customization
bgColorPicker.addEventListener("input", function () { return document.body.style.backgroundColor = bgColorPicker.value; });
fontColorPicker.addEventListener("input", function () { return digitalClock.style.color = fontColorPicker.value; });
fontStyle.addEventListener("change", function () { return digitalClock.style.fontFamily = fontStyle.value; });
// ⏰ Set Alarm
setAlarmBtn.addEventListener("click", function () {
    alarmTime = alarmTimeInput.value;
    alert("Alarm set for ".concat(alarmTime));
});
// ⏳ Update Clock Every Second
setInterval(updateClock, 1000);
