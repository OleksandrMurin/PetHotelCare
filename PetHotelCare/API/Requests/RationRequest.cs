using System.ComponentModel.DataAnnotations;

namespace PetHotelCare.API.Requests
{
    public class RationRequest
    {
        [Required]
        public double Price { get; set; }

        [Required]
        public IReadOnlyCollection<int> ProductIds { get; set; } // Assuming products are identified by IDs

        [Required]
        public List<string> Tags { get; set; }
    }
}
