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
    static associate(models) {
      // define association here
      this.belongsTo(models. Users, {foreignKey: 'user_id'});
    }
  }
  Book.init({
    name: DataTypes.STRING,
    autor: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    cover: DataTypes.TEXT,
    comment_of_user: DataTypes.TEXT,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};