let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let laps = [];

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');

function startStopwatch() {
    startTime = new Date().getTime();
    timerInterval = setInterval(showTime, 1);
    startStopBtn.textContent = 'Pause';
    startStopBtn.style.backgroundColor = '#ffc107';
    running = true;
}

function pauseStopwatch() {
    clearInterval(timerInterval);
    difference = new Date().getTime() - startTime;
    updatedTime = difference;
    startStopBtn.textContent = 'Start';
    startStopBtn.style.backgroundColor = '#28a745';
    running = false;
}

function resetStopwatch() {
    clearInterval(timerInterval);
    display.textContent = '00:00:00.000';
    updatedTime = 0;
    startStopBtn.textContent = 'Start';
    startStopBtn.style.backgroundColor = '#28a745';
    laps = [];
    renderLaps();
    running = false;
}

function lapStopwatch() {
    if (running) {
        laps.push(display.textContent);
        renderLaps();
    }
}

function renderLaps() {
    lapsContainer.innerHTML = '';
    laps.forEach((lap, index) => {
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap ${index + 1}: ${lap}`;
        lapsContainer.appendChild(lapElement);
    });
}

function showTime() {
    const now = new Date().getTime();
    difference = now - startTime + (updatedTime || 0);
    
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 1);
    
    display.textContent = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

startStopBtn.addEventListener('click', () => {
    running ? pauseStopwatch() : startStopwatch();
});

resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', lapStopwatch);
