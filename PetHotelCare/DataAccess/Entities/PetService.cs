using System.ComponentModel.DataAnnotations;

namespace PetHotelCare.DataAccess.Entities
{
    public class PetService : Entity
    {
        [Required]
        public string Name { get; set; } 

        public string Description { get; set; }
        public string Image { get; set; }

        [Required]
        public double Price { get; set; }

        public virtual List<BookingPetService> BookingPetServices { get; set; }
    }
}
