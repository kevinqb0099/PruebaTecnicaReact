namespace Backend_API.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string? Name { get; set; }           // Requerido
        public string? Description { get; set; }   // Opcional
        public decimal Price { get; set; }         // > 0
        public string? Category { get; set; }       // Requerido
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
