const API_URL = "https://localhost:7265/api"; // URL del backend

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
