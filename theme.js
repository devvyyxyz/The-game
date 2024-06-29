// Function to toggle between light and dark theme
function toggleTheme() {
    let body = document.body;
    body.classList.toggle('dark-theme');

    // Save theme preference to localStorage
    if (body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }

    // Update footer theme
    updateFooterTheme();
}

// Function to toggle censoring of elements
function toggleCensor() {
    let censorCheckbox = document.getElementById('censorCheckbox');
    let elementsToCensor = document.querySelectorAll('.censorable');

    elementsToCensor.forEach(element => {
        if (censorCheckbox.checked) {
            element.dataset.originalText = element.textContent; // Store original text content
            element.textContent = '*'.repeat(element.textContent.length); // Replace text with *
        } else {
            if (element.dataset.originalText) {
                element.textContent = element.dataset.originalText; // Restore original text content
            }
        }
    });

    // Save censor preference to localStorage
    if (censorCheckbox.checked) {
        localStorage.setItem('censor', 'on');
    } else {
        localStorage.setItem('censor', 'off');
    }
}

// Function to update footer theme based on current theme
function updateFooterTheme() {
    let footer = document.getElementById('footer');
    let body = document.body;

    if (body.classList.contains('dark-theme')) {
        footer.classList.add('dark-theme');
        footer.classList.remove('light-theme');
    } else {
        footer.classList.add('light-theme');
        footer.classList.remove('dark-theme');
    }
}

// Event listener for special theme toggle
document.getElementById('specialToggle').addEventListener('change', function() {
    toggleSpecialTheme();
});

// Function to toggle special theme
function toggleSpecialTheme() {
    let body = document.body;
    body.classList.toggle('special-theme');
}

// Event listener for theme toggle
document.getElementById('themeCheckbox').addEventListener('change', function() {
    toggleTheme();
});

// Event listener for censor toggle
document.getElementById('censorCheckbox').addEventListener('change', function() {
    toggleCensor();
});

// Check localStorage on page load to set initial theme and censor state
document.addEventListener('DOMContentLoaded', function() {
    // Set theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }

    // Update footer theme based on initial theme
    updateFooterTheme();

    // Set censor state
    const savedCensor = localStorage.getItem('censor');
    const censorCheckbox = document.getElementById('censorCheckbox');
    if (savedCensor === 'on') {
        censorCheckbox.checked = true;
        toggleCensor(); // Update UI
    } else {
        censorCheckbox.checked = false;
        toggleCensor(); // Update UI
    }
});
