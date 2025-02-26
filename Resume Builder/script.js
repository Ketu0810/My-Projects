// Get elements
var nameInput = document.getElementById("name");
var emailInput = document.getElementById("email");
var phoneInput = document.getElementById("phone");
var skillsInput = document.getElementById("skills");
var experienceInput = document.getElementById("experience");
var educationInput = document.getElementById("education");
var previewName = document.getElementById("preview-name");
var previewEmail = document.getElementById("preview-email");
var previewPhone = document.getElementById("preview-phone");
var previewSkills = document.getElementById("preview-skills");
var previewExperience = document.getElementById("preview-experience");
var previewEducation = document.getElementById("preview-education");
var saveBtn = document.getElementById("save-resume");
var pdfBtn = document.getElementById("download-pdf");
var aiSuggestionBtn = document.getElementById("generate-suggestions");
// Update preview
var updatePreview = function () {
    previewName.textContent = nameInput.value || "Your Name";
    previewEmail.textContent = "Email: " + (emailInput.value || "example@gmail.com");
    previewPhone.textContent = "Phone: " + (phoneInput.value || "+123456789");
    previewSkills.textContent = skillsInput.value || "Your skills here...";
    previewExperience.textContent = experienceInput.value || "Your experience here...";
    previewEducation.textContent = educationInput.value || "Your education details...";
};
// Add event listeners for live preview
[nameInput, emailInput, phoneInput, skillsInput, experienceInput, educationInput].forEach(function (input) {
    input.addEventListener("input", updatePreview);
});
// AI Resume Suggestions
aiSuggestionBtn.addEventListener("click", function () {
    skillsInput.value = "JavaScript, TypeScript, React, Node.js, HTML, CSS";
    experienceInput.value = "Worked on web development projects using modern frontend frameworks.";
    educationInput.value = "Bachelor's Degree in Computer Science from XYZ University.";
    updatePreview();
});
// Save Resume to LocalStorage
saveBtn.addEventListener("click", function () {
    var resumeData = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        skills: skillsInput.value,
        experience: experienceInput.value,
        education: educationInput.value
    };
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
    alert("Resume saved successfully!");
});
// Load Resume from LocalStorage
var loadResume = function () {
    var savedData = localStorage.getItem("resumeData");
    if (savedData) {
        var resume = JSON.parse(savedData);
        nameInput.value = resume.name;
        emailInput.value = resume.email;
        phoneInput.value = resume.phone;
        skillsInput.value = resume.skills;
        experienceInput.value = resume.experience;
        educationInput.value = resume.education;
        updatePreview();
    }
};
loadResume();
// Download Resume as PDF
pdfBtn.addEventListener("click", function () {
    var pdf = new jsPDF();
    pdf.text(previewName.textContent, 10, 10);
    pdf.text(previewEmail.textContent, 10, 20);
    pdf.text(previewPhone.textContent, 10, 30);
    pdf.text(previewSkills.textContent, 10, 40);
    pdf.text(previewExperience.textContent, 10, 50);
    pdf.text(previewEducation.textContent, 10, 60);
    pdf.save("resume.pdf");
});
