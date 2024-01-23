document.getElementById('recordButton').addEventListener('click', function() {
    // Start playing the video
    var video = document.getElementById('ecgVideo');
    video.play();
    recordButton.textContent = 'Recording...';

    setTimeout(function() {
        // Get a random emotion and display it
        const emotions = ["Exuberant", "Bored", "Dependent", "Disdainful", "Relaxed", "Anxious", "Docile", "Hostile"];
        const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        document.getElementById('outputEmotion').textContent = randomEmotion;
        displayAdvice(randomEmotion);
        recordButton.textContent = 'Record ECG';
    }, 2000);
});

var adviceParagraph = document.getElementById('advice'); // Get the advice paragraph element

function displayAdvice(emotion) {
    var advices = {
        "Exuberant": "Channel your energy into something creative or productive.",
        "Bored": "Try learning something new or starting a project.",
        "Dependent": "Take a moment to plan how you can be more self-reliant in a healthy way.",
        "Disdainful": "Consider the reasons behind your feelings and try to foster empathy.",
        "Relaxed": "Enjoy the calm moment, but also consider doing a light activity you enjoy.",
        "Anxious": "Take deep breaths and focus on what you can control.",
        "Docile": "It's okay to be agreeable, but make sure your own voice is heard.",
        "Hostile": "Exercise can be a healthy way to release tension and clear your mind."
    };

    // Display the advice corresponding to the emotion
    adviceParagraph.textContent = advices[emotion] || "No advice available.";
}