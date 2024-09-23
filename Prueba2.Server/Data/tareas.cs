using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;  // Necesario para [Table]

[Table("tareas", Schema = "sc_tareas")]  // Especificar el nombre de la tabla y el esquema
public class tareas
{
    [Key]
    public int IdTarea { get; set; }

    public string Descripcion { get; set; }
    
    public DateTime FechaRegistro { get; set; }

}