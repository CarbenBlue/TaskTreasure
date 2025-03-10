console.log("Welcome to TaskTreasure!");

// BitLabs API Configuration
const BITLABS_API_KEY = "9dde2b11-1e89-421d-8e15-0922d440d4eb";
const BITLABS_USER_ID = "user_123"; // Replace with dynamic user ID if available

// Fetch and Display BitLabs Tasks
async function fetchBitLabsTasks() {
    try {
        const response = await fetch(`https://api.bitlabs.ai/v1/tasks?apikey=${BITLABS_API_KEY}&user_id=${BITLABS_USER_ID}`);
        const data = await response.json();

        if (data.tasks) {
            displayTasks(data.tasks);
        } else {
            console.error("Error fetching tasks:", data);
        }
    } catch (error) {
        console.error("Error connecting to BitLabs:", error);
    }
}

// Display Tasks in a Styled Way
function displayTasks(tasks) {
    const taskContainer = document.getElementById("task-container");
    taskContainer.innerHTML = ""; // Clear existing tasks

    tasks.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task-card");
        taskElement.innerHTML = `
            <h3>${task.name}</h3>
            <p>💰 Earn: <strong>${task.reward} Coins</strong></p>
            <a href="${task.link}" target="_blank" class="task-button">Start Task</a>
        `;
        taskContainer.appendChild(taskElement);
    });
}

// Dark Mode Toggle
document.getElementById("darkModeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Fetch and display BitLabs tasks on page load
window.addEventListener("DOMContentLoaded", fetchBitLabsTasks);
