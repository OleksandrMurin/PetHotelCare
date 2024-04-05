﻿using System.ComponentModel.DataAnnotations;

namespace PetHotelCare.API.Requests.Account
{
    public class LoginRequest
    {
        [Required, EmailAddress]
        public string Email { get; set; } = null!;

        [Required, DataType(DataType.Password)]
        public string Password { get; set; } = null!;
    }
}
