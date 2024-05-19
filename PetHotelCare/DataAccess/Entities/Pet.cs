using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PetHotelCare.DataAccess.Entities
{
    public class Pet : Entity
    {
        [Required]
        public string Name { get; set; }

        public DateOnly BirthDate { get; set; }
        public string AdditionalInfo { get; set; }
        public string Image { get; set; } 
        public string UserId { get; set; }
        public virtual User User { get; set; }
        public int BreedId { get; set; }
        public virtual Breed Breed { get; set; }
        public virtual List<Booking> Bookings { get; set; }
        public virtual List<ProhibitedTag> ProhibitedTags { get; set; }
    }
}
