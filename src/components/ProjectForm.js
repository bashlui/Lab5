import React, { useState, useEffect } from 'react';

function ProjectForm({ proyecto, onSubmit, onCancel }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const isEditing = Boolean(proyecto?.id);

  useEffect(() => {
    if (proyecto) {
      setNombre(proyecto.nombre || '');
      setDescripcion(proyecto.descripcion || '');
    } else {
      setNombre('');
      setDescripcion('');
    }
  }, [proyecto]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;
    onSubmit({ nombre: nombre.trim(), descripcion: descripcion.trim() || null });
    setNombre('');
    setDescripcion('');
  };

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <h2>{isEditing ? 'Editar proyecto' : 'Nuevo proyecto'}</h2>
      <label>
        Nombre del proyecto
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej: Chatbot de Requerimientos"
          required
        />
      </label>
      <label>
        Descripción
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción del proyecto..."
          rows={3}
        />
      </label>
      <div className="project-form__actions">
        <button type="submit" className="btn btn--primary">
          {isEditing ? 'Guardar cambios' : 'Agregar proyecto'}
        </button>
        {isEditing && (
          <button type="button" className="btn btn--secondary" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default ProjectForm;
