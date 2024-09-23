import React, { useEffect, useState } from 'react';
import TareasList from './components/TareasList';
import { getTareas } from './services/apiService'; // Importar el servicio

const App: React.FC = () => {
    const [tareas, setTareas] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchTareas() {
            try {
                const data = await getTareas(); // Usar la función getTareas
                setTareas(data);
            } catch (error) {
                console.error("Error al cargar las tareas:", error);
                setError("Error al cargar las tareas.");
            }
        }

        fetchTareas();
    }, []);

    return (
        <div>
            <h1>Lista de Tareas</h1>
            {error && <div>{error}</div>}
            <TareasList tareas={tareas} /> {/* Se pasa varTareas */}
        </div>
    );
};

export default App;
