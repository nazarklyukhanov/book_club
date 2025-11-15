"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Book, Review, Raiting}) {
      this.hasMany(Book, {foreignKey: 'user_id'});
      this.hasMany(Review, {foreignKey: 'user_id'});
      this.hasMany(Raiting, {foreignKey: 'user_id'});
    }

    static validateEmail(email) {
    const emailPattern = /^[A-z0-9!-_%.]+@[A-z0-9.-]+\.[A-z]{2,}$/;
    return emailPattern.test(email);
  }

    static validatePassword(password) {
      // валидация пароля
      const hasUpperCase = /[A-Z]/;
      const hasLowerCase = /[a-z]/;
      const hasDigits = /[0-9]/;
      const hasSpecialCharacters = /[!@#$%^&*(),.:"{}|<>]/;
      const isValidLength = password.length >= 8;

      if (
        !hasUpperCase.test(password) ||
        !hasLowerCase.test(password) ||
        !hasDigits.test(password) ||
        !hasSpecialCharacters.test(password) ||
        !isValidLength
      ) {
        return false;
      }
      return true;
    }

    static validateSignUpData(data) {
      // валидация введенных данных при регистрации
      const { username, email, password } = data;

      if (
        !username ||
        typeof username !== "string" ||
        username.trim().length === 0
      ) {
        return { isValid: false, error: "Неверное имя пользователя" };
      }

      if (
        !email ||
        typeof email !== "string" ||
        email.trim().length === 0 ||
        !this.validateEmail(email)
      ) {
        return { isValid: false, error: "Неверный адрес электронной почты" };
      }

      if (
        !password ||
        typeof password !== "string" ||
        password.trim().length === 0 ||
        !this.validatePassword(password)
      ) {
        return {
          isValid: false,
          error: "Пароль не соответствует критериям валидации",
        };
      }

      return { isValid: true, error: null };
    }

    static validateSignInData(data) {
      // валидация введенных данных если пользователь уже зарегистрирован
      const { email, password } = data;

      if (!email || typeof email !== "string" || email.trim().length === 0) {
        return { isValid: false, error: "Неверный адрес электронной почты" };
      }

      if (
        !password ||
        typeof password !== "string" ||
        password.trim().length === 0
      ) {
        return {
          isValid: false,
          error: "Пароль не соответствует критериям валидации",
        };
      }

      return { isValid: true, error: null };
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
