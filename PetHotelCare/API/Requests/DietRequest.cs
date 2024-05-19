using System.ComponentModel.DataAnnotations;

namespace PetHotelCare.API.Requests
{
    public class DietRequest
    {
        [Required]
        public int BreedId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public int MinAge { get; set; }

        [Required]
        public int MaxAge { get; set; }

        [Required]
        public string Activity { get; set; }

        [Required]
        public int CaloricValue { get; set; }

        [Required]
        public int ProtsContent { get; set; }

        [Required]
        public int FatsContent { get; set; }

        [Required]
        public int CarbohydratesContent { get; set; }
    }
}
