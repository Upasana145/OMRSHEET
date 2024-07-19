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
router.get("/getall", getall);
router.post("/getspecifictemp", getspecifictemp);

module.exports = router;
