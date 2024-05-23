namespace PetHotelCare.DataAccess.Entities
{
    public class Ration : Entity
    {
        public double Price { get; set; }
        public virtual List<ProductsInRation> ProductsInRations { get; set; }
        public virtual Booking Booking { get; set; }
    }
}
