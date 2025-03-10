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
    { name: "Sign up for a free trial", reward: "$2.50" }
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
