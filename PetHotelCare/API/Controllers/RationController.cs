﻿using Mapster;
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

namespace PetHotelCare.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RationController : CrudController<RationRequest, RationModel, Ration>
    {
        private readonly ApplicationDbContext _context;
        public RationController(ApplicationDbContext context, IMapper mapper) : base(context, mapper)
        {
            _context = context;
        }
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public override async Task<ActionResult<RationModel>> Add(RationRequest model)
        {

            var proxy = model.Adapt<Ration>();
            await _context.AddAsync(proxy);
            await _context.SaveChangesAsync();
            var response = await _context.Set<Ration>()
                .Include(x => x.RationTags)
                .ThenInclude(x => x.Tag)
                .FirstOrDefaultAsync(x => x.Id == proxy.Id);
            return response.Adapt<RationModel>();

        }

        [HttpGet]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<PaginationModel<RationModel>> GetAsync(int page, string query)
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

