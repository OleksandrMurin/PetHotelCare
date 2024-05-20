using Mapster;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetHotelCare.API.Models;
using PetHotelCare.API.Requests;
using PetHotelCare.DataAccess;
using PetHotelCare.DataAccess.Entities;
using PetHotelCare.Utils.Constants;

namespace PetHotelCare.API.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Roles = Roles.Admin)]
    [ApiController]
    public class PetServiceController : CrudController<PetServiceRequest, PetServiceModel, PetService>
    {
        private readonly ApplicationDbContext _context;
        public PetServiceController(ApplicationDbContext context, IMapper mapper) : base(context, mapper)
        {
            _context = context;
        }

        [HttpGet]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<PaginationModel<PetServiceModel>> GetAsync(int page, string query)
        {
            var enumerable = await _context.Set<PetService>()
                .Where(x => x.Name.Contains(query))
                .OrderBy(x => x.Id)
                .ToListAsync();
            var entities = enumerable.Skip((page - 1) * 10)
                .Take(10)
                .ToList();
            var models = entities.Adapt<List<PetServiceModel>>();
            return new PaginationModel<PetServiceModel>(models, enumerable.Count());
        }
    }
}
