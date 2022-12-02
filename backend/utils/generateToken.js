const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60; // validity in secs

// creates the jwt to sign the user in
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports = generateToken;
