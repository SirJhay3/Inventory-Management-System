const multer = require("multer");
const path = require("path");

// Multer config
module.exports = multer({
  // storage: multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, path.resolve(process.cwd(), 'uploads') );
  //   },
  //   filename: function (req, file, cb) {
  //     cb(null, Date.now() + file.originalname);
  //   },
  // }),
  storage : multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    let ext = file.mimetype.split("/")[1];
    // console.log(process.cwd());
    if (ext !== "jpg" && ext !== "jpeg" && ext !== "png") {
      cb(new Error("File type is not supported"), false);
    }

    cb(null, true);
  },
});
