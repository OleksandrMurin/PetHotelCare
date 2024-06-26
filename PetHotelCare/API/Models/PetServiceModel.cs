﻿

namespace PetHotelCare.API.Models
{
    public class PetServiceModel : EntityModel
    {
        public string Image { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public double Price { get; set; }
    }
}
