const apiRouter = require('express').Router();
const formatResponse = require('../utils/formatResponse');
const bookRouter = require('./book.router');
const authRouter = require('./auth.router');
const reviewRouter = require('./review.router');

apiRouter.use('/books', bookRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/reviews', reviewRouter);

apiRouter.use((req, res) => {
  res.status(404).json(formatResponse(404, 'Ресурс не найден'));
});

module.exports = apiRouter;