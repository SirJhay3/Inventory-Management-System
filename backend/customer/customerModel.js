const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema(
  {
    name: {
      type: String,
    },
    storeName: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    phoneNo: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    pic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  { timestamps: true }
);

// before saving doc to database, run this function
CustomerSchema.pre("save", async function (next) {
  // if password modified, do this
  if (!this.isModified) {
    next();
  }
  // generate salt of 10
  // NB: the higher the number, the more the generated salt
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

CustomerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Customers = mongoose.model("Customers", CustomerSchema);

module.exports = { Customers };
