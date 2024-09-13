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
        code: "02201001001280004",
        packageCode: "1626357"
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
        code: "02201002001203003",
        packageCode: "1626368"
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
        code: "02201002001203002",
        packageCode: "1626374"
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
        code: "02201001001280002",
        packageCode: "1626373"
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
        code: "02201001001280005",
        packageCode: "1627446"
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
        code: "02201002001203004",
        packageCode: "1626369"
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
        code: "02201001001280003",
        packageCode: "1626370"
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
        code: "02201001001280007",
        packageCode: "1633849"
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
        code: "02201002001203007",
        packageCode: "1633850"
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
        code: "02201001001280006",
        packageCode: "1627649"
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
        code: "02201002001203005",
        packageCode: "1627646"
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
        code: "02201001001280001",
        packageCode: "1626372"
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
        code: "02201002001203001",
        packageCode: "1626371"
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("products", null, {});
  },
};
