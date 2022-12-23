const { Customers } = require("../customer/customerModel");
const generateToken = require("../utils/generateToken");
const asyncHandler = require("express-async-handler");

const registerUser = async (req, res) => {
  const { email, password, storeName, storeAddress, phoneNumber } = req.body;
  try {
    const customerExists = await Customers.findOne({ email });
    if (customerExists) {
      throw new Error("User already exists");
    }

    // create new user
    const user = await Customers.create({
      email,
      password,
      storeName,
      storeAddress,
      phoneNumber,
    });
    if (user) {
      res.status(200).json({
        _id: user._id,
        email: user.email,
        storeName: user.storeName,
        storeAddress: user.storeAddress,
        phoneNumber: user.phoneNumber,
        // generate a jwt and send back to the user
        token: generateToken(user._id),
      });
    } else {
      throw new Error("Failed to create User");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Customers.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user._id,
        email: user.email,
        storeName: user.storeName,
        address: user.storeAddress,
        phoneNo: user.phoneNumber,
        // generate a jwt and send back to the user
        token: generateToken(user._id),
      });
    } else {
      throw new Error("Invalid Email or Password");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//@description     Get or Search all users
//@route           GET /api/user?search=

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await Customers.find(keyword).find({
    _id: { $ne: req.user._id },
  });
  res.send(users);
});

module.exports = { registerUser, authUser, allUsers };
