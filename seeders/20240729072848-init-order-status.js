"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("order_statuses", [
      {
        id: 1,
        name: JSON.stringify({
          en: "In process",
          ru: "В процессе",
          uz: "Jarayonda",
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: JSON.stringify({
          en: "Waiting for payment",
          ru: "Ожидается оплата",
          uz: "To'lov kutilmoqda",
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: JSON.stringify({ en: "Paid", ru: "Оплачен", uz: "To'landi" }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: JSON.stringify({ en: "Sent", ru: "Отправлен", uz: "Yuborildi" }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        name: JSON.stringify({
          en: "Completed",
          ru: "Завершён",
          uz: " Yakunlandi",
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        name: JSON.stringify({
          en: "Canceled",
          ru: "Отменён",
          uz: "Bekor qilingan",
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
