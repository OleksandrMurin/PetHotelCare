namespace PetHotelCare.DataAccess.Entities
{
    public class ProhibitedTag
    {
        public int PetId { get; set; }
        public virtual Pet Pet { get; set; }
        public int TagId { get; set; }
        public virtual Tag Tag { get; set; }
    }
}
