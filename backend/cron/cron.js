// var cron = require("node-cron");
// const { mailController } = require("../controllers/mailControllers");

// const cronJobStart = () => {
//   // cron.schedule("* * * * *", () => {
//   //   console.log("running a task every minute");
//   // });
//   mailController();
// };

// module.exports = { cronJobStart };
var cron = require("node-cron");
const { mailController } = require("../controllers/mailControllers");

const cronJobStart = () => {
  cron.schedule(" */15 * * * *", () => {
    console.log("Running a task every 15 Minutes");
    mailController();
  });
};

module.exports = { cronJobStart };

// cron.schedule("*/15 * * * * *", () => {
//   console.log("Running a task every 15 seconds");
