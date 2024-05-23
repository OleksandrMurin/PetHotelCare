namespace PetHotelCare.DataAccess.Entities
{
    public class BookingPetService
    {
        public int BookingId { get; set; }
        public virtual Booking Booking { get; set;}
        public int PetServiceId { get; set; }
        public virtual PetService PetService { get; set; }
    }
}
