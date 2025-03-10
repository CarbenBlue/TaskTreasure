console.log("Welcome to TaskTreasure!");

// Change text content dynamically when the page loads
window.addEventListener("DOMContentLoaded", (event) => {
    // Change the heading text
    const heading = document.querySelector("h1");
    if (heading) {
        heading.textContent = "TaskTreasure - The Best Freelance Platform!";
    }

    // Change the paragraph content
    const paragraph = document.querySelector("p");
    if (paragraph) {
        paragraph.textContent = "Start earning money by completing tasks and watching ads!";
    }

    // Add a button and an event listener to show an alert when clicked
    const button = document.createElement("button");
    button.textContent = "Click me!";
    button.style.marginTop = "20px";
    document.body.appendChild(button);

    button.addEventListener("click", () => {
        alert("Thanks for clicking! Stay tuned for more features.");
    });
});
