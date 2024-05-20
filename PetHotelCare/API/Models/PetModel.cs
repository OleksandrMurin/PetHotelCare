

using PetHotelCare.DataAccess.Entities;

namespace PetHotelCare.API.Models
{
    public class PetModel : EntityModel
    {
        public string Name { get; set; }

        public DateOnly BirthDate { get; set; }
        public string AdditionalInfo { get; set; }
        public string? Image { get; set; }
        public string UserId { get; set; }
        public int BreedId { get; set; }
        public IReadOnlyDictionary<int, string> ProhibitedTags { get; set; }
        //public IReadOnlyCollection<int?> BookingIds { get; set; }
    }
}
