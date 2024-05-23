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

        public DbSet<Breed> Breeds { get; set; }
        public DbSet<Diet> Diets { get; set; }
        public DbSet<PetType> PetTypes { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductsInRation> ProductsInRations { get; set; }
        public DbSet<Ration> Rations { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<RoomType> RoomTypes { get; set; }
        public DbSet<Pet> Pets { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<PetService> Services { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<ProductTag>()
                .HasKey(pr => new { pr.TagId, pr.ProductId });
            modelBuilder.Entity<ProhibitedTag>()
                .HasKey(pr => new { pr.PetId, pr.TagId });
            // Дополнительная настройка для связей многие-ко-многим и других особенностей
            modelBuilder.Entity<ProductsInRation>()
                .HasKey(pr => new { pr.RationId, pr.ProductId });

            // Настройка каскадного удаления и других особенностей при необходимости
        }
    }
}
