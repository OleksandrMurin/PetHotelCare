using PetHotelCare.API.Models;
using System.ComponentModel.DataAnnotations;

namespace PetHotelCare.API.Requests
{
    public class BookingRequest
    {
        [Required, DataType(DataType.DateTime)]
        public DateTime CheckInDate { get; set; }

        [Required, DataType(DataType.DateTime)]
        public DateTime CheckOutDate { get; set; }

        [Required]
        public int PetId { get; set; }

        [Required]
        public int RoomId { get; set; } 
        public List<int> PetServicesIds { get; set; } = null!;
        public List<MealRequest> Meals { get; set; } = null!;
    }
}
