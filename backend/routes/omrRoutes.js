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


const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 25 * 1024 * 1024, // 10 MB limit (adjust as needed)
    fields: 100, // max number of fields (adjust as needed)
  },
}); 

router.post("/upload", upload.array("omr_files"), uploadOMR);
router.get("/sheet", getOMRResults);


module.exports = router;
