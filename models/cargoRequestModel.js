const mongoose = require("mongoose");

const CargoRequestSchema = new mongoose.Schema({
  cargoHolder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Cargo Holder must be specified"],
  },
  cargo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cargo",
    required: [true, "Cargo must be selected"],
  },
  truckId: { type: mongoose.Schema.Types.ObjectId, ref: "Truck" },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
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

const CargoRequest = mongoose.model("CargoRequest", CargoRequestSchema);

module.exports = CargoRequest;
