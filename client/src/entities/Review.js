const BASE_URL = 'http://localhost:3000/api';
import { axiosInstance } from '../shared/axiosInstance'; 

export default class ReviewApi {
  static async getAllRewiew() {
    const { data } = await axiosInstance.get("/reviews");
    return data;
  }
  static async getOneReview(id) {
    const response = await fetch(`${BASE_URL}/reviews/${id}`);
    const data = await response.json();
    return data;
  }

  static async createReview(reviewData) {
    const { data } = await axiosInstance.post("/reviews", reviewData);

    return data;
  }

  static async updateReview(reviewId, reviewData) {
    const response = await fetch(`${BASE_URL}/reviews/${reviewId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData),
    });

    const data = await response.json();
    return data;
  }

  static async deleteReview(id) {
    const { data } = await axiosInstance.delete(`/reviews/${id}`);

    return data;
  }

  static async getReviewsByBookId(bookId) {
    const response = await fetch(`${BASE_URL}/reviews/${bookId}`);
    const data = await response.json();
    return data;
  }
}