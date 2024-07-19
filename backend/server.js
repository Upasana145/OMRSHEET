require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

// Import routes
const authRoutes = require("./routes/authRoutes");
const masterRoutes = require("./routes/masterRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const { cronJobStart } = require("./cron/cron");
const greatRouter = require("./routes/greatRouter");
// settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors("*"));
app.use("/uploads", express.static("uploads"));

// use routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/master", masterRoutes);
app.use("/api/v1/upload", uploadRoutes);
app.use("/api/great", greatRouter);

// Cron Start
// cronJobStart();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
