const { Book } = require('../db/models');

class BookService {
  static async getAllBooks() {
    return await Book.findAll();
  }

  static async getBookById(id) {
    return await Book.findByPk(id);
  }

  static async createBook(data) {
    return await Book.create(data);
  }

  static async updateBookById(id, data) {
    const bookToUpdate = await Book.findByPk(id);

    if (!bookToUpdate) return null;

    const {rating, comment_of_user } = data;

    if (rating) {
      bookToUpdate.rating = rating;
    }
    if (comment_of_user) {
      bookToUpdate.comment_of_user = comment_of_user;
    }

    await bookToUpdate.save();

    return bookToUpdate;
  }

  static async deleteBookById(id) {
    const bookToDelete = await Book.findByPk(id);

    if (!bookToDelete) return null;

    return await bookToDelete.destroy();
  }

  static async getMyBook(id) {
    return await Book.findAll({ where: {user_id: id} });
   }
}

module.exports = BookService;