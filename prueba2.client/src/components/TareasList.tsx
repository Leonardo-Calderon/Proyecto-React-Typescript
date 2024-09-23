// src/components/TareasList.tsx
import React, { useEffect, useState } from "react";
import { getTareas } from "../services/apiService";

interface Tarea {
    IdTarea: number;
    Descripcion: string;
    FechaRegistro: string;
}

const TareasList: React.FC = () => {
    const [tareas, setTareas] = useState<Tarea[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchTareas() {
            try {
                const data = await getTareas();
                setTareas(data);
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
                    <li key={tarea.IdTarea}>
                        <strong>{tarea.Descripcion}:</strong> {new Date(tarea.FechaRegistro).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TareasList;
