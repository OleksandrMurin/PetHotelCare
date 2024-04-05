using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetHotelCare.API.Models;
using PetHotelCare.API.Requests;
using PetHotelCare.DataAccess;
using PetHotelCare.DataAccess.Entities;

namespace PetHotelCare.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PetController : CrudController<PetRequest, PetModel, Pet>
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;
        public PetController(ApplicationDbContext context, UserManager<User> userManager) : base(context)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<PaginationModel<PetModel>> GetUserPets(int page)  //УТОЧНИТЬ У ЕУГЕНИЯ!!!!!
        {
            var userId = _userManager.GetUserId(User);
            var userPets = _context.Pets.Where(x => x.UserId == userId);

            var entities = await userPets.OrderByDescending(x => x.Id)
                                             .Skip((page - 1) * 10)
                                             .Take(10)
                                             .ToListAsync();
            var models = entities.Adapt<List<PetModel>>();
            return new PaginationModel<PetModel>(models, userPets.Count());
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public override async Task<ActionResult<PetModel>> Add(PetRequest model)
        {
            var entity = model.Adapt<Pet>();
            entity.UserId = _userManager.GetUserId(User);
            await _context.AddAsync(entity);

            await _context.SaveChangesAsync();
            return entity.Adapt<PetModel>();
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public override async Task<IActionResult> Edit(int id, PetRequest request)
        {
            var entity = request.Adapt<Pet>();
            entity.Id = id;
            entity.UserId = _userManager.GetUserId(User);
            _context.Update(entity);

            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
