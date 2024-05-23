using PetHotelCare.DataAccess.Entities;
using System.Collections.Generic;

namespace PetHotelCare.API.Models
{
    public class RationModel
    {
        
        public int Id { get; set; }
        public double Price { get; set; }
        public List<ProductsInRationModel> ProductInRation { get; set; } = new();
    }
}
