const words = ["TURKEY", "INDIA", "JAPAN", "BRAZIL", "GREECE", "FRANCE"];
const gridLetters = [
    "SNRUNNIGUDAH",
    "EINDIAWRIMWO",
    "PTURKEYQOLAS",
    "EIAEUNCPMSUE",
    "OASPTSUEIMGA",
    "FGKRAJITEETA",
    "RPABRAZILRPS",
    "ATIRAPUIWGGH",
    "NCENIAKTUFIS",
    "CGDEGNYNAGBE",
    "ETUFOWRUYKLE",
    "RNDLOPEBRIEH"
];

const gridElement = document.getElementById("wordSearch");
const wordListElement = document.getElementById("wordList");
const timerElement = document.getElementById("timer");
let isSelecting = false;
let selectedCells = [];
let selectedWord = "";
let countdownTimer;
let gameTime = 3 * 60; 
let timerRunning = false;
let stars = 0;

function fillGrid(grid, size) {
    return grid.map(row => {
        const missingLetters = size - row.length;
        if (missingLetters > 0) {
            const randomLetters = Array(missingLetters)
                .fill("")
                .map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26)))
                .join("");
            return row + randomLetters;
        }
        return row;
    });
}

function renderGrid() {
    gridElement.innerHTML = '';
    const completeGrid = fillGrid(gridLetters, 12);
    completeGrid.forEach((row, rowIndex) => {
        row.split("").forEach((letter, colIndex) => {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.textContent = letter;
            cell.dataset.row = rowIndex;
            cell.dataset.col = colIndex;
            gridElement.appendChild(cell);
        });
    });
}

function startCountdown() {
    if (!timerRunning) {
        timerRunning = true;
        countdownTimer = setInterval(function() {
            if (gameTime <= 0) {
                clearInterval(countdownTimer);
                showGameOver();
            } else {
                gameTime--;
                updateTimerDisplay();
            }
        }, 1000);
    }
}

function updateTimerDisplay() {
    let minutes = Math.floor(gameTime / 60);
    let seconds = gameTime % 60;
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    timerElement.innerText = `${minutes}:${seconds}`;
}

function showGameOver() {
    clearInterval(countdownTimer);
    const gameOverModal = document.getElementById('game-over-modal');
    document.getElementById('game-over-stars').innerText = stars;
    gameOverModal.style.display = 'flex';
}

function showYouWin() {
    clearInterval(countdownTimer);
    const youWinModal = document.getElementById('you-win-modal');
    document.getElementById('win-stars').innerText = stars;
    youWinModal.style.display = 'flex';
}

function checkIfAllWordsFound() {
    const allFound = Array.from(wordListElement.children).every(wordElement => wordElement.classList.contains('found'));
    if (allFound) {
        if (gameTime > 144) {
            stars = 3;
        } else if (gameTime > 84) {
            stars = 2;
        } else if (gameTime > 24) {
            stars = 1;
        } else {
            stars = 0;
        }
        showYouWin();
    }
}

function exitGame() {
    window.location.reload();
}

function nextLevel() {
    window.location.href = "next-level.html"; 
}

function retryLevel() {
    window.location.reload();
}

function mainMenu() {
    window.location.href = "main-menu.html"; 
}

gridElement.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("cell")) {
        isSelecting = true;
        e.target.classList.add("selected");
        selectedCells.push(e.target);
        selectedWord += e.target.textContent;
    }
});

gridElement.addEventListener("mouseover", (e) => {
    if (isSelecting && e.target.classList.contains("cell")) {
        if (!selectedCells.includes(e.target)) {
            e.target.classList.add("selected");
            selectedCells.push(e.target);
            selectedWord += e.target.textContent;
        }
    }
});

document.addEventListener("mouseup", () => {
    if (isSelecting) {
        if (words.includes(selectedWord)) {
            markWordAsFound(selectedWord);
            selectedCells.forEach(cell => cell.classList.add("found"));
        } else {
            selectedCells.forEach(cell => cell.classList.remove("selected"));
        }
        resetSelection();
        checkIfAllWordsFound();
    }
});

function markWordAsFound(word) {
    const wordElements = Array.from(wordListElement.children);
    wordElements.forEach(wordElement => {
        if (wordElement.textContent.toUpperCase() === word) {
            wordElement.classList.add("found");
        }
    });
}

function resetSelection() {
    isSelecting = false;
    selectedCells = [];
    selectedWord = "";
}

renderGrid();
startCountdown();

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


