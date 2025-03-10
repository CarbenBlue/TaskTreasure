/* Global Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    scroll-behavior: smooth;
}

body {
    background: linear-gradient(135deg, #3498db, #2980b9);
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    transition: background 0.5s ease;
}

/* Navigation Bar */
.navbar {
    width: 100%;
    background: rgba(0, 0, 0, 0.8);
    position: fixed;
    top: 0;
    left: 0;
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1000;
}

.navbar a {
    color: white;
    text-decoration: none;
    margin: 0 15px;
    transition: color 0.3s ease;
}

.navbar a:hover {
    color: #f7a13d;
}

/* Hero Section */
.hero {
    width: 100%;
    height: 90vh;
    background: url('images/TaskTreasureLogo.jpg') center/cover no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    animation: fadeIn 2s ease-in;
}

.hero h1 {
    font-size: 3em;
    font-weight: bold;
    animation: slideDown 1.5s ease-in-out;
}

.hero p {
    font-size: 1.2em;
    margin-top: 10px;
    animation: slideUp 1.5s ease-in-out;
}

/* Call to Action */
.cta {
    margin: 40px 0;
    background: #f7a13d;
    padding: 20px 30px;
    text-align: center;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.3s;
    animation: bounce 2s infinite alternate;
}

.cta:hover {
    background: #e68a00;
}

/* Animations */
@keyframes slideDown {
    from { transform: translateY(-50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

@keyframes slideUp {
    from { transform: translateY(50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

@keyframes bounce {
    from { transform: translateY(0); }
    to { transform: translateY(-10px); }
}

/* Dark Mode */
.dark-mode {
    background: #222;
    color: #fff;
}

/* Footer */
footer {
    text-align: center;
    padding: 20px;
    background: #333;
}
