// Start Admin.js
// Kiểm tra DOM đã sẵn sàng
document.addEventListener("DOMContentLoaded", function (event) {
  main();
});

let username;
let password;

function main() {
}

function loginAdmin() {
    const usernameDom = document.getElementById("admin-username");
    const passwordDom = document.getElementById("admin-password")

    username = usernameDom.value;
    password = passwordDom.value;

    getHistorOrder();
}

async function getHistorOrder() {
    try {
        const res = await fetch('/api/admin/history-order', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();

        if (data.ok) {
            let historyOrder = data.d;
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
                    <td>${history.id}</td>
                    <td>${history.product}</td>
                    <td>${history.price}</td>
                    <td>${history.infouser}</td>
                </tr>
            `;
            });

            historyOrderDom.innerHTML = historyOrderHtml;
            const adminModalLoginDom = document.getElementById("admin-modal-login");
            adminModalLoginDom.style.display = "none";
        } else {
            Swal.fire({
                tille: "Lỗi",
                text: "Tên đăng nhập, mật khẩu không đúng",
                icon: "error",
                timer: 2000,
            });
        }

        
    } catch (error) {
        console.log(error)
        Swal.fire({
            tille: "Lỗi",
            text: "Không kết nối được BE server",
            icon: "error",
            timer: 2000,
        });
    }
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
// End Admin.js