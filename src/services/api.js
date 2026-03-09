import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const api = axios.create({ baseURL: BASE_URL });

export const getProyectos = () => api.get('/proyectos');
export const getProyecto = (id) => api.get(`/proyectos/${id}`);
export const createProyecto = (data) => api.post('/proyectos', data);
export const updateProyecto = (id, data) => api.put(`/proyectos/${id}`, data);
export const deleteProyecto = (id) => api.delete(`/proyectos/${id}`);

export default api;
