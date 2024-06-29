// Initialize global variables for timer and history
let startTime;
let elapsedTime = 0;
let timerInterval;
let historyList = [];

// Function to start the timer
function startTimer() {
    startTime = localStorage.getItem('startTime');
    if (!startTime) {
        startTime = new Date().getTime();
        localStorage.setItem('startTime', startTime);
    } else {
        startTime = parseInt(startTime);
    }

    timerInterval = setInterval(updateTimer, 1000);
    updateTimer(); // Update timer immediately
}

// Function to update the timer every second
function updateTimer() {
    let now = new Date().getTime();
    elapsedTime = now - startTime;

    let days = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));
    let hours = Math.floor((elapsedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

    document.getElementById('timer').textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Function to handle button click (when user remembers the game)
function handleRememberClick() {
    clearInterval(timerInterval); // Stop the timer

    // Calculate duration since last "remembered"
    let duration = elapsedTime;

    // Update history list
    let newItem = {
        timestamp: new Date().getTime(), // Use timestamp for sorting
        duration: duration
    };
    historyList.unshift(newItem); // Add new item at the beginning

    // Store updated history list in localStorage
    localStorage.setItem('gameHistory', JSON.stringify(historyList));

    // Update the displayed history list
    updateHistoryList(historyList);

    // Reset timer and start again
    startTime = new Date().getTime();
    localStorage.setItem('startTime', startTime);
    elapsedTime = 0;
    startTimer();
}

// Function to format elapsed time into a readable string
function formatElapsedTime(time) {
    let days = Math.floor(time / (1000 * 60 * 60 * 24));
    let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((time % (1000 * 60)) / 1000);

    return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
}

// Function to update the displayed history list
function updateHistoryList(historyList) {
    let historyListElement = document.getElementById('historyList');
    historyListElement.innerHTML = ''; // Clear existing list items

    historyList.forEach(item => {
        let listItem = document.createElement('li');
        let date = new Date(item.timestamp).toLocaleString(); // Convert timestamp to readable date
        listItem.textContent = `On ${date} you went ${formatElapsedTime(item.duration)} without the game`;
        historyListElement.appendChild(listItem);
    });
}

// Function to sort history list based on selected option
function sortHistoryList(option) {
    switch (option) {
        case 'dateDesc':
            historyList.sort((a, b) => b.timestamp - a.timestamp);
            break;
        case 'dateAsc':
            historyList.sort((a, b) => a.timestamp - b.timestamp);
            break;
        case 'durationDesc':
            historyList.sort((a, b) => b.duration - a.duration);
            break;
        case 'durationAsc':
            historyList.sort((a, b) => a.duration - b.duration);
            break;
        default:
            return;
    }

    updateHistoryList(historyList);
}

// Function to clear the history with confirmation
function clearHistory() {
    if (confirm('Are you sure you want to clear your game history?')) {
        historyList = []; // Clear history list array
        localStorage.removeItem('gameHistory'); // Remove history from localStorage
        updateHistoryList(historyList); // Update UI to reflect cleared history
    }
}

// Event listener for button click
document.getElementById('gameButton').addEventListener('click', handleRememberClick);

// Event listener for sorting dropdown change
document.getElementById('sortDropdown').addEventListener('change', function() {
    let selectedOption = this.value;
    sortHistoryList(selectedOption);
});

// Event listener for clear history button
document.getElementById('clearHistoryButton').addEventListener('click', clearHistory);

// On page load, fetch and display stored history and start timer
document.addEventListener('DOMContentLoaded', function() {
    historyList = JSON.parse(localStorage.getItem('gameHistory')) || [];
    updateHistoryList(historyList);
    startTimer();
});
