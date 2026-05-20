import api from '../lib/axios';

export const getTasks = async () => {
  const response = await api.get('/tasks?page=1&limit=20');
  return response.data.data;
};

export const createTask = async (payload) => {
  const response = await api.post('/tasks', payload);
  return response.data.data;
};

export const updateTask = async (id, payload) => {
  const response = await api.patch(`/tasks/${id}`, payload);
  return response.data.data;
};

export const deleteTask = async (id) => {
  await api.delete(`/tasks/${id}`);
};
