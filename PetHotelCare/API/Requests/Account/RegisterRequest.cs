using PetHotelCare.Utils.Constants;
using System.ComponentModel.DataAnnotations;

namespace PetHotelCare.API.Requests.Account
{
    public class RegisterRequest
    {

        [Required, EmailAddress]
        public string Email { get; set; }
        public string UserName => Email;
        [Required, DataType(DataType.Password)]
        public string Password { get; set; }

        [Required, DataType(DataType.Password), Compare(nameof(Password), ErrorMessage = Errors.PasswordsAreNotTheSame)]
        public string ConfirmPassword { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
