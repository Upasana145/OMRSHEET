const express = require("express");
const {
  getDept,
  addDept,
  fetchAlerts,
  editDept,
  deleteDept,
  editUser,
  deleteUser,
  getallomrdata,
  insertomrData,
  editomrData,
  deleteomrData,
  getall,
  getspecifictemp,
  selectjson,
  getalltempbatch,
  alltempbatches,
} = require("../controllers/masterControllers");
const router = express.Router();

router.get("/dept", getDept);
router.post("/dept", addDept);
router.post("/dept/edit", editDept);
router.post("/dept/delete", deleteDept);
router.post("/fetchAlerts", fetchAlerts);

// For user delete and edit
// router.get("/user/getallomrdata", getallomrdata);
router.post("/user/edit", editUser);
router.post("/user/delete", deleteUser);
// Insert
router.post("/insertomrData", insertomrData);
// Edit
router.post("/editomrData", editomrData);
// Delete
router.post("/deleteomrData", deleteomrData);

router.get("/getalltempbatch", getalltempbatch);
router.post("/alltempbatches", alltempbatches);

router.get("/getall", getall);
router.post("/getspecifictemp", getspecifictemp);
// router.get("/select-json", selectjson);
module.exports = router;
