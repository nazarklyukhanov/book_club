const bookRouter = require('express').Router();
const BookController = require('../controllers/Book.controller');
const verifyAccessToken = require('../middleware/verifyAccessToken');

bookRouter
  .get('/', BookController.getAll)
  .get('/:id', BookController.getOne)
  .get('/mybooks/:id', BookController.getMyBook)
  .post('/', verifyAccessToken, BookController.createBook)
  .put('/:id', BookController.updateBook)
  .delete('/:id', verifyAccessToken, BookController.deleteBook);

module.exports = bookRouter;