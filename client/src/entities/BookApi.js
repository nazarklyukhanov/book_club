const BASE_URL = 'http://localhost:3000/api';
import { axiosInstance } from '../shared/axiosInstance'; //

export default class BookApi {
  static async getAllBooks() {
    const { data } = await axiosInstance.get('/tasks');
    return data;
  }
  static async getOneTask(id) {
    const response = await fetch(`${BASE_URL}/tasks/${id}`);
    const data = await response.json();
    return data;
  }

  static async createTask(taskData) {
    const { data } = await axiosInstance.post('/tasks', taskData);

    return data;
  }

  static async updateTask(taskId, taskData) {
    const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    });

    const data = await response.json();
    return data;
  }

  static async deleteTask(id) {
    const { data } = await axiosInstance.delete(`/tasks/${id}`);

    return data;
  }
}