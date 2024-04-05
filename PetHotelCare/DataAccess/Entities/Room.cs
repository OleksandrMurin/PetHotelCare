namespace PetHotelCare.DataAccess.Entities
{
    public class Room : Entity
    {
        public string RoomNumber { get; set; }
        public bool IsFree { get; set; }
        public string RoomType { get; set; }
        public double PricePerDay { get; set; }
        public int FeederId { get; set; }
        public virtual Feeder Feeder { get; set; }
        public virtual List<Booking> Bookings { get; set; }
    }
}
