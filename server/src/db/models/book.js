'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Review}) {
      // define association here
      this.belongsTo(User, {foreignKey: 'user_id'});
      this.hasMany(Review, {foreignKey: 'book_id'});
    }
  }
  Book.init({
    name: DataTypes.STRING,
    autor: DataTypes.STRING,
    cover: DataTypes.TEXT,
    comment_of_user: DataTypes.TEXT,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};


