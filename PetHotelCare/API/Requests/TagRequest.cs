using System.ComponentModel.DataAnnotations;

namespace PetHotelCare.API.Requests
{
    public class TagRequest
    {
        [Required]
        public string Name { get; set; }
    }
}
