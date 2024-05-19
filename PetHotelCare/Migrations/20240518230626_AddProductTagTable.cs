using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PetHotelCare.Migrations
{
    public partial class AddProductTagTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductTag_Tags_TagsProductId",
                table: "ProductTag");

            migrationBuilder.RenameColumn(
                name: "TagsProductId",
                table: "ProductTag",
                newName: "TagsId");

            migrationBuilder.RenameIndex(
                name: "IX_ProductTag_TagsProductId",
                table: "ProductTag",
                newName: "IX_ProductTag_TagsId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductTag_Tags_TagsId",
                table: "ProductTag",
                column: "TagsId",
                principalTable: "Tags",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductTag_Tags_TagsId",
                table: "ProductTag");

            migrationBuilder.RenameColumn(
                name: "TagsId",
                table: "ProductTag",
                newName: "TagsProductId");

            migrationBuilder.RenameIndex(
                name: "IX_ProductTag_TagsId",
                table: "ProductTag",
                newName: "IX_ProductTag_TagsProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductTag_Tags_TagsProductId",
                table: "ProductTag",
                column: "TagsProductId",
                principalTable: "Tags",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
