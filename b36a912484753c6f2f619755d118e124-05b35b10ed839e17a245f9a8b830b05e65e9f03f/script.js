let timer;
let time = 0;
let running = false;
let breakTime = 0;
let isBreak = false;
let breakRatio = 1 / 5; // Default break time ratio

const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const breakButton = document.getElementById('break');
const endButton = document.getElementById('end');
const guideButton = document.getElementById('guide');
const backButton = document.getElementById('back');
const timerDisplay = document.getElementById('timer');
const dingSound = document.getElementById('ding');
const breakOptions = document.querySelectorAll('input[name="breakRatio"]');

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
breakButton.addEventListener('click', takeBreak);
endButton.addEventListener('click', endSession);
guideButton.addEventListener('click', showGuide);
backButton.addEventListener('click', showMain);

// Add event listener for break ratio options
breakOptions.forEach(option => {
    option.addEventListener('change', () => {
        breakRatio = parseFloat(option.value);
    });
});

function startTimer() {
    if (!running) {
        running = true;
        timer = setInterval(updateTimer, 1000);
    }
}

function pauseTimer() {
    clearInterval(timer);
    running = false;
}

function updateTimer() {
    if (!isBreak) {
        time++;
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    } else {
        breakTime--;
        if (breakTime >= 0) {
            const minutes = Math.floor(breakTime / 60);
            const seconds = breakTime % 60;
            timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        } else {
            timerDisplay.textContent = '00:00';
            isBreak = false;
            time = 0;
            startTimer();
            dingSound.play(); // Play ding sound
        }
    }
}

function takeBreak() {
    if (!isBreak && time > 0) {
        pauseTimer();
        breakTime = Math.floor(time * breakRatio); // Calculate break time based on selected ratio
        isBreak = true;
        time = 0; // Reset study time for the next session
        timerDisplay.textContent = formatTime(breakTime);
        startTimer();
    }
}

function endSession() {
    clearInterval(timer);
    running = false;
    time = 0;
    breakTime = 0;
    isBreak = false;
    timerDisplay.textContent = '00:00';
}

function showGuide() {
    document.getElementById('main-container').style.display = 'none';
    document.getElementById('guide-container').style.display = 'block';
}

function showMain() {
    document.getElementById('guide-container').style.display = 'none';
    document.getElementById('main-container').style.display = 'block';
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}
