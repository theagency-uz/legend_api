const express = require("express");
const { body, check } = require("express-validator");

const router = express.Router();

const transactionController = require("../controllers/transaction.controller");

router.get("/payme", transactionController.payme);

module.exports = router;
