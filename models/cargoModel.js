const mongoose = require("mongoose");

const CargoSchema = new mongoose.Schema({
  cargoHolder: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  loadingFromDate: {
    type: Date,
    required: [true, "Please, select date to load cargo"],
  },
  loadingToDate: {
    type: Date,
  },
  pickUpLocation: {
    type: [String],
    required: true,
    validate: {
      validator: (value) => value.length > 0,
      message: "At least one pick-up location must be specified",
    },
  },
  dropOffLocation: {
    type: [String],
    required: true,
    validate: {
      validator: (value) => value.length > 0,
      message: "At least one drop-off location must be specified",
    },
  },
  cargoType: {
    type: String,
    required: [true, "Please provide a cargo type!"],
  },
  cargoWeight: {
    type: Number,
    required: [true, "Please provide a cargo weight!"],
  },
  cargoVolume: {
    type: Number,
    required: [true, "Please provide a cargo volume!"],
  },
  transportType: {
    type: String,
    enum: [
      "Flatbed Trailer",
      "Refrigerated Trailer",
      "Dry Van Trailer",
      "Tanker Trailer",
      "Lowboy Trailer",
      "Dump Trailer",
      "Livestock Trailer",
      "Car Carrier Trailer",
      "Container Trailer",
      "Open-Top Trailer",
      "Curtain-Side Trailer",
      "Intermodal Trailer",
      "Logging Trailer",
      "Beverage Trailer",
      "Utility Trailer",
    ],
    required: [true, "Please choose the transport type"],
  },
  certainCargoParams: {
    length: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
  },
  isHumanitarian: {
    type: Boolean,
    default: false,
  },
  supposedPrice: {
    type: [String],
  },
  paymentDetails: {
    type: [String],
  },
  cargoStatus: {
    type: String,
    enum: ["Created", "Waiting for loading", "En route", "Delivered"],
    default: "Created",
  },
  creatingDate: {
    type: Date,
    default: Date.now(),
  },
  deliveredDate: {
    type: Date,
  },
});

const Cargo = mongoose.model("Cargo", CargoSchema);

module.exports = Cargo;
