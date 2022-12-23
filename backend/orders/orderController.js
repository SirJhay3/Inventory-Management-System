const { v4: uuidv4 } = require("uuid");
const { Orders } = require("./orderModel");

const postOrders = async (req, res) => {
  const { items, totalAmount, customerName } = req.body;
  const id = uuidv4().slice(0, 8);
  try {
    const orders = await Orders.create({
      orderId: id,
      customerName,
      items,
      totalAmount,
      status: "pending",
    });

    res.status(200).json({ orders, message: "Order placed successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { postOrders };
