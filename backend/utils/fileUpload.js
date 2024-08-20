const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    const imgName = uniqueSuffix + "-" + file.originalname;
    cb(null, imgName);
  },
});

// Specify file format that can be saved
function fileFilter(req, file, cb) {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only jpeg, jpg and png files are allowed!"), false);
  }
}

// file limits
// let maxSize = 1 * 1024 * 1024;
// function limits(req, file, cb) {
//   // cb({
//   //   fieldNameSize: 255,
//   //   fileSize: maxSize,
//   //   files: 1,
//   //   fields: 1,
//   // });
//   { fileSize: 5 * 1000 * 1000 }
//   cb(new Error("File should be below 250kb"), false);
// }

const upload = multer({
  storage: storage,
});

module.exports = { upload };

//don't make changes above

// ye baad me kiye h

// const fs = require("fs");
// const path = require("path");
// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // Get the template name from the request body
//     console.log("hey i am template...", req.body.template_name);
//     const templateName = req.body.template_name;

//     // Define the path based on the template name
//     const uploadPath = path.join(__dirname, templateName);

//     // Check if the folder exists; if not, create it
//     if (!fs.existsSync(uploadPath)) {
//       fs.mkdirSync(uploadPath, { recursive: true });
//     }

//     cb(null, uploadPath);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now();
//     cb(null, uniqueSuffix + "-" + file.originalname);
//   },
// });

// // Specify file format that can be saved
// function fileFilter(req, file, cb) {
//   if (
//     file.mimetype === "image/jpeg" ||
//     file.mimetype === "image/jpg" ||
//     file.mimetype === "image/png"
//   ) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only jpeg, jpg and png files are allowed!"), false);
//   }
// }

// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   // limits: limits, // Uncomment if you want to add file size limits
// });

// module.exports = { upload };
