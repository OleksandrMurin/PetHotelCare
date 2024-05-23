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

namespace PetHotelCare.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : CrudController<ProductRequest, ProductModel, Product>
    {
        private readonly ApplicationDbContext _context;

        public ProductController(ApplicationDbContext context, IMapper mapper) : base(context, mapper)
        {
            _context = context;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public override async Task<ActionResult<ProductModel>> Add(ProductRequest model)
        {

            var proxy = model.Adapt<Product>();
            
            await _context.AddAsync(proxy);
            await _context.SaveChangesAsync();
            var response = await _context.Set<Product>()
                .Include(x => x.ProductsTag)
                .ThenInclude(x => x.Tag)
                .FirstOrDefaultAsync(x => x.Id == proxy.Id);
            return response.Adapt<ProductModel>();

        }
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public override async Task<IActionResult> Edit(int id, [FromBody] ProductRequest request)
        {
            //var entity = request.Adapt<Product>();
            var entity = await _context.Set<Product>().FindAsync(id);
            if(entity is null)
            {
                return NotFound();
            }
            request.Adapt(entity);
            entity.ProductsTag.ForEach(x => x.ProductId = id);
            _context.Update(entity);

            await _context.SaveChangesAsync();
            return Ok();
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
