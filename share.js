// Function to capture stats and initiate share or download
function captureAndShareStats() {
    // Replace with your logic to get highest and lowest times
    let highestTime = "2 days 4 hours 30 minutes";
    let lowestTime = "0 days 1 hour 15 minutes";

    // Create a canvas element
    const canvas = document.createElement('canvas');
    canvas.width = 400; // Adjust dimensions as needed
    canvas.height = 200;

    const ctx = canvas.getContext('2d');

    // Background style
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Text style
    ctx.fillStyle = '#333';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`Highest Time: ${highestTime}`, canvas.width / 2, 100);
    ctx.fillText(`Lowest Time: ${lowestTime}`, canvas.width / 2, 150);

    // Convert canvas to image
    const image = canvas.toDataURL('image/png');

    // Determine if the device is mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
        // Mobile: Open share dialog
        if (navigator.share) {
            navigator.share({
                title: 'Game Stats',
                text: `Highest Time: ${highestTime}, Lowest Time: ${lowestTime}`,
                url: image
            }).then(() => {
                console.log('Shared successfully');
            }).catch((error) => {
                console.error('Error sharing:', error);
            });
        } else {
            console.log('Web Share API not supported');
            // Optionally handle fallback behavior for older browsers
        }
    } else {
        // Desktop: Prompt to download image
        const downloadLink = document.createElement('a');
        downloadLink.href = image;
        downloadLink.download = 'game-stats.png';
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
}

// Event listener for share stats button
document.getElementById('shareStatsButton').addEventListener('click', function() {
    captureAndShareStats();
});
