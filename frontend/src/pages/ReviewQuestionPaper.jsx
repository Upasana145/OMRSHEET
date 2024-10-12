

import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReviewQuestionPaper = ({ data, closeDetails }) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [actionStatus, setActionStatus] = useState({});
  const [tickStatus, setTickStatus] = useState({});
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [isSubmit, setIsSubmit] = useState(true);

  const canvasRef = useRef(null);
const [flagData1, setFlagData] = useState(null);

  // Always call useEffect, handle the condition inside
  useEffect(() => {
    if (data && data.data) {
      console.log("hey buddy i am data", data);
      const allTickEnabled = data.data.every((image) => tickStatus[image.ID]);
      setIsSubmitEnabled(allTickEnabled);
    }
  }, [tickStatus, data]); // Make sure the hook depends on the necessary state and props
  console.log("data.data....", data.data);

  // const parseUnderReview = (under_review) => {
  //   console.log("hey buddy i am underrevieeeeeeeeeeeeeeeee",under_review);
  //   try {
  //     if (typeof under_review === "string") {
  //       const parsedData = JSON.parse(under_review);
  //       if (parsedData && parsedData.coord) {
  //         return parsedData;
  //       }
  //       return null;
  //     }
  //     return null;
  //   } catch (error) {
  //     console.error("Error parsing under_review:", error);
  //     return null;
  //   }
  // };

  const parseUnderReview = (under_review) => {
    console.log("Received under_review data:", under_review);
  
    try {
      if (typeof under_review === "string") {
        const parsedData = JSON.parse(under_review);
  
        // Check if the data is wrapped in an additional key like "htn10"
        const keys = Object.keys(parsedData);
        if (keys.length === 1 && typeof parsedData[keys[0]] === 'object') {
          const innerData = parsedData[keys[0]]; // Extract the inner object
          if (innerData && innerData.coord) {
            return innerData; // Return the inner object
          }
        } 
        
        // If no nested key, return the parsedData directly
        if (parsedData && parsedData.coord) {
          return parsedData;
        }
  
        return null; // Return null if no coord found
      }
  
      return null;
    } catch (error) {
      console.error("Error parsing under_review:", error);
      return null;
    }
  };
  
 
  const  parseUnderReview2 = (under_review) => {
    console.log("Received  parseUnderReview2 data...:", under_review);
  
    try {
      if (typeof under_review === "string") {

        const parsedData = JSON.parse(under_review);
        // console.log("hey budddyyy i am parseUnderReview2....",parsedData[0]);
  
        // Check if the data is wrapped in an additional key like "htn10"
        const keys = Object.keys(parsedData);
        console.log("hey budddyyy i am keyyyyyyyyyy....",keys[0]);
        if (keys.length === 1) {
          const innerData = keys[0];
          if (innerData ) {
            return innerData; // Return the inner object
          }
        } 
  
        return null; // Return null if no coord found
      }
  
      return null;
    } catch (error) {
      console.error("Error parsing under_review:", error);
      return null;
    }
  };
  







  const handleCheckboxChange = (imageId, option) => {
    setSelectedOptions((prevState) => {
      const currentOptions = prevState[imageId] || [];
      const isSelected = currentOptions.includes(option);

      return {
        ...prevState,
        [imageId]: isSelected
          ? currentOptions.filter((opt) => opt !== option)
          : [...currentOptions, option],
      };
    });
  };


   useEffect(() => {
      // Only update the tick status once, not during the render
      data.data.forEach((image) => {
        console.log("Image ID:", image.ID, "Status:", image.status);
        
        // You can process each image's status here
        if (image.status === "1" || image.status === "2" ) {
          setTickStatus((prevStatus) => ({ ...prevStatus, [image.ID]: true }));
        }
      });
    }, [data]); // Run this effect when image.status or image.ID changes
  
