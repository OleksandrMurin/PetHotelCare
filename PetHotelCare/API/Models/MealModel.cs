

namespace PetHotelCare.API.Models
{
    public class MealModel
    {
        public int Id { get; set; }
        public int BookingId { get; set; } 
        public DateTime Time { get; set; }
        public int FoodTypeId { get; set; }
        public int QuantityInGrams { get; set; }
        public FoodTypeModel FoodType { get; set; } = null!;
    }
}
