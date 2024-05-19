﻿using Mapster;
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
    [ApiController]
    public class ProductController : CrudController<ProductRequest, ProductModel, Product>
    {
        private readonly ApplicationDbContext _context;
        public ProductController(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }
        

        [HttpGet]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<PaginationModel<ProductModel>> GetAsync(int page = 1, string? query = "")
        {
            var enumerable = await _context.Set<Product>()
                .Where(x => x.Name.Contains(query))
                .OrderBy(x => x.Id)
                .ToListAsync();
            var entities = enumerable.Skip((page - 1) * 10)
                .Take(10)
                .ToList();
            var models = entities.Adapt<List<ProductModel>>();
            return new PaginationModel<ProductModel>(models, enumerable.Count());
        }

    }
}
