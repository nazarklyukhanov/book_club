const BookService = require("../services/book.service");
const formatResponse = require("../utils/formatResponse");

class BookController {
  static async getAll(req, res) {
    try {
      const books = await BookService.getAll();

      if (!books || books.length === 0) {
        res.status(200).json(formatResponse(200, "Книг нет", []));
        return;
      }

      return res.status(200).json(formatResponse(200, "Книги получены", books));
    } catch (error) {
      console.log("====BookController.getAll====", error);
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
      const book = await BookService.getBookById(id);

      if (!book) {
        res
          .status(404)
          .json(formatResponse(404, `Книга с id: ${id} не найдена`));
        return;
      }

      return res
        .status(200)
        .json(formatResponse(200, "Данные о книге получены", book));
    } catch (error) {
      console.log("====BookController.getOne====", error);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, error));
    }
  }

  static async createBook(req, res) {
    const { name, author, rating, cover, comment_of_user } = req.body;

    const { user } = res.locals;
    console.log(user);

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      res
        .status(400)
        .json(formatResponse(400, "Название книги не может быть пустым"));
      return;
    }

    if (!author || typeof author !== "string" || author.trim().length === 0) {
      res
        .status(400)
        .json(formatResponse(400, "Имя автора не может быть пустым"));
      return;
    }

    if (
      !comment_of_user ||
      typeof comment_of_user !== "string" ||
      comment_of_user.trim().length === 0
    ) {
      res
        .status(400)
        .json(formatResponse(400, "Комментарий не может быть пустым"));
      return;
    }

    try {
      const newBook = await BookService.createTask({
        name,
        author,
        user_id: user.id,
        rating,
        cover,
        comment_of_user
      });

      return res
        .status(201)
        .json(formatResponse(201, "Книга добавлена успешно", newBook));
    } catch (error) {
      console.log("====BookController.createBook====", error);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, error));
    }
  }

  static async updateBook(req, res) {
    const { id } = req.params;

    if (isNaN(+id)) {
      res.status(400).json(formatResponse(400, "Неверный формат ID"));
      return;
    }

    const { rating, comment_of_user } = req.body;

    try {
      const updatedBook= await BookService.updateBookById(id, { rating, comment_of_user });

      if (!updatedBook) {
        res
          .status(404)
          .json(formatResponse(404, "Книга для обновления не найдена"));
        return;
      }

      return res
        .status(200)
        .json(formatResponse(200, "Данные книги обновлены", updatedBook));
    } catch (error) {
      console.log("====BookController.updateBook====", error);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, error));
    }
  }

  static async deleteBook(req, res) {
    const { id } = req.params;
    const { user } = res.locals;

    if (isNaN(+id)) {
      res.status(400).json(formatResponse(400, "Неверный формат ID"));
      return;
    }

    try {
      const deletedBook= await BookService.deleteBookById(id, user.id);
      if (!deletedBook) {
        res
          .status(404)
          .json(formatResponse(404, "Книга для удаления не найдена"));
        return;
      }

      return res
        .status(200)
        .json(formatResponse(200, "Книга успешно удалена"));
    } catch (error) {
      console.log("====BookController.deleteBook====", error);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, error));
    }
  }
}

module.exports = BookController;
