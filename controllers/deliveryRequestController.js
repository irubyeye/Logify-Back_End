const deliveryRequest = require("../models/deliveryRequestModel");

exports.createRequest = async (req, res) => {
  try {
    const newRequest = await deliveryRequest.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        request: newRequest,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail!",
      message: err,
      details: err.message,
    });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await deliveryRequest.find();

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
    const request = await deliveryRequest.findById(req.params.id);

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

exports.updateDeliveryRequest = async (req, res) => {
  try {
    const request = await deliveryRequest.findByIdAndUpdate(
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

exports.deleteDeliveryRequest = async (req, res) => {
  try {
    const request = await Cargo.findByIdAndDelete(req.params.id);

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

exports.companyRequests = async (req, res) => {
  try {
    const companyId = req.user.userId;
    const companyRequests = await deliveryRequest.find({ company: companyId });

    res.status(200).json({
      status: "success",
      results: companyRequests.length,
      data: {
        companyRequests,
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
