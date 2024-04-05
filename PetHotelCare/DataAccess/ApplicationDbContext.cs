using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PetHotelCare.DataAccess.Entities;

namespace PetHotelCare.DataAccess
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .UseLazyLoadingProxies();        
        }
        
        public DbSet<Pet> Pets { get; set; }
        public DbSet<PetService> PetServices { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Feeder> Feeders { get; set; }
        public DbSet<FoodType> FoodTypes { get; set; }
        public DbSet<Meal> Meals { get; set; }
        public DbSet<Room> Rooms { get; set; }

        
    }
}
