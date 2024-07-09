using Microsoft.AspNetCore.Mvc;
using System.Runtime.InteropServices.JavaScript;
using web_food.Models;

namespace web_food.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MainController : Controller
    {
        WebfoodContext db = new WebfoodContext();
        private readonly ILogger<MainController> _logger;

        public MainController(ILogger<MainController> logger)
        {
            _logger = logger;
        }

        [HttpGet("/api/product")]
        public IActionResult getProduct()
        {
            var productList = db.Products.ToList();
            var data = new { ok = 1, d = productList };
            return Ok(data);
        }

        [HttpPost("/api/order")]
        public IActionResult createOrder([FromBody]History bodyData)
        {
            db.Histories.Add(bodyData);
            db.SaveChanges();
            return Ok(new { ok = 1});
        }

        [HttpPost("/api/admin/history-order")]
        public IActionResult getHistoryOrder([FromBody]User bodyData)
        {
            if (bodyData.username == "admin" && bodyData.password == "admin")
            {
                var historyList = db.Histories.ToList();
                var data = new { ok = 1, d = historyList };
                return Ok(data);
            }
            
            return Ok(new { ok = 0, d = "Tên đăng nhập, mật khẩu không đúng" }); 
        }
    }
}
