const { query } = require("../db/db.js");
const HTML_TEMPLATE = require("../utils/mail-template.js");
const SENDMAIL = require("../utils/mailSend.js");

exports.mailController = async () => {
  try {
    let sql = `SELECT * FROM mail_log WHERE is_sent = 0`;

    const result = await query({
      query: sql,
      values: [],
    });

    // console.log("hey i am result....", result);

    if (result && result.length > 0) {
      const { id, body, is_sent, emails, datetime } = result[0];

      console.log("hey i am result...", emails);
      // mail send
      let time = datetime.split("T")[1].slice(0, 5);
      let date = new Date(datetime).toLocaleDateString("en", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      //   const toEmails = Array.isArray(emails) ? emails.join(",") : emails;
      const toEmails = emails.replace(/"/g, "");

      console.log("toEmails", toEmails);
      let mailDetails = {
        from: "safety.sudisafoundry@gmail.com",
        // to: "upasanabharti145@gmail.com,upasanabharti146@gmail.com",
        to: toEmails,
        subject: "The staff is not wearing the safety helmet",
        html: HTML_TEMPLATE(JSON.parse(body), date, time),
        attachments: [
          {
            filename: JSON.parse(body)?.image,
            path: `uploads/${JSON.parse(body)?.image}`,
          },
        ],
      };

      SENDMAIL(mailDetails, async function (data) {
        const { accepted, rejected } = data;
        console.log(`Accepted: ${accepted}`);
        console.log(`Rejected: ${rejected}`);

        let sql3 = `update mail_log set is_sent = 1 where id = '${id}'`;
        const result3 = await query({
          query: sql3,
          values: [],
        });
        let sql4 = `update mail_log set is_sent = 2 where is_sent = 0`;
        const result4 = await query({
          query: sql4,
          values: [],
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// const { query } = require("../db/db.js");
// const HTML_TEMPLATE = require("../utils/mail-template.js");
// const SENDMAIL = require("../utils/mailSend.js");

// exports.mailController = async () => {
//   try {
//     let sql = `SELECT * FROM mail_log WHERE is_sent = 0`;

//     const result = await query({
//       query: sql,
//       values: [],
//     });

//     console.log("hey i am result....", result);

//     if (result && result.length > 0) {
//       //   console.log("hey i am result....", result);
//       //   console.log("hey i am result.length....", result.length);

//       //   const { body, is_sent, datetime } = result[0];
//       for (const item of result) {
//         const { body, is_sent, datetime } = item;
//         // sendEmail({ body, is_sent, datetime });
//       }
//       // mail send
//       let time = datetime.split("T")[1].slice(0, 5);
//       let date = new Date(datetime).toLocaleDateString("en", {
//         weekday: "long",
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       });
//       let mailDetails = {
//         from: "safety.sudisafoundry@gmail.com",
//         to: "mrinmoygh081@gmail.com",
//         subject: "The staff is not wearing the safety helmet",
//         html: HTML_TEMPLATE(JSON.parse(body), date, time),
//         attachments: [
//           {
//             filename: JSON.parse(body)?.image,
//             path: `uploads/${JSON.parse(body)?.image}`,
//           },
//         ],
//       };
//       //   console.log(mailDetails);
//       // SENDMAIL(mailDetails, function (err, data) {
//       //   if (!err) {
//       //     console.log("Error Occurs", err);
//       //   } else {
//       //     console.log("Email sent successfully");
//       //   }
//       // });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
