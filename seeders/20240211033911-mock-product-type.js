"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("product_types", [
      {
        id: 1000,
        name: JSON.stringify({ ru: "", uz: "" }),
        slug: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 1,
        name: JSON.stringify({ ru: "С газом", uz: "Gazli" }),
        slug: "gaz",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: JSON.stringify({ ru: "Без газа", uz: "Gazsiz" }),
        slug: "nogaz",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("product_types", null, {});
  },
};
