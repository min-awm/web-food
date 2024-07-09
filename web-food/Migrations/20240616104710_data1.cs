using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace web_food.Migrations
{
    /// <inheritdoc />
    public partial class data1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "history",
                columns: table => new
                {
                    id = table.Column<decimal>(type: "numeric(18,0)", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    product = table.Column<string>(type: "text", nullable: false),
                    price = table.Column<decimal>(type: "numeric(18,0)", nullable: false),
                    infouser = table.Column<string>(type: "ntext", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_history", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "product",
                columns: table => new
                {
                    id = table.Column<decimal>(type: "numeric(18,0)", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    img = table.Column<string>(type: "text", nullable: false),
                    name = table.Column<string>(type: "text", nullable: false),
                    price = table.Column<decimal>(type: "numeric(18,0)", nullable: false),
                    type = table.Column<string>(type: "ntext", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_product", x => x.id);
                });

            migrationBuilder.InsertData(
               table: "product",
               columns: new[] { "img", "name", "price", "type" },
               values: new object[,]
               {
                    { "/assets/img/product/phocom/30k/PhoBo.jpg", "Pho Bo",30000, "pho" },
                    { "/assets/img/product/phocom/30k/PhoGa.jpg", "Pho Ga",30000, "pho" },
                    { "/assets/img/product/phocom/25k/Comrang.jpg", "Com rang thap cam",25000, "comrang" },
                    { "/assets/img/product/phocom/30k/Ramen.jpg", "Ramen",30000, "pho" },
                    { "/assets/img/product/phocom/30k/PhoCuon.jpg", "Pho Cuon",30000, "pho" },
                    { "/assets/img/product/phocom/30k/PhoTron.jpg", "Pho Tron",30000, "pho" },
                    { "/assets/img/product/phocom/25k/Comrangduabo.jpg", "Com rang dua bo",25000, "comrang" },
                    { "/assets/img/product/phocom/25k/Comrangduongchau.jpg", "Com rang duong chau",25000, "comrang" },
                    { "/assets/img/product/phocom/25k/Comranghaisan.jpg", "Com rang hai san",25000, "comrang" },
                    { "/assets/img/product/phocom/25k/Comrangga.jpg", "Com chien ga xoi mo",25000, "comrang" },
                    { "/assets/img/product/banh/8k/BanhBaoChay.jpg", "Banh Bao Chay",8000, "banh" },
                    { "/assets/img/product/banh/8k/BanhMadeleine.jpg", "Banh Madeleine",8000, "banh" },
                    { "/assets/img/product/banh/8k/Banhquybo.jpg", "Banh Quy Bo",8000, "banh" },
                    { "/assets/img/product/banh/15k/Banhmi.jpg", "Banh Mi",15000, "banh" },
                    { "/assets/img/product/banh/30k/BanhTiramisu.jpg", "Banh Tiramisu",30000, "banh" },
                    { "/assets/img/product/douong/10k/TraChanh.jpg", "Tra Chanh",10000, "douong" },
                    { "/assets/img/product/douong/25k/BacSuu.jpg", "Bac Suu",25000, "douong" },
                    { "/assets/img/product/douong/25k/Caffeesua.jpg", "Ca Phe Sua",25000, "douong" },
                    { "/assets/img/product/douong/25k/TraSua.jpg", "Tra Sua",25000, "douong" },
                    { "/assets/img/product/douong/30k/Capuchino.jpg", "Capuchino",30000, "douong" },
                    { "/assets/img/product/banh/10k/BanhSandwich.jpg", "Banh Mi",15000, "banh" },
                    { "/assets/img/product/banh/10k/BanhXiuPao.jpg", "Banh Xiu Pao",30000, "banh" },
                    { "/assets/img/product/banh/30k/BanhNhan.jpg", "Banh Nhan",30000, "banh" },
                    { "/assets/img/product/banh/30k/BanhBundner Nusstorte.jpg", "Banh Bundner Nusstorte",30000, "bank" }
               });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "history");

            migrationBuilder.DropTable(
                name: "product");
        }
    }
}
