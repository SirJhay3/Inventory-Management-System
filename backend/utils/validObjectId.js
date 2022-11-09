const mongoose = require("mongoose");

function isValidObjectId(id) {
  return mongoose.isValidObjectId(id); // true or false
}

module.exports = { isValidObjectId };
