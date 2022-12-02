const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { registerUser, authUser, allUsers } = require("./loginController");

router.get("/", protect, allUsers);
router.post("/", registerUser);
router.post("/login", authUser);

module.exports = router;
