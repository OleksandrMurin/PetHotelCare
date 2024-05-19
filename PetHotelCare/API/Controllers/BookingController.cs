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


        //[HttpPost]
        //[ProducesResponseType(StatusCodes.Status201Created)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        //[ProducesResponseType(StatusCodes.Status404NotFound)]
        //public async Task<IActionResult> CreateBooking([FromBody] BookingRequest request)
        //{

        //    var booking = request.Adapt<Booking>();
        //    booking.PetServices = _context.PetServices.Where(x => request.PetServicesIds.Contains(x.Id)).ToList();
        //    var room = await _context.Rooms.FindAsync(booking.RoomId);
        //    if (room != null)
        //    {
        //        room.IsFree = false;
        //    }
        //    _context.Rooms.Update(room);
        //    booking.Price = CalculateTotalPrice(request);// ПРОВЕРИТЬ ЭТО
        //    if (booking.Price == -1) return NotFound();
        //    _context.Bookings.Add(booking);
        //    await _context.SaveChangesAsync();
        //    var model = booking.Adapt<BookingModel>();

        //    return CreatedAtAction(nameof(CreateBooking), model);
        //}

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

        //[HttpDelete]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        //[ProducesResponseType(StatusCodes.Status404NotFound)]
        //public async Task<IActionResult> DeleteBooking(int bookingId) //ПО ИДЕЕ ПРАВИЛЬНО
        //{
        //    var booking = await _context.FindAsync<Booking>(bookingId);

        //    if (booking == null)
        //        return NotFound();
        //    var room = await _context.Rooms.FindAsync(booking.RoomId);
        //    if (room != null)
        //    {
        //        room.IsFree = true;
        //    }
        //    _context.Remove(booking);
        //    await _context.SaveChangesAsync();

        //    return Ok();
        //}

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<BookingModel?> GetBookingById(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);
            return booking?.Adapt<BookingModel>();
        }

        //private double CalculateTotalPrice(BookingRequest request)
        //{
        //    double roomTotal = 0;
        //    TimeSpan stayDuration = request.CheckOutDate - request.CheckInDate;
        //    int numberOfDays = stayDuration.Days;

        //    var room = _context.Rooms
        //        .FirstOrDefault(room => room.Id == request.RoomId);
        //    if (room is null)
        //    {
        //        return /*NotFound()*/ -1;
        //    }
        //    roomTotal = numberOfDays * room.PricePerDay;

        //    double servicesTotal = 0;
        //    if (request.PetServicesIds.Count > 0)
        //    {
        //        servicesTotal = _context.PetServices
        //            .Where(service => request.PetServicesIds.Contains(service.Id))
        //            .Sum(service => service.Price);
        //    }

        //    double mealsTotal = 0;
        //    if (request.Meals.Count > 0)
        //    {
        //        if (request.Meals.Any(x => _context.FoodTypes.Find(x.FoodTypeId) == null)) return -1;
        //        mealsTotal = request.Meals.Sum(meal =>
        //        {

        //            var foodType = _context.FoodTypes
        //                .FirstOrDefault(foodType => foodType.Id == meal.FoodTypeId);

        //            var totalFoodPrice = (meal.QuantityInGrams / 100) * foodType!.PricePer100Grams;
        //            return totalFoodPrice;
        //        });
        //    }


        //    double totalPrice = roomTotal + servicesTotal + mealsTotal;
        //    return totalPrice;
        //}
    }
}
