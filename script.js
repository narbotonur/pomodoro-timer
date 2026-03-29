let time = 25 * 60;
let totalTime = time;
let interval = null;

const progress = document.getElementById("progress");
const circumference = 2 * Math.PI * 90;
progress.style.strokeDasharray = circumference;

progress.style.strokeDasharray = circumference;

function update() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;

  document.getElementById("timer").textContent =
    `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  let offset = circumference - (time / totalTime) * circumference;
  progress.style.strokeDashoffset = offset;
  let progressPercent = time / totalTime;
let hue = progressPercent * 120;

let color = `hsl(${hue}, 100%, 50%)`;

// меняем круг
progress.style.stroke = color;

// 🔥 меняем глобальный цвет (для glow)
document.documentElement.style.setProperty("--accent", color);
}

function startTimer() {
  if (interval) return;

  interval = setInterval(() => {
    time--;
    update();

    if (time <= 0) {
      clearInterval(interval);
      interval = null;
      document.getElementById("alarm").play();
showPopup();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(interval);
  interval = null;
}

function resetTimer() {
  pauseTimer();
  time = totalTime;
  update();
}

function setMode(minutes) {
  pauseTimer();
  time = minutes * 60;
  totalTime = time;
  update();
}
// загрузка темы
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
}

function toggleTheme() {
  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
}

function showPopup() {
  const popup = document.getElementById("popup");

  popup.classList.add("show");

  setTimeout(() => {
    popup.classList.remove("show");
  }, 3000);
}
update();