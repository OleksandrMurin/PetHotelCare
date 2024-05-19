namespace PetHotelCare.DataAccess.Entities
{
    public class Room : Entity
    {
        public string Number { get; set; }
        public string Image { get; set; }
        public int RoomTypeId { get; set; }
        public virtual RoomType RoomType { get; set; }
        public virtual List<Booking> Bookings { get; set; }
    }
}
