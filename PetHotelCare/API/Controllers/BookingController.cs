using Google.OrTools.LinearSolver;
using Mapster;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetHotelCare.API.Models;
using PetHotelCare.API.Requests;
using PetHotelCare.DataAccess;
using PetHotelCare.DataAccess.Entities;

namespace PetHotelCare.API.Controllers
{
    [ApiController]
    [Route(Routes.CrudRoute)]

    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public class BookingController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;

        public BookingController(ApplicationDbContext context, UserManager<User> userManager, IConfiguration configuration)
        {
            _context = context;
            _userManager = userManager;
            _configuration = configuration;
        }


        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> CreateBooking([FromBody] BookingRequest request)
        {

            var booking = request.Adapt<Booking>();
            booking.BookingPetServices = request.PetServicesIds.Select(x => new BookingPetService { PetServiceId = x }).ToList();

            booking.Ration.ProductsInRations = request.Ration.ProductsInRation.Select(x => new ProductsInRation { ProductId = x.ProductId }).ToList();

            booking.Price = CalculateTotalPrice(request);// ПРОВЕРИТЬ ЭТО
            if (booking.Price == -1) return NotFound();
            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();
            var response = await _context.Set<Booking>()
                .Include(x => x.BookingPetServices)
                .ThenInclude(x => x.PetService)
                .FirstOrDefaultAsync(x => x.Id == booking.Id);
            var result = response.Adapt<BookingModel>();
            return CreatedAtAction(nameof(CreateBooking), result);
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<PaginationModel<BookingModel>> GetUserBookings(int page)  //УТОЧНИТЬ У ЕУГЕНИЯ!!!!!
        {
            var userId = _userManager.GetUserId(User);
            var userPetsId = _context.Pets.Where(x => x.UserId == userId).Select(y => y.Id);
            var userBookings = _context.Bookings.Where(booking => userPetsId.Contains(booking.PetId));

            var entities = await userBookings.OrderByDescending(x => x.Id)
                                             .Skip((page - 1) * 10)
                                             .Take(10)
                                             .ToListAsync();
            var models = entities.Adapt<List<BookingModel>>();
            return new PaginationModel<BookingModel>(models, entities.Count());
        }

        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteBooking(int bookingId) //ПО ИДЕЕ ПРАВИЛЬНО
        {
            var booking = await _context.FindAsync<Booking>(bookingId);

            if (booking == null)
                return NotFound();
            _context.Remove(booking);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<BookingModel?> GetBookingById(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);
            return booking?.Adapt<BookingModel>();
        }

        [HttpPost("CreateRation")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<RationModel>> CreateRation(int petId, double weight, string activity)
        {
            // Получение данных о питомце
            var pet = await _context.Pets.Include(p => p.Breed).Include(p => p.ProhibitedTags).FirstOrDefaultAsync(p => p.Id == petId);
            if (pet is null) return NotFound(nameof(pet));

            // Вычисление возраста питомца
            var age = DateOnly.FromDateTime(DateTime.UtcNow).Year - pet.BirthDate.Year;


            // Получение диеты
            var diet = await _context.Diets.FirstOrDefaultAsync(d => d.Activity == activity && d.BreedId == pet.BreedId && d.MinAge <= age && d.MaxAge >= age);
            if (diet is null) return NotFound(nameof(diet));

            // Расчет суточной потребности
            var dailyCalories = diet.CaloricValue * weight;
            var dailyProteins = diet.ProtsContent * weight;
            var dailyFats = diet.FatsContent * weight;
            var dailyCarbs = diet.CarbohydratesContent * weight;
            int[] tags = { 1, 2, 3 };// DONT FORGET TO ADD 

            // Получение списка разрешенных продуктов
            var prohibitedTagIds = pet.ProhibitedTags.Select(pt => pt.TagId).ToList();
            var products = await _context.Products
                .Include(p => p.ProductsTag)
                .Where(p => !p.ProductsTag.Any(t => prohibitedTagIds.Contains(t.TagId)))
                .ToListAsync();


            // Выбираем оптимальные продукты, считая их вес и цену. Так же в методе добавляем записи в связную таблицу ПродуктыВРационе
            var optimalProducts = CalculateOptimalRation(dailyCalories, dailyProteins, dailyFats, dailyCarbs, products);
            if (optimalProducts is null)
            {
                return NotFound(nameof(optimalProducts));
            }
            RationModel rationModel = new (){ Price = 0 };
            //Создание рациона

            foreach(var product in optimalProducts)
            {
                rationModel.Price += product.TotalPrice;
                int prodId = product.ProductId;
                double prodWeight = product.TotalWeight;
                ProductsInRationModel prodInRat = new()
                {
                    RationId = rationModel.Id,
                    ProductId = prodId,
                    Weight = prodWeight
                };
                rationModel.ProductInRation.Add(prodInRat);
            }
            return rationModel;
        }

        public class OptimalProduct
        {
            public int ProductId { get; set; }
            public double TotalWeight { get; set; }
            public double TotalPrice { get; set; }
        }

        private OptimalProduct[]? CalculateOptimalRation(double dailyCalories, double dailyProteins, double dailyFats, double dailyCarbs, List<Product> products)
        {
            var solver = Solver.CreateSolver("GLOP");

            // Переменные для каждого продукта
            var productVars = products.Select(p => solver.MakeNumVar(0.0, double.PositiveInfinity, p.Name)).ToArray();

            // Ограничение по калориям
            var calorieConstraint = solver.MakeConstraint(dailyCalories, double.PositiveInfinity, "CalorieConstraint");
            for (int i = 0; i < products.Count; i++)
            {
                calorieConstraint.SetCoefficient(productVars[i], products[i].CaloricValue);
            }

            // Ограничение по белкам
            var proteinConstraint = solver.MakeConstraint(dailyProteins, double.PositiveInfinity, "ProteinConstraint");
            for (int i = 0; i < products.Count; i++)
            {
                proteinConstraint.SetCoefficient(productVars[i], products[i].ProtsContent);
            }

            // Ограничение по жирам
            var fatConstraint = solver.MakeConstraint(dailyFats, double.PositiveInfinity, "FatConstraint");
            for (int i = 0; i < products.Count; i++)
            {
                fatConstraint.SetCoefficient(productVars[i], products[i].FatsContent);
            }

            // Ограничение по углеводам
            var carbConstraint = solver.MakeConstraint(dailyCarbs, double.PositiveInfinity, "CarbConstraint");
            for (int i = 0; i < products.Count; i++)
            {
                carbConstraint.SetCoefficient(productVars[i], products[i].CarbohydratesContent);
            }


            // Целевая функция (минимизация стоимости)
            var objective = solver.Objective();
            for (int i = 0; i < products.Count; i++)
            {
                objective.SetCoefficient(productVars[i], products[i].PricePer100g);
            }
            objective.SetMinimization();

            // Решение задачи
            var resultStatus = solver.Solve();

            if (resultStatus != Solver.ResultStatus.OPTIMAL)
            {
                return null;
            }

            // Возвращаем результат
            var optimalProducts = products.Zip(productVars, (p, var) => new OptimalProduct
            {
                ProductId = p.Id,
                TotalWeight = var.SolutionValue(),
                TotalPrice = var.SolutionValue() * p.PricePer100g
            }).Where(x => x.TotalWeight > 0).ToArray();

            return optimalProducts;
        }
        private double CalculateTotalPrice(BookingRequest request)
        {
            double roomTotal = 0;
            int stayDuration = request.CheckOutDate.DayNumber - request.CheckInDate.DayNumber;

            var room = _context.Rooms
                .Include(room => room.RoomType)
                .First(room => room.Id == request.RoomId);

            roomTotal = stayDuration * room.RoomType.PricePerDay;

            double servicesTotal = 0;
            if (request.PetServicesIds.Count > 0)
            {
                servicesTotal = _context.PetServices
                    .Where(service => request.PetServicesIds.Contains(service.Id))
                    .Sum(service => service.Price);
            }

            double totalPrice = roomTotal + servicesTotal + request.Ration.Price;
            return totalPrice;
        }
    }
}
