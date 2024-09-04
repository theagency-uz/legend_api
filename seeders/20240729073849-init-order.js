"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("orders", [
      {
        id: 1,
        totalPrice: 300000,
        address: JSON.stringify({ city: "Fergana" }),
        phone: "+998916657707",
        userId: 1,
        paymentTypeId: 1,
        orderStatusId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        totalPrice: 205000,
        address: JSON.stringify({ city: "Fergana" }),
        phone: "+998916657707",
        userId: 1,
        paymentTypeId: 1,
        orderStatusId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        totalPrice: 130000,
        address: JSON.stringify({ city: "Fergana" }),
        phone: "+998916657707",
        userId: 1,
        paymentTypeId: 1,
        orderStatusId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        totalPrice: 500000,
        address: JSON.stringify({ city: "Fergana" }),
        phone: "+998916657707",
        userId: 1,
        paymentTypeId: 1,
        orderStatusId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        totalPrice: 600000,
        address: JSON.stringify({ city: "Fergana" }),
        phone: "+998916657707",
        userId: 1,
        paymentTypeId: 1,
        orderStatusId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("orders", null, {});
  },
};
