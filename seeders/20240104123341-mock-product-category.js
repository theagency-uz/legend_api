"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("product_categories", [
      {
        id: 1,
        name: JSON.stringify({ ru: "Стекло", uz: "Shisha" }),
        slug: "glass",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: JSON.stringify({ ru: "Пластик", uz: "Plastik" }),
        slug: "plastic",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("product_categories", null, {});
  },
};
