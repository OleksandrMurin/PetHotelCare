using PetHotelCare.DataAccess.Entities;

namespace PetHotelCare.API.Models
{
    public class BookingModel
    {
        public int Id { get; set; }
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
        public double Price { get; set; }
        public int PetId { get; set; }
        public int RoomId { get; set; }
        public List<PetServiceModel>? PetServices { get; set; }
        public List<MealModel> Meals { get; set; } = null!;
    }
}
