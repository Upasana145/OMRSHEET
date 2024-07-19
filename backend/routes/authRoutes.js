const express = require("express");
const {
  loginHandler,
  forgetHandler,
  OTPHandler,
  updateNewPw,
  addUserHandler,
  allUsers,
} = require("../controllers/authControllers");
const router = express.Router();

router.post("/login", loginHandler);
router.post("/forget", forgetHandler);
router.post("/otpVerify", OTPHandler);
router.post("/updateNewPw", updateNewPw);
router.post("/addUser", addUserHandler);
router.post("/allUsers", allUsers);

module.exports = router;
