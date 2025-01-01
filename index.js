document.getElementById('start-game').addEventListener('click', function() {
    window.location.href = 'categories.html';  
});

document.getElementById('settings').addEventListener('click', function() {
    document.getElementById('settings-modal').style.display = 'block'; 
});

document.getElementById('close-settings').addEventListener('click', function() {
    document.getElementById('settings-modal').style.display = 'none'; 
});

document.getElementById('exit-game').addEventListener('click', function() {
    window.close(); 
});

document.getElementById('toggle-music').addEventListener('click', function() {
    const music = document.getElementById('background-music');
    if (music.paused) {
        music.play();
        this.textContent = '🎵 Music: On';
    } else {
        music.pause();
        this.textContent = '🎵 Music: Off';
    }
});

document.getElementById('toggle-sound').addEventListener('click', function() {
    this.textContent = (this.textContent.includes('On')) ? '🔊 Sound: Off' : '🔊 Sound: On';
});

// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("start-game");
    
    // Add an event listener for the "Start Game" button
    startButton.addEventListener("click", function() {
        // Trigger fade-out effect
        document.body.classList.add("fade-out");

        // Wait for the fade-out transition to finish, then redirect to categories.html
        setTimeout(function() {
            window.location.href = "categories.html"; // Navigate to the next page
        }, 500); // The duration should match the transition time (0.5s in this case)
    });
});

