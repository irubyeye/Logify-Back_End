const mongoose = require("mongoose");

const TruckSchema = new mongoose.Schema({
  vinNum: {
    type: String,
    required: [true, "Trailer must have a VIN Number"],
    unique: true,
    trim: true,
  },
  trailerType: {
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
  transportType: {
    type: String,
    enum: ["truck", "semitrailer", "double road train"],
  },
  truckPayload: {
    type: Number,
    required: [true, "Please provide a cargo weight!"],
  },
  truckSpace: {
    type: Number,
    required: [true, "Please provide a cargo volume!"],
  },
  certainTruckParams: {
    length: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
  },
});

const Truck = new mongoose.model("Truck", TruckSchema);

module.exports = Truck;
