const express = require("express");
const router = express.Router();

const truckController = require("../controllers/truckController");

router.route("/placetransport").post(truckController.createTruck);
router.route("/").get(truckController.getAllTrucks);
router
  .route("/:id")
  .get(truckController.getTruckById)
  .patch(truckController.updateTruck)
  .delete(truckController.deleteTruck);

module.exports = router;
