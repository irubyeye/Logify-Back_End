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
      company,
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
      })
      .populate("deliveries.cargos")
      .select();

    const allDeliveriesInfo = companies.reduce((acc, company) => {
      const companyDeliveriesInfo = company.deliveries
        .filter((delivery) => !delivery.endDate)
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
            trucks: delivery.trucks,
          };
        });
      return [...acc, ...companyDeliveriesInfo];
    }, []);

    res.status(200).json({
      results: allDeliveriesInfo.length,
      deliveries: allDeliveriesInfo,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
      details: error.message,
    });
  }
};

exports.hasCompany = async (req, res) => {
  const userId = req.params.id;

  const company = await Company.findOne({
    administrators: userId,
  });
  if (company) {
    res.status(200).json({
      has: true,
      company: company._id,
    });
  } else {
    return res.status(200).json({
      has: false,
      status: "fail",
      message: "Company not found for the specified user",
    });
  }
};

exports.getUserDeliveries = async (req, res) => {
  try {
    const userId = req.params.id;

    const company = await Company.findOne({
      administrators: userId,
    })
      .populate({
        path: "deliveries.trucks",
        model: "Truck",
      })
      .populate({
        path: "deliveries.cargos",
        model: "Cargo",
      })
      .exec();

    if (!company) {
      return res.status(404).json({
        status: "fail",
        message: "Company not found for the specified user",
      });
    }

    const activeDeliveries = [];
    const endedDeliveries = [];

    company.deliveries.forEach((delivery) => {
      if (delivery.endDate) {
        endedDeliveries.push(delivery);
      } else {
        activeDeliveries.push(delivery);
      }
    });

    const deliveries = {
      companyName: company.name,
      companyDescription: company.description,
      activeDeliveries,
      endedDeliveries,
    };

    res.status(200).json({
      status: "success",
      deliveries,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
      details: error.message,
    });
  }
};

exports.createActiveDelivery = async (req, res) => {
  try {
    const companyId = req.params.id;
    const deliveryData = req.body;

    const activeDelivery = {
      ...deliveryData,
    };
    const company = await Company.findByIdAndUpdate(
      companyId,
      { $push: { deliveries: activeDelivery } },
      { new: true }
    );

    if (!company) {
      return res.status(404).json({
        status: "fail",
        message: "Company not found",
      });
    }

    res.status(201).json({
      status: "success",
      company,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
