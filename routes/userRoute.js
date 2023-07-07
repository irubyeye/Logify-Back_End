const express = require("express");
const router = express.Router();

const authorization = require("../auth/authorization");
const userController = require("../controllers/userController");
const verifyToken = require("../auth/verifyToken");

router.route("/register").post(authorization.registration);
router.route("/login").post(authorization.login);

router.route("/").get(verifyToken, userController.getAllUsers);
router
  .route("/:id")
  .get(userController.getUserById)
  .patch(userController.updateUser)
  .delete(verifyToken, userController.deleteUser);

module.exports = router;
