import React, { useEffect, useState } from "react";
import { getTareas, eliminarTarea, actualizarTarea, crearTarea } from "../services/apiService";

interface Tarea {
    idTarea: number;
    descripcion: string;
    fechaRegistro: Date | null;
}

const TareasList: React.FC = () => {
    const [tareas, setTareas] = useState<Tarea[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [editandoTarea, setEditandoTarea] = useState<Tarea | null>(null);
    const [nuevaTarea, setNuevaTarea] = useState<string>("");

    useEffect(() => {
        async function fetchTareas() {
            try {
                const data = await getTareas();

                const tareasConFechaConvertida = data.map((tarea: any) => {
                    let fecha = new Date(tarea.fechaRegistro);
                    if (isNaN(fecha.getTime())) {
                        console.error("Fecha inválida:", tarea.fechaRegistro);
                        return { ...tarea, fechaRegistro: null };
                    }
                    return {
                        ...tarea,
                        fechaRegistro: fecha
                    };
                });
                setTareas(tareasConFechaConvertida);
            } catch (error: any) {
                setError(error.response?.data || "Error al cargar las tareas.");
            }
        }
        fetchTareas();
    }, []);

    const handleEdit = (tarea: Tarea) => {
        setEditandoTarea(tarea);
    };

    const handleSave = async () => {
        if (editandoTarea) {
            try {
                await actualizarTarea(editandoTarea.idTarea, editandoTarea);
                setTareas(tareas.map(t => t.idTarea === editandoTarea.idTarea ? editandoTarea : t));
                setEditandoTarea(null);
                console.log("Tarea actualizada correctamente");
            } catch (error) {
                console.error("Error al actualizar la tarea:", error);
            }
        }
    };

    const handleDelete = async (idTarea: number) => {
        if (window.confirm("¿Estás seguro de eliminar esta tarea?")) {
            try {
                await eliminarTarea(idTarea);
                setTareas(tareas.filter((tarea) => tarea.idTarea !== idTarea));
                console.log("Tarea eliminada correctamente");
            } catch (error) {
                console.error("Error al eliminar la tarea:", error);
            }
        }
    };

    const handleCreate = async () => {
        if (nuevaTarea.trim() !== "") {
            try {
                const nuevaTareaCreada = await crearTarea({descripcion: nuevaTarea, fechaRegistro: new Date() });
                setTareas([...tareas, nuevaTareaCreada]);
                setNuevaTarea("");
                console.log("Tarea creada correctamente");
            } catch (error) {
                console.error("Error al crear la tarea:", error);
            }
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Lista de Tareas</h2>
            <button onClick={() => setNuevaTarea("Nueva tarea")}>Crear</button>
            {nuevaTarea !== "" && (
                <div>
                    <h3>Crear Nueva Tarea</h3>
                    <form onSubmit={(e) => { e.preventDefault(); handleCreate(); }}>
                        <label>
                            Descripción:
                            <input
                                type="text"
                                value={nuevaTarea}
                                onChange={(e) => setNuevaTarea(e.target.value)}
                            />
                        </label>
                        <button type="submit">Guardar</button>
                        <button onClick={() => setNuevaTarea("")}>Cancelar</button>
                    </form>
                </div>
            )}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Descripción</th>
                        <th>Fecha de Registro</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {tareas.map((tarea) => (
                        <tr key={tarea.idTarea}>
                            <td>{tarea.idTarea}</td>
                            <td>{tarea.descripcion}</td>
                            <td>
                                {tarea.fechaRegistro
                                    ? tarea.fechaRegistro.toLocaleDateString()
                                    : "Fecha inválida"}
                            </td>
                            <td>
                                <button onClick={() => handleEdit(tarea)}>Editar</button>
                                <button onClick={() => handleDelete(tarea.idTarea)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editandoTarea && (
                <div>
                    <h3>Editar Tarea</h3>
                    <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                        <label>
                            Descripción:
                            <input
                                type="text"
                                value={editandoTarea.descripcion}
                                onChange={(e) => setEditandoTarea({ ...editandoTarea, descripcion: e.target.value })}
                            />
                        </label>
                        <button type="submit">Guardar</button>
                        <button onClick={() => setEditandoTarea(null)}>Cancelar</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default TareasList;
