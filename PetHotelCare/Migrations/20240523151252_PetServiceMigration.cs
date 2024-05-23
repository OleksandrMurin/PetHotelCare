using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PetHotelCare.Migrations
{
    /// <inheritdoc />
    public partial class PetServiceMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookingPetService_Bookings_BookingsId",
                table: "BookingPetService");

            migrationBuilder.DropForeignKey(
                name: "FK_BookingPetService_Services_PetServicesId",
                table: "BookingPetService");

            migrationBuilder.RenameColumn(
                name: "PetServicesId",
                table: "BookingPetService",
                newName: "PetServiceId");

            migrationBuilder.RenameColumn(
                name: "BookingsId",
                table: "BookingPetService",
                newName: "BookingId");

            migrationBuilder.RenameIndex(
                name: "IX_BookingPetService_PetServicesId",
                table: "BookingPetService",
                newName: "IX_BookingPetService_PetServiceId");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookingPetService_Bookings_BookingId",
                table: "BookingPetService");

            migrationBuilder.DropForeignKey(
                name: "FK_BookingPetService_Services_PetServiceId",
                table: "BookingPetService");

            migrationBuilder.RenameColumn(
                name: "PetServiceId",
                table: "BookingPetService",
                newName: "PetServicesId");

            migrationBuilder.RenameColumn(
                name: "BookingId",
                table: "BookingPetService",
                newName: "BookingsId");

            migrationBuilder.RenameIndex(
                name: "IX_BookingPetService_PetServiceId",
                table: "BookingPetService",
                newName: "IX_BookingPetService_PetServicesId");

            migrationBuilder.AddForeignKey(
                name: "FK_BookingPetService_Bookings_BookingsId",
                table: "BookingPetService",
                column: "BookingsId",
                principalTable: "Bookings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BookingPetService_Services_PetServicesId",
                table: "BookingPetService",
                column: "PetServicesId",
                principalTable: "Services",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
