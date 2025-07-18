using Backend_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


using Microsoft.EntityFrameworkCore;
namespace Backend_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/products
        [HttpGet]
        [Route("Lista")]
        public async Task<ActionResult<IEnumerable<Product>>> GetAll() =>
            await _context.Products.ToListAsync();

        // GET: api/products/{id}
        [HttpGet]
        [Route("Obtener/{id:int}")]
        public async Task<ActionResult<Product>> GetById(int id)
        {
            var product = await _context.Products.FindAsync(id);
            return product == null ? NotFound() : Ok(product);
        }

        // POST: api/products
        [HttpPost]
        [Route("Nuevo")]
        public async Task<ActionResult<Product>> Create(Product product)
        {
            if (string.IsNullOrWhiteSpace(product.Name) ||
                string.IsNullOrWhiteSpace(product.Category) ||
                product.Price <= 0)
            {
                return BadRequest("Nombre, Categoría y Precio válido son requeridos.");
            }

            product.CreatedAt = DateTime.Now;

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
        }
    }
}
