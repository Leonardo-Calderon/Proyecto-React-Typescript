// src/services/apiService.ts
const API_URL = "https://localhost:7265/api"; // Cambia esto si es necesario

export async function getTareas() {
    try {
        const response = await fetch(`${API_URL}/tareas`);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error al obtener las tareas:", error);
        throw error;
    }
}

export async function createTarea(tarea: { nombre: string; descripcion: string }) {
    try {
        const response = await fetch(`${API_URL}/tareas`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tarea),
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error al crear la tarea:", error);
        throw error;
    }
}

// Puedes agregar más métodos para actualizar y eliminar tareas.
