const { InventoryLog } = require("./officeModel");
const { Sales } = require("../sales/salesModel");
const { isValidObjectId } = require("../utils/validObjectId");

// Return Records
const getReturnRecords = async (req, res) => {
  try {
    const sales = await Sales.find({ returnStatus: true });
    res.status(200).json(sales);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getSingleReturnRecord = async (req, res) => {
  const { id } = req.params;
  try {
    const sales = await Sales.findOne({ invoiceNo: id, returnStatus: true });
    const returnArray = sales.salesItems.filter((item) => item.returnQty > 0);
    const results = {
      customerName: sales.customerName,
      returnAmount: sales.returnAmount,
      returnArray,
    };
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Invoice Listing
const getAllInvoice = (req, res) => {
  res.json(res.paginatedResults);
};

const getSingleInvoice = async (req, res) => {
  const { id } = req.params;

  try {
    const inventoryLog = await InventoryLog.find({ invoiceNo: +id }).populate(
      "product"
    );

    res.status(200).json(inventoryLog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// INVENTORY LOG
const getAllProducts = async (req, res) => {
  res.json(res.paginatedResults);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;

  try {
    // check if productId is valid
    const isValidProductId = isValidObjectId(id);

    if (!isValidProductId) {
      throw new Error("Product Id is not valid!");
    }

    const products = await InventoryLog.find({ product: id })
      .populate("product")
      .sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductsById,
  getAllInvoice,
  getSingleInvoice,
  getReturnRecords,
  getSingleReturnRecord,
};
