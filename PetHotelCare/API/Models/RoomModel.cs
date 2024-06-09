

namespace PetHotelCare.API.Models
{
    public class RoomModel
    {
        public int Id { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
        public string Number { get; set; }
        public string RoomTypeId { get; set; }
        
        //public RoomModel roomModel { get; set; } = null!;
    }
}
