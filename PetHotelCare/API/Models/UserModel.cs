﻿

namespace PetHotelCare.API.Models
{
    public class UserModel
    {
        public string? Avatar { get; set; } 
        public string? PhoneNumber { get; set; }
        public string Id { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string? UserName { get; set; }
        public string Email { get; set; } = null!;
    }
}
