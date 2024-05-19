namespace PetHotelCare.API.Models
{
    public class ProductModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double PricePer100g { get; set; }
        public int CaloricValue { get; set; }
        public int ProtsContent { get; set; }
        public int FatsContent { get; set; }
        public int CarbohydratesContent { get; set; }
        public IReadOnlyDictionary<int,string> Tags { get; set; }
    }
}
