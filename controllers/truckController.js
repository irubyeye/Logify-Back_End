const Truck = require("../models/truckModel");
const APIFeatures = require("../utils/apiFeatures");

exports.createTruck = async (req, res) => {
  try {
    const newTruck = await Truck.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        truck: newTruck,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail!",
      message: err,
      details: err.message,
    });
  }
};

exports.getAllTrucks = async (req, res) => {
  try {
    const forCount = await Truck.find();

    const features = new APIFeatures(Truck.find(), req.query)
      .filter()
      .sort()
      .paginate()
      .limitFields();

    const trucks = await features.query;

    res.status(200).json({
      status: "success",
      totalResults: forCount.length,
      results: trucks.length,
      trucks,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error,
      details: error.message,
    });
  }
};

exports.getTruckById = async (req, res) => {
  try {
    const truck = await Truck.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        truck,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
      details: error.message,
    });
  }
};

exports.updateTruck = async (req, res) => {
  try {
    const truck = await Truck.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        truck,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
      details: error.message,
    });
  }
};

exports.deleteTruck = async (req, res) => {
  try {
    const truck = await Truck.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
      details: error.message,
    });
  }
};
