const timerElement = document.getElementById('timer');
const beepSound = document.getElementById('beep-sound');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const timeInput = document.getElementById('timeInput');

let timerInterval; // Variable to store the interval
let beepPlayed = false; // Flag to ensure beep is played only once at 10 seconds

startBtn.addEventListener('click', () => {
    let countdown = parseTimeInput(timeInput.value) || 3600; // Parse input into seconds or default to 1 hour (3600s)

    // Clear any existing interval if the button is pressed again
    clearInterval(timerInterval);
    beepPlayed = false; // Reset the beep flag when the timer starts

    // Start the countdown timer
    timerInterval = setInterval(() => {
        // Update the timer text
        timerElement.innerText = formatTime(countdown);

        // Play beep sound once at 10 seconds remaining
        if (countdown === 10 && !beepPlayed) {
            beepSound.play();
            beepPlayed = true; // Ensure beep plays only once at 10 seconds
        }

        // Play beep when the countdown reaches 0
        if (countdown === 0) {
            beepSound.play(); // Play final beep at 0 seconds
            clearInterval(timerInterval); // Stop the timer
        }

        // Decrement the countdown value
        if (countdown > 0) {
            countdown--;
        }
    }, 1000);
});

// Add functionality for the reset button
resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval); // Stop the timer
    timerElement.innerText = '00:00:00'; // Reset the timer display to 00:00:00
    timeInput.value = ''; // Clear the input field
    beepPlayed = false; // Reset beep flag
    beepSound.pause();  // Stop the beep sound
    beepSound.currentTime = 0; // Reset beep sound to start
});

// Parse time input in HH:MM:SS format and convert it to seconds
function parseTimeInput(input) {
    const timeParts = input.split(':').map(part => parseInt(part, 10) || 0);
    
    let seconds = 0;
    if (timeParts.length === 3) { // HH:MM:SS format
        const [hours, minutes, secs] = timeParts;
        seconds = (hours * 3600) + (minutes * 60) + secs;
    } else if (timeParts.length === 2) { // MM:SS format
        const [minutes, secs] = timeParts;
        seconds = (minutes * 60) + secs;
    } else if (timeParts.length === 1) { // SS format
        seconds = timeParts[0];
    }

    return seconds;
}

// Format the time to HH:MM:SS format
function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}h ${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
}
