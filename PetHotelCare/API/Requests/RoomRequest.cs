using PetHotelCare.API.Models;
using System.ComponentModel.DataAnnotations;

namespace PetHotelCare.API.Requests
{
    public class RoomRequest
    {
        public string Image { get; set; }

        [Required]
        public string Number { get; set; }

        [Required]
        public int RoomTypeId { get; set; }
    }
}
