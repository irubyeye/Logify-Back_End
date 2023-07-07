const express = require("express");
const router = express.Router();

const deliveryRequestController = require("../controllers/deliveryRequestController");

router.route("/my").get(deliveryRequestController.companyRequests);
router
  .route("/")
  .get(deliveryRequestController.getAllRequests)
  .post(deliveryRequestController.createRequest);
router
  .route("/:id")
  .get(deliveryRequestController.getRequestById)
  .patch(deliveryRequestController.updateDeliveryRequest)
  .delete(deliveryRequestController.deleteDeliveryRequest);

module.exports = router;
