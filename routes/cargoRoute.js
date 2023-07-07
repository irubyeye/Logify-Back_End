const express = require("express");
const router = express.Router();

const verifyToken = require("../auth/verifyToken");
const cargoController = require("../controllers/cargoController");

router.route("/placecargo").post(cargoController.createCargo);
router.route("/mycargos").get(verifyToken, cargoController.userCargos);
router.route("/").get(cargoController.getAllCargos);
router
  .route("/:id")
  .get(cargoController.getCargoById)
  .patch(cargoController.updateCargo)
  .delete(cargoController.deleteCargo);

module.exports = router;
