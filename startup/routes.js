const path = require("path");

const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const multer = require("multer");

const productRouter = require("../routes/product.route");
const categoryRouter = require("../routes/product-category.route");
const typeRouter = require("../routes/product-type.route");
const variationRouter = require("../routes/product-variation.route");
const transactionRouter = require("../routes/transaction.route");
const authRouter = require("../routes/auth.route");
const orderRouter = require("../routes/order.route");

const imageRouter = require("../routes/image.route");

const errorMiddleware = require("../middleware/error.middleware");
const filterMiddleware = require("../middleware/filter.middleware");

module.exports = function (app) {
  if (app.get("env") === "development") {
    app.use(morgan("dev"));
  }

  const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      let imagePath;
      // imagePath = "public/uploads/images/products";
      imagePath = "public/uploads/images/woodline";

      cb(null, imagePath);
    },

    filename: (req, file, cb) => {
      cb(
        null,
        new Date().toISOString().replace(/:/g, "-").replace(/\./g, "-") +
          "_" +
          file.originalname
      );
    },
  });

  const fileFilter = (req, file, cb) => {
    const allowedMimetypes = [
      "image/png",
      "image/webp",
      "image/jpeg",
      "image/svg+xml",
    ];

    if (allowedMimetypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  const upload = multer({
    storage: fileStorage,
    fileFilter: fileFilter,
    limits: { fileSize: 15 * 1024 * 1024 },
    onError: function (err, next) {
      next();
    },
  }).fields([{ name: "images" }]);

  app.use(async (req, res, next) => {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        next(err);
      } else if (err) {
        next(err);
      }
      next();
    });
  });

  app.use(
    cors({
      //   origin: [
      //     "https://parfumgallery.uz",
      //     /\.parfumgallery\.uz$/,
      //     "http://localhost:3000",
      //     /^http:\/\/192\.168\.0\.[0-9]{3}:3000$/,
      //   ],
      origin: "*",
      allowedHeaders: "*",
      methods: "*",
      preflightContinue: true,
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.set("view engine", "ejs");
  app.set("views", "views");
  app.set("trust proxy", true);

  app.use(express.static(path.join(__dirname, "../public")));
  app.use(helmet());

  app.use("/api/auth", authRouter);
  app.use("/api/products", filterMiddleware, productRouter);
  app.use("/api/categories", categoryRouter);
  app.use("/api/types", typeRouter);
  app.use("/api/variations", variationRouter);
  app.use("/api/payments", transactionRouter);
  app.use("/api/orders", orderRouter);

  app.use("/api/filters", filterMiddleware, (req, res) => {
    res.send(req.filters);
  });

  app.use("/api/images", imageRouter);
  app.use(errorMiddleware);
};
