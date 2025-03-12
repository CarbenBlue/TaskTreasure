console.log("Welcome to TaskTreasure!");

// ------------------------------
// User Authentication & Signup
// ------------------------------

// Check if user exists in localStorage
function isUserLoggedIn() {
  return localStorage.getItem("user") !== null;
}

// Generate a unique user code
function generateUniqueCode() {
  return 'user-' + Math.random().toString(36).substr(2, 9);
}

// Handle signup form submission
document.getElementById("signup-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("signup-username").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const userCode = generateUniqueCode();
  // Simulate account creation & store in localStorage (as our pseudo-database)
  const userData = { username, email, password, userCode, createdAt: new Date() };
  localStorage.setItem("user", JSON.stringify(userData));
  // Hide signup modal and show main content
  document.getElementById("signup-modal").style.display = "none";
  document.getElementById("main-content").classList.remove("hidden");
  alert(`Welcome ${username}! Your account code is ${userCode}`);
});

document.addEventListener("DOMContentLoaded", () => {
    const signupSection = document.getElementById("signup-section");
    const loginSection = document.getElementById("login-section");

    const showLogin = document.getElementById("show-login");
    const showSignup = document.getElementById("show-signup");

    const signupForm = document.getElementById("signup-form");
    const loginForm = document.getElementById("login-form");

    // Toggle Between Login and Signup
    showLogin.addEventListener("click", () => {
        signupSection.style.display = "none";
        loginSection.style.display = "block";
    });

    showSignup.addEventListener("click", () => {
        loginSection.style.display = "none";
        signupSection.style.display = "block";
    });

    // Sign Up Functionality
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const username = document.getElementById("signup-username").value;
        const password = document.getElementById("signup-password").value;

        const response = await fetch('/signup', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (data.success) {
            alert("Account created! Logging you in...");
            window.location.href = "account.html";
        } else {
            alert(data.message);
        }
    });

    // Log In Functionality
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const username = document.getElementById("login-username").value;
        const password = document.getElementById("login-password").value;

        const response = await fetch('/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (data.success) {
            window.location.href = "account.html";
        } else {
            alert("Invalid credentials!");
        }
    });
});


// ------------------------------
// UI Interactions & Navigation
// ------------------------------

// Alert Button Interaction
function showAlert() {
  alert("Thanks for joining TaskTreasure! 🚀");
}

// Dark Mode Toggle
document.getElementById("darkModeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Smooth Scroll for Navbar Links
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ------------------------------
// Local Tasks Data & Display
// ------------------------------
const localTasks = [
  { name: "Watch a 5-min video", reward: "$0.50" },
  { name: "Complete a survey", reward: "$1.00" },
  { name: "Sign up for a free trial", reward: "$2.50" },
  { name: "Write a product review", reward: "$1.50" },
  { name: "Download and test an app", reward: "$2.00" },
  { name: "Participate in a quick poll", reward: "$0.75" },
  { name: "Share on social media", reward: "$0.60" }
];

function displayLocalTasks() {
  const taskContainer = document.getElementById("task-container");
  taskContainer.innerHTML = "";
  localTasks.forEach(task => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.innerHTML = `<h3>${task.name}</h3><p>Earn: ${task.reward}</p>`;
    taskContainer.appendChild(taskElement);
  });
}

// ------------------------------
// BitLabs API Integration (Surveys)
// ------------------------------
const BITLABS_API_KEY = "9dde2b11-1e89-421d-8e15-0922d440d4eb";
const BITLABS_USER_ID = "user_123"; // Replace with dynamic user ID if needed

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

function displayBitLabsSurveys(tasks) {
  const surveyContainer = document.getElementById("bitlabs-task-list");
  if (!surveyContainer) return;
  surveyContainer.innerHTML = "";
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

// ------------------------------
// Testimonials Rotation
// ------------------------------
const testimonials = [
  { text: "TaskTreasure helped me earn extra cash during my free time!", author: "Alex G." },
  { text: "The tasks are super easy, and the payouts are fast!", author: "Samantha R." },
  { text: "Surveys on TaskTreasure are a great way to earn rewards!", author: "Jason M." },
  { text: "I love the variety of tasks offered; it keeps things exciting!", author: "Melissa T." }
];
let currentTestimonial = 0;

function updateTestimonial() {
  const testimonialText = document.getElementById("testimonial-text");
  const testimonialAuthor = document.getElementById("testimonial-author");
  testimonialText.innerText = `"${testimonials[currentTestimonial].text}"`;
  testimonialAuthor.innerText = `- ${testimonials[currentTestimonial].author}`;
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
}

setInterval(updateTestimonial, 5000);

// ------------------------------
// Initialize Page Content
// ------------------------------
window.addEventListener("DOMContentLoaded", () => {
  displayLocalTasks();
  fetchBitLabsSurveys();
});
