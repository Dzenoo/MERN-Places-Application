const multer = require("multer");
const { v4: uuid } = require("uuid");

// Koji fajlovi su dozvoljeni
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const fileUpload = multer({
  limits: 60000,
  storage: multer.diskStorage({
    // Gde da storuje fajl
    destination: (req, file, cb) => {
      cb(null, "uploads/images");
    },
    // Da extraktuje fajl
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuid() + "." + ext);
    },
  }),
  // Preventuje za nepoznate fajlove
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("Invalid mime type");
    cb(error, isValid);
  },
});

module.exports = fileUpload;
