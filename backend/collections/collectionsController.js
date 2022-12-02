const { Sales } = require("../sales/salesModel");

const getCustomerDetails = async (req, res) => {
  const { q } = req.query;
  
  try {
    const sales = await Sales.find({ customerName: q, balance: { $gt: 0 } });
    res.status(200).json(sales);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCustomerDetails = async (req, res) => {
  const { q } = req.query;
  const { paymentMode, amount } = req.body;
  try {
    const sales = await Sales.findOne({
      customerName: q,
      balance: { $gt: 0 },
    });
    let balance = sales.balance;

    if (paymentMode === "cash") {
      sales.cashPaid = sales.cashPaid + +amount;
    }
    if (paymentMode === "transfer") {
      sales.transfer = sales.transfer + +amount;
    }

    balance = balance - +amount;

    sales.balance = balance;

    if (balance === 0) {
      sales.debtStatus = "completed";
    }

    await sales.save();

    res.status(200).json({ message: "Customer Sales Record Updated" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = { getCustomerDetails, updateCustomerDetails };
