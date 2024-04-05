
using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MySqlX.XDevAPI.Common;
using PetHotelCare.API.Models;
using PetHotelCare.API.Requests.Account;
using PetHotelCare.DataAccess;
using PetHotelCare.DataAccess.Entities;
using PetHotelCare.Utils.Constants;


namespace PetHotelCare.API.Controllers
{
    [Route(Routes.DefaultRoute)]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly ApplicationDbContext _context;

        public AccountController(UserManager<User> userManager,
                            SignInManager<User> signInManager,
                            ApplicationDbContext context,
                            IConfiguration configuration,
                            RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _context = context;
            InitializeAsync(userManager, roleManager, configuration).Wait();
        }


        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> LoginAsync([FromBody] LoginRequest request)
        {
            var result = await _signInManager.PasswordSignInAsync(request.Email, request.Password, true, false);

            if (result.Succeeded)
                return Ok(); // Возвращаем статус 200 OK
            else
                return BadRequest(new { message = "Invalid credentials" }); // Возвращаем статус 400 Bad Request с сообщением об ошибке
        }

        [HttpDelete]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task LogoutAsync() => await _signInManager.SignOutAsync();

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> RegisterAsync(RegisterRequest model)

        {
            var user = model.Adapt<User>();
            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                result = await _userManager.AddToRoleAsync(user, Roles.Customer);
                if (result.Succeeded)
                {
                    return CreatedAtAction(null, user.Adapt<UserModel>());
                }
            }
            return result.Succeeded ? Ok() : BadRequest(result.Errors.Select(e => e.Description));
        }

        [HttpDelete("{id}")] //под вопросиком
        [Authorize(Roles = Roles.Admin)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteAsync(string id)
        {
            var userId = _userManager.GetUserId(User);
            var user = await _context.Users.FindAsync(id);
            if (user is null)
                return NotFound();
            var result = await _userManager.DeleteAsync(user);
            return result.Succeeded ? Ok() : BadRequest(result.Errors.Select(e => e.Description));
        }

        private static async Task InitializeAsync(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration)
        {
            string adminEmail = configuration["Admin:Email"]!;
            string adminPassword = configuration["Admin:Password"]!;
            await AddRole(roleManager, Roles.Admin);
            await AddRole(roleManager, Roles.Customer);
            if (await userManager.FindByEmailAsync(adminEmail) is null)
            {
                var admin = new User
                {
                    Email = adminEmail,
                    UserName = adminEmail,
                    Name = Roles.Admin
                };
                var result = await userManager.CreateAsync(admin, adminPassword);
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(admin, Roles.Admin);
                }
            }

            static async Task AddRole(RoleManager<IdentityRole> roleManager, string role)
            {
                if (await roleManager.FindByNameAsync(role) is null)
                    await roleManager.CreateAsync(new IdentityRole(role));
            }
        }

        [HttpGet]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<UserModel?> GetUser()
        {
            var user = await _userManager.GetUserAsync(User);
            return user!.Adapt<UserModel?>();
        }

        //public async Task<string?> GetRole()
        //{
        //    var user = await _userManager.GetUserAsync(User);
        //    IList<string> roles = await _userManager.GetRolesAsync(user!);
        //    return roles.FirstOrDefault();
        //}
        //public string? GetUserId() => _userManager.GetUserId(User);

        [HttpGet]
        [Authorize(Roles = Roles.Admin)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<PaginationModel<UserModel>> GetUsers(int page, string query = "non")
        {
            if(query == "non")
            {
                var users = _context.Users;
                var entities = await users.OrderByDescending(x => x.Name).Skip((page - 1) * 10).Take(10).ToListAsync();

                var models = entities.Adapt<List<UserModel>>();
                return new PaginationModel<UserModel>(models, users.Count());
            }
            else
            {
                var users = _context.Users.Where(x => x.Name.Contains(query));
                var entities = await users.OrderByDescending(x => x.Name).Skip((page - 1) * 10).Take(10).ToListAsync();

                var models = entities.Adapt<List<UserModel>>();
                return new PaginationModel<UserModel>(models, users.Count());
            }
            
        }

    }
}
