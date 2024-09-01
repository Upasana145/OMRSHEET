const express = require("express");
const {
  uploadFile,
  saveImgToDB,
  testUpload,
  allomrimages,
  selectjson,
} = require("../controllers/uploadControllers");
const { upload } = require("../utils/fileUpload");
const router = express.Router();

// router.post("/", upload.single("image"), uploadFile);
router.post("/save", saveImgToDB);

// for omrsheet new 17.7.2024
router.post("/images", upload.single("image"), uploadFile);
// router.post("/test", upload.single("image"), testUpload);
router.get("/allomrimages", allomrimages);
router.get("/select-json", selectjson);
module.exports = router;
