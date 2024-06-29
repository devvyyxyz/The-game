// Function to toggle between light and dark theme
function toggleTheme() {
    let body = document.body;
    body.classList.toggle('dark-theme');
}

// Function to toggle censoring of "the game"
function toggleCensor() {
    let censorCheckbox = document.getElementById('censorCheckbox');
    let gameTitle = document.querySelector('h1');

    if (censorCheckbox.checked) {
        gameTitle.textContent = gameTitle.textContent.replace(/the game/gi, '****');
    } else {
        gameTitle.textContent = 'The Game';
    }
}

// Event listener for theme toggle
document.getElementById('themeCheckbox').addEventListener('change', function() {
    toggleTheme();
});

// Event listener for censor toggle
document.getElementById('censorCheckbox').addEventListener('change', function() {
    toggleCensor();
});
