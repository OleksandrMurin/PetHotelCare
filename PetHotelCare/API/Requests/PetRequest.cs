using System.ComponentModel.DataAnnotations;

namespace PetHotelCare.API.Requests
{
    public class PetRequest
    {
        [Required]
        public string Name { get; set; } = null!;
        [Required]
        public string UserId { get; set; } = null!;
        public DateOnly BirthDate { get; set; }
        public string AdditionalInfo { get; set; }
        public string? Image { get; set; }
        public int BreedId { get; set; }
        public IReadOnlyCollection<int> ProhibitedTags { get; set; }
    }
}
