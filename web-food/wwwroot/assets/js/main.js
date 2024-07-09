// Start main.js
// Kiểm tra DOM đã sẵn sàng
document.addEventListener("DOMContentLoaded", function (event) {
  main();
});

// Global data
let bestProductList = window.bestProductInitData;
let productList = window.productInitData;
let cartData = [];
let menuSelected = "pho"; // option: ["pho", "comrang", "douong", "banh", "all"]

function main() {
  initTheme();
  initLogin();
  getBestProductList();
  getProductList();
  initCart();
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

// Login
function initLogin() {
  const loginBtnDom = document.getElementById("login-btn");
  const orderLinkDom = document.getElementById("order-link");

  const name = localStorage.getItem("name");
  const phone = localStorage.getItem("phone");

  if (name && phone) {
    orderLinkDom.style.display = "inline";
    loginBtnDom.innerHTML = "Đăng xuất";
    loginBtnDom.classList.add("logout");
    loginBtnDom.onclick = () => {
      logout();
    };
  } else {
    orderLinkDom.style.display = "none";
    loginBtnDom.innerHTML = "Đăng nhập";
    loginBtnDom.classList.remove("logout");
    loginBtnDom.onclick = () => {
      showModalLogin(true);
    };
  }
}

function showModalLogin(value) {
  showNav(false);
  const modalLoginDom = document.getElementById("modal-login");
  modalLoginDom.style.display = value ? "block" : "none";
}

function saveLogin() {
  const loginNameDom = document.getElementById("login-name");
  const loginPhoneDom = document.getElementById("login-phone");

  const loginName = loginNameDom.value;
  const loginPhone = loginPhoneDom.value;

  if (loginName && loginPhone) {
    localStorage.setItem("name", loginName);
    localStorage.setItem("phone", loginPhone);

    showModalLogin(false);
    initLogin();
    Swal.fire({
      text: "Đã lưu thông tin",
      icon: "success",
      timer: 2000,
    });
  } else {
    Swal.fire({
      text: "Vui lòng nhập đầy đủ thông tin",
      icon: "warning",
      timer: 2000,
    });
  }
}

function logout() {
  const theme = localStorage.getItem("theme");
  localStorage.clear();
  localStorage.setItem("theme", theme);
  main();

  Swal.fire({
    text: "Đã đăng xuất",
    icon: "success",
    timer: 2000,
  });

  showNav(false);
}

// Best Product nếu lấy dữ liệu thất bại sẽ lấy dữ liệu mặc định
async function getBestProductList() {
  try {
    const res = await fetch('/api/product');
    const data = await res.json();

    if (data.ok) {
        bestProductList = data.d.slice(0,6)
    }
    addBestProductToDom();
  } catch (error) {
    Swal.fire({
      tille: "Lỗi",
      text: "Không lấy được danh sách bán chạy",
      icon: "error",
      timer: 2000,
    });
  }
}

function addBestProductToDom() {
  const bestProductDom = document.getElementById("best-product");
  let bestProductData = bestProductList;
  let bestProductHtml = "";

  bestProductData.forEach((bestProduct) => {
    bestProductHtml += `
      <div class="item-product" onclick="addCart(${bestProduct.id})">
        <img src="${bestProduct.img}" alt="Product" />
        <p class="name">
          ${bestProduct.name}
        </p>
        <p class="price">${formatNumber(bestProduct.price)} đ</p>
        <div class="btn-buy">Chọn mua</div>
      </div>`;
  });

  bestProductDom.innerHTML = bestProductHtml;
}

// product
async function getProductList() {
  try {
    const res = await fetch('/api/product');
    const data = await res.json();

    if (data.ok) {
        productList = data.d
    }
    addProductToDom();
  } catch (error) {
      console.log(error)
    Swal.fire({
      tille: "Lỗi",
      text: "Không lấy được danh sách sản phẩm",
      icon: "error",
      timer: 2000,
    });
  }
}

function addProductToDom() {
  const productDom = document.getElementById("product-list");
  let productData = productList;
  let bestProductHtml = "";

  productData.forEach((bestProduct) => {
    if (menuSelected === bestProduct.type || menuSelected === "all") {
      return (bestProductHtml += `
      <div class="item-product" onclick="addCart(${bestProduct.id})">
        <img src="${bestProduct.img}" alt="Product" />
        <p class="name">
          ${bestProduct.name}
        </p>
        <p class="price">${formatNumber(bestProduct.price)}đ</p>
        <div class="btn-buy">Chọn mua</div>
      </div>`);
    }
  });

  productDom.innerHTML = bestProductHtml;
}

// menu
function changeMenu(e, menuItem) {
    const menuItemDom = document.getElementsByClassName("menu-item")
    menuItemDom[0].classList.remove('active')
    menuItemDom[1].classList.remove('active')
    menuItemDom[2].classList.remove('active')
    menuItemDom[3].classList.remove('active')
    menuItemDom[4].classList.remove('active')
    
    e.classList.add("active")
    menuSelected = menuItem;
    addProductToDom();
}

// cart
function initCart() {
  const cartDataString = localStorage.getItem("cart");

  cartData = cartDataString ? JSON.parse(cartDataString) : [];

  const cartNumberDom = document.getElementById("cart-number");
  const cartNumber = cartData.length;

  if (cartNumber) {
    cartNumberDom.innerHTML = cartNumber;
    cartNumberDom.style.display = "flex";
  } else {
    cartNumberDom.innerHTML = cartNumber;
    cartNumberDom.style.display = "none";
  }
}

function addCart(id) {
  if (!isLogin()) {
    return Swal.fire({
      text: "Vui lòng đăng nhập",
      icon: "warning",
      timer: 2000,
    });
  }

  if (cartData.find((cartItem) => cartItem.product.id == id)) {
    return Swal.fire({
      text: "Sản phẩm đã có trong giỏ hàng",
      icon: "warning",
      timer: 2000,
    });
  }

  const product = productList.find((product) => product.id == id);
  cartData.push({
    amount: 1,
    product,
  });
  localStorage.setItem("cart", JSON.stringify(cartData));
  initCart();

  return Swal.fire({
    text: "Đã thêm sản phẩm",
    icon: "success",
    timer: 2000,
  });
}

// cart modal
function showModalCart(value) {
  if (!isLogin()) {
    return Swal.fire({
      text: "Vui lòng đăng nhập",
      icon: "warning",
      timer: 2000,
    });
  }

  const modalCartDom = document.getElementById("modal-cart");
  modalCartDom.style.display = value ? "block" : "none";
  addCartDataToDom();
  calcLastPrice();
}

function addCartDataToDom() {
  const cartListDom = document.getElementById("cart-item-list");
  let cartListHtml = "";
  cartData.forEach((cartItem, index) => {
    cartListHtml += `
    <div class="cart-item">
        <img src="${cartItem.product.img}" alt="Product">
        <p class="content">${cartItem.product.name}</p>
        <div class="number-input-up-down">
            <i class="fa-solid fa-minus icon" onclick="setAmountCartItem(-1, ${index})"></i>
            <span>${cartItem.amount}</span>
            <i class="fa-solid fa-plus icon" onclick="setAmountCartItem(1, ${index})"></i>
        </div>
        <p class="price">${formatNumber(cartItem.product.price)}đ</p>
    </div>`;
  });

  cartListDom.innerHTML = cartListHtml;
}

function setAmountCartItem(value, index) {
  cartData[index].amount += value;
  if (cartData[index].amount <= 0) {
    cartData.splice(index, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cartData));
  addCartDataToDom();
  calcLastPrice();
  initCart();
}

function calcLastPrice() {
  const lastPriceDom = document.getElementById("cart-last-price");
  let totalPrice = 0;

  cartData.forEach((cartItem) => {
    totalPrice += cartItem.amount * cartItem.product.price;
  });

  lastPriceDom.innerHTML = `${formatNumber(totalPrice)}đ`;
}

// Handle order
async function submitOrder() {
  try {
    if (!cartData.length) {
      return Swal.fire({
        text: "Vui lòng chọn 1 sản phẩm",
        icon: "warning",
        timer: 2000,
      });
    }

    const name = localStorage.getItem("name");
    const phone = localStorage.getItem("phone");

    const res = await fetch('/api/order', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Product: showProduct(cartData), Price: calcLastPriceOrder(cartData), Infouser: `Tên: ${name} - SĐT: ${phone}` })
    });

      const data = await res.json();
      if (data.ok) {
          saveOrderToLocalStorage();
          localStorage.removeItem("cart");
          cartData = [];
          showModalCart(false);
          initCart();
          Swal.fire({
              title: "Đặt hàng thành công",
              html: "<div style='line-height: 26px'>Shop sẽ gọi điện cho bạn trong vòng 1 phút để xác nhận.<br>Số điện thoại của shop: <a href='tel:01234567890'>012.3456.7890</a><br>Cảm ơn bạn đã ủng hộ shop! 😘</div>",
              icon: "success",
          });
      } else {
          return Swal.fire({
              text: "Không kết nối được với BE server",
              icon: "warning",
              timer: 2000,
          });
      }
 
  } catch (error) {
      return Swal.fire({
          text: "Không kết nối được với BE server",
          icon: "warning",
          timer: 2000,
      });
  }
}

