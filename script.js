console.log("Welcome to TaskTreasure!");

// BITLABS API Integration - Keeps Your Layout Clean
const BITLABS_API_KEY = "9dde2b11-1e89-421d-8e15-0922d440d4eb";
const BITLABS_USER_ID = "user_123"; // Replace dynamically if needed

async function fetchBitLabsTasks() {
    try {
        const response = await fetch(`https://api.bitlabs.ai/v1/tasks?apikey=${BITLABS_API_KEY}&user_id=${BITLABS_USER_ID}`);
        const data = await response.json();

        if (data.tasks) {
            displayTasks(data.tasks);
        } else {
            console.error("No tasks found:", data);
        }
    } catch (error) {
        console.error("Error fetching BitLabs tasks:", error);
    }
}

// Display BitLabs Tasks Without Changing Layout
function displayTasks(tasks) {
    const taskSection = document.getElementById("bitlabs-tasks");
    if (!taskSection) return; // Prevent errors if section doesn't exist

    taskSection.innerHTML = "<h2>Available Offers</h2>";

    tasks.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task-card");
        taskElement.innerHTML = `
            <h3>${task.name}</h3>
            <p>💰 Earn: <strong>${task.reward} Coins</strong></p>
            <a href="${task.link}" target="_blank" class="task-button">Start Task</a>
        `;
        taskSection.appendChild(taskElement);
    });
}

// Load tasks when page is ready
window.addEventListener("DOMContentLoaded", fetchBitLabsTasks);
