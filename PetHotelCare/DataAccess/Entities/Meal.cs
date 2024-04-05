namespace PetHotelCare.DataAccess.Entities
{
    public class Meal : Entity
    {
        public int BookingId { get; set; } 
        public virtual Booking Booking { get; set; }
        public DateTime Time { get; set; }
        public int FoodTypeId { get; set; }
        public virtual FoodType FoodType { get; set; }
        public int QuantityInGrams { get; set; }
    }
}
