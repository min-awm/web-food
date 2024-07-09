// Start history.js
// Kiểm tra DOM đã sẵn sàng
document.addEventListener("DOMContentLoaded", function (event) {
  main();
});

function main() {
  initTheme();
  getHistorOrder();
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

function getHistorOrder() {
  const historyOrderData = localStorage.getItem("historyOrder");
  let historyOrder = historyOrderData ? JSON.parse(historyOrderData) : [];
  const historyOrderDom = document.getElementById("history-order");

  if (!historyOrder.length) {
    return (historyOrderDom.innerHTML = `
      <tr>
        Không có dữ liệu
      </tr>`);
  }

  let historyOrderHtml = "";
  historyOrder.forEach((history, i) => {
    historyOrderHtml += `
      <tr>
          <td>${i+1}</td>
          <td>${showProduct(history)}</td>
          <td>${calcLastPrice(history)}</td>
      </tr>
    `;
  });

  historyOrderDom.innerHTML = historyOrderHtml;
}

function calcLastPrice(cartData) {
  let totalPrice = 0;

  cartData.forEach((cartItem) => {
    totalPrice += cartItem.amount * cartItem.product.price;
  });

  return `${formatNumber(totalPrice)}đ`;
}

function showProduct(cartData) {
  let productHtml = "";
  cartData.forEach((e) => {
    productHtml += `${e.product.name} - Giá: ${formatNumber(e.product.price)}  - Số lượng: ${e.amount};<br />`;
  });

  return productHtml;
}

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
// End history.js