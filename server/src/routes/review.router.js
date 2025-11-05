const reviewRouter = require('express').Router();
const ReviewController = require('../controllers/Review.controller');
const verifyAccessToken = require('../middleware/verifyAccessToken');

reviewRouter
  .get('/', ReviewController.getAll)
  .get('/:id', ReviewController.getOne)
  .post('/', verifyAccessToken, ReviewController.createReview)
  .put('/:id', ReviewController.updateReview)
  .delete('/:id', verifyAccessToken, ReviewController.deleteReview);

module.exports = reviewRouter;