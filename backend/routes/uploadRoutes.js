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
  processcropimage,
  csvresult,
} = require("../controllers/uploadControllers");
const { upload } = require("../utils/fileUpload");
const router = express.Router();

// router.post("/", upload.single("image"), uploadFile);
router.post("/save", saveImgToDB);

router.post("/images", upload.single("image"), uploadFile);

router.post("/processomrimages", upload.single("image"), uploadprocessomrimages);
router.post("/processcropimage", upload.single("image"), processcropimage);


router.get("/allomrimages", allomrimages);
// router.get("/select-json", selectjson);
router.post("/seperate_result", seperate_result );
router.post("/updateJsonResult", updateJsonResult );
router.get("/getupdateJsonResult", getupdateJsonResult );
router.post("/submitupdateJsonResult", submitupdateJsonResult );
// router.post("/reviewerstatus", reviewerstatus );
router.post("/csvresult", csvresult );

module.exports = router;
