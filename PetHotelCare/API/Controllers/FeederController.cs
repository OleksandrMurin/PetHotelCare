using Mapster;
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
    [Authorize (Roles = Roles.Admin)]
    [ApiController]
    public class FeederController : CrudController<FeederRequest, FeederModel, Feeder>
    {
        private readonly ApplicationDbContext _context;
        public FeederController(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        [HttpGet]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<PaginationModel<FeederModel>> GetAsync(int page, string query)
        {
            var enumerable = await _context.Set<Feeder>()
                .Where(x => x.FeederSerialNumber.Contains(query))
                .OrderBy(x => x.Id)
                .ToListAsync();
            var entities = enumerable.Skip((page - 1) * 10)
                .Take(10)
                .ToList();
            var models = entities.Adapt<List<FeederModel>>();
            return new PaginationModel<FeederModel>(models, enumerable.Count());
        }

    }
}
