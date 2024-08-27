const express = require("express");

const router = express.Router();

const userController = require("../controllers/user.controller");

router.get("/admin", userController.getUsersByQuery);

module.exports = router;
