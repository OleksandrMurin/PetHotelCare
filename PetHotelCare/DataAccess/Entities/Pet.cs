using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PetHotelCare.DataAccess.Entities
{
    public class Pet : Entity
    {
        [Required]
        public string Name { get; set; } 

        public int Age { get; set; } 
        public string SpecialRequirements { get; set; } 

        public string UserId { get; set; }
        public virtual User User { get; set; }
        public virtual List<Booking> Bookings { get; set; } 
    }
}
