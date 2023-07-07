const mongoose = require("mongoose");

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
  administrators: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  deliveries: [
    {
      trucks: {
        type: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Truck",
          validate: {
            validator: function (trucks) {
              return trucks.length > 0;
            },
            message: "At least one truck must be added.",
          },
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
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
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
    },
  ],
});

const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;
