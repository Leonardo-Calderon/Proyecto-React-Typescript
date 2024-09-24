import axios from 'axios';
const API_URL = "https://localhost:7265/api/Tareas"; // URL del backend

export async function getTareas() {
    try {
        const response = await fetch(`${API_URL}/tareas`, {
            headers: {
                "Accept": "application/json", // Asegúrate de que la API responda JSON
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        // Mostrar los datos que recibe el front-end
        console.log("Datos recibidos desde el servidor:", data);
        return data;
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
                "Accept": "application/json", // Asegúrate de aceptar JSON
            },
            body: JSON.stringify(tarea),
        });

        // Verificar si la respuesta es JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("La respuesta no es JSON");
        }

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error al crear la tarea:", error);
        throw error;
    }
}


export const eliminarTarea = async (idTarea: number) => {
    try {
        const response = await axios.delete(`${API_URL}/${idTarea}`);
        if (response.status === 200 || response.status === 204) {
            console.log('Tarea eliminada exitosamente');
            return response.data;
        } else {
            console.error('Error al eliminar la tarea: Estado inesperado', response.status);
            throw new Error(`Estado inesperado: ${response.status}`);
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error al eliminar la tarea:', error.response?.data || error.message);
        } else {
            console.error('Error inesperado:', error);
        }
        throw error;
    }
};


export const actualizarTarea = async (idTarea: number, nuevaDescripcion) => {
    try {
        const response = await axios.put(`${API_URL}/${idTarea}`, { descripcion: nuevaDescripcion });
        return response.data;
    } catch (error) {
        console.log(nuevaDescripcion)
        console.error('Error al actualizar la tarea:', error);
        throw error;
    }
};


export const crearTarea = async (nuevaTarea) => {
    try {
        const response = await axios.post(`${API_URL}/tareas`, nuevaTarea);
        return response.data;
    } catch (error) {
        console.log(nuevaTarea)
        console.error('Error al crear la tarea:', error);
        throw error;
    }
};