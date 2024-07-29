"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("order_statuses", [
      {
        id: 1,
        name: JSON.stringify({ ru: "В обработке", uz: "В обработке" }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: JSON.stringify({ ru: "Отмена", uz: "Отмена" }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: JSON.stringify({ ru: "Ошибка", uz: "Ошибка" }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: JSON.stringify({ ru: "Завершен", uz: "Завершен" }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        name: JSON.stringify({
          ru: "Ожидается оплата",
          uz: "Ожидается оплата",
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("order_statuses", null, {});
  },
};
