using PetHotelCare.DataAccess.Entities;

namespace PetHotelCare.API.Models
{
    public class BookingModel
    {
        public int Id { get; set; }
        public DateOnly CheckInDate { get; set; }
        public DateOnly CheckOutDate { get; set; }
        public double Price { get; set; }
        public int PetId { get; set; }
        public int RoomId { get; set; }
        public int RationId { get; set; }
        public Dictionary<int, string>? PetServices { get; set; }

    }
}
