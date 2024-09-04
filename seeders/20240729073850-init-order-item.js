"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("order_items", [
      {
        id: 1,
        count: 1,
        orderNumber: 0,
        orderId: 1,
        productId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        count: 1,
        orderNumber: 1,
        orderId: 1,
        productId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        count: 1,
        orderNumber: 0,
        orderId: 2,
        productId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        count: 1,
        orderNumber: 1,
        orderId: 2,
        productId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        count: 1,
        orderNumber: 0,
        orderId: 3,
        productId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        count: 1,
        orderNumber: 1,
        orderId: 3,
        productId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        count: 1,
        orderNumber: 0,
        orderId: 4,
        productId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        count: 1,
        orderNumber: 1,
        orderId: 4,
        productId: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        count: 1,
        orderNumber: 0,
        orderId: 5,
        productId: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        count: 1,
        orderNumber: 1,
        orderId: 5,
        productId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("order_items", null, {});
  },
};
