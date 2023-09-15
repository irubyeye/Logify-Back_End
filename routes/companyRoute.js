const express = require("express");
const router = express.Router();

const verifyToken = require("../auth/verifyToken");
const companyController = require("../controllers/companyController");

router.route("/active-deliveries").get(companyController.getAllDeliveriesInfo);
router.route("/my-deliveries/:id").get(companyController.getUserDeliveries);
router.route("/has-company/:id").get(companyController.hasCompany);
router
  .route("/create-delivery/:id")
  .post(companyController.createActiveDelivery);

router
  .route("/")
  .get(companyController.getAllCompanies)
  .post(verifyToken, companyController.createCompany);
router
  .route("/:id")
  .get(companyController.getCompanyById)
  .patch(companyController.updateCompany)
  .delete(companyController.deleteCompany);

module.exports = router;
