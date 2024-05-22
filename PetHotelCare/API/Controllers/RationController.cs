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
        public async Task<ActionResult<RationModel>> CreateRation(int petId, double weight, string activity)
        {
            // Получение данных о питомце
            var pet = await _context.Pets.Include(p => p.Breed).Include(p => p.ProhibitedTags).FirstOrDefaultAsync(p => p.Id == petId);
            if (pet == null) return NotFound("Pet not found");

            // Вычисление возраста питомца
            var age = 0;
            while (DateOnly.FromDateTime(DateTime.Now) > pet.BirthDate) {
                age++;
                pet.BirthDate.AddYears(1);
            }

            // Получение диеты
            var diet = await _context.Diets.FirstOrDefaultAsync(d => d.Activity == activity && d.BreedId == pet.BreedId && d.MinAge <= age && d.MaxAge >= age);
            if (diet == null) return NotFound("Diet not found");

            // Расчет суточной потребности
            var dailyCalories = diet.CaloricValue * weight;
            var dailyProteins = diet.ProtsContent * weight;
            var dailyFats = diet.FatsContent * weight;
            var dailyCarbs = diet.CarbohydratesContent * weight;

            // Получение списка разрешенных продуктов
            var prohibitedTagIds = pet.ProhibitedTags.Select(pt => pt.TagId).ToList();
            var products = await _context.Products
                .Include(p => p.ProductsTag)
                .Where(p => !p.ProductsTag.Any(t => prohibitedTagIds.Contains(t.TagId)))
                .ToListAsync();
            
            //Пишу стринг для наглядности, на деле наверное лучше айдишники тегов будет использовать. 
            //Если что такие теги и пропрорции их содержания в рационе будут по умолчанию
            Dictionary<string, double> tags = new Dictionary<string, double> { { "PetFood", 0.5}, { "Meat", 0.3 }, { "Fiber", 0.2 }};
            
            // Выбираем оптимальные продукты, считая их вес и цену. Так же в методе добавляем записи в связную таблицу ПродуктыВРационе
            var optimalProducts = CalculateOptimalRation(dailyCalories, dailyProteins, dailyFats, dailyCarbs, products, tags);

            // Создание рациона
            //var ration = new Ration
            //{
                
            //};

            
            await _context.Rations.AddAsync(ration);
            await _context.SaveChangesAsync();

            return ration.Adapt<RationModel>();
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

