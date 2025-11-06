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
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Books", null, {});
  },
};
