const { Review } = require('../db/models');

class ReviewService {
  static async getAllReview() {
    return await Review.findAll();
  }

  static async getReviewById(id) {
    return await Review.findByPk(id);
  }

  static async createReview(data) {
    return await Review.create(data);
  }

  static async updateReviewById(id, data) {
    const reviewToUpdate = await Review.findByPk(id);

    if (!reviewToUpdate) return null;

    const { text_of_review } = data;

    if ( text_of_review) {
      reviewToUpdate.text_of_review = text_of_review;
    }

    await reviewToUpdate.save();

    return reviewToUpdate;
  }

  static async deleteReviewById(id) {
    const reviewToDelete = await Review.findByPk(id);

    if (!reviewToDelete) return null;

    return await reviewToDelete.destroy();
  }
}

module.exports = ReviewService;