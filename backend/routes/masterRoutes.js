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
  updatestatusbatches,
  reviewerassign,
  proc_omr_result_data,
  reviewer_reviews_data_batchwise,
  reviewer_reviews_ques_name,

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


router.post("/updatestatusbatches", updatestatusbatches);
router.post("/reviewerassign", reviewerassign);




//processed_omr_results
// http://localhost:4002/api/v1/master/proc_data , template_name and batch_name ke corresponding data
router.post("/proc_data", proc_omr_result_data);
router.post("/revbatchdata", reviewer_reviews_data_batchwise);
router.post("/revquesname", reviewer_reviews_ques_name);




router.get("/getall", getall);
router.post("/getspecifictemp", getspecifictemp);
// router.get("/select-json", selectjson);
module.exports = router;
