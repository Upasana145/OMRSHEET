const { Kafka, logLevel } = require("kafkajs");
const { query } = require("./db/db.js");

const processJsonResults = (dataObject) => {
  const filteredJsonRR = Object.entries(dataObject)
    .filter(([key, item]) => item.result === "RR" && item.flag === true)
    .map(([key, item]) => ({ [key]: item }));

  const filteredJsonCorrect = Object.entries(dataObject)
    .filter(([key, item]) => item.result !== "RR")
    .map(([key, item]) => ({ [key]: item }));

  return { filteredJsonRR, filteredJsonCorrect };
};

const getKafkaResults = async (key, value) => {
  if (!key || !value) {
    return { status: false, message: "Bad Request: Missing parameters" };
  }
  console.log("key: ", key, "value: ", value);

  const parts = key.split("_");

  console.log("parts", parts);

  // Accessing individual parts
  const t_name = parts[0];
  const batch_name = parts[1];
  const question_paper_name = parts[2];

  try {
    const childSql = `SELECT template_name FROM processed_omr_results WHERE t_name = ? AND batch_name = ? `;
    const childResult = await query({
      query: childSql,
      values: [t_name, batch_name],
    });

    if (
      !childResult ||
      childResult.length === 0 ||
      childResult[0].length === 0
    ) {
      return { status: false, message: "No Template found" };
    }

    const template_name = childResult[0].template_name;

    const sql = `SELECT count(ID) as length FROM processed_omr_results WHERE t_name = ? AND batch_name = ? AND question_paper_name = ?`;
    const result = await query({
      query: sql,
      values: [t_name, batch_name, question_paper_name],
    });

    if (!result || result.length === 0 || result[0].length === 0) {
      return { status: false, message: "The batch is not added." };
    }

    console.log("resu1", value, t_name, batch_name, question_paper_name);
    await query({
      query: `UPDATE processed_omr_results SET result = ? WHERE t_name = ? AND batch_name = ? AND question_paper_name = ?`,
      values: [value, t_name, batch_name, question_paper_name],
    });

    //Separate Result process starts here
    const selectJsonQuery = `
      SELECT result 
      FROM processed_omr_results 
      WHERE t_name = ? AND batch_name = ? AND question_paper_name = ?`;

    const resu = await query({
      query: selectJsonQuery,
      values: [t_name, batch_name, question_paper_name],
    });

    console.log("resu", resu);

    const parsedResult = resu.map((item) => {
      data: item.result;
    });

    console.log("parsedResult", parsedResult);

    if (parsedResult && parsedResult.length > 0) {
      // Access the first result's data object
      const dataObject = parsedResult[0].data;

      const { filteredJsonRR, filteredJsonCorrect } =
        processJsonResults(dataObject);

      // Insert "RR" data into the reviewer_reviews table
      if (filteredJsonRR.length > 0) {
        const valuesRR = filteredJsonRR.flatMap((item) => [
          JSON.stringify(item),
          template_name,
          batch_name,
          question_paper_name,
          question_paper_name,
        ]);

        const insertRRQuery = `
          INSERT INTO reviewer_reviews (under_review, template_name, batch_name, question_paper_name,ques_paper_image_path)
          VALUES ${filteredJsonRR.map(() => "(?, ?, ?, ?,?)").join(", ")}
        `;

        try {
          const insertRRResult = await query({
            query: insertRRQuery,
            values: valuesRR,
          });

          // Insert data into reviewer_assign table after successful insert into reviewer_reviews
          const insertReviewerAssignQuery = `
            INSERT INTO reviewer_assign (template_name, t_name, batch_name, status)
            VALUES (?, ?, ?, ?)
          `;

          const insertReviewerAssignValues = [
            template_name,
            t_name,
            batch_name,
            "Pending",
          ];

          const insertReviewerAssignResult = await query({
            query: insertReviewerAssignQuery,
            values: insertReviewerAssignValues,
          });

          console.log(
            "Insert result for reviewer_assign:",
            insertReviewerAssignResult
          );
          return { status: true, message: "Everything worked fine." };
        } catch (error) {
          return {
            status: false,
            message: `Error in reviewer reviews:${error.message}`,
          };
        }
      }

      // Update correct results in the processed_omr_results table
      if (filteredJsonCorrect.length > 0) {
        const correctDataJson = JSON.stringify(filteredJsonCorrect);
        const updateCorrectQuery = `
          UPDATE processed_omr_results
          SET correct_result = ?
          WHERE template_name = ? AND batch_name = ? AND question_paper_name = ?
        `;

        try {
          const updateCorrectResult = await query({
            query: updateCorrectQuery,
            values: [
              correctDataJson,
              template_name,
              batch_name,
              question_paper_name,
            ],
          });

          console.log("Update result for correct_result:", updateCorrectResult);

          return {
            status: false,
            message:
              "Data stored successfully. RR data in reviewer_reviews and correct data in processed_omr_results.",
          };
        } catch (error) {
          return { status: false, message: error.message };
        }
      } else {
        return {
          status: false,
          message: "No matching JSON found for correct data!",
        };
      }
    } else {
      return { status: false, message: "No Record Found!" };
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};
const kafkaListenerHandler = () => {
  const kafka = new Kafka({
    brokers: ["157.173.222.15:9092"],
  });

  // Create a consumer instance
  const consumer = kafka.consumer({
    groupId: `test-group-${Date.now()}`,
    sessionTimeout: 30000,
    heartbeatInterval: 3000,
    autoCommit: true,
  });

  // Function to listen to Kafka messages
  const run = async () => {
    await consumer.connect().catch((error) => {
      console.error("Error connecting to Kafka broker:", error);
    });
    await consumer
      .subscribe({ topic: "testtopic", fromBeginning: true })
      .then(() => console.log("Subscribed to topic"))
      .catch((error) => {
        console.error("Error subscribing to topic:", error);
      });

    // Consume messages from the topic
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log("HELLO", {
          topic,
          partition,
          offset: message.offset,
          // value: message.value.toString(),
          key: message.key.toString(),
        });
        try {
          // await consumer.commitOffsets([
          //   {
          //     topic,
          //     partition,
          //     offset: (parseInt(message.offset) + 1).toString(),
          //   },
          // ]);
          let response = await getKafkaResults(
            message.key.toString(),
            message.value.toString()
          );
          if (response?.status) {
            console.log("response: " + response.message);
          } else {
            console.error("response: " + response.message);
          }
        } catch (error) {
          console.error("Error processing message: ", error);
        }
      },
      maxWaitTimeInMs: 5000,
    });
  };

  // Handle errors
  consumer.on("consumer.crash", (error) => {
    console.error("Consumer crashed", error);
  });
  consumer.on("consumer.connect", () => {
    console.log("Consumer connected successfully");
  });

  consumer.on("consumer.disconnect", () => {
    console.log("Consumer disconnected");
  });

  run().catch(console.error);
};

// kafkaListenerHandler();
module.exports = {
  kafkaListenerHandler,
};
