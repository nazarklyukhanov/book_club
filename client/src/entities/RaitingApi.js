const BASE_URL = 'http://localhost:3000/api';
import { axiosInstance } from '../shared/axiosInstance'; 

export default class RaitingApi {
  static async getBookRaiting(id) {
    const { data } = await axiosInstance.get(`/raiting/${id}`);
    return data;
  }

  static async updateRaiting(bookId, raiting) {
    const {data} = await axiosInstance.post(`/raiting/${bookId}`, {raiting});
    return data;
  }
}