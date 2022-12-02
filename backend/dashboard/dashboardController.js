const { AddStock } = require("../stock/stockModel");
const { Sales } = require("../sales/salesModel");
const { Customers } = require("../customer/customerModel");

const getDashboardDetails = async (req, res) => {
  try {
    const stock = await AddStock.countDocuments({
      quantity: { $gt: 0 },
    });
    const sales = await Sales.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$totalAmount" },
        },
      },
    ]);
    const customers = await Customers.countDocuments();

    const results = {
      totalProducts: stock,
      totalSales: sales[0].totalAmount,
      totalCustomers: customers,
    };

    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getBarChartDetails = async (req, res) => {
    try {
    const sales = await Sales.aggregate([
        {
            $project: {createdAt: 1, totalAmount: 1}
        }
    ])
        res.status(200).json(sales);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    
};

const getPieChartDetails = async (req, res) => {
    try {
        const stock = await AddStock.aggregate([
          {
            $group: { _id: "$category", count: { $sum: 1 } },
          },
          
        ]);
        res.status(200).json(stock);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
  getDashboardDetails,
  getBarChartDetails,
  getPieChartDetails,
};
