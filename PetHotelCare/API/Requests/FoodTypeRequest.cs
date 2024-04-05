using System.ComponentModel.DataAnnotations;

namespace PetHotelCare.API.Requests
{
    public class FoodTypeRequest
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public int PricePer100Grams { get; set; }
    }
}
