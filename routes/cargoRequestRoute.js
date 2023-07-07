const express = require("express");
const router = express.Router();

const cargoRequestController = require("../controllers/cargoRequestController");

router.route("/my").get(cargoRequestController.userRequests);
router
  .route("/")
  .get(cargoRequestController.getAllRequests)
  .post(cargoRequestController.createRequest);
router
  .route("/:id")
  .get(cargoRequestController.getRequestById)
  .patch(cargoRequestController.updateCargoRequest)
  .delete(cargoRequestController.deleteCargoRequest);

module.exports = router;
