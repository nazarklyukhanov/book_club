'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Raiting extends Model {

    static associate({Book}) {
      this.belongsTo(Book, { foreignKey: "book_id" });
    }
  }
  Raiting.init({
    raiting: DataTypes.INTEGER,
    book_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Raiting',
  });
  return Raiting;
};