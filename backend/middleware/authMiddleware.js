const jwt = require("jsonwebtoken");
const { Customers } = require("../customer/customerModel");

const protect = async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      // decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await Customers.findById(decoded.id).select("-password");
    }

    if (!token) {
      throw new Error("Not authorized, token failed");
    }

    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// const protect = async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];

//       //decodes token id
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       req.user = await User.findById(decoded.id).select("-password");

//       next();
//     } catch (error) {
//       res.status(401);
//       throw new Error("Not authorized, token failed");
//     }
//   }

//   if (!token) {
//     res.status(401);
//     throw new Error("Not authorized, no token");
//   }
// };

module.exports = { protect };
