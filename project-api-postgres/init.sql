
-- Crear tabla de proyectos
CREATE TABLE IF NOT EXISTS proyectos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT
);

-- Índice para búsquedas por nombre (opcional)
CREATE INDEX IF NOT EXISTS idx_proyectos_nombre ON proyectos(nombre);

-- Insertar datos por defecto
INSERT INTO proyectos (nombre, descripcion) VALUES
  ('Chatbot de Requerimientos Banorte', 'Sistema de generación de requerimientos mediante conversación natural para procesos internos.'),
  ('Portal de Autoservicio', 'Portal para que clientes consulten saldos, movimientos y realicen trámites sin acudir a sucursal.'),
  ('Integración Core Banking', 'API y flujos para conectar sistemas legacy con el core bancario.')
;

-- Verificar datos
-- SELECT * FROM proyectos;
