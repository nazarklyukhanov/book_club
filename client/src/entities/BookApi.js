const BASE_URL = 'http://localhost:3000/api';
import { axiosInstance } from '../shared/axiosInstance'; //

export default class BookApi {
  static async getAllBooks() {
    const { data } = await axiosInstance.get('/books');
    return data;
  }
  static async getOneBook(id) {
    const response = await fetch(`${BASE_URL}/books/${id}`);
    const data = await response.json();
    return data;
  }

   static async getMyBooks(id) {
    const response = await fetch(`${BASE_URL}/books/mybooks/${id}`);
    const data = await response.json();
    return data;
  }

  static async createBook(bookData) {
    const { data } = await axiosInstance.post('/books', bookData);
    return data;
  }

  static async updateBook(bookId, bookData) {
    const response = await fetch(`${BASE_URL}/books/${bookId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookData),
    });

    const data = await response.json();
    return data;
  }

  static async deleteBook(id) {
    const { data } = await axiosInstance.delete(`/books/${id}`);

    return data;
  }
}