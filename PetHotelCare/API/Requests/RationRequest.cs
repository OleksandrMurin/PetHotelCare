using PetHotelCare.API.Models;
using System.ComponentModel.DataAnnotations;

namespace PetHotelCare.API.Requests
{
    public class RationRequest
    {
        public double Price { get; set; }
        public List<ProductsInRationModel> ProductsInRation { get; set; }
    }
}
