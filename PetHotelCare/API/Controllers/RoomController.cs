using Mapster;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using PetHotelCare.API.Models;
using PetHotelCare.API.Requests;
using PetHotelCare.DataAccess;
using PetHotelCare.DataAccess.Entities;
using PetHotelCare.Utils.Constants;
using System.Linq;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace PetHotelCare.API.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Roles = Roles.Admin)]
    [ApiController]
    public class RoomController : CrudController<RoomRequest, RoomModel, Room>
    {
        public DateTime now = DateTime.Now;
        public DateTime nextMounth = DateTime.Now.AddMonths(1);
        private readonly ApplicationDbContext _context;
        public RoomController(ApplicationDbContext context, IMapper mapper) : base(context, mapper)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<PaginationModel<RoomModel>> GetAvailableRooms( int page) //ВЕРНУТЬ (DateTime checkInDate, DateTime checkOutDate,) после демонстрации
        {
            var availableRooms = await _context.Rooms
                .Where(room => !room.Bookings.Any(booking =>
                    (now >= Convert.ToDateTime(booking.CheckInDate) && now <= Convert.ToDateTime(booking.CheckOutDate)) ||     //(checkInDate >= booking.CheckInDate && checkInDate <= booking.CheckOutDate) ||
                    (nextMounth >= Convert.ToDateTime(booking.CheckInDate) && nextMounth <= Convert.ToDateTime(booking.CheckOutDate))))    //(checkOutDate >= booking.CheckInDate && checkOutDate <= booking.CheckOutDate)))
                .ToListAsync();
            var entities = availableRooms.Skip((page - 1) * 10)
                .Take(10)
                .ToList();
            var models = entities.Adapt<List<RoomModel>>();
            return new PaginationModel<RoomModel>(models, availableRooms.Count());
        }
        [HttpGet]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<PaginationModel<RoomModel>> GetAsync(int page, string query)
        {
            
            var enumerable = await _context.Set<Room>()
            .Where(x => x.Number.Contains(query))
            .OrderBy(x => x.Id)
            .ToListAsync();
            var entities = enumerable.Skip((page - 1) * 10)
                .Take(10)
                .ToList();
            var models = entities.Adapt<List<RoomModel>>();
            return new PaginationModel<RoomModel>(models, enumerable.Count());
            
            
        }
    }
}
