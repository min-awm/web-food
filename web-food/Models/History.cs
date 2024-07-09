using System;
using System.Collections.Generic;

namespace web_food.Models;

public partial class History
{
    public decimal Id { get; set; }

    public string Product { get; set; } = null!;

    public decimal Price { get; set; }

    public string Infouser { get; set; } = null!;
}
