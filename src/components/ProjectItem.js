import React from 'react';

function ProjectItem({ proyecto, onEdit, onDelete }) {
  return (
    <article className="project-card">
      <div className="project-card__body">
        <h3 className="project-card__title">{proyecto.nombre}</h3>
        <p className="project-card__desc">
          {proyecto.descripcion || 'Sin descripción'}
        </p>
        <span className="project-card__id">ID: {proyecto.id}</span>
      </div>
      <div className="project-card__actions">
        <button type="button" className="btn btn--edit" onClick={() => onEdit(proyecto)}>
          Editar
        </button>
        <button type="button" className="btn btn--delete" onClick={() => onDelete(proyecto.id)}>
          Borrar
        </button>
      </div>
    </article>
  );
}

export default ProjectItem;
