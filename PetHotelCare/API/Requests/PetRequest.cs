using System.ComponentModel.DataAnnotations;

namespace PetHotelCare.API.Requests
{
    public class PetRequest
    {
        [Required]
        public string Name { get; set; } = null!;
        [Required]
        public int Age { get; set; } 
        public string SpecialRequirements { get; set; } = null!;
        //[Required]
        //public string UserId { get; set; }
    }
}
