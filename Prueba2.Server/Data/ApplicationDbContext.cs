using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Prueba2.Server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
            
        public DbSet<tareas> tareas { get; set; }
    }
}
