// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { resSend } = require("../utils/resSend");
// const { query } = require("../db/db.js");
// const HTML_TEMPLATE = require("../utils/mail-template.js");
// const SENDMAIL = require("../utils/mailSend.js");
// const HTML_TEMPLATE2 = require("../utils/mail-template2.js");

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: "1d",
//   });
// };

// //Login User
// // Login handler
// exports.loginHandler = async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     // Query to select user details
//     const sql = `SELECT username, password, name, role FROM auth WHERE username = $1 AND isActive = 'y'`;
//     const result = await pool.query(sql, [username]);

//     if (result.rows.length > 0) {
//       // User exists, check passwords
//       const pwIsCorrect = await bcrypt.compare(
//         password,
//         result.rows[0].password
//       );
//       if (pwIsCorrect) {
//         const token = generateToken(username);
//         resSend(res, true, 200, "Login Successful", result.rows[0], token);
//       } else {
//         resSend(res, false, 200, "Password is invalid!", null, null);
//       }
//     } else {
//       resSend(res, false, 200, "User ID is invalid!", null, null);
//     }
//   } catch (error) {
//     console.error(error);
//     resSend(res, false, 400, "Error", error.message, null);
//   }
// };

// // Login User
// // exports.loginHandler = async (req, res) => {
// //   const { username, password } = req.body;
// //   try {
// //     let sql = `SELECT username, password, name, role FROM auth WHERE username= $1 AND isActive = 'y'`;
// //     const result = await query({
// //       query: sql,
// //       values: [username],
// //     });

// //     if (result && result.length > 0) {
// //       // User exists, check passwords
// //       const pwIsCorrect = await bcrypt.compare(password, result[0].password);
// //       if (pwIsCorrect) {
// //         const token = generateToken(username);
// //         resSend(res, true, 200, "Login Successful", result, token);
// //       } else {
// //         resSend(res, false, 200, "Password is invalid!", result, null);
// //       }
// //     } else {
// //       resSend(res, false, 200, "USER ID is invalid!", result, null);
// //     }
// //   } catch (error) {
// //     console.log(error);
// //     resSend(res, false, 400, "Error", error, null);
// //   }
// // };

// // ForgetHandler
// exports.forgetHandler = async (req, res) => {
//   const { email } = req.body;
//   console.log(email);
//   try {
//     let sql = `SELECT * FROM auth WHERE email= $1 AND isActive = 'y'`;
//     const result = await query({
//       query: sql,
//       values: [email],
//     });

//     // generate OTP
//     const otp = Math.floor(100000 + Math.random() * 900000);
//     console.log(result);
//     if (result && result.length > 0) {
//       // Store or Update in DB
//       let sql2 = `SELECT * FROM otps WHERE email= $1`;
//       const result2 = await query({
//         query: sql2,
//         values: [email],
//       });

//       if (result2 && result2.length > 0) {
//         // Update
//         let sqlUpdate = `UPDATE otps SET email = $1, otp = $2 WHERE id = $3`;
//         await query({
//           query: sqlUpdate,
//           values: [result[0].email, otp, result2[0].id],
//         });
//       } else {
//         // Add
//         let sqlAdd = `INSERT INTO otps (email, otp) VALUES ($1, $2)`;
//         await query({
//           query: sqlAdd,
//           values: [result[0].email, otp],
//         });
//       }

//       // User exists, trigger mail
//       let mailDetails = {
//         from: "safety.sudisafoundry@gmail.com",
//         to: result[0].email,
//         subject: "OTP Verification | SUDISA",
//         html: HTML_TEMPLATE2(otp),
//       };
//       SENDMAIL(mailDetails, function (err, data) {
//         if (err) {
//           console.log("Error Occurs", err);
//         } else {
//           console.log("Email sent successfully");
//         }
//       });

//       resSend(res, true, 200, "Mail has been sent!", null, null);
//     } else {
//       resSend(res, false, 200, "USER ID is invalid!", result, null);
//     }
//   } catch (error) {
//     console.log(error);
//     resSend(res, false, 400, "Error", error, null);
//   }
// };

// // OTPHandler
// exports.OTPHandler = async (req, res) => {
//   const { enteredOTP, email } = req.body;
//   try {
//     let sql = `SELECT otp FROM otps WHERE email= $1`;
//     const result = await query({
//       query: sql,
//       values: [email],
//     });

