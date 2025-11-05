const ReviewService = require("../services/book.service");
const formatResponse = require("../utils/formatResponse");

class ReviewController {
  static async getAll(req, res) {
    const { book_id } = req.params;

    if (isNaN(+id)) {
      res.status(400).json(formatResponse(400, "Неверный формат ID"));
      return;
    }
    try {
      const reviews = await ReviewService.getAll(book_id);

      if (!reviews || reviews.length === 0) {
        res.status(200).json(formatResponse(200, "Отзывов нет", []));
        return;
      }

      return res
        .status(200)
        .json(formatResponse(200, "Отзывы получены", reviews));
    } catch (error) {
      console.log("====reviewController.getAll====", error);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, error));
    }
  }

  static async getOne(req, res) {
    const { id } = req.params;

    if (isNaN(+id)) {
      res.status(400).json(formatResponse(400, "Неверный формат ID"));
      return;
    }

    try {
      const review = await ReviewService.getReviewById(id);

      if (!review) {
        res
          .status(404)
          .json(formatResponse(404, `Отзыв с id: ${id} не найден`));
        return;
      }

      return res
        .status(200)
        .json(formatResponse(200, "Данные об отзыве получены", review));
    } catch (error) {
      console.log("====ReviewController.getOne====", error);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, error));
    }
  }

  static async createReview(req, res) {
    const { text_of_review, book_id } = req.body;

    const { user } = res.locals;
    console.log(user);

    if (
      !text_of_review ||
      typeof text_of_review !== "string" ||
      text_of_review.trim().length === 0
    ) {
      res.status(400).json(formatResponse(400, "Отзыв не может быть пустым"));
      return;
    }

    try {
      const newBook = await ReviewService.createTask({
        text_of_review,
        user_id: user.id,
        book_id,
      });

      return res
        .status(201)
        .json(formatResponse(201, "Отзыв добавлен успешно", newBook));
    } catch (error) {
      console.log("====TaskController.createBook====", error);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, error));
    }
  }

  static async updateReview(req, res) {
    const { id } = req.params;

    if (isNaN(+id)) {
      res.status(400).json(formatResponse(400, "Неверный формат ID"));
      return;
    }

    const { text_of_review } = req.body;

    try {
      const updatedReview = await ReviewService.updateReviewById(id, {
        text_of_review,
      });

      if (!updatedReview) {
        res
          .status(404)
          .json(formatResponse(404, "Отзыв для обновления не найден"));
        return;
      }

      return res
        .status(200)
        .json(formatResponse(200, "Данные отзыва обновлены", updatedReview));
    } catch (error) {
      console.log("====ReviewController.updateReview====", error);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, error));
    }
  }

  static async deleteReview(req, res) {
    const { id } = req.params;
    const { user } = res.locals;

    if (isNaN(+id)) {
      res.status(400).json(formatResponse(400, "Неверный формат ID"));
      return;
    }

    try {
      const deletedReview = await ReviewService.deleteReviewById(id, user.id);
      if (!deletedReview) {
        res
          .status(404)
          .json(formatResponse(404, "Отзыв для удаления не найден"));
        return;
      }

      return res.status(200).json(formatResponse(200, "Отзыв успешно удален"));
    } catch (error) {
      console.log("====ReviewController.deleteBook====", error);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, error));
    }
  }
}

module.exports = ReviewController;
