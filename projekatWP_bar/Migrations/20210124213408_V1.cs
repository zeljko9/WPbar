using Microsoft.EntityFrameworkCore.Migrations;

namespace projekatWP_bar.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Bar",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    waiters_names = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    num = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bar", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Waiter",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    num_order = table.Column<int>(type: "int", nullable: false),
                    arrive_time = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BarID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Waiter", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Waiter_Bar_BarID",
                        column: x => x.BarID,
                        principalTable: "Bar",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Order",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    finall_price = table.Column<int>(type: "int", nullable: false),
                    Num_glass = table.Column<int>(type: "int", nullable: false),
                    order_time = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    WaiterID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Order", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Order_Waiter_WaiterID",
                        column: x => x.WaiterID,
                        principalTable: "Waiter",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Glass",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Position = table.Column<int>(type: "int", nullable: false),
                    DrinkName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Price = table.Column<int>(type: "int", nullable: false),
                    Color = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OrderID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Glass", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Glass_Order_OrderID",
                        column: x => x.OrderID,
                        principalTable: "Order",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Glass_OrderID",
                table: "Glass",
                column: "OrderID");

            migrationBuilder.CreateIndex(
                name: "IX_Order_WaiterID",
                table: "Order",
                column: "WaiterID");

            migrationBuilder.CreateIndex(
                name: "IX_Waiter_BarID",
                table: "Waiter",
                column: "BarID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Glass");

            migrationBuilder.DropTable(
                name: "Order");

            migrationBuilder.DropTable(
                name: "Waiter");

            migrationBuilder.DropTable(
                name: "Bar");
        }
    }
}
