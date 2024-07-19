// routes/greatRouter.js

const express = require("express");
const router = express.Router();
const { testConnection } = require("../controllers/greatController");

// Route for testing database connection and operations
router.get("/test-connection", testConnection);

module.exports = router;
