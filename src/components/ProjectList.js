import React from 'react';
import ProjectItem from './ProjectItem';

function ProjectList({ proyectos, onEdit, onDelete }) {
  if (!proyectos?.length) {
    return (
      <p className="project-list__empty">No hay proyectos. Agrega uno con el botón de arriba.</p>
    );
  }

  return (
    <ul className="project-list">
      {proyectos.map((p) => (
        <li key={p.id}>
          <ProjectItem proyecto={p} onEdit={onEdit} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
}

export default ProjectList;
