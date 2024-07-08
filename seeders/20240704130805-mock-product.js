"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("products", [
      {
        id: 1,
        name: JSON.stringify({ ru: "19 литров", uz: "19 литров" }),
        slug: "19-litrov",
        previewImage: "/uploads/images/products/19-litrov-1.png",
        images: JSON.stringify(["/uploads/images/products/19-litrov-1.png"]),
        price: 20000,
        isHidden: false,
        volume: 19,
        itemsPerBlock: 1,
        isGaz: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        productCategoryId: 3,
      },
      {
        id: 2,
        name: JSON.stringify({
          ru: "Стекло 0,33 - газ",
          uz: "Стекло 0,33 - газ",
        }),
        slug: "voda-v-steklyannoj-butylke-gazirovannaya-033",
        previewImage:
          "/uploads/images/products/voda-v-steklyannoj-butylke-gazirovannaya-033-1.png",
        images: JSON.stringify([
          "/uploads/images/products/voda-v-steklyannoj-butylke-gazirovannaya-033-1.png",
          "/uploads/images/products/voda-v-steklyannoj-butylke-gazirovannaya-033-2.png",
        ]),
        price: 62400,
        isHidden: false,
        volume: 0.33,
        itemsPerBlock: 12,
        isGaz: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        productCategoryId: 1,
      },
      {
        id: 3,
        name: JSON.stringify({
          ru: "Стекло 0,5 - газ",
          uz: "Стекло 0,5 - газ",
        }),
        slug: "voda-v-steklyannoj-butylke-gazirovannaya-05",
        previewImage:
          "/uploads/images/products/voda-v-steklyannoj-butylke-gazirovannaya-05-1.png",
        images: JSON.stringify([
          "/uploads/images/products/voda-v-steklyannoj-butylke-gazirovannaya-05-1.png",
          "/uploads/images/products/voda-v-steklyannoj-butylke-gazirovannaya-05-2.png",
        ]),
        price: 75600,
        isHidden: false,
        volume: 0.5,
        itemsPerBlock: 12,
        isGaz: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        productCategoryId: 1,
      },
      {
        id: 4,
        name: JSON.stringify({
          ru: "Стекло 0,33 - без газа",
          uz: "Стекло 0,33 - без газа",
        }),
        slug: "voda-v-steklyannoj-butylke-033",
        previewImage:
          "/uploads/images/products/voda-v-steklyannoj-butylke-033-1.png",
        images: JSON.stringify([
          "/uploads/images/products/voda-v-steklyannoj-butylke-033-1.png",
          "/uploads/images/products/voda-v-steklyannoj-butylke-033-2.png",
        ]),
        price: 62400,
        isHidden: false,
        volume: 0.33,
        itemsPerBlock: 12,
        isGaz: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        productCategoryId: 1,
      },
      {
        id: 5,
        name: JSON.stringify({
          ru: "Стекло 0,5 - без газа",
          uz: "Стекло 0,5 - без газа",
        }),
        slug: "voda-v-steklyannoj-butylke-05",
        previewImage:
          "/uploads/images/products/voda-v-steklyannoj-butylke-05-1.png",
        images: JSON.stringify([
          "/uploads/images/products/voda-v-steklyannoj-butylke-05-1.png",
          "/uploads/images/products/voda-v-steklyannoj-butylke-05-2.png",
        ]),
        price: 75600,
        isHidden: false,
        volume: 0.5,
        itemsPerBlock: 12,
        isGaz: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        productCategoryId: 1,
      },
      {
        id: 6,
        name: JSON.stringify({ ru: "ПЭТ 0,33 - газ", uz: "ПЭТ 0,33 - газ" }),
        slug: "voda-v-plastikovoj-butylke-gazirovannaya-033",
        previewImage:
          "/uploads/images/products/voda-v-plastikovoj-butylke-gazirovannaya-033-1.png",
        images: JSON.stringify([
          "/uploads/images/products/voda-v-plastikovoj-butylke-gazirovannaya-033-1.png",
        ]),
        price: 17520,
        isHidden: false,
        volume: 0.33,
        itemsPerBlock: 12,
        isGaz: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        productCategoryId: 2,
      },
      {
        id: 7,
        name: JSON.stringify({
          ru: "ПЭТ 0,33 - без газа",
          uz: "ПЭТ 0,33 - без газа",
        }),
        slug: "voda-v-plastikovoj-butylke-033",
        previewImage:
          "/uploads/images/products/voda-v-plastikovoj-butylke-033-1.png",
        images: JSON.stringify([
          "/uploads/images/products/voda-v-plastikovoj-butylke-033-1.png",
          "/uploads/images/products/voda-v-plastikovoj-butylke-033-2.png",
        ]),
        price: 17520,
        isHidden: false,
        volume: 0.33,
        itemsPerBlock: 12,
        isGaz: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        productCategoryId: 2,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("products", null, {});
  },
};
