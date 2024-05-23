namespace PetHotelCare.DataAccess.Entities
{
    public class ProductsInRation
    {
        public int RationId { get; set; }
        public virtual Ration Ration { get; set; }
        public int ProductId { get; set; }
        public virtual Product Product { get; set; }
        public double Weight { get; set; }

    }
}
