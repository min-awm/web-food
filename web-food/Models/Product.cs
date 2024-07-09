using System;
using System.Collections.Generic;

namespace web_food.Models;

public partial class Product
{
    public decimal Id { get; set; }

    public string Img { get; set; } = null!;

    public string Name { get; set; } = null!;

    public decimal Price { get; set; }

    public string Type { get; set; } = null!;
}
