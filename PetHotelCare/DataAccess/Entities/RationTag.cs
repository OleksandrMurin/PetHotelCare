namespace PetHotelCare.DataAccess.Entities
{
    public class RationTag
    {
        public int RationId { get; set; }
        public virtual Ration Ration { get; set; }
        public int TagId { get; set; }
        public virtual Tag Tag { get; set;}
    }
}