//     if (result && result.length > 0) {
//       // Check OTP is correct or not
//       if (result[0].otp === enteredOTP) {
//         let sqlUpdate = `UPDATE otps SET isVerified = $1 WHERE email = $2`;
//         await query({
//           query: sqlUpdate,
//           values: ["Y", email],
//         });
//         resSend(res, true, 200, "Please add new password!", null, null);
//       } else {
//         resSend(res, false, 200, "OTP is incorrect!", null, null);
//       }
//     } else {
//       resSend(res, false, 200, "USER ID is invalid!", result, null);
//     }
//   } catch (error) {
//     console.log(error);
//     resSend(res, false, 400, "Error", error, null);
//   }
// };

// // Update new password
// exports.updateNewPw = async (req, res) => {
//   const { email, enteredOTP, newPW } = req.body;
//   try {
//     let sql = `SELECT * FROM otps WHERE email= $1`;
//     const result = await query({
//       query: sql,
//       values: [email],
//     });

//     if (result && result.length > 0) {
//       // Check OTP is correct or not
//       if (result[0].otp === enteredOTP) {
//         if (result[0].isVerified === "Y") {
//           // Encrypt the password
//           let salt = await bcrypt.genSalt(12);
//           let encryptedPw = await bcrypt.hash(newPW, salt);

//           let sqlUpdate = `UPDATE auth SET password = $1 WHERE email = $2`;
//           await query({
//             query: sqlUpdate,
//             values: [encryptedPw, email],
//           });

//           let sqlDelete = `DELETE FROM otps WHERE email = $1`;
//           await query({
//             query: sqlDelete,
//             values: [email],
//           });

//           resSend(res, true, 200, "Password is updated!", null, null);
//         } else {
//           resSend(
//             res,
//             false,
//             200,
//             "Something went wrong. Try again!",
//             null,
//             null
//           );
//         }
//       } else {
//         resSend(res, false, 200, "OTP is incorrect!", null, null);
//       }
//     } else {
//       resSend(res, false, 200, "USER ID is invalid!", result, null);
//     }
//   } catch (error) {
//     console.log(error);
//     resSend(res, false, 400, "Error", error, null);
//   }
// };

// // Add User
// // exports.addUserHandler = async (req, res) => {
// //   const { username, email, password, name, role, currentUser } = req.body;
// //   try {
// //     let sql = `SELECT * FROM auth WHERE username= $1 OR email= $2 AND isActive = 'y'`;
// //     const result = await query({
// //       query: sql,
// //       values: [username, email],
// //     });

// //     if (result && result.length === 0) {
// //       // check if currentUser has admin role or not
// //       let sql3 = `SELECT * FROM auth WHERE username= $1 AND isActive = 'y'`;
// //       const res3 = await query({
// //         query: sql3,
// //         values: [currentUser],
// //       });

// //       if (res3 && res3.length > 0 && res3[0].role === "admin") {
// //         // hashed password
// //         let salt = await bcrypt.genSalt(10);
// //         let hashedPassword = await bcrypt.hash(password, salt);

// //         // Add User to DB
// //         let sql2 = `INSERT INTO auth (username, email, password, name, role, isActive)
// //                     VALUES ($1, $2, $3, $4, $5, 'y')`;
// //         await query({
// //           query: sql2,
// //           values: [username, email, hashedPassword, name, role],
// //         });

// //         resSend(res, true, 200, "New User Added!", null, null);
// //       } else {
// //         resSend(
// //           res,
// //           false,
// //           200,
// //           "You don't have the access to add new user!",
// //           null,
// //           null
// //         );
// //       }
// //     } else {
// //       resSend(
// //         res,
// //         false,
// //         200,
// //         "Username or Email ID already exists!",
// //         null,
// //         null
// //       );
// //     }
// //   } catch (error) {
// //     console.log(error);
// //     resSend(res, false, 400, "Error", error, null);
// //   }
// // };

// // controllers/authControllers.js

// //add User
// const pool = require("../db/db");
// // const bcrypt = require("bcrypt");

// exports.addUserHandler = async (req, res) => {
//   const { username, email, password, name, role, currentUser } = req.body;

//   try {
//     console.log("Adding user:", { username, email, name, role, currentUser });

//     // Check if username or email already exists
//     const sql = `SELECT * FROM auth WHERE (username = $1 OR email = $2) AND isActive = 'y'`;
//     const result = await pool.query(sql, [username, email]);

//     if (result.rows.length === 0) {
//       // Check if currentUser has admin role
//       const sql3 = `SELECT * FROM auth WHERE username = $1 AND isActive = 'y'`;
//       const res3 = await pool.query(sql3, [currentUser]);

//       console.log("Current user role check result:", res3.rows);

