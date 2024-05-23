using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PetHotelCare.Migrations
{
    /// <inheritdoc />
    public partial class SeveralUpdates : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "ProductsInRations");

            migrationBuilder.AlterColumn<double>(
                name: "Weight",
                table: "ProductsInRations",
                type: "REAL",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Weight",
                table: "ProductsInRations",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "REAL");

            migrationBuilder.AddColumn<int>(
                name: "Price",
                table: "ProductsInRations",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }
    }
}
