// Start quiz.js
// Kiểm tra DOM đã sẵn sàng
document.addEventListener("DOMContentLoaded", function (event) {
  main();
});

let ansCorrectList = ["a", "b", "a", "a", "a"];
let time = "";
let timerInterval;
let point = 0;
let numberAnsCorrect = 0;

function main() {
  initTheme();
}

// Theme
function initTheme() {
  const appDom = document.getElementById("app");
  const themeBtnDom = document.getElementById("theme-btn");
  const theme = localStorage.getItem("theme");

  // Xoá class theme
  appDom.classList.remove("light-theme");
  appDom.classList.remove("dark-theme");

  //   Thêm class theme
  if (theme === "dark") {
    themeBtnDom.checked = true;
    appDom.classList.add("dark-theme");
  } else {
    themeBtnDom.checked = false;
    appDom.classList.add("light-theme");
  }
}

function setTheme(e) {
  const theme = e.checked ? "dark" : "light";
  localStorage.setItem("theme", theme);
  initTheme();
}

function startQuiz(e) {
  const quizContentDom = document.getElementById("quiz-content");

  quizContentDom.style.display = "block";
  e.style.display = "none";
  startTimer();
}

function selectedAns(numberQuestion, ans) {
  if (ansCorrectList[numberQuestion] === ans) {
    point += 20;
    numberAnsCorrect += 1;
  }
}

function showResult(e) {
  const btnResetBtn = document.getElementById("btn-reset");

  e.style.display = "none";
  btnResetBtn.style.display = "block";

  clearInterval(timerInterval);

  return Swal.fire({
    title: "Kết quả",
    html: `Chúc mừng bạn đã được mã giảm giá ${formatNumber(
      point * 1000
    )}<br><span>Số câu đúng: ${numberAnsCorrect}/5</span><br/><span>Điểm: ${point}</span><br /><span>Thời gian: ${time}</span>`,
    icon: "success",
  });
}

// Helpers
function formatNumber(value, minFraction = 0, maxFraction = 3) {
  try {
    var formatter = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: minFraction,
      maximumFractionDigits: maxFraction,
    });
    return formatter.format(value);
  } catch (error) {
    console.log(error);
    return value;
  }
}

function startTimer() {
  let totalSeconds = 0;
  timerInterval = setInterval(function () {
    ++totalSeconds;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    let formattedTime =
      minutes.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0");

    time = formattedTime;
    document.getElementById("quiz-time").textContent = formattedTime;
  }, 1000);
}
// End quiz.js