using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Prueba2.Server.Data;

[Route("api/[controller]")]
[ApiController]
public class TareasController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public TareasController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/Tareas
    [HttpGet]
    public async Task<ActionResult<IEnumerable<tareas>>> GetTareas()
    {
        return await _context.tareas.ToListAsync();
    }

    // Este método devuelve todas las tareas
    [HttpGet("tareas")]
    public async Task<ActionResult<IEnumerable<tareas>>> GetTodasTareas()
    {
        var tareas = await _context.tareas.ToListAsync();

        // Opcional: Si quieres asegurarte de que las fechas están formateadas correctamente, puedes hacer esto:
        var tareasConFechaFormato = tareas.Select(t => new
        {
            t.IdTarea,
            t.Descripcion,
            FechaRegistro = t.FechaRegistro.ToString("yyyy-MM-ddTHH:mm:ss") // Formato ISO
        });

        return Ok(tareasConFechaFormato);
    }

    // Método existente para obtener una tarea por ID
    [HttpGet("{id}")]
    public async Task<ActionResult<tareas>> GetTarea(int id)
    {
        var tarea = await _context.tareas.FindAsync(id);

        if (tarea == null)
        {
            return NotFound();
        }

        return tarea;
    }


    // POST: api/Tareas
    [HttpPost]
    public async Task<ActionResult<tareas>> PostTarea(tareas tarea)
    {
        tarea.FechaRegistro = DateTime.Now;
        _context.tareas.Add(tarea);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetTarea", new { id = tarea.IdTarea }, tarea);
    }

    // PUT: api/Tareas/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutTarea(int id, tareas tarea)
    {
        if (id != tarea.IdTarea)
        {
            return BadRequest();
        }

        _context.Entry(tarea).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!TareaExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // DELETE: api/Tareas/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTarea(int id)
    {
        var tarea = await _context.tareas.FindAsync(id);
        if (tarea == null)
        {
            return NotFound();
        }

        _context.tareas.Remove(tarea);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool TareaExists(int id)
    {
        return _context.tareas.Any(e => e.IdTarea == id);
    }
}

