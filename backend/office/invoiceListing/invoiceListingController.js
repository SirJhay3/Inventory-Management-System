const InventoryLog = require("../inventoryLog/inventoryLogModel");

const getAllInvoice = (req, res) => {
  res.json(res.paginatedResults);
};

const getSingleInvoice = async (req, res) => {
    const { id } = req.params;
    // console.log(id)

  try {
    const inventoryLog = await InventoryLog.find({ invoiceNo: +id }).populate(
      "product"
    );

    res.status(200).json(inventoryLog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getAllInvoice, getSingleInvoice };