//       if (res3.rows.length > 0 && res3.rows[0].role === "admin") {
//         // Hash password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // Add user to DB
//         const sql2 = `INSERT INTO auth (username, email, password, name, role, isActive)
//                       VALUES ($1, $2, $3, $4, $5, 'y')`;
//         await pool.query(sql2, [username, email, hashedPassword, name, role]);

//         res.json({ success: true, message: "New User Added!" });
//       } else {
//         res.json({
//           success: false,
//           message: "You don't have the access to add new user!",
//         });
//       }
//     } else {
//       res.json({
//         success: false,
//         message: "Username or Email ID already exists!",
//       });
//     }
//   } catch (error) {
//     console.error("Error adding user:", error);
//     res.status(400).json({ success: false, message: "Error", error });
//   }
// };

// // Get all users
// exports.allUsers = async (req, res) => {
//   const { currentUser } = req.body;
//   try {
//     let sql3 = `SELECT * FROM auth WHERE username= $1 AND isActive = 'y'`;
//     const res3 = await query({
//       query: sql3,
//       values: [currentUser],
//     });

//     if (res3 && res3.length > 0 && res3[0].role === "admin") {
//       let sql = `SELECT * FROM auth`;
//       const result = await query({
//         query: sql,
//         values: [],
//       });

//       if (result && result.length > 0) {
//         resSend(res, true, 200, "auth list", result, null);
//       } else {
//         resSend(res, false, 200, "No Record Found!", result, null);
//       }
//     } else {
//       resSend(
//         res,
//         false,
//         200,
//         "You don't have the access to view users!",
//         null,
//         null
//       );
//     }
//   } catch (error) {
//     console.log(error);
//     resSend(res, false, 400, "Error", error, null);
//   }
// };

//this is in mysql database

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { resSend } = require("../utils/resSend");
const { query } = require("../db/db.js");
const HTML_TEMPLATE = require("../utils/mail-template.js");
const SENDMAIL = require("../utils/mailSend.js");
const HTML_TEMPLATE2 = require("../utils/mail-template2.js");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// Login User
exports.loginHandler = async (req, res) => {
  const { username, password } = req.body;
  try {
    let sql = `SELECT username, password, name, role FROM auth WHERE username= '${username}' and isActive = 'y'`;

    const result = await query({
      query: sql,
      values: [],
    });
    if (result && result.length > 0) {
      console.log("i am result:", result);
      // User exits, check passwords
      const pwIsCorrect = await bcrypt.compare(password, result[0]?.password);
      if (pwIsCorrect) {
        const token = generateToken(username);
        resSend(res, true, 200, "Login Successful", result, token);
      } else {
        resSend(res, false, 200, "Password is invalid!", result, null);
      }
    } else {
      resSend(res, false, 200, "USER ID is invalid!", result, null);
    }
  } catch (error) {
    console.log(error);
    resSend(res, false, 400, "Error", error, null);
  }
};

//  ForgetHandler
exports.forgetHandler = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    let sql = `SELECT * FROM auth WHERE email= '${email}' AND isActive = 'y'`;

    const result = await query({
      query: sql,
      values: [],
    });

    // generate OTP
    const otp = Math.round(Math.random() * 1000000);
    console.log(result);
    if (result && result.length > 0) {
      // Store or Update in DB
      let sql2 = `SELECT * FROM otps WHERE email= '${email}'`;

      const result2 = await query({
        query: sql2,
        values: [],
      });

      if (result2 && result2.length > 0) {
        // Update
        let sqlUpdate = `UPDATE otps SET email = ?, otp = ? WHERE id = ?`;

        const resUpdate = await query({
          query: sqlUpdate,
          values: [result[0]?.email, otp, result2[0]?.id],
        });
        resSend(res, true, 200, "Mail has been sent!", null, null);
      } else {
        // Add
        let sqlAdd = `INSERT INTO otps(email, otp) VALUES ('${result[0]?.email}','${otp}')`;

        const resAdd = await query({
          query: sqlAdd,
          values: [],
        });
        resSend(res, true, 200, "Mail has been sent!", null, null);
      }

      // User exits, trigger mail
      let mailDetails = {
        from: "safety.sudisafoundry@gmail.com",
        to: result[0]?.email,
        subject: "OTP Verifcation | SUDISA",
        html: HTML_TEMPLATE2(otp),
      };
      SENDMAIL(mailDetails, function (err, data) {
        if (!err) {
          console.log("Error Occurs", err);
        } else {
          console.log("Email sent successfully");
        }
      });
    } else {
      resSend(res, false, 200, "USER ID is invalid!", result, null);
    }
  } catch (error) {
    console.log(error);
    resSend(res, false, 400, "Error", error, null);
  }
};

