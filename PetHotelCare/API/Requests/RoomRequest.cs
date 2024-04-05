using PetHotelCare.API.Models;
using System.ComponentModel.DataAnnotations;

namespace PetHotelCare.API.Requests
{
    public class RoomRequest
    {
        [Required]
        public int RoomNumber { get; set; }
        [Required]
        public string RoomType { get; set; }
        [Required]
        public double PricePerDay { get; set; }
        [Required]
        public bool IsFree { get; set; }
        [Required]
        public int FeederId { get; set; }
    }
}
