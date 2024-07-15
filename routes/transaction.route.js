const express = require("express");
const { body, check } = require("express-validator");

const router = express.Router();

const transactionController = require("../controllers/transaction.controller");

router.post("/payme", transactionController.payme);

router.post("/click/prepare", transactionController.clickPrepare);
router.post("/click/complete", transactionController.clickComplete);

module.exports = router;
