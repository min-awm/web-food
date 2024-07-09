// Start static-page.js
// Kiểm tra DOM đã sẵn sàng
document.addEventListener("DOMContentLoaded", function (event) {
  main();
});

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
// End static-page.js