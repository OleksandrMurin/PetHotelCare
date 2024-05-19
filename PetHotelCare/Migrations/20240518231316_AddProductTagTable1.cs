using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PetHotelCare.Migrations
{
    public partial class AddProductTagTable1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductTag_Products_ProductsTagId",
                table: "ProductTag");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductTag_Tags_TagsId",
                table: "ProductTag");

            migrationBuilder.RenameColumn(
                name: "TagsId",
                table: "ProductTag",
                newName: "ProductId");

            migrationBuilder.RenameColumn(
                name: "ProductsTagId",
                table: "ProductTag",
                newName: "TagId");

            migrationBuilder.RenameIndex(
                name: "IX_ProductTag_TagsId",
                table: "ProductTag",
                newName: "IX_ProductTag_ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductTag_Products_ProductId",
                table: "ProductTag",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductTag_Tags_TagId",
                table: "ProductTag",
                column: "TagId",
                principalTable: "Tags",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductTag_Products_ProductId",
                table: "ProductTag");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductTag_Tags_TagId",
                table: "ProductTag");

            migrationBuilder.RenameColumn(
                name: "ProductId",
                table: "ProductTag",
                newName: "TagsId");

            migrationBuilder.RenameColumn(
                name: "TagId",
                table: "ProductTag",
                newName: "ProductsTagId");

            migrationBuilder.RenameIndex(
                name: "IX_ProductTag_ProductId",
                table: "ProductTag",
                newName: "IX_ProductTag_TagsId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductTag_Products_ProductsTagId",
                table: "ProductTag",
                column: "ProductsTagId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductTag_Tags_TagsId",
                table: "ProductTag",
                column: "TagsId",
                principalTable: "Tags",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
