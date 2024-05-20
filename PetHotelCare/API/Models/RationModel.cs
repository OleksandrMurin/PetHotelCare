using System.Collections.Generic;

namespace PetHotelCare.API.Models
{
    public class RationModel
    {
        
        public int Id { get; set; }
        public double Price { get; set; }
        public IReadOnlyDictionary<int, string> Tags { get; set; }
        public IReadOnlyCollection<ProductModel> Products { get; set; }
    }
}
