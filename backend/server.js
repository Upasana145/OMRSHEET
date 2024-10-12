require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const path = require("path");
// Import routes
const authRoutes = require("./routes/authRoutes");
const masterRoutes = require("./routes/masterRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const omrTemplateRoutes = require("./routes/omrTemplateRoutes");
const { cronJobStart } = require("./cron/cron");
const greatRouter = require("./routes/greatRouter");
const omrRoutes = require("./routes/omrRoutes");
const { kafkaListenerHandler } = require("./kafkaListner");

app.use(express.json());
app.use(bodyParser.json({ limit: "1gb" }));
app.use(bodyParser.urlencoded({ limit: "1gb", extended: true }));
app.use(cors());
app.use("/uploads", express.static("uploads"));
const uploadsDirectory = process.env.PROJECT_FOLDER_PATH;
app.use('/uploads', express.static(uploadsDirectory));


// use routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/master", masterRoutes);
app.use("/api/v1/upload", uploadRoutes);
app.use("/api/great", greatRouter);
app.use("/api/v1/omr", omrRoutes);
app.use("/api/v1/templates", omrTemplateRoutes);

kafkaListenerHandler();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
