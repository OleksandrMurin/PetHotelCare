using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PetHotelCare.DataAccess.Entities
{
    public class Booking : Entity
    {

        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
        public double Price { get; set; }

        // Внешний ключ, связывает бронирование с питомцем
        public int PetId { get; set; }
        public virtual Pet Pet { get; set; }

        public int RoomId { get; set; } // Внешний ключ на Roomd
        public virtual Room Room { get; set; }

        public virtual List<PetService> PetServices { get; set; } = new List<PetService>();
        public virtual List<Meal> Meals { get; set; } = new List<Meal>();
    }
}
