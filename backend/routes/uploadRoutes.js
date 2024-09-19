const express = require("express");
const {
  uploadFile,
  saveImgToDB,
  testUpload,
  allomrimages,
  selectjson,
  uploadprocessomrimages,
  seperate_result,
  updateJsonResult,
  submitupdateJsonResult,
  getupdateJsonResult,
  processcropimage
} = require("../controllers/uploadControllers");
const { upload } = require("../utils/fileUpload");
const router = express.Router();

// router.post("/", upload.single("image"), uploadFile);
router.post("/save", saveImgToDB);

// for omrsheet new 17.7.2024
router.post("/images", upload.single("image"), uploadFile);
// router.post("/test", upload.single("image"), testUpload);
// jis omr pe processesing hoga uska endpoint
router.post("/processomrimages", upload.single("image"), uploadprocessomrimages);
router.post("/processcropimage", upload.single("image"), processcropimage);


router.get("/allomrimages", allomrimages);
// router.get("/select-json", selectjson);
router.post("/seperate_result", seperate_result );
router.post("/updateJsonResult", updateJsonResult );
router.get("/getupdateJsonResult", getupdateJsonResult );
router.post("/submitupdateJsonResult", submitupdateJsonResult );
// router.post("/reviewerstatus", reviewerstatus );

module.exports = router;
