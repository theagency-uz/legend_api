"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("product_categories", [
      {
        id: 1,
        name: JSON.stringify({ ru: "Стекло", uz: "Стекло" }),
        slug: "glass",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: JSON.stringify({ ru: "Пластик", uz: "Пластик" }),
        slug: "plastic",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: JSON.stringify({ ru: "Кулер", uz: "Кулер" }),
        slug: "cooler",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("product_categories", null, {});
  },
};
