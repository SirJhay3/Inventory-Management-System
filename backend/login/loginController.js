const { Customers } = require("../customer/customerModel");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
  const { name, email, password, storeName, address, phoneNo } = req.body;
  try {
    const customerExists = await Customers.findOne({ email });
    if (customerExists) {
      throw new Error("User already exists");
    }

    // create new user
    const user = await Customers.create({
      name,
      email,
      password,
      storeName,
      address,
      phoneNo,
    });
    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        storeName: user.storeName,
        address: user.address,
        phoneNo: user.phoneNo,
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
        name: user.name,
        email: user.email,
        storeName: user.storeName,
        address: user.address,
        phoneNo: user.phoneNo,
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

const allUsers = async (req, res) => {
  // find match by query params
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  try {
    // find others users apart from the searched user
    const users = await Customers.find(keyword).find({
      _id: { $ne: req.user._id },
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { registerUser, authUser, allUsers };
