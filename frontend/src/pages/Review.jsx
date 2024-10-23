import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import ReviewModal from "./ReviewModal";
import { toast } from "react-toastify";
import { getStatusColor } from "../utils/smallFun";

const Review = () => {
  const [templateNames, setTemplateNames] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [selectedTemplate, setSelectedTemplate] = useState("");
  // const [batchNames, setBatchNames] = useState([]);
  const [batches, setBatches] = useState({});
  const { username } = useSelector((state) => state.auth);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [images, setImages] = useState([]);

  const handleTemplateChange = async () => {
    const templateName = selectedTemplate;
    console.log("selectedTemplate", selectedTemplate);

    if (templateName) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URI}/master/alltempbatches`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ template_name: templateName }),
          }
        );

        const data = await response.json();
        console.log("Data received from POST API:", data);

        if (data.status && data.data) {
          const batchNamesList = data.data.map((item) => item.batch_name);
          console.log("Extracted Batch Names:", batchNamesList);

          const batchDetails = data.data.reduce((acc, item) => {
            acc[item.batch_name] = {
              ...item,
              status: item.status || "Pending", // Set status from API, default to "Pending" if not available
            };
            return acc;
          }, {});
          console.log("Extracted Batch Details:", batchDetails);

          // setBatchNames(batchNamesList);
          setBatches(batchDetails);
        }
      } catch (error) {
        console.error("Error making POST request:", error);
      }
    }
  };

  useEffect(() => {
    console.log("selectedTemplate2", selectedTemplate);
    if (selectedTemplate && selectedTemplate !== "") {
      handleTemplateChange();
    }
  }, [selectedTemplate]);

  const handleViewClick = async (batch) => {
    if (batches[batch].assign_to !== username) {
      return toast.error("You are not authorised!");
    }
    console.log("hey i am batch...", batch);
    console.log("hey i am ...selectedTemplate", selectedTemplate);

    setSelectedBatch(batch);
    setShowModal(true);
    await fetchImages(batch); // Fetch images for the selected batch

    const requestData = {
      template_name: selectedTemplate, // Replace with actual template name or a variable
      batch_name: batch, // Use the batch name
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URI}/master/proc_data`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData), // Convert data to JSON string
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Data fetched successfully:", data);
      } else {
        console.error("Failed to fetch data:", response.statusText);
        toast.error("You are not authorised!");
      }
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    }
  };

  const fetchImages = async (batch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URI}/master/proc_data`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            template_name: selectedTemplate,
            batch_name: batch,
          }),
        }
      );

      const data = await response.json();
      console.log("API Response for images:", data);

      if (response.ok) {
        setImages(data.data || []); // Ensure `data.data` is set to an empty array if undefined
      } else {
        console.error("Failed to fetch images:", data.message);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  console.log("hey i am imagesssssssssssssssss", images);
  const closeModal = () => {
    setShowModal(false);
    setImages([]);
  };

  const handleAssignToMe = async (batchName) => {
    const confirmation = window.confirm(
      "Do you really want to assign yourself?"
    );
    if (confirmation) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URI}/master/reviewerassign`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              template_name: selectedTemplate,
              batch_name: batchName,
              assign_to: username, // Pass the current username
            }),
          }
        );

        const result = await response.json();
        console.log("Reviewer assignment response:", result);

        if (!result.status) {
          throw new Error("Failed to assign the reviewer in the database");
        }

        // Update the status to 'Work in process' after assignment
        // const response1 = await fetch("http://localhost:4002/api/v1/master/updatestatusbatches", {
        const response1 = await fetch(
          `${process.env.REACT_APP_API_URI}/master/updatestatusbatches`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              template_name: selectedTemplate,
              batch_name: batchName,
              status: "Work in process", // Set status to 'Work in process'
              assign_to: username,
            }),
          }
        );

        const result1 = await response1.json();
        console.log("Assignment and status update response:", result1);
        if (!result1.status) {
          throw new Error("Failed to update status in the database");
        }

        // Update the state to reflect changes after a successful API call
        setBatches((prevBatches) => ({
          ...prevBatches,
          [batchName]: {
            ...prevBatches[batchName],
            assign_to: username,
            status: "Work in process", // Update status locally
          },
        }));
      } catch (error) {
        console.error("Error assigning reviewer:", error);
      }
    }
  };

  // const handleSubmit = async () => {
  //   try {
  //     setBatches((prevBatches) => ({
  //       ...prevBatches,
  //       [selectedTemplate]: {
  //         ...prevBatches[selectedTemplate],
  //         [selectedBatch]: {
  //           ...prevBatches[selectedTemplate][selectedBatch],
  //           status: "Complete",
  //         },
  //       },
  //     }));
  //     // const response = await fetch("http://localhost:4002/api/v1/master/updatestatusbatches", {
  //     const response = await fetch(
  //       `${process.env.REACT_APP_API_URI}/master/updatestatusbatches`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           template_name: selectedTemplate,
  //           batch_name: selectedBatch,
  //           status: "Complete", // Set status to 'Complete'
  //         }),
  //       }
  //     );

  //     const result = await response.json();
  //     console.log("Status update response:", result);

  //     if (!result.status) {
  //       throw new Error("Failed to update status in the database");
  //     }
  //     closeModal();
  //   } catch (error) {
  //     console.error("Error updating status:", error);
  //   }
  // };

  const fetchTemplates = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URI}/master/getalltempbatch`
      );
      const data = await response.json();

      console.log("API Response Data:", data);

      const names = Array.from(
        new Set(data.data.map((item) => item.template_name))
      );
      console.log("Extracted Unique Template Names:", names);

      setTemplateNames(names);
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  return (
    <div className="reviews-container">
      <h1 className="review-title">Reviewer page</h1>
      <div className="dropdown-container">
        <h2 className="selected-template">Please select a template</h2>
        <select
          className="dropdown"
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
        >
          <option value="">Select a template</option>
          {templateNames.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
        <p>Selected Template: {selectedTemplate}</p>
      </div>

      {selectedTemplate && (
        <div className="batch-table-container">
          <h2 className="selected-template">
            You selected: {selectedTemplate}
          </h2>
          <table className="batch-table">
            <thead>
              <tr>
                <th>Batch</th>
                <th>Status</th>
                <th>Assign</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(batches).map((batch) => (
                <tr key={batch}>
                  <td>{batch}</td>
                  <td style={{ color: getStatusColor(batches[batch].status) }}>
                    {batches[batch].status}
                  </td>
                  <td>
                    {batches[batch].assign_to ? (
                      <span>{batches[batch].assign_to}</span> // Display username if assigned
                    ) : (
                      <button
                        className="assign-button"
                        onClick={() => handleAssignToMe(batch)} // Trigger assignment on click
                      >
                        Assign to Me
                      </button>
                    )}
                  </td>

                  <td>
                    <button
                      className="view-button"
                      onClick={() => handleViewClick(batch)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ReviewModal
        showModal={showModal}
        closeModal={closeModal}
        selectedBatch={selectedBatch}
        handleTemplateChange={handleTemplateChange}
        images={images}
      />
    </div>
  );
};

export default Review;
