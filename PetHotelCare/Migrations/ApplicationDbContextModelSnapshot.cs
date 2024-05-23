﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PetHotelCare.DataAccess;

#nullable disable

namespace PetHotelCare.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.5")
                .HasAnnotation("Proxies:ChangeTracking", false)
                .HasAnnotation("Proxies:CheckEquality", false)
                .HasAnnotation("Proxies:LazyLoading", true);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ClaimType")
                        .HasColumnType("TEXT");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("TEXT");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ClaimType")
                        .HasColumnType("TEXT");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("TEXT");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("TEXT");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("TEXT");

                    b.Property<string>("RoleId")
                        .HasColumnType("TEXT");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("TEXT");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<string>("Value")
                        .HasColumnType("TEXT");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("PetHotelCare.DataAccess.Entities.Booking", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateOnly>("CheckInDate")
                        .HasColumnType("TEXT");

                    b.Property<DateOnly>("CheckOutDate")
                        .HasColumnType("TEXT");

                    b.Property<int>("PetId")
                        .HasColumnType("INTEGER");

                    b.Property<double>("Price")
                        .HasColumnType("REAL");

                    b.Property<int>("RationId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("RoomId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("PetId");

                    b.HasIndex("RationId")
                        .IsUnique();

                    b.HasIndex("RoomId");

                    b.ToTable("Bookings");
                });

            modelBuilder.Entity("PetHotelCare.DataAccess.Entities.BookingPetService", b =>
                {
                    b.Property<int>("BookingId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("PetServiceId")
                        .HasColumnType("INTEGER");

                    b.HasKey("BookingId", "PetServiceId");

                    b.HasIndex("PetServiceId");

                    b.ToTable("BookingPetServices");
                });

            modelBuilder.Entity("PetHotelCare.DataAccess.Entities.Breed", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("PetTypeId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("PetTypeId");

                    b.ToTable("Breeds");
                });

            modelBuilder.Entity("PetHotelCare.DataAccess.Entities.Diet", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Activity")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("BreedId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("CaloricValue")
                        .HasColumnType("INTEGER");

                    b.Property<int>("CarbohydratesContent")
                        .HasColumnType("INTEGER");

                    b.Property<int>("FatsContent")
                        .HasColumnType("INTEGER");

                    b.Property<int>("MaxAge")
                        .HasColumnType("INTEGER");

                    b.Property<int>("MinAge")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("ProtsContent")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("BreedId");

                    b.ToTable("Diets");
                });

            modelBuilder.Entity("PetHotelCare.DataAccess.Entities.Pet", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("AdditionalInfo")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateOnly>("BirthDate")
                        .HasColumnType("TEXT");

                    b.Property<int>("BreedId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Image")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("BreedId");

                    b.HasIndex("UserId");

                    b.ToTable("Pets");
                });

            modelBuilder.Entity("PetHotelCare.DataAccess.Entities.PetService", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<double>("Price")
                        .HasColumnType("REAL");

                    b.HasKey("Id");

                    b.ToTable("PetServices");
                });

            modelBuilder.Entity("PetHotelCare.DataAccess.Entities.PetType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("PetTypes");
                });

            modelBuilder.Entity("PetHotelCare.DataAccess.Entities.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("CaloricValue")
                        .HasColumnType("INTEGER");

                    b.Property<int>("CarbohydratesContent")
                        .HasColumnType("INTEGER");

                    b.Property<int>("FatsContent")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<double>("PricePer100g")
                        .HasColumnType("REAL");

                    b.Property<int>("ProtsContent")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("PetHotelCare.DataAccess.Entities.ProductTag", b =>
                {
                    b.Property<int>("TagId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ProductId")
                        .HasColumnType("INTEGER");

                    b.HasKey("TagId", "ProductId");

                    b.HasIndex("ProductId");

                    b.ToTable("ProductTag");
                });

            modelBuilder.Entity("PetHotelCare.DataAccess.Entities.ProductsInRation", b =>
                {
                    b.Property<int>("RationId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ProductId")
                        .HasColumnType("INTEGER");

                    b.Property<double>("Weight")
                        .HasColumnType("REAL");

                    b.HasKey("RationId", "ProductId");

                    b.HasIndex("ProductId");

                    b.ToTable("ProductsInRations");
                });

            modelBuilder.Entity("PetHotelCare.DataAccess.Entities.ProhibitedTag", b =>
                {
                    b.Property<int>("PetId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("TagId")
                        .HasColumnType("INTEGER");

                    b.HasKey("PetId", "TagId");

                    b.HasIndex("TagId");

                    b.ToTable("ProhibitedTag");
                });

            modelBuilder.Entity("PetHotelCare.DataAccess.Entities.Ration", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<double>("Price")
                        .HasColumnType("REAL");

                    b.HasKey("Id");

                    b.ToTable("Rations");
                });

            modelBuilder.Entity("PetHotelCare.DataAccess.Entities.Room", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Image")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Number")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("RoomTypeId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("RoomTypeId");

                    b.ToTable("Rooms");
                });

            modelBuilder.Entity("PetHotelCare.DataAccess.Entities.RoomType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<double>("PricePerDay")
                        .HasColumnType("REAL");

                    b.HasKey("Id");

                    b.ToTable("RoomTypes");
                });

            modelBuilder.Entity("PetHotelCare.DataAccess.Entities.Tag", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Tags");
                });

            modelBuilder.Entity("PetHotelCare.DataAccess.Entities.User", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Avatar")
                        .HasColumnType("TEXT");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("TEXT");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("TEXT");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("INTEGER");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("TEXT");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("PetHotelCare.DataAccess.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("PetHotelCare.DataAccess.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PetHotelCare.DataAccess.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("PetHotelCare.DataAccess.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("PetHotelCare.DataAccess.Entities.Booking", b =>
                {
                    b.HasOne("PetHotelCare.DataAccess.Entities.Pet", "Pet")
                        .WithMany("Bookings")
                        .HasForeignKey("PetId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PetHotelCare.DataAccess.Entities.Ration", "Ration")
                        .WithOne("Booking")
                        .HasForeignKey("PetHotelCare.DataAccess.Entities.Booking", "RationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PetHotelCare.DataAccess.Entities.Room", "Room")
                        .WithMany("Bookings")
                        .HasForeignKey("RoomId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Pet");

                    b.Navigation("Ration");

                    b.Navigation("Room");
                });

            modelBuilder.Entity("PetHotelCare.DataAccess.Entities.BookingPetService", b =>
                {
                    b.HasOne("PetHotelCare.DataAccess.Entities.Booking", "Booking")
                        .WithMany("BookingPetServices")
                        .HasForeignKey("BookingId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PetHotelCare.DataAccess.Entities.PetService", "PetService")
                        .WithMany("BookingPetServices")
                        .HasForeignKey("PetServiceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Booking");

                    b.Navigation("PetService");
                });

            modelBuilder.Entity("PetHotelCare.DataAccess.Entities.Breed", b =>
                {
                    b.HasOne("PetHotelCare.DataAccess.Entities.PetType", "PetType")
                        .WithMany("Breeds")
                        .HasForeignKey("PetTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("PetType");
                });

            modelBuilder.Entity("PetHotelCare.DataAccess.Entities.Diet", b =>
                {
                    b.HasOne("PetHotelCare.DataAccess.Entities.Breed", "Breed")
                        .WithMany("Diets")
                        .HasForeignKey("BreedId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Breed");
                });

            modelBuilder.Entity("PetHotelCare.DataAccess.Entities.Pet", b =>
                {
                    b.HasOne("PetHotelCare.DataAccess.Entities.Breed", "Breed")
                        .WithMany("Pets")
                        .HasForeignKey("BreedId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PetHotelCare.DataAccess.Entities.User", "User")
                        .WithMany("Pets")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Breed");

                    b.Navigation("User");
                });

            modelBuilder.Entity("PetHotelCare.DataAccess.Entities.ProductTag", b =>
                {
                    b.HasOne("PetHotelCare.DataAccess.Entities.Product", "Product")
                        .WithMany("ProductsTag")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PetHotelCare.DataAccess.Entities.Tag", "Tag")
                        .WithMany("ProductsTag")
                        .HasForeignKey("TagId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Product");

                    b.Navigation("Tag");
                });

            modelBuilder.Entity("PetHotelCare.DataAccess.Entities.ProductsInRation", b =>
                {
                    b.HasOne("PetHotelCare.DataAccess.Entities.Product", "Product")
                        .WithMany("ProductsInRations")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PetHotelCare.DataAccess.Entities.Ration", "Ration")
                        .WithMany("ProductsInRations")
                        .HasForeignKey("RationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Product");

                    b.Navigation("Ration");
                });

            modelBuilder.Entity("PetHotelCare.DataAccess.Entities.ProhibitedTag", b =>
                {
                    b.HasOne("PetHotelCare.DataAccess.Entities.Pet", "Pet")
                        .WithMany("ProhibitedTags")
                        .HasForeignKey("PetId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PetHotelCare.DataAccess.Entities.Tag", "Tag")
                        .WithMany("ProhibitedTags")
                        .HasForeignKey("TagId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Pet");

                    b.Navigation("Tag");
                });

            modelBuilder.Entity("PetHotelCare.DataAccess.Entities.Room", b =>
                {
                    b.HasOne("PetHotelCare.DataAccess.Entities.RoomType", "RoomType")
                        .WithMany("Rooms")
                        .HasForeignKey("RoomTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("RoomType");
                });

            modelBuilder.Entity("PetHotelCare.DataAccess.Entities.Booking", b =>
                {
                    b.Navigation("BookingPetServices");
                });

            modelBuilder.Entity("PetHotelCare.DataAccess.Entities.Breed", b =>
                {
                    b.Navigation("Diets");

                    b.Navigation("Pets");
                });

            modelBuilder.Entity("PetHotelCare.DataAccess.Entities.Pet", b =>
                {
                    b.Navigation("Bookings");

                    b.Navigation("ProhibitedTags");
                });

            modelBuilder.Entity("PetHotelCare.DataAccess.Entities.PetService", b =>
                {
                    b.Navigation("BookingPetServices");
                });

            modelBuilder.Entity("PetHotelCare.DataAccess.Entities.PetType", b =>
                {
                    b.Navigation("Breeds");
                });

            modelBuilder.Entity("PetHotelCare.DataAccess.Entities.Product", b =>
                {
                    b.Navigation("ProductsInRations");

                    b.Navigation("ProductsTag");
                });

            modelBuilder.Entity("PetHotelCare.DataAccess.Entities.Ration", b =>
                {
                    b.Navigation("Booking")
                        .IsRequired();

                    b.Navigation("ProductsInRations");
                });

            modelBuilder.Entity("PetHotelCare.DataAccess.Entities.Room", b =>
                {
                    b.Navigation("Bookings");
                });

            modelBuilder.Entity("PetHotelCare.DataAccess.Entities.RoomType", b =>
                {
                    b.Navigation("Rooms");
                });

            modelBuilder.Entity("PetHotelCare.DataAccess.Entities.Tag", b =>
                {
                    b.Navigation("ProductsTag");

                    b.Navigation("ProhibitedTags");
                });

            modelBuilder.Entity("PetHotelCare.DataAccess.Entities.User", b =>
                {
                    b.Navigation("Pets");
                });
#pragma warning restore 612, 618
        }
    }
}
