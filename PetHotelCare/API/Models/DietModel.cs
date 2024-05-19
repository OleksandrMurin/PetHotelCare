namespace PetHotelCare.API.Models
{
    public class DietModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int MinAge { get; set; }
        public int MaxAge { get; set; }
        public string Activity { get; set; }
        public int CaloricValue { get; set; }
        public int ProtsContent { get; set; }
        public int FatsContent { get; set; }
        public int CarbohydratesContent { get; set; }
        public int BreedId { get; set; }
    }
}
