require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// GET /api — información de la API (para que /api muestre algo)
app.get('/api', (req, res) => {
  res.json({
    ok: true,
    mensaje: 'API CRUD Proyectos - Reto Banorte',
    endpoints: {
      proyectos: '/api/proyectos',
      proyectoPorId: '/api/proyectos/:id',
    },
  });
});

// GET todos los proyectos
app.get('/api/proyectos', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT id, nombre, descripcion FROM proyectos ORDER BY id');
    res.json(rows);
  } catch (err) {
    console.error('Error GET /api/proyectos:', err.message);
    const mensaje = err.code === 'ECONNREFUSED'
      ? 'No se pudo conectar a la base de datos. Revisa que PostgreSQL esté corriendo y las variables en .env (DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD).'
      : err.code === '42P01'
        ? 'La tabla "proyectos" no existe. Ejecuta el script init.sql en tu base de datos.'
        : 'Error al obtener proyectos';
    res.status(500).json({ error: mensaje });
  }
});

// GET un proyecto por id
app.get('/api/proyectos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT id, nombre, descripcion FROM proyectos WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Proyecto no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener proyecto' });
  }
});

// POST crear proyecto
app.post('/api/proyectos', async (req, res) => {
  const { nombre, descripcion } = req.body;
  if (!nombre || typeof nombre !== 'string' || !nombre.trim()) {
    return res.status(400).json({ error: 'El nombre del proyecto es requerido' });
  }
  try {
    const { rows } = await pool.query(
      'INSERT INTO proyectos (nombre, descripcion) VALUES ($1, $2) RETURNING id, nombre, descripcion',
      [nombre.trim(), descripcion ? String(descripcion).trim() : null]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear proyecto' });
  }
});

// PUT actualizar proyecto
app.put('/api/proyectos/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;
  if (!nombre || typeof nombre !== 'string' || !nombre.trim()) {
    return res.status(400).json({ error: 'El nombre del proyecto es requerido' });
  }
  try {
    const { rows } = await pool.query(
      'UPDATE proyectos SET nombre = $1, descripcion = $2 WHERE id = $3 RETURNING id, nombre, descripcion',
      [nombre.trim(), descripcion ? String(descripcion).trim() : null, id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Proyecto no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar proyecto' });
  }
});

// DELETE eliminar proyecto
app.delete('/api/proyectos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rowCount } = await pool.query('DELETE FROM proyectos WHERE id = $1', [id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Proyecto no encontrado' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar proyecto' });
  }
});

app.listen(PORT, () => {
  console.log(`API de proyectos (Lab5 - Banorte) en http://localhost:${PORT}`);
});