function saveOrderToLocalStorage() {
  const historyOrderData = localStorage.getItem("historyOrder");
  let historyOrder = historyOrderData ? JSON.parse(historyOrderData) : [];

  historyOrder.unshift(cartData);
  localStorage.setItem("historyOrder", JSON.stringify(historyOrder));
}

// Tìm kiếm
function searchProduct() {
  const searchInputDom = document.getElementById("search-input");
  const productSearchDom = document.getElementById("search-product");

  productSearchDom.style.display = "none";
  if (searchInputDom.value) {
    productSearchDom.style.display = "block";
  }
  const regex = new RegExp(`(${searchInputDom.value})`, "gi");
  let searchProductList = [];

  productList.forEach((e) => {
    // Chuyển thành viết thường và tìm kiếm
    const check = e.name.toLowerCase().search(regex);

    if (check !== -1) {
      searchProductList.push(e);
    }
  });

  const searchInputListDom = document.getElementById("search-product-list");
  let productSearchHtml = "";

  searchProductList.forEach((product) => {
    productSearchHtml += `
      <div class="item-product" onclick="addCart(${product.id})">
        <img src="${product.img}" alt="Product" />
        <p class="name">
          ${product.name}
        </p>
        <p class="price">${formatNumber(product.price)}đ</p>
        <div class="btn-buy">Chọn mua</div>
      </div>`;
  });

  searchInputListDom.innerHTML = productSearchHtml;
}

function showNav(value) {
  const navMobileDom = document.getElementById("nav-mobile");
  navMobileDom.style.display = value ? "flex" : "none";
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

function isLogin() {
  const name = localStorage.getItem("name");
  const phone = localStorage.getItem("phone");

  if (name && phone) {
    return true;
  }

  return false;
}

function showProduct(cartData) {
    let productHtml = "";
    cartData.forEach((e) => {
        productHtml += `${e.product.name} - Giá: ${formatNumber(e.product.price)}  - Số lượng: ${e.amount};<br />`;
    });

    return productHtml;
}

function calcLastPriceOrder(cartData) {
    let totalPrice = 0;

    cartData.forEach((cartItem) => {
        totalPrice += cartItem.amount * cartItem.product.price;
    });

    return totalPrice;
}
// End main.js