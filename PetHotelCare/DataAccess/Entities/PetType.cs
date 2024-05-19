namespace PetHotelCare.DataAccess.Entities
{
    public class PetType : Entity
    {
        public string Name { get; set; }
        public virtual List<Breed> Breeds { get; set; }
    }
}
