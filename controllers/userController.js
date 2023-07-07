const User = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  try {
    //console.log(req.user);

    if (req.user.role === "admin") {
      const users = await User.find();

      res.status(200).json({
        status: "success",
        results: users.length,
        data: {
          users,
        },
      });
    } else {
      res.status(403).json({ error: "Access Denied" });
    }
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error,
      details: error.message,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        user,
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

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        user,
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

exports.deleteUser = async (req, res) => {
  if (req.user.role === "admin") {
    try {
      const user = await User.findByIdAndDelete(req.params.id);

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
  } else {
    res.status(403).json({ error: "Access Denied" });
  }
};
