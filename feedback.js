// Function to send feedback to Discord webhook as an embed
function sendFeedback() {
    const webhookUrl = 'https://discord.com/api/webhooks/1256150925165465782/KMTJvHeiiYTwgczy3RnNw6p75jucFdLHaiUGpKdenTnU2InOcpBQRg8VYWCYEyD_sRGJ';

    const feedbackMessage = prompt('Please enter your feedback:');
    if (!feedbackMessage) return; // If feedbackMessage is empty or null, do nothing

    const currentTime = new Date().toISOString();

    const payload = {
        embeds: [{
            title: 'Feedback',
            description: feedbackMessage,
            footer: {
                text: `Submitted at ${currentTime} from The Game Website`,
            },
        }],
    };

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        alert('Feedback sent successfully!');
    })
    .catch(error => {
        console.error('Error sending feedback:', error);
        alert('Failed to send feedback. Please try again later.');
    });
}

// Event listener for send feedback button
document.getElementById('sendFeedbackButton').addEventListener('click', sendFeedback);
