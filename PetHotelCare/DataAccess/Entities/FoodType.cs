namespace PetHotelCare.DataAccess.Entities
{
    public class FoodType : Entity
    {
        public string Name { get; set; } 
        public double PricePer100Grams { get; set; }
        public virtual List<Meal> Meals { get; set; } 
    }
}
