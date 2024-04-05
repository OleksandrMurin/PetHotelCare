using PetHotelCare.API.Models;
using System.ComponentModel.DataAnnotations;

namespace PetHotelCare.API.Requests
{
    public class MealRequest
    {

        [Required, DataType(DataType.DateTime)]
        public DateTime Time { get; set; }

        [Required]
        public int FoodTypeId { get; set; }

        [Required]
        public int QuantityInGrams { get; set; }
    }
}
