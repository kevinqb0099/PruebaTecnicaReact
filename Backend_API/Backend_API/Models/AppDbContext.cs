using Microsoft.EntityFrameworkCore;
using Backend_API.Models;
using System.Collections.Generic;

namespace Backend_API.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
    }
}
