const mongoose = require("mongoose");

const DeliveryRequestSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  truck: { type: mongoose.Schema.Types.ObjectId, ref: "Truck" },
  cargoHolder: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  cargo: { type: mongoose.Schema.Types.ObjectId, ref: "Cargo" },
  requestStatus: {
    type: String,
    enum: [
      "Under consideration",
      "Accepted",
      "Declined",
      "Waiting for loading",
    ],
    default: "Under consideration",
  },
  requestData: {
    type: Date,
    default: Date.now(),
  },
});

const DeliveryRequest = mongoose.model(
  "DeliveryRequest",
  DeliveryRequestSchema
);

module.exports = DeliveryRequest;
