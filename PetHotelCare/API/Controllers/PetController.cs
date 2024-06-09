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

namespace PetHotelCare.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PetController : CrudController<PetRequest, PetModel, Pet>
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;
        public PetController(ApplicationDbContext context, UserManager<User> userManager, IMapper mapper) : base(context, mapper)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        [Authorize]
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

            var proxy = model.Adapt<Pet>();
            proxy.UserId = _userManager.GetUserId(User)!;
            await _context.AddAsync(proxy);
            await _context.SaveChangesAsync();
            var response = await _context.Set<Pet>()
                .Include(x => x.ProhibitedTags)
                .ThenInclude(x => x.Tag)
                .FirstOrDefaultAsync(x => x.Id == proxy.Id);
            return response.Adapt<PetModel>();

        }


        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public override async Task<IActionResult> Edit(int id, PetRequest request)
        {
            var prohTags = _context.Set<ProhibitedTag>().Where(x => x.PetId == id);
            _context.Set<ProhibitedTag>().RemoveRange(prohTags);
            var entity = request.Adapt<Pet>();
            entity.Id = id;
            entity.UserId = _userManager.GetUserId(User)!;
            _context.Update(entity);

            await _context.SaveChangesAsync();
            return Ok();
        }
        //[HttpPut("{id}")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        //[ProducesResponseType(StatusCodes.Status404NotFound)]
        //public override async Task<IActionResult> Edit(int id, PetRequest request)
        //{
        //    var userId = _userManager.GetUserId(User);
        //    var pet = await _context.Pets
        //        .Include(p => p.ProhibitedTags)
        //        .FirstOrDefaultAsync(p => p.Id == id && p.UserId == userId);

        //    if (pet == null)
        //    {
        //        return NotFound();
        //    }

        //    // Обновляем основные данные питомца
        //    pet.Name = request.Name;
        //    pet.BirthDate = request.BirthDate;
        //    pet.BreedId = request.BreedId;
        //    pet.AdditionalInfo = request.AdditionalInfo;
        //    pet.Image = request.Image;

        //    // Удаляем старые запрещенные теги
        //    var oldTags = pet.ProhibitedTags.ToList();
        //    _context.ProhibitedTags.RemoveRange(oldTags);

        //    // Добавляем новые запрещенные теги
        //    pet.ProhibitedTags = request.ProhibitedTags.Select(tagId => new ProhibitedTag
        //    {
        //        PetId = pet.Id,
        //        TagId = tagId
        //    }).ToList();

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!PetExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return Ok();
        //}

        //private bool PetExists(int id)
        //{
        //    return _context.Pets.Any(e => e.Id == id);
        //}
    }
}