//  OTPHandler
exports.OTPHandler = async (req, res) => {
  const { enteredOTP, email } = req.body;
  try {
    let sql = `SELECT otp FROM otps WHERE email= '${email}'`;

    const result = await query({
      query: sql,
      values: [],
    });

    if (result && result.length > 0) {
      // Check OTP is correct or not
      if (result[0].otp === enteredOTP) {
        let sqlUpdate = `UPDATE otps SET isVarified = ? WHERE email = '${email}'`;

        const resUpdate = await query({
          query: sqlUpdate,
          values: ["Y"],
        });
        resSend(res, true, 200, "Please add new password!", null, null);
      } else {
        resSend(res, false, 200, "OTP is incorrect!", null, null);
      }
    } else {
      resSend(res, false, 200, "USER ID is invalid!", result, null);
    }
  } catch (error) {
    console.log(error);
    resSend(res, false, 400, "Error", error, null);
  }
};

exports.updateNewPw = async (req, res) => {
  const { email, enteredOTP, newPW } = req.body;
  try {
    let sql = `SELECT * FROM otps WHERE email= '${email}'`;

    const result = await query({
      query: sql,
      values: [],
    });

    if (result && result.length > 0) {
      // Check OTP is correct or not
      if (result[0].otp === enteredOTP) {
        if (result[0].isVarified === "Y") {
          // Encrypt the password
          let salt = await bcrypt.genSalt(12);
          let encryptedPw = await bcrypt.hash(newPW, salt);
          let sqlUpdate = `UPDATE auth SET password = ? WHERE email = '${email}'`;

          const resUpdate = await query({
            query: sqlUpdate,
            values: [encryptedPw],
          });
          let sqlDelete = `DELETE FROM otps WHERE email = '${email}'`;

          const resDelete = await query({
            query: sqlDelete,
            values: [],
          });
          resSend(res, true, 200, "Password is updated!", null, null);
        } else {
          resSend(
            res,
            false,
            200,
            "Something went wrong. Try again!",
            null,
            null
          );
        }
      } else {
        resSend(res, false, 200, "OTP is incorrect!", null, null);
      }
    } else {
      resSend(res, false, 200, "USER ID is invalid!", result, null);
    }
  } catch (error) {
    console.log(error);
    resSend(res, false, 400, "Error", error, null);
  }
};

// add User
exports.addUserHandler = async (req, res) => {
  const { username, email, password, name, role, currentUser } = req.body;
  try {
    let sql = `SELECT * FROM auth WHERE username= '${username}' OR email='${email}' and isActive = 'y'`;

    const result = await query({
      query: sql,
      values: [],
    });
    if (result && result.length === 0) {
      // check if username has admin role or not
      let sql3 = `SELECT * FROM auth WHERE username= '${currentUser}' and isActive = 'y'`;

      const res3 = await query({
        query: sql3,
        values: [],
      });
      console.log(res3);
      if (res3 && res3.length > 0 && res3[0].role === "admin") {
        //hashed password
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);
        // Add User to DB
        let sql2 = `INSERT INTO auth(username, email, password, name, role, isActive)
        VALUES ('${username}','${email}','${hashedPassword}','${name}','${role}','y')`;
        const result2 = await query({
          query: sql2,
          values: [],
        });
        resSend(res, true, 200, "New User Added!", result2, null);
      } else {
        resSend(
          res,
          false,
          200,
          "You don't have the access to add new user!",
          null,
          null
        );
      }
    } else {
      resSend(
        res,
        false,
        200,
        "USER ID or Email Id is already exists!",
        null,
        null
      );
    }
  } catch (error) {
    console.log(error);
    resSend(res, false, 400, "Error", error, null);
  }
};

// all users
exports.allUsers = async (req, res) => {
  const { currentUser } = req.body;
  console.log("Heyyyyyyy i am currect user........", req.body.currentUser);
  try {
    let sql3 = `SELECT * FROM auth WHERE username= '${currentUser}' and isActive = 'y'`;
    const res3 = await query({
      query: sql3,
      values: [],
    });
    if (res3 && res3.length > 0 && res3[0].role === "admin") {
      let sql = `SELECT * FROM auth`;

      const result = await query({
        query: sql,
        values: [],
      });
      if (result && result.length > 0) {
        // User exits, check passwords
        resSend(res, true, 200, "auth list", result, null);
      } else {
        resSend(res, false, 200, "No Record Found!", result, null);
      }
    } else {
      resSend(
        res,
        false,
        200,
        "You don't have the access to add new user!",
        null,
        null
      );
    }
  } catch (error) {
    console.log(error);
    resSend(res, false, 400, "Error", error, null);
  }
};
