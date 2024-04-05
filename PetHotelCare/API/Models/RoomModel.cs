

namespace PetHotelCare.API.Models
{
    public class RoomModel
    {
        public int Id { get; set; }
        public string RoomNumber { get; set; }
        public string RoomType { get; set; }
        public double PricePerDay { get; set; }
        public bool IsFree { get; set; } 
        public int FeederId { get; set; }
        //public RoomModel roomModel { get; set; } = null!;
    }
}
