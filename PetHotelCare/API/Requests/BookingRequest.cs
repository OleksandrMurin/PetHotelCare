using PetHotelCare.API.Models;
using System.ComponentModel.DataAnnotations;

namespace PetHotelCare.API.Requests
{
    public class BookingRequest
    {
        [Required, DataType(DataType.Date)]
        public DateOnly CheckInDate { get; set; }

        [Required, DataType(DataType.Date)]
        public DateOnly CheckOutDate { get; set; }
        
        [Required]
        public double Price { get; set; }

        [Required]
        public int PetId { get; set; }

        [Required]
        public int RoomId { get; set; }

        [Required]
        public int RationId { get; set; }
        public List<int>? PetServicesIds { get; set; } = null!;
    }
}
