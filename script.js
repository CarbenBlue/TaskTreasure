console.log("Welcome to TaskTreasure!");

// Alert Button Interaction
function showAlert() {
    alert("Thanks for joining TaskTreasure! 🚀");
}

// Dark Mode Toggle
const darkModeToggle = document.getElementById("darkModeToggle");
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Dynamic Task Listings
const tasks = [
    { name: "Watch a 5-min video", reward: "$0.50" },
    { name: "Complete a survey", reward: "$1.00" },
    { name: "Sign up for a free trial", reward: "$2.50" },
    { name: "Write a product review", reward: "$1.50" },
    { name: "Download and test an app", reward: "$2.00" }
];

function displayTasks() {
    const taskContainer = document.getElementById("task-container");
    taskContainer.innerHTML = "";

    tasks.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        taskElement.innerHTML = `<h3>${task.name}</h3><p>Earn: ${task.reward}</p>`;
        taskContainer.appendChild(taskElement);
    });
}

window.addEventListener("DOMContentLoaded", displayTasks);
// BitLabs API Configuration
const BITLABS_API_KEY = "9dde2b11-1e89-421d-8e15-0922d440d4eb";
const BITLABS_USER_ID = "user_123"; // Replace dynamically if needed

async function fetchBitLabsSurveys() {
    try {
        const response = await fetch(`https://api.bitlabs.ai/v1/tasks?apikey=${BITLABS_API_KEY}&user_id=${BITLABS_USER_ID}`);
        const data = await response.json();

        if (data.tasks) {
            displayBitLabsSurveys(data.tasks);
        } else {
            console.error("No surveys found:", data);
        }
    } catch (error) {
        console.error("Error fetching BitLabs surveys:", error);
    }
}

// Display BitLabs Surveys Below Tasks
function displayBitLabsSurveys(tasks) {
    const surveyContainer = document.getElementById("bitlabs-task-list");
    if (!surveyContainer) return;

    surveyContainer.innerHTML = ""; // Clear previous surveys

    tasks.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        taskElement.innerHTML = `
            <h3>${task.name}</h3>
            <p>💰 Earn: <strong>${task.reward} Coins</strong></p>
            <a href="${task.link}" target="_blank" class="task-button">Start Survey</a>
        `;
        surveyContainer.appendChild(taskElement);
    });
}

// Load surveys when page is ready
window.addEventListener("DOMContentLoaded", fetchBitLabsSurveys);
