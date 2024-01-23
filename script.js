// Global variable to keep track of loaded scripts
var loadedScripts = {};

document.getElementById('homeButton').addEventListener('click', () => {
    document.getElementById('homeButtonContainer').style.display = 'none';
    document.querySelector('.content').innerHTML = `
        <p>Welcome to the Emotion Monitoring Project. Please select a feature.</p>
        <p>This project was coded by Diane and the goal is to help people to understand their emotions and help to manage them.</p>
    `;
});

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Event listener for the Psychological Advisor button
    document.getElementById('paButton').addEventListener('click', () => {
        loadContent('psy_advisor/psy_advisor.html', 'psy_advisor/psy_advisor.js');
        document.getElementById('homeButtonContainer').style.display = 'block';
    });

    // Add more event listeners for other buttons (like Emotion Recognition) if needed
});



// Function to dynamically load and execute a JavaScript file
// Updated function to dynamically load and execute a JavaScript file with callback
function loadJS(jsUrl, callback) {
    const scriptTag = document.createElement('script');
    scriptTag.src = jsUrl;
    scriptTag.type = 'text/javascript';
    scriptTag.onload = callback; // Execute callback after the script is loaded
    document.body.appendChild(scriptTag);
}

// Updated function to load HTML content dynamically
function loadContent(htmlUrl, jsUrl) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', htmlUrl, true);
    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            document.querySelector('.content').innerHTML = this.responseText;
            if (!loadedScripts[jsUrl]) {
                loadJS(jsUrl, function() {
                    console.log('Script loaded:', jsUrl); // Debugging log
                    bindPAEvents(); // Call bindPAEvents after script is loaded
                });
                loadedScripts[jsUrl] = true;
            } else {
                bindPAEvents(); // Call bindPAEvents if script is already loaded
            }
        }
    };
    xhr.send();
}

// Function to bind events for Psychological Advisor
function bindPAEvents() {
    console.log('Binding PA events'); // Debugging log

    // Check if generateText is defined
    if (typeof generateText === 'function') {
        const generateButton = document.getElementById('generateButton');
        if (generateButton) {
            generateButton.addEventListener('click', generateText);
        } else {
            console.error('Generate button not found');
        }
    } else {
        console.error('generateText function not defined');
        // Optional: Retry binding after a delay
        setTimeout(bindPAEvents, 1000); // Retry after 1 second
    }
}

