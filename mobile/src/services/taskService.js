import { api } from './api';

export async function getTasks(params = {}) {
  const response = await api.get('/tasks', { params });
  return response.data;
}

export async function getTaskById(taskId) {
  const response = await api.get(`/tasks/${taskId}`);
  return response.data;
}

export async function createTask(payload) {
  const response = await api.post('/tasks', payload);
  return response.data;
}

export async function updateTaskStatus(taskId, status) {
  const response = await api.put(`/tasks/${taskId}`, { status });
  return response.data;
}

export async function updateTask(taskId, payload) {
  const response = await api.put(`/tasks/${taskId}`, payload);
  return response.data;
}

export async function deleteTask(taskId) {
  const response = await api.delete(`/tasks/${taskId}`);
  return response.data;
}

export async function getUsers() {
  const response = await api.get('/auth/users');
  return response.data;
}
