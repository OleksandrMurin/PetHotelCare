

namespace PetHotelCare.API.Models
{
    public class PetModel : EntityModel
    {
        public string Name { get; set; } = null!;
        public int Age { get; set; }
        public string SpecialRequirements { get; set; } = null!;
        public string UserId { get; set; } = null!;
    }
}
