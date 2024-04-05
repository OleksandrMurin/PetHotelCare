using System.ComponentModel.DataAnnotations;

namespace PetHotelCare.DataAccess.Entities
{
    public class PetService : Entity
    {
        [Required]
        public string Name { get; set; } 

        public string Description { get; set; } 

        [Required]
        public double Price { get; set; } 

        public virtual List<Booking> Bookings { get; set; }
    }
}
