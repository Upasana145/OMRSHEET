const express = require('express');
const { uploadOMR, getOMRResults} = require('../controllers/omrController');
const multer = require('multer');
const router = express.Router(); 
const path = require('path');
 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

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
 
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {    
      fileSize: 1024 * 1024 * 5,
      fieldSize: 1024 * 1024 * 10
      }
});

router.post("/upload", upload.array("omr_files"), uploadOMR);
router.get("/sheet", getOMRResults);


module.exports = router;
