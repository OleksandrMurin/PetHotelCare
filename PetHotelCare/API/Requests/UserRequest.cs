using System.ComponentModel.DataAnnotations;

namespace PetHotelCare.API.Requests
{
    public class UserRequest
    {
        [Required]
        public string FullName { get; set; } = null!;
        [Required]
        public string Email { get; set; } = null!;
    }
}
