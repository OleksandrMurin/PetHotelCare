using Google.OrTools.LinearSolver;
using Mapster;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetHotelCare.API.Models;
using PetHotelCare.API.Requests;
using PetHotelCare.DataAccess;
using PetHotelCare.DataAccess.Entities;
using PetHotelCare.Utils.Constants;
using System.Linq;
using System.Collections.Generic;

namespace PetHotelCare.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RationController : CrudController<RationRequest, RationModel, Ration>
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public RationController(ApplicationDbContext context, IMapper mapper) : base(context, mapper)
        {
            _context = context;
            _mapper = mapper;

        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public override async Task<ActionResult<RationModel>> Add(RationRequest model)
        {

            var entity = model.Adapt<Ration>();
            await _context.AddAsync(entity);

            await _context.SaveChangesAsync();

            return _mapper.From(entity).EntityFromContext(_context).AdaptToType<RationModel>();
        }

        [HttpGet]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<PaginationModel<RationModel>> GetAsync(int page = 1, string? query = "")
        {
            var enumerable = await _context.Set<Ration>()
                .Where(x => x.ProductsInRations.Any(y=> y.Product.Name.Contains(query)))
                .OrderBy(x => x.Id)
                .ToListAsync();
            var entities = enumerable.Skip((page - 1) * 10)
                .Take(10)
                .ToList();
            var models = entities.Adapt<List<RationModel>>();
            return new PaginationModel<RationModel>(models, enumerable.Count());
        }
    }
}

