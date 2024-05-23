using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PetHotelCare.Migrations
{
    /// <inheritdoc />
    public partial class SomeIssues : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookingPetService_Bookings_BookingId",
                table: "BookingPetService");

            migrationBuilder.DropForeignKey(
                name: "FK_BookingPetService_Services_PetServiceId",
                table: "BookingPetService");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Services",
                table: "Services");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BookingPetService",
                table: "BookingPetService");

            migrationBuilder.RenameTable(
                name: "Services",
                newName: "PetServices");

            migrationBuilder.RenameTable(
                name: "BookingPetService",
                newName: "BookingPetServices");

            migrationBuilder.RenameIndex(
                name: "IX_BookingPetService_PetServiceId",
                table: "BookingPetServices",
                newName: "IX_BookingPetServices_PetServiceId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PetServices",
                table: "PetServices",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BookingPetServices",
                table: "BookingPetServices",
                columns: new[] { "BookingId", "PetServiceId" });

            migrationBuilder.AddForeignKey(
                name: "FK_BookingPetServices_Bookings_BookingId",
                table: "BookingPetServices",
                column: "BookingId",
                principalTable: "Bookings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BookingPetServices_PetServices_PetServiceId",
                table: "BookingPetServices",
                column: "PetServiceId",
                principalTable: "PetServices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookingPetServices_Bookings_BookingId",
                table: "BookingPetServices");

            migrationBuilder.DropForeignKey(
                name: "FK_BookingPetServices_PetServices_PetServiceId",
                table: "BookingPetServices");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PetServices",
                table: "PetServices");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BookingPetServices",
                table: "BookingPetServices");

            migrationBuilder.RenameTable(
                name: "PetServices",
                newName: "Services");

            migrationBuilder.RenameTable(
                name: "BookingPetServices",
                newName: "BookingPetService");

            migrationBuilder.RenameIndex(
                name: "IX_BookingPetServices_PetServiceId",
                table: "BookingPetService",
                newName: "IX_BookingPetService_PetServiceId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Services",
                table: "Services",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BookingPetService",
                table: "BookingPetService",
                columns: new[] { "BookingId", "PetServiceId" });

            migrationBuilder.AddForeignKey(
                name: "FK_BookingPetService_Bookings_BookingId",
                table: "BookingPetService",
                column: "BookingId",
                principalTable: "Bookings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BookingPetService_Services_PetServiceId",
                table: "BookingPetService",
                column: "PetServiceId",
                principalTable: "Services",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
