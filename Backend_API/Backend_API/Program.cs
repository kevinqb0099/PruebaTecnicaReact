using Backend_API.Models;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);


// Agrega el contexto en memoria
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseInMemoryDatabase("ProductosDB"));


builder.Services.AddCors(options =>
{
    options.AddPolicy("NuevaPolitica", app =>
    {
        app.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});


// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



var app = builder.Build();


app.UseSwagger();
app.UseSwaggerUI();

// Configure the HTTP request pipeline.



app.UseCors("NuevaPolitica");


app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Products.AddRange(
        new Product { Name = "Laptop", Description = "Dell Inspiron", Price = 1200, Category = "Electrónica", CreatedAt = DateTime.Now },
        new Product { Name = "Zapatillas", Description = "Nike Air", Price = 300, Category = "Ropa", CreatedAt = DateTime.Now },
        new Product { Name = "Monitor", Description = "Samsung 24\"", Price = 600, Category = "Electrónica", CreatedAt = DateTime.Now }
    );
    db.SaveChanges();
}
app.Run();
