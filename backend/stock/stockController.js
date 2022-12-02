const { AddStock, NewCategory } = require("./stockModel");
const { InventoryLog, InvoiceListing } = require('../office/officeModel');
const { isValidObjectId } = require("../utils/validObjectId");

// get stocks table
const displayStockTable = async (req, res) => {
  const stocks = await AddStock.find({});

  res.status(200).json(stocks);
};

const getSingleProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const singleProduct = await AddStock.findOne({ productName: id })
    
    res.status(200).json(singleProduct)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}

// post added stocks
const addToStock = async (req, res) => {
  const { productName, category, quantity, unitPrice, invoiceNo } = req.body;
  const { path, filename } = req.file;

  // add document to database
  try {
    // add to stock collection
    const stock = await AddStock.create({
      productName: productName.replace(/^./, productName[0].toUpperCase()),
      category,
      quantity: +quantity,
      unitPrice: +unitPrice,
      invoiceNo: +invoiceNo,
      image: {
        path,
        filename,
      },
    });

    // check if the invoice number does not exist and save to the db
    const checkInvoiceNo = await InvoiceListing.find({ invoiceNo: invoiceNo });
    if (checkInvoiceNo.length < 1) {
      await InvoiceListing.create({ invoiceNo });
    }

    // create an inventory log
    await InventoryLog.create({
      product: stock._id,
      invoiceNo: +invoiceNo,
      description: "Stock",
      quantity: +quantity,
      amount: +quantity * stock.unitPrice,
      balanceQty: +quantity,
    });

    res.status(200).json({ stock, message: "Product Added Successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

// /stocks/:productId/update
const updateStock = async (req, res) => {
  const {
    productName,
    category,
    quantity,
    unitPrice,
    invoiceNo,
    stockActionType,
  } = req.body;
  const { id } = req.params;

  // stockActionType = ['add', 'remove'];

  try {
    // check if productId is valid
    const isValidProductId = isValidObjectId(id);

    if (!isValidProductId) {
      throw new Error("Product Id is not valid!");
    }

    // find product
    const product = await AddStock.findById(id);

    // return error 404 if product not found
    if (!product) {
      return res
        .status(404)
        .json({ message: "No product was found for this Id!" });
    }

    // update product with payload
    if (productName) product.productName = productName;
    if (category) product.category = category;
    if (quantity)
      product.quantity =
        stockActionType === "add"
          ? product.quantity + +quantity
          : stockActionType === "remove"
          ? product.quantity - +quantity
          : quantity;
    if (unitPrice) product.unitPrice = +unitPrice;
    // if (invoiceNo) product.invoiceNo = invoiceNo;

    await product.save();

    // update invoice listing
    if (invoiceNo) {
      const existingInvoiceNo = await InvoiceListing.findOne({ invoiceNo })
        .sort({ _id: -1 })
        .limit(1);

      if (!existingInvoiceNo) {
        await InvoiceListing.create({ invoiceNo });
      }
    }

    // update inventorylog
    /**
     * 1. find all inventorylogs by productId
     * 2. get last inventorylog in array
     * 3. update inventorylog balance = inventorylogs[inventorylogs.length - 1].balance
     * 4. create new inventorylog with balance = previous balance with condition applied based on stockActionType
     */
    const inventoryLogs = await InventoryLog.find({
      product: product._id,
    }).lean();
    

    if (inventoryLogs.length >= 1) {
      const lastInventoryLog = inventoryLogs[inventoryLogs.length - 1];
      let newBalance = 0;

      switch (stockActionType) {
        case "add":
          newBalance = +lastInventoryLog.balanceQty + +quantity;
          break;

        case "remove":
          newBalance = +lastInventoryLog.balanceQty - +quantity;
          break;
      }

      await InventoryLog.create({
        product: product._id,
        description: 'Stock',
        invoiceNo: +invoiceNo,
        // amount: +quantity * product.unitPrice,
        quantity: +quantity,
        balanceQty: +newBalance,
        
      });
    }

    res
      .status(200)
      .json({ status: "success", message: "Product successfully updated!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all categories
const getAllCategory = async (req, res) => {
  const categories = await NewCategory.find({});

  res.status(200).json(categories);
};

// post new category
const addNewCategory = async (req, res) => {
  const { category } = req.body;
  try {
    const newCategory = await NewCategory.create({ name: category });
    res.status(200).json({ newCategory, message: "New Category Added" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  addToStock,
  displayStockTable,
  getSingleProduct,
  getAllCategory,
  addNewCategory,
  updateStock
};
