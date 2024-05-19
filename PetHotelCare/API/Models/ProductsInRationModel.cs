namespace PetHotelCare.API.Models
{
    public class ProductsInRationModel
    {
        public int RationId { get; set; }
        public int ProductId { get; set; }
        public int Weight { get; set; }
        public double Price { get; set; }
    }
}
