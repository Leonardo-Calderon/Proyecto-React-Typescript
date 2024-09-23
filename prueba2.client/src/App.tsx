import React, { useEffect, useState } from 'react';
import TareasList from './components/TareasList';

const App: React.FC = () => {
    const [tareas, setTareas] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchTareas() {
            try {
                const response = await fetch('https://localhost:7265/api/tareas');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
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
            <TareasList varTareas={tareas} />
        </div>
    );
};

export default App;
