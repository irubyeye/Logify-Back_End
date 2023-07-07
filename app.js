const express = require("express");
const morgan = require("morgan");

const userRouter = require("./routes/userRoute");
const cargoRouter = require("./routes/cargoRoute");
const companyRouter = require("./routes/companyRoute");
const truckRouter = require("./routes/truckRoute");
const cargoRequestRouter = require("./routes/cargoRequestRoute");
const deliveryRequestRouter = require("./routes/deliveryRequest");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use("/logify/v1/user", userRouter);
app.use("/logify/v1/cargos", cargoRouter);
app.use("/logify/v1/companies", companyRouter);
app.use("/logify/v1/trucks", truckRouter);
app.use("/logify/v1/cargo-request", cargoRequestRouter);
app.use("/logify/v1/delivery-request", deliveryRequestRouter);

module.exports = app;
