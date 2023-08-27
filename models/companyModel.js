const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Company must have a name!"],
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Must be a description!"],
    trim: true,
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  trucks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Truck" }],
  administrators: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  ],
  deliveries: [
    {
      deliveryId: {
        type: String, // Используем тип String для уникальных идентификаторов
        required: true,
        unique: true,
        default: uuidv4(),
      },
      trucks: {
        type: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Truck",
          },
        ],
        validate: {
          validator: function (trucks) {
            return trucks.length > 0;
          },
          message: "At least one truck must be added.",
        },
      },
      cargos: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Cargo",
        },
      ],
      startDate: {
        type: Date,
      },
      endDate: {
        type: Date,
      },
      loadingFromDate: {
        type: Date,
        required: [true, "Please, select date to load cargo"],
      },
      loadingToDate: {
        type: Date,
      },
      departureLocation: {
        type: [String],
        required: true,
        validate: {
          validator: (value) => value.length > 0,
          message: "At least one pick-up location must be specified",
        },
      },
      destination: {
        type: [String],
        required: true,
        validate: {
          validator: (value) => value.length > 0,
          message: "At least one drop-off location must be specified",
        },
      },
      requireHumanitarian: {
        type: Boolean,
      },
      creatingDate: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
});

const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;
