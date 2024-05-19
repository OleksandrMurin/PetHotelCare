namespace PetHotelCare.DataAccess.Entities
{
    public class RoomType : Entity
    {
        public string Name { get; set; }
        public double PricePerDay { get; set; }
        public string Description { get; set; }
        public virtual List<Room> Rooms { get; set; }
    }
}
