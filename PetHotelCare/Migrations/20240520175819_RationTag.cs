using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PetHotelCare.Migrations
{
    /// <inheritdoc />
    public partial class RationTag : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RationTag_Rations_RationsTagId",
                table: "RationTag");

            migrationBuilder.DropForeignKey(
                name: "FK_RationTag_Tags_TagsInRationId",
                table: "RationTag");

            migrationBuilder.RenameColumn(
                name: "TagsInRationId",
                table: "RationTag",
                newName: "TagId");

            migrationBuilder.RenameColumn(
                name: "RationsTagId",
                table: "RationTag",
                newName: "RationId");

            migrationBuilder.RenameIndex(
                name: "IX_RationTag_TagsInRationId",
                table: "RationTag",
                newName: "IX_RationTag_TagId");

            migrationBuilder.AddForeignKey(
                name: "FK_RationTag_Rations_RationId",
                table: "RationTag",
                column: "RationId",
                principalTable: "Rations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RationTag_Tags_TagId",
                table: "RationTag",
                column: "TagId",
                principalTable: "Tags",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RationTag_Rations_RationId",
                table: "RationTag");

            migrationBuilder.DropForeignKey(
                name: "FK_RationTag_Tags_TagId",
                table: "RationTag");

            migrationBuilder.RenameColumn(
                name: "TagId",
                table: "RationTag",
                newName: "TagsInRationId");

            migrationBuilder.RenameColumn(
                name: "RationId",
                table: "RationTag",
                newName: "RationsTagId");

            migrationBuilder.RenameIndex(
                name: "IX_RationTag_TagId",
                table: "RationTag",
                newName: "IX_RationTag_TagsInRationId");

            migrationBuilder.AddForeignKey(
                name: "FK_RationTag_Rations_RationsTagId",
                table: "RationTag",
                column: "RationsTagId",
                principalTable: "Rations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RationTag_Tags_TagsInRationId",
                table: "RationTag",
                column: "TagsInRationId",
                principalTable: "Tags",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
