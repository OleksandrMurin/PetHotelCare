using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PetHotelCare.DataAccess.Entities
{
    public class Booking : Entity
    {

        public DateOnly CheckInDate { get; set; }
        public DateOnly CheckOutDate { get; set; }
        public double Price { get; set; }

        // Внешний ключ, связывает бронирование с питомцем
        public int PetId { get; set; }
        public virtual Pet Pet { get; set; }

        public int RoomId { get; set; } // Внешний ключ на Roomd
        public virtual Room Room { get; set; }
        public int RationId { get; set; }
        public virtual Ration Ration { get; set; }

        public virtual List<BookingPetService> BookingPetServices { get; set; } 
        
    }
}
