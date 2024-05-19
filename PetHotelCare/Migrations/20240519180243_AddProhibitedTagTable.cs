using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PetHotelCare.Migrations
{
    public partial class AddProhibitedTagTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProhibitedTag",
                columns: table => new
                {
                    PetId = table.Column<int>(type: "INTEGER", nullable: false),
                    TagId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProhibitedTag", x => new { x.PetId, x.TagId });
                    table.ForeignKey(
                        name: "FK_ProhibitedTag_Pets_PetId",
                        column: x => x.PetId,
                        principalTable: "Pets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProhibitedTag_Tags_TagId",
                        column: x => x.TagId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProhibitedTag_TagId",
                table: "ProhibitedTag",
                column: "TagId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProhibitedTag");
        }
    }
}
