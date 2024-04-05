using System.ComponentModel.DataAnnotations;


namespace PetHotelCare.API.Requests
{
    public class FeederRequest
    {
        [Required]
        public string FeederSerialNumber { get; set; }
    }
}
