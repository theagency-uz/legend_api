const express = require("express");
const { body, check } = require("express-validator");

const router = express.Router();

const transactionController = require("../controllers/transaction.controller");

const { paymeCheckToken } = require("../middleware/payme-checkToken");

router.post("/payme", paymeCheckToken, (req, res, next) =>
  transactionController.payme(req, res, next)
);

router.post("/click/prepare", transactionController.clickPrepare);
router.post("/click/complete", transactionController.clickComplete);

module.exports = router;
