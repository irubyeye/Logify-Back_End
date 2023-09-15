const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const AdminBroExpress = require("@admin-bro/express");
const { default: AdminBro } = require("admin-bro");
const app = require("./app");

const User = require("./models/userModel");
const Cargo = require("./models/cargoModel");
const Company = require("./models/companyModel");
const Truck = require("./models/truckModel");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

const AdminBroMongoose = require("@admin-bro/mongoose");
AdminBro.registerAdapter(AdminBroMongoose);

const run = async () => {
  try {
    const mongooseDb = await mongoose.connect(DB, {
      useNewUrlParser: true,
    });

    const AdminBroOptions = {
      resources: [User, Cargo, Company, Truck],
    };
    const admin = new AdminBro(AdminBroOptions);

    const adminRouter = AdminBroExpress.buildRouter(admin); 

    app.use(admin.options.rootPath, adminRouter);

    console.log("DB connection is successful");
  } catch (error) {
    console.log(error);
  }
};

run();

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`We are waiting for the summer... At http://localhost:${port}`);
});
