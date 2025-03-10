console.log("Welcome to TaskTreasure!");

// Change text content dynamically when the page loads
window.addEventListener("DOMContentLoaded", (event) => {
    // Add fade-in effect to the content
    const heading = document.querySelector("h1");
    heading.classList.add("fade-in");

    const paragraph = document.querySelector("p");
    paragraph.classList.add("fade-in");

    // Change the heading text
    if (heading) {
        heading.textContent = "TaskTreasure - The Best Freelance Platform!";
    }

    // Change the paragraph content
    if (paragraph) {
        paragraph.textContent = "Start earning money by completing tasks and watching ads!";
    }

    // Add a button and an event listener to show an alert when clicked
    const button = document.createElement("button");
    button.textContent = "Get Started!";
    document.body.appendChild(button);

    button.addEventListener("click", () => {
        alert("Thanks for clicking! Stay tuned for more features.");
    });
});
