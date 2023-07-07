const CargoRequest = require("../models/cargoRequestModel");

exports.createRequest = async (req, res) => {
  try {
    const newRequest = await CargoRequest.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        request: newRequest,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail!",
      message: error,
      details: error.message,
    });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await CargoRequest.find();

    res.status(200).json({
      status: "success",
      results: requests.length,
      data: {
        requests,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error,
      details: error.message,
    });
  }
};

exports.getRequestById = async (req, res) => {
  try {
    const request = await CargoRequest.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        request,
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

exports.updateCargoRequest = async (req, res) => {
  try {
    const request = await CargoRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "success",
      data: {
        request,
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

exports.deleteCargoRequest = async (req, res) => {
  try {
    const request = await CargoRequest.findByIdAndDelete(req.params.id);

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

exports.userRequests = async (req, res) => {
  try {
    const userId = req.user.userId;
    const userRequests = await CargoRequest.find({ cargoHolder: userId });

    res.status(200).json({
      status: "success",
      results: userRequests.length,
      data: {
        userRequests,
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
