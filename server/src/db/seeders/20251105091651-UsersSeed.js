"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "John Doe",
          email: "JohnDoe@mail.com",
          password: "8746452534",
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Books",
      [
        {
          name: "Бесы",
          autor: "Федор Достоевский",
          cover: "Besiy.jpg",
          comment_of_user: "Очень захватывающая книга",
          user_id: 1,
        },
        {
          name: "Властелин колец",
          autor: "Джон Рональд Руэл Толкин",
          cover: "2.jpg",
          comment_of_user:
            "Книга о приключениях, дружбе, силе духа и важности каждой жизни",
          user_id: 1,
        },
        {
          name: "Мойдодыр",
          autor: "Корней Иванович Чуковский",
          cover: "3.jpg",
          comment_of_user:
            "Детский бестселлер о борьбе маленького мальчика с обстоятельствами и общественными устоями",
          user_id: 1,
        },
        {
          name: "Java Script с нуля",
          autor: "Кирупа Чиннатхамби",
          cover: "4.jpg",
          comment_of_user:
            "Хорошая, добрая, интуитивно понятная книга по птицеводству...",
          user_id: 1,
        },
        {
          name: "Мемы. Научный взгляд на феномен поп-культуры, захвативший мир",
          autor: "Иван Кузнецов",
          cover: "5.jpg",
          comment_of_user:
            "Мы не знаем что это такое. Если бы мы знали что это такое...",
          user_id: 1,
        },
        {
          name: "Три мушкетёра",
          autor: "Александр Дюма",
          cover: "6.jpg",
          comment_of_user:
            "Книга о том, как несколько безответственных, но хорошо фектующих военных мешали кардиналу управлять страной",
          user_id: 1,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Books", null, {});
  },
};
