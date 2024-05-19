using System.ComponentModel.DataAnnotations;

namespace PetHotelCare.API.Requests
{
    public class RoomTypeRequest
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public double PricePerDay { get; set; }

        [Required]
        public string Description { get; set; }
    }
}
