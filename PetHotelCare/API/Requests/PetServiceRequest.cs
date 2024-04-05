using System.ComponentModel.DataAnnotations;

namespace PetHotelCare.API.Requests
{
    public class PetServiceRequest
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public double Price { get; set; }
    }
}
