using System.ComponentModel.DataAnnotations;

namespace PetHotelCare.API.Requests
{
    public class ProductRequest
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public double PricePer100g { get; set; }

        [Required]
        public int CaloricValue { get; set; }

        [Required]
        public int ProtsContent { get; set; }

        [Required]
        public int FatsContent { get; set; }

        [Required]
        public int CarbohydratesContent { get; set; }
        [Required]
        public IReadOnlyCollection<int> Tags { get; set; }
    }
}
