console.log("Welcome to TaskTreasure!");

// ------------------------------
// Firebase Configuration & Initialization
// ------------------------------
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCgIPKR6sUgLKaurAp6nqIXHQQQ5JiL-5Y",
  authDomain: "tasktreasure-60d07.firebaseapp.com",
  projectId: "tasktreasure-60d07",
  storageBucket: "tasktreasure-60d07.appspot.com",
  messagingSenderId: "198792526809",
  appId: "1:198792526809:web:a60a3f1ad64946d90737c8",
  measurementId: "G-B01E3WRR9H"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// ------------------------------
// User Authentication (Signup & Login)
// ------------------------------

// Generate a unique user code
function generateUniqueCode() {
  return 'user-' + Math.random().toString(36).substr(2, 9);
}

// Handle Signup
document.getElementById("signup-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("signup-username").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const userCode = generateUniqueCode();

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store user info in Firestore
    await setDoc(doc(db, "users", user.uid), {
      username,
      email,
      userCode,
      createdAt: new Date()
    });

    alert(`Welcome ${username}! Your account code is ${userCode}`);
    document.getElementById("signup-modal").style.display = "none";
    document.getElementById("main-content").classList.remove("hidden");
  } catch (error) {
    console.error("Signup Error:", error);
    alert(error.message);
  }
});

// Handle Login
document.getElementById("login-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful!");
    document.getElementById("signup-modal").style.display = "none";
    document.getElementById("main-content").classList.remove("hidden");
  } catch (error) {
    console.error("Login Error:", error);
    alert(error.message);
  }
});

// Handle Logout
document.getElementById("logout-button")?.addEventListener("click", () => {
  signOut(auth).then(() => {
    alert("You have been logged out.");
    document.getElementById("signup-modal").style.display = "flex";
    document.getElementById("main-content").classList.add("hidden");
  }).catch((error) => console.error("Logout Error:", error));
});

// Check if user is logged in
onAuthStateChanged(auth, async (user) => {
  if (user) {
    document.getElementById("signup-modal").style.display = "none";
    document.getElementById("main-content").classList.remove("hidden");

    // Fetch user data from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      console.log("User Data:", userDoc.data());
    }
  } else {
    document.getElementById("signup-modal").style.display = "flex";
  }
});

// ------------------------------
// UI Interactions & Navigation
// ------------------------------

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

// Dark Mode Toggle
document.getElementById("darkModeToggle")?.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// ------------------------------
// BitLabs API Integration
// ------------------------------
const BITLABS_API_KEY = "9dde2b11-1e89-421d-8e15-0922d440d4eb";

async function fetchBitLabsSurveys(userId) {
  try {
    const response = await fetch(`https://api.bitlabs.ai/v1/tasks?apikey=${BITLABS_API_KEY}&user_id=${userId}`);
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
// Initialize Page Content
// ------------------------------
window.addEventListener("DOMContentLoaded", () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      fetchBitLabsSurveys(user.uid);
    }
  });
});
