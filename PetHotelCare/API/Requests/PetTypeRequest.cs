using System.ComponentModel.DataAnnotations;

namespace PetHotelCare.API.Requests
{
    public class PetTypeRequest
    {
        [Required]
        public string Name { get; set; }
    }
}
