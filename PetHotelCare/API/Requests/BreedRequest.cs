using System.ComponentModel.DataAnnotations;

namespace PetHotelCare.API.Requests
{
    public class BreedRequest
    {
        [Required]
        public int PetTypeId { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
