const { Sales } = require("./salesModel");
const { AddStock } = require("../stock/stockModel");
const { InventoryLog } = require("../office/officeModel");
const { isValidObjectId } = require("../utils/validObjectId");

// get all sales
const getAllSales = async (req, res) => {
  res.json(res.paginatedResults);
};

// get all sales info for returns
const returnGetSalesInfo = async (req, res) => {
  const customerName = req.query.customerName;
  const invoiceNo = +req.query.invoiceNo;

  try {
    const sales = await Sales.findOne({ customerName, invoiceNo });

    if (!sales) {
      return res.status(400).json({ message: "Couldn't find invoice details" });
    }

    res.status(200).json({ sales, message: "Found invoice details" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get a single sale record
const singleSaleRecord = async (req, res) => {
  const { id } = req.params;

  try {
    // check if productId is valid
    const isValidProductId = isValidObjectId(id);

    if (!isValidProductId) {
      throw new Error("Product Id is not valid!");
    }

    const singleSale = await Sales.findById(id);

    res.status(200).json(singleSale);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// post sales with payload
const postSales = async (req, res) => {
  let status = "";
  const {
    customerName,
    invoiceNo,
    salesItems,
    totalAmount,
    salesMode,
    cashPaid,
    transfer,
    balance,
  } = req.body;

  try {
    // update status to track debts
    if (balance > 0) {
      status = "pending";
    } else {
      status = "completed";
    }

    // create new document to sales collection
    const sales = await Sales.create({
      customerName,
      invoiceNo,
      salesItems,
      totalAmount,
      salesMode,
      cashPaid,
      transfer,
      balance,
      debtStatus: status,
      returnStatus: false,
    });

    // update stock collection
    // loop through sales items
    salesItems.forEach(async (item) => {
      // for each item, find corresponding document
      const stock = await AddStock.findOne({ productName: item.productName });

      // update document with payload
      stock.quantity = stock.quantity - item.quantity;

      // save updated document
      stock.save();

      // update inventoryLog
      const inventoryLogs = await InventoryLog.find({
        product: stock._id,
      }).lean();

      if (inventoryLogs.length >= 1) {
        const lastInventoryLog = inventoryLogs[inventoryLogs.length - 1];
        let newBalance = +lastInventoryLog.balance - item.quantity;

        await InventoryLog.create({
          product: stock._id,
          description: "Sales",
          invoiceNo: +invoiceNo,
          quantity: +item.quantity,
          balanceQty: +newBalance,
        });
      }
    });

    res.status(200).json({ message: "Successfully made a sale" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateSalesInfo = async (req, res) => {
  const customerName = req.query.customerName;
  const invoiceNo = +req.query.invoiceNo;
  const { productName, returnQty } = req.body;

  try {
    // update sales details
    const query = {
      customerName,
      invoiceNo,
      "salesItems.productName": productName,
    };
    const updateDocument = {
      // find the first matching array element and set required field
      $set: { returnStatus: true, "salesItems.$.returnQty": +returnQty },
    };
    const sales = await Sales.updateOne(query, updateDocument);

    // update stock collection with payload
    const stock = await AddStock.findOne({ productName });
    stock.quantity = stock.quantity + +returnQty;
    // await stock.save();

    // create a new document in inventory log
    const inventoryLogs = await InventoryLog.find({
      product: stock._id,
    }).lean();

    if (inventoryLogs.length >= 1) {
      const lastInventoryLog = inventoryLogs[inventoryLogs.length - 1];
      let newBalance = +lastInventoryLog.balanceQty + +returnQty;
      await InventoryLog.create({
        product: stock._id,
        description: "Return",
        invoiceNo,
        quantity: +returnQty,
        balanceQty: newBalance,
      });
    }

    res.status(200).json({ message: "Return Successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const salesEvaluation = async (req, res) => {
  try {
    const sales = await Sales.aggregate([
      { $match: { customerName: "Chibest Ventures" } },
      {
        $group: {
          _id: null,
            totalAmount: { $sum: "$totalAmount" },
            cashPaid: { $sum: "$cashPaid" },
            transfer: { $sum: "$transfer" },
            balance: { $sum: "$balance" },
          
        },
      },
    ]);
    
    res.status(200).json(sales);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postSales,
  returnGetSalesInfo,
  updateSalesInfo,
  getAllSales,
  singleSaleRecord,
  salesEvaluation,
};
