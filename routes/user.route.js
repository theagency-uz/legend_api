const express = require("express");

const router = express.Router();

const userController = require("../controllers/user.controller");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/admin", [auth, admin], userController.getUsersByQuery);

module.exports = router;
