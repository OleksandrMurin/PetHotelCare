using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace PetHotelCare.DataAccess.Entities
{
    public class User : IdentityUser
    {
        public string Name { get; set; } 
        public string? Avatar { get; set; }
        public virtual List<Pet> Pets { get; set; } = new();
    }

}
