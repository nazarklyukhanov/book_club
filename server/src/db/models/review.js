'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Book}) {
      // define association here
      this.belongsTo(User, {foreignKey: 'user_id'});
      this.belongsTo(Book, {foreignKey: 'book_id'});
    }
  }
  Review.init({
    text_of_review: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    book_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};