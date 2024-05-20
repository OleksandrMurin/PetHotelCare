namespace PetHotelCare.DataAccess.Entities
{
    public class Tag : Entity
    {
        public string Name { get; set; }
        public virtual List<ProductTag> ProductsTag { get; set; }
        public virtual List<RationTag> RationTags { get; set; }
        public virtual List<ProhibitedTag> ProhibitedTags { get; set; }
    }
}
