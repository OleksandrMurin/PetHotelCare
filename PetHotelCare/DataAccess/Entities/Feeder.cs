namespace PetHotelCare.DataAccess.Entities
{
    public class Feeder : Entity
    {
        //public int Id { get; set; }
        public string FeederSerialNumber { get; set; }

        public virtual Room Room { get; set; } // Навигационное свойство, указывающее на комнату
    }
}
