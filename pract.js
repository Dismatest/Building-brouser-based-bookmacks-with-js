const startButton = document.querySelector('[data-action="start"]');
const stopButton = document.querySelector('[data-action="stop"]');
const resetButton = document.querySelector('[data-action="reset"]');

const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");

let timerTime = 00;
let isRunning = false;
let interval;

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  interval = setInterval(incrementTime, 1000);
}
function stopTimer() {
  if (!isRunning) return;
  isRunning = false;
  clearInterval(interval);
}
function resetTimer() {
  stopTimer();
  timerTime = 0;
  minutes.innerText = "00";
  seconds.innerText = "00";
}

function incrementTime() {
  timerTime++;

  const numMin = Math.floor(timerTime / 60);
  const numSec = timerTime % 60;
  minutes.innerText = pad(numMin);
  seconds.innerText = pad(numSec);
}

function pad(number) {
  return number < 10 ? "0" + number : number;
  //   if (number < 10) {
  //     return "0" + number;
  //   } else {
  //     return number;
  //   }
}
startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);
