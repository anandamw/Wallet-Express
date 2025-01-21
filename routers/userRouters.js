const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

// Endpoint untuk register user
router.post("/register", UserController.register);
router.get("/", UserController.index);
router.get("/edit/:id", UserController.edit);
router.put("/update/:id", UserController.update);
router.delete("/delete/:id", UserController.delete);

module.exports = router;
