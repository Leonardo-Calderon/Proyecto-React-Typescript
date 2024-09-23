import React, { useEffect, useState } from "react";
import { getTareas } from "../services/apiService";

interface Tarea {
    idTarea: number;
    descripcion: string;
    fechaRegistro: Date | null; // Cambia el nombre a minúsculas
}

const TareasList: React.FC = () => {
    const [tareas, setTareas] = useState<Tarea[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchTareas() {
            try {
                const data = await getTareas();

                // Convertir la fecha de string a Date
                const tareasConFechaConvertida = data.map((tarea: any) => {
                    let fecha = new Date(tarea.fechaRegistro); // Asegúrate de usar el campo correcto

                    // Si la fecha es inválida, establece fechaRegistro en null
                    if (isNaN(fecha.getTime())) {
                        console.error("Fecha inválida:", tarea.fechaRegistro);
                        return { ...tarea, fechaRegistro: null }; // Asegúrate de usar el campo correcto
                    }

                    return {
                        ...tarea,
                        fechaRegistro: fecha // Asegúrate de usar el campo correcto
                    };
                });

                setTareas(tareasConFechaConvertida);
            } catch (error: any) {
                setError(error.response?.data || "Error al cargar las tareas.");
            }
        }

        fetchTareas();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Lista de Tareas</h2>
            <ul>
                {tareas.map((tarea) => (
                    <li key={tarea.idTarea}>
                        <strong>{tarea.descripcion}:</strong>
                        {tarea.fechaRegistro // Cambia aquí
                            ? tarea.fechaRegistro.toLocaleDateString() // Cambia aquí
                            : "Fecha inválida"}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TareasList;
