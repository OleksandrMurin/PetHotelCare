namespace PetHotelCare.DataAccess.Entities
{
    public class Breed : Entity
    {
        public string Name { get; set; }
        public int PetTypeId { get; set; }
        public virtual PetType PetType { get; set; }
        public virtual List<Pet> Pets { get; set; }
        public virtual List<Diet> Diets { get; set; }
    }
}
