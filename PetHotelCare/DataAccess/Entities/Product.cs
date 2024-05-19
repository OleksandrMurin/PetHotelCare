namespace PetHotelCare.DataAccess.Entities
{
    public class Product : Entity
    {
        public string Name { get; set; }
        public double PricePer100g { get; set; }
        public int CaloricValue { get; set; }
        public int ProtsContent { get; set; }
        public int FatsContent { get; set; }
        public int CarbohydratesContent { get; set; }
        public virtual List<ProductsInRation> ProductsInRations { get; set; }
        public virtual List<ProductTag> ProductsTag { get; set; }
    }
}
