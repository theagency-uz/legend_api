"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("product_variations", [
      {
        id: 1,
        value: 0.33,
        slug: "0.33",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        value: 0.5,
        slug: "0.5",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        value: 1,
        slug: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        value: 1.5,
        slug: "1.5",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        value: 19,
        slug: "19",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("product_variations", null, {});
  },
};
