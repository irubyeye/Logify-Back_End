const Company = require("../models/companyModel");
const APIFeatures = require("../utils/apiFeatures");

exports.createCompany = async (req, res) => {
  try {
    req.body.administrators = req.user.userId;
    const newCompany = await Company.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        company: newCompany,
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

exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();

    res.status(200).json({
      status: "success",
      results: companies.length,
      data: {
        companies,
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

exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        company,
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

exports.updateCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        company,
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

exports.deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);

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

exports.getAllDeliveriesInfo = async (req, res) => {
  try {
    const companies = await Company.find({})
      .populate({
        path: "deliveries.trucks",
        // select: "name type", // Выбираем только поля name и type из коллекции Truck
      })
      .populate("deliveries.cargos")
      .select(); // Выбираем только поле deliveries
    //{ deliveries: 1, name: 1 }

    // Создаем массив объектов с информацией о доставках из всех компаний
    const allDeliveriesInfo = companies.reduce((acc, company) => {
      const companyDeliveriesInfo = company.deliveries
        .filter((delivery) => !delivery.endDate) // Фильтруем доставки без endDate
        .map((delivery) => {
          return {
            companyId: company._id,
            deliveryId: delivery.deliveryId,
            companyName: company.name,
            creatingDate: delivery.creatingDate,
            loadingFromDate: delivery.loadingFromDate,
            loadingToDate: delivery.loadingToDate,
            departureLocation: delivery.departureLocation,
            destination: delivery.destination,
            truckInfo: delivery.trucks,
          };
        });
      return [...acc, ...companyDeliveriesInfo];
    }, []);

    res.status(200).json({ deliveries: allDeliveriesInfo });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
      details: error.message,
    });
  }
};
