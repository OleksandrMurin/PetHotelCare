namespace PetHotelCare.DataAccess.Entities
{
    public class Ration : Entity
    {
        public int Price { get; set; }
        public virtual List<ProductsInRation> ProductsInRations { get; set; }
        public virtual List<RationTag> RationTags { get; set; }
        public virtual Booking Booking { get; set; }
    }
}
