import React, { useState, useEffect } from 'react';
import {
  getProyectos,
  createProyecto,
  updateProyecto,
  deleteProyecto,
} from './services/api';
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';
import './App.css';

function App() {
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProyecto, setEditingProyecto] = useState(null);

  const loadProyectos = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await getProyectos();
      setProyectos(data);
    } catch (err) {
      const mensaje = !err.response
        ? 'No se pudo conectar con la API. Verifica que esté corriendo en http://localhost:5001 (npm run dev en project-api-postgres).'
        : (err.response?.data?.error || err.message || 'No se pudo cargar la lista de proyectos');
      setError(mensaje);
      setProyectos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProyectos();
  }, []);

  const handleCreate = async (payload) => {
    setError(null);
    try {
      await createProyecto(payload);
      setShowForm(false);
      loadProyectos();
    } catch (err) {
      setError(err.response?.data?.error || 'Error al crear proyecto');
    }
  };

  const handleUpdate = async (payload) => {
    if (!editingProyecto?.id) return;
    setError(null);
    try {
      await updateProyecto(editingProyecto.id, payload);
      setEditingProyecto(null);
      setShowForm(false);
      loadProyectos();
    } catch (err) {
      setError(err.response?.data?.error || 'Error al actualizar proyecto');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este proyecto?')) return;
    setError(null);
    try {
      await deleteProyecto(id);
      if (editingProyecto?.id === id) {
        setEditingProyecto(null);
        setShowForm(false);
      }
      loadProyectos();
    } catch (err) {
      setError(err.response?.data?.error || 'Error al eliminar proyecto');
    }
  };

  const handleEdit = (proyecto) => {
    setEditingProyecto(proyecto);
    setShowForm(true);
  };

  const handleSubmit = (payload) => {
    if (editingProyecto?.id) {
      handleUpdate(payload);
    } else {
      handleCreate(payload);
    }
  };

  const handleCancelEdit = () => {
    setEditingProyecto(null);
    setShowForm(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Lab5 – Reto Banorte</h1>
        <p className="App-subtitle">CRUD Proyectos – Generador de Requerimientos</p>
      </header>
      <main className="App-main">
        {error && <div className="App-error">{error}</div>}
        <div className="App-actions">
          <button
            type="button"
            className="btn btn--add"
            onClick={() => {
              setEditingProyecto(null);
              setShowForm(!showForm);
            }}
          >
            {showForm && !editingProyecto ? 'Ocultar formulario' : 'Agregar proyecto'}
          </button>
        </div>
        {(showForm || editingProyecto) && (
          <ProjectForm
            proyecto={editingProyecto}
            onSubmit={handleSubmit}
            onCancel={handleCancelEdit}
          />
        )}
        <section className="App-list">
          <h2>Lista de proyectos</h2>
          {loading ? (
            <p>Cargando...</p>
          ) : (
            <ProjectList
              proyectos={proyectos}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
