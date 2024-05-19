using System.Collections.Generic;

namespace PetHotelCare.API.Models
{
    public class RationModel
    {
        //Ask Ewgen~!!!!
        public int Id { get; set; }
        public double Price { get; set; }
        public IReadOnlyCollection<string> Tags { get; set; }
        public IReadOnlyCollection<ProductModel> Products { get; set; }
    }
}