const renderInputBasedOnType = (image) => {
  console.log("hey i am imageeeee....", image);
  const parsedData = parseUnderReview(image.under_review);

  const parsedData2 = parseUnderReview2(image.under_review);
console.log("hey i am parsedData2............", parsedData2);
 
  if (!parsedData) return null;

  const { type, coord, result } = parsedData;
  // Check if the status is "1" or "2"
   // Extract the key from the 'coord' object (e.g., Qn48)
  
   console.log("Extracted key: ", parsedData2);
 
  const isStatusOneOrTwo = image.status === "1" || image.status === "2";



  if (type === "hall_ticket_no_parent" || (type === "Question" && coord)) {
    
    return (
      <div>
        {/* Display parsedData2 on the screen */}
        <div style={{ marginBottom: "10px", fontWeight: "bold" }}>
          {parsedData2}
        </div>

        {/* Render the checkboxes */}
        {Object.keys(coord)
          .filter((key) => key.length === 1 && key.match(/[a-z]/)) // Filtering only keys like 'a', 'b', 'c', 'd'
          .map((key, index) => {
            console.log("hey i am keyyyyy...", key, "and", index);
            console.log("parsedData2 inside map: ", parsedData2); // Logging parsedData2 inside the map

            const isChecked = isStatusOneOrTwo && result && result.toLowerCase() === key;

            return (
              <label key={index} style={{ marginRight: "8px" }}>
                <input
                  type="checkbox"
                  name={key}
                  value={key}
                  onChange={() => handleCheckboxChange(image.ID, key.toUpperCase())}
                  checked={isChecked || (selectedOptions[image.ID] || []).includes(key.toUpperCase())}
                />
                {key.toUpperCase()}
              </label>
            );
          })}
      </div>
    );
  } else if (type === "Rollnumber") {
    return <input type="text" placeholder="Enter Rollnumber" />;
  }

  return null;
};

  const handleAction = async (action, image) => {

    console.log("hey i am image.....",image );

    let resultValue = selectedOptions[image.ID];

  
    resultValue = resultValue ? resultValue.map((option) => option.toLowerCase()) : [];
    resultValue = resultValue.length === 1 ? resultValue[0] : resultValue;

    if (action === "save" && (!resultValue || resultValue.length === 0)) {
      toast.error("Please select a checkbox before saving.");
      return;
    }

    const payload = {
      template_name: image.template_name,
      batch_name: image.batch_name,
      question_paper_name: image.question_paper_name,
      id: image.ID,
      result: action === "skip" ? "" : resultValue,
      action,
    };

    try {
        const response = await fetch(`${process.env.REACT_APP_API_URI}/upload/updateJsonResult`, {
        
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success(`Successfully ${action === "save" ? "saved" : "skipped"} the result!`);
        setActionStatus((prevStatus) => ({ ...prevStatus, [image.ID]: action }));
        setTickStatus((prevStatus) => ({ ...prevStatus, [image.ID]: true }));

        // Crop the image after saving
        const coordinates = parseUnderReview(image.under_review)?.coord?.region;
        console.log("hey i am coordinatessssssssssssssssss",coordinates);
     
      } else {
        toast.error("Failed to update the result.");
        console.error("API request failed:", response.statusText);
      }
    } catch (error) {
      toast.error("Error in API call.");
      console.error("Error in API call:", error);
    }
  };

  const handleSubmit = async () => {
    if (!isSubmitEnabled) {
      return toast.error("All reviews should be checked before submitting");
    }

    const submitPayload = {
      template_name: data.data[0].template_name,
      batch_name: data.data[0].batch_name,
      question_paper_name: data.data[0].question_paper_name,
    };

    try {
      // const response = await fetch("http://localhost:4002/api/v1/upload/submitupdateJsonResult", {
        const response = await fetch(`${process.env.REACT_APP_API_URI}/upload/submitupdateJsonResult`, {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitPayload),
      });
      const flagData = await response.json();
      setFlagData(flagData); // Save the flag data in state

      console.log("i am responsebudddyyyyyyyy", flagData.data.flag);

      if(flagData.data.flag == 1){
        toast.success( flagData.message);
        setIsSubmit(false);
        return;
      }
       if (response.ok) {
        toast.success("All data submitted successfully!");
      } else {
        toast.error("Failed to submit data.");
        console.error("Submit API request failed:", response.statusText);
      }
    } catch (error) {
      toast.error("Error submitting data.");
      console.error("Error in submit API call:", error);
    }
  };

  return (
    <div className="details-modal">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="details-modal-content">
        <span className="close-button" onClick={closeDetails}>
          &times;
        </span>
        <h3>Question Paper Details</h3>

        <table className="modal-table">
          <thead>
            <tr>
              <th>Cropped Images</th>
              <th>Option</th>
              <th>Action</th>
              <th>Tick</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((image, index) => (
              <tr key={index}>
                {/* <td>
                  <img
                    // src={`${process.env.REACT_APP_FILE_URI}${image.ques_paper_image_path}`}
                    src={`${process.env.REACT_APP_FILE_URI}${image.template_name}/${image.batch_name}/${image.ques_paper_image_path}`}
                    alt={image.ques_paper_image_path}
                    className="table-image"
                  />
                </td> */}
                <td>
                  <img
                    src={`${process.env.REACT_APP_FILE_URI}${image.cropped_image}`}
                    alt={image.ques_paper_image_path}
                    className="table-image"
                  />
                </td>
                <td>{renderInputBasedOnType(image)}</td>
                {/* <td>
                  <button className="save-button" onClick={() => handleAction("save", image)}>
                    Save
                  </button>
                  <button
                    className="skip-button"
                    onClick={() => handleAction("skip", image)}
                    disabled={!!selectedOptions[image.ID]?.length}
                    style={{
                      backgroundColor: !!selectedOptions[image.ID]?.length ? "#ccc" : "#f44336",
                      cursor: !!selectedOptions[image.ID]?.length ? "not-allowed" : "pointer",
                    }}
                  >
                    Skip
                  </button>
                </td> */}
                <td>
  {image.status !== "1" && image.status !== "2" && (
    <>
      <button className="save-button" onClick={() => handleAction("save", image)}>
        Save
      </button>
      <button
        className="skip-button"
        onClick={() => handleAction("skip", image)}
        disabled={!!selectedOptions[image.ID]?.length}
        style={{
          backgroundColor: !!selectedOptions[image.ID]?.length ? "#ccc" : "#f44336",
          cursor: !!selectedOptions[image.ID]?.length ? "not-allowed" : "pointer",
        }}
      >
        Skip
      </button>
    </>
  )}
</td>


                <td>
                  <button
                    className="tick-button"
                    disabled={!tickStatus[image.ID]&& image.status !== "1" && image.status !== "2"}
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: tickStatus[image.ID] ? "#4caf50" : "#ccc",
                      cursor: tickStatus[image.ID] ? "pointer" : "not-allowed",
                      width: "30px",
                    }}
                  >
                    &#10003;
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
{/* 
        <div className="submit-container">
          <button
            className="submit-button"
            onClick={handleSubmit}
            style={{
              backgroundColor: isSubmitEnabled ? "#4CAF50" : "#ccc",
              cursor: isSubmitEnabled ? "pointer" : "not-allowed",
              marginTop: "20px",
              padding: "10px 20px",
            }}
          >
            Submit
          </button>
        </div> */}


<div className="submit-container">
    {/* Check if flagData exists and flagData.data.flag is not 1 */}

   
    {isSubmit && (
        <button
          className="submit-button"
          onClick={handleSubmit}
          style={{
            backgroundColor: isSubmitEnabled ? "#4CAF50" : "#ccc",
            cursor: isSubmitEnabled ? "pointer" : "not-allowed",
            marginTop: "20px",
            padding: "10px 20px",
          }}
        >
          Submit
        </button>
      )}
  </div>




        <div>

     

        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </div>

      </div>
    </div>
  );
};

export default ReviewQuestionPaper;






