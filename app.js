const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

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
app.use(morgan("dev"));

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,POST,PATCH,PUT,DELETE",
  //optionsSuccessStatus: 204,
};

const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");

const adminBro = new AdminBro({
  databases: [],
  rootPath: "/logify/v1/admin",
});

const router = AdminBroExpress.buildRouter(adminBro);

app.use(adminBro.options.rootPath, router);

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use(adminBro.options.rootPath, router);

app.use("/logify/v1/user", userRouter);
app.use("/logify/v1/cargos", cargoRouter);
app.use("/logify/v1/companies", companyRouter);
app.use("/logify/v1/trucks", truckRouter);
app.use("/logify/v1/cargo-request", cargoRequestRouter);
app.use("/logify/v1/delivery-request", deliveryRequestRouter);

module.exports = app;
