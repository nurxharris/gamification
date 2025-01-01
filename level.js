document.addEventListener("DOMContentLoaded", function () {
    const levels = document.querySelectorAll(".level-box");

    levels.forEach((level) => {
        level.addEventListener("click", function () {
            const levelId = level.id;
            const levelBackground = level.querySelector(".level-background");

            // Check if the level is locked
            if (levelBackground.classList.contains("locked")) {
                showWarning(); // Show warning if the level is locked
            } else {
                navigateToGame(levelId); // Navigate to gameplay.html with the level
            }
        });
    });

    // Handle category selection from URL
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCategory = urlParams.get('category'); 
    document.getElementById('selected-category').textContent = selectedCategory;
});

function showWarning() {
    const warningMessage = document.getElementById("warning-message");
    warningMessage.style.display = "block";
}

function closeWarning() {
    const warningMessage = document.getElementById("warning-message");
    warningMessage.style.display = "none";
}

function navigateToGame(levelId) {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCategory = urlParams.get('category'); // Retrieve the selected category from URL
    const gameplayUrl = `gameplay.html?category=${selectedCategory}&level=${levelId}`;
    window.location.href = gameplayUrl;
}

function selectLevel(level) {
    if (level === 1) {
        document.getElementById('continue-button').style.display = 'block';
        document.getElementById('continue-button').onclick = function() {
            startGame(level); 
        };
    } else {
        showWarning();
    }
}

function startGame(level) {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCategory = urlParams.get('category');
    window.location.href = `gameplay.html?category=${selectedCategory}&level=${level}`;
}

function returnToMainMenu() {
    window.location.href = 'index.html'; 
}

function goToCategories() {
    window.location.href = 'categories.html';  
}

// Adding event listeners for specific levels
document.getElementById('level1').addEventListener('click', function() {
    selectLevel(1);
});
document.getElementById('level2').addEventListener('click', function() {
    selectLevel(2);
});
document.getElementById('level3').addEventListener('click', function() {
    selectLevel(3);
});
