namespace PetHotelCare.API.Models
{
    public record PaginationModel<TModel>(List<TModel> Items, int TotalCount);
}
