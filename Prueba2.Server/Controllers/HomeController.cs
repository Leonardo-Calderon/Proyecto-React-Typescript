using Microsoft.AspNetCore.Mvc;
using Prueba2.Server.Data;
using System.Linq;

namespace Prueba2.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public HomeController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Método para probar la conexión a la base de datos
        [HttpGet("CheckDatabaseConnection")]
        public IActionResult CheckDatabaseConnection()
        {
            try
            {
                // Intenta obtener un registro de la tabla 'tareas'
                var tarea = _context.tareas.FirstOrDefault();

                if (tarea != null)
                {
                    return Ok("La base de datos está conectada correctamente y contiene datos.");
                }
                else
                {
                    return Ok("La base de datos está conectada, pero la tabla 'tareas' está vacía.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al conectar con la base de datos: {ex.Message}");
            }
        }
    }
}
