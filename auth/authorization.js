const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
exports.registration = async (req, res) => {
  try {
    const {
      name,
      surname,
      country,
      city,
      phone,
      email,
      login,
      password,
      role,
    } = req.body;

    if (!(email && password && name && surname)) {
      res.status(400).send("All input is required");
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exists. Please Login");
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await User.create({
        name,
        surname,
        country,
        city,
        phone,
        login,
        role,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
      });
      const token = jwt.sign(
        { userId: user._id, userRole: user.role },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2d",
        }
      );
      user.token = token;

      res.status(201).json(user);
    } catch (error) {
      if (error.code === 11000) {
        res.status(409).send("User already exists. Please log in");
      } else {
        res.status(500).json({
          status: "fail",
          message: error,
          details: error.message,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2d",
        }
      );

      res.header("Authorization", `Bearer ${token}`).json({
        token,
        userId: user._id,
      });
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    console.log(err);
  }
};
