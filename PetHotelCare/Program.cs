using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using PetHotelCare.DataAccess;
using PetHotelCare.DataAccess.Entities;
using Microsoft.AspNetCore.Cors;
using Mapster;
using PetHotelCare.API.Requests;
using PetHotelCare.API.Models;
using MapsterMapper;
using Microsoft.Extensions.DependencyInjection;

TypeAdapterConfig<ProductRequest, Product>.ForType()
    .Map(dest => dest.ProductsTag, src => src.Tags.Select(x => new ProductTag { TagId = x}));
TypeAdapterConfig<Product, ProductModel>.ForType()
    .Map(dest => dest.Tags, src => src.ProductsTag.ToDictionary(x =>x.TagId, x => x.Tag.Name));

TypeAdapterConfig<PetRequest, Pet>.ForType()
    .Map(dest => dest.ProhibitedTags, src => src.ProhibitedTags.Select(x => new ProhibitedTag { TagId = x }));
TypeAdapterConfig<Pet, PetModel>.ForType()
    .Map(dest => dest.ProhibitedTags, src => src.ProhibitedTags.ToDictionary(x => x.TagId, x => x.Tag.Name));

var builder = WebApplication.CreateBuilder(args);
var config = TypeAdapterConfig.GlobalSettings;
config.Scan(typeof(Program).Assembly);
builder.Services.AddSingleton(config);
builder.Services.AddScoped<IMapper, ServiceMapper>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost3000", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Укажите адрес вашего React-приложения
              .AllowAnyHeader() 
              .AllowAnyMethod() 
              .AllowCredentials(); 

    });
});

// Add services to the container.
builder.Services.AddControllersWithViews();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlite(connectionString);
});
void SetupAction(IdentityOptions options)
{
    options.Password.RequireNonAlphanumeric = false;
}

builder.Services.AddIdentity<User, IdentityRole>(SetupAction)
        .AddEntityFrameworkStores<ApplicationDbContext>()
        .AddDefaultTokenProviders();



builder.Services.AddAuthentication()
        .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme)
;
builder.Services.AddControllers();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(connectionString));
builder.Services.AddMapster();
builder.Services.ConfigureApplicationCookie(options =>
{
    options.Events.OnRedirectToLogin = context =>
    {
        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        return Task.CompletedTask;
    };
    options.Events.OnRedirectToAccessDenied = context =>
    {
        context.Response.StatusCode = StatusCodes.Status403Forbidden;
        return Task.CompletedTask;
    };
    options.Cookie.SameSite = SameSiteMode.None;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
});
builder.Services.AddSwaggerGen();                       //Я не понимаю как понять что за сервисы у меня используюся и как их подключить

var app = builder.Build();

app.UseCors("AllowLocalhost3000");
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
   
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection()
//   .UseHttpsRedirection()
   .UseCors(corsPolicyBuilder => corsPolicyBuilder.WithOrigins("https://localhost:3000")
                                                  .AllowAnyHeader()
                                                  .AllowAnyMethod()
                                                  .AllowCredentials())
   .UseAuthentication()
   .UseAuthorization();



app.MapControllers();

app.Run();
