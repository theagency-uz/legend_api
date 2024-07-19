"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("products", [
      {
        id: 1,
        name: JSON.stringify({
          ru: "Вода в кулере 19 л",
          uz: "Вода в кулере 19 л",
        }),
        slug: "19-litrov",
        previewImage: "/uploads/images/products/19-litrov-1.png",
        images: JSON.stringify(["/uploads/images/products/19-litrov-1.png"]),
        price: 20000,
        isHidden: false,
        itemsPerBlock: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        productVariationId: 5,
        productCategoryId: 1000,
        productTypeId: 1000,
      },
      {
        id: 2,
        name: JSON.stringify({
          ru: "Вода в стеклянной бутылке газированная 0.33 л",
          uz: "Вода в стеклянной бутылке газированная 0.33 л",
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
        itemsPerBlock: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
        productCategoryId: 1,
        productTypeId: 1,
        productVariationId: 1,
      },
      {
        id: 3,
        name: JSON.stringify({
          ru: "Вода в стеклянной бутылке газированная 0.5 л",
          uz: "Вода в стеклянной бутылке газированная 0.5 л",
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
        itemsPerBlock: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
        productCategoryId: 1,
        productTypeId: 1,
        productVariationId: 2,
      },
      {
        id: 4,
        name: JSON.stringify({
          ru: "Вода в стеклянной бутылке 0.33 л",
          uz: "Вода в стеклянной бутылке 0.33 л",
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
        itemsPerBlock: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
        productCategoryId: 1,
        productTypeId: 2,
        productVariationId: 1,
      },
      {
        id: 5,
        name: JSON.stringify({
          ru: "Вода в стеклянной бутылке 0.5 л",
          uz: "Вода в стеклянной бутылке 0.5 л",
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
        itemsPerBlock: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
        productCategoryId: 1,
        productTypeId: 2,
        productVariationId: 2,
      },
      {
        id: 6,
        name: JSON.stringify({
          ru: "Вода в пластиковой бутылке газированная 0.33 л",
          uz: "Вода в пластиковой бутылке газированная 0.33 л",
        }),
        slug: "voda-v-plastikovoj-butylke-gazirovannaya-033",
        previewImage:
          "/uploads/images/products/voda-v-plastikovoj-butylke-gazirovannaya-033-1.png",
        images: JSON.stringify([
          "/uploads/images/products/voda-v-plastikovoj-butylke-gazirovannaya-033-1.png",
          "/uploads/images/products/voda-v-plastikovoj-butylke-gazirovannaya-033-2.png",
        ]),
        price: 17520,
        isHidden: false,
        itemsPerBlock: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
        productCategoryId: 2,
        productTypeId: 1,
        productVariationId: 1,
      },
      {
        id: 7,
        name: JSON.stringify({
          ru: "Вода в пластиковой бутылке 0.33 л",
          uz: "Вода в пластиковой бутылке 0.33 л",
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
        itemsPerBlock: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
        productCategoryId: 2,
        productTypeId: 2,
        productVariationId: 1,
      },
      {
        id: 8,
        name: JSON.stringify({
          ru: "Вода в пластиковой бутылке 1 л",
          uz: "Вода в пластиковой бутылке 1 л",
        }),
        slug: "voda-v-plastikovoj-butylke-1",
        previewImage:
          "/uploads/images/products/voda-v-plastikovoj-butylke-1-1.png",
        images: JSON.stringify([
          "/uploads/images/products/voda-v-plastikovoj-butylke-1-1.png",
          "/uploads/images/products/voda-v-plastikovoj-butylke-1-2.png",
        ]),
        price: 18800,
        isHidden: false,
        itemsPerBlock: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
        productCategoryId: 2,
        productTypeId: 2,
        productVariationId: 3,
      },
      {
        id: 9,
        name: JSON.stringify({
          ru: "Вода в пластиковой бутылке газированная 1 л",
          uz: "Вода в пластиковой бутылке газированная 1 л",
        }),
        slug: "voda-v-plastikovoj-butylke-gazirovannaya-1",
        previewImage:
          "/uploads/images/products/voda-v-plastikovoj-butylke-gazirovannaya-1-1.png",
        images: JSON.stringify([
          "/uploads/images/products/voda-v-plastikovoj-butylke-gazirovannaya-1-1.png",
          "/uploads/images/products/voda-v-plastikovoj-butylke-gazirovannaya-1-2.png",
        ]),
        price: 18800,
        isHidden: false,
        itemsPerBlock: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
        productCategoryId: 2,
        productTypeId: 1,
        productVariationId: 3,
      },
      {
        id: 10,
        name: JSON.stringify({
          ru: "Вода в пластиковой бутылке 1.5 л",
          uz: "Вода в пластиковой бутылке 1.5 л",
        }),
        slug: "voda-v-plastikovoj-butylke-15",
        previewImage:
          "/uploads/images/products/voda-v-plastikovoj-butylke-15-1.png",
        images: JSON.stringify([
          "/uploads/images/products/voda-v-plastikovoj-butylke-15-1.png",
          "/uploads/images/products/voda-v-plastikovoj-butylke-15-2.png",
        ]),
        price: 16800,
        isHidden: false,
        itemsPerBlock: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
        productCategoryId: 2,
        productTypeId: 2,
        productVariationId: 4,
      },
      {
        id: 11,
        name: JSON.stringify({
          ru: "Вода в пластиковой бутылке газированная 1.5 л",
          uz: "Вода в пластиковой бутылке газированная 1.5 л",
        }),
        slug: "voda-v-plastikovoj-butylke-gazirovannaya-15",
        previewImage:
          "/uploads/images/products/voda-v-plastikovoj-butylke-gazirovannaya-15-1.png",
        images: JSON.stringify([
          "/uploads/images/products/voda-v-plastikovoj-butylke-gazirovannaya-15-1.png",
          "/uploads/images/products/voda-v-plastikovoj-butylke-gazirovannaya-15-2.png",
        ]),
        price: 16800,
        isHidden: false,
        itemsPerBlock: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
        productCategoryId: 2,
        productTypeId: 1,
        productVariationId: 4,
      },
      {
        id: 12,
        name: JSON.stringify({
          ru: "Вода в пластиковой бутылке 0.5 л",
          uz: "Вода в пластиковой бутылке 0.5 л",
        }),
        slug: "voda-v-plastikovoj-butylke-05",
        previewImage:
          "/uploads/images/products/voda-v-plastikovoj-butylke-05-1.png",
        images: JSON.stringify([
          "/uploads/images/products/voda-v-plastikovoj-butylke-05-1.png",
          "/uploads/images/products/voda-v-plastikovoj-butylke-05-2.png",
        ]),
        price: 19800,
        isHidden: false,
        itemsPerBlock: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
        productCategoryId: 2,
        productTypeId: 2,
        productVariationId: 2,
      },
      {
        id: 13,
        name: JSON.stringify({
          ru: "Вода в пластиковой бутылке газированная 0.5 л",
          uz: "Вода в пластиковой бутылке газированная 0.5 л",
        }),
        slug: "voda-v-plastikovoj-butylke-gazirovannaya-05",
        previewImage:
          "/uploads/images/products/voda-v-plastikovoj-butylke-gazirovannaya-05-1.png",
        images: JSON.stringify([
          "/uploads/images/products/voda-v-plastikovoj-butylke-gazirovannaya-05-1.png",
          "/uploads/images/products/voda-v-plastikovoj-butylke-gazirovannaya-05-2.png",
        ]),
        price: 19800,
        isHidden: false,
        itemsPerBlock: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
        productCategoryId: 2,
        productTypeId: 1,
        productVariationId: 2,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("products", null, {});
  },
};
