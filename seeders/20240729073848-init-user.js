"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("users", [
      {
        id: 1,
        name: "admin",
        email: "admin@gmail.com",
        password:
          "$2a$12$.Di3QzeWVFm3ufwqDsl1Ze9mEHipMKrZ9sk1uLoRTCPhxduLzwj4m",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
  },
};
