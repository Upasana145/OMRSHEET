import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkTypeArr } from "../utils/smallFun";

const ReviewQuestionPaper = ({
  data,
  closeDetails,
  fetchImages,
  selectedBatch,
}) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [actionStatus, setActionStatus] = useState({});
  const [tickStatus, setTickStatus] = useState({});
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [isSubmit, setIsSubmit] = useState(true);

  // Always call useEffect, handle the condition inside
  useEffect(() => {
    if (data && data.data) {
      const allTickEnabled = data.data.every((image) => tickStatus[image.ID]);
      setIsSubmitEnabled(allTickEnabled);
    }
  }, [tickStatus, data]);

  const parseUnderReview = (under_review) => {
    try {
      if (typeof under_review === "string") {
        const parsedData = JSON.parse(under_review);

        // Check if the data is wrapped in an additional key like "htn10"
        const keys = Object.keys(parsedData);
        if (keys.length === 1 && typeof parsedData[keys[0]] === "object") {
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

  const parseUnderReview2 = (under_review) => {
    try {
      if (typeof under_review === "string") {
        const parsedData = JSON.parse(under_review);

        // Check if the data is wrapped in an additional key like "htn10"
        const keys = Object.keys(parsedData);
        if (keys.length === 1) {
          const innerData = keys[0];
          if (innerData) {
            return innerData;
          }
        }

        return null;
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
      if (image.status === "1" || image.status === "2") {
        setTickStatus((prevStatus) => ({ ...prevStatus, [image.ID]: true }));
      }
    });
  }, [data]);

  const renderInputBasedOnType = (image) => {
    const parsedData = parseUnderReview(image.under_review);
    const parsedData2 = parseUnderReview2(image.under_review);

    if (!parsedData) return null;

    const { type, coord, result } = parsedData;

    const isStatusOneOrTwo = image.status === "1" || image.status === "2";

    if (coord) {
      return (
        <>
          <p>{parsedData2}</p>

          {Object.keys(coord)
            .filter((key) => key.length === 1) // && key.match(/[A-Z]/) Filtering only keys like 'a', 'b', 'c', 'd'
            .map((key, index) => {
              console.log("result", result, index, key);
              const isChecked =
                isStatusOneOrTwo &&
                checkTypeArr(result) &&
                result.filter((re) => re.toUpperCase() === key).length > 0;

              return (
                <label key={index}>
                  <input
                    type="checkbox"
                    name={key}
                    value={key}
                    onChange={() =>
                      handleCheckboxChange(image.ID, key.toUpperCase())
                    }
                    checked={
                      isChecked ||
                      (selectedOptions[image.ID] || []).includes(
                        key.toUpperCase()
                      )
                    }
                  />
                  <span>{key.toUpperCase()}</span>
                </label>
              );
            })}
        </>
      );
    } else if (type === "roll_number") {
      return <input type="text" placeholder="Enter Rollnumber" />;
    }

    return null;
  };

  const handleAction = async (action, image) => {
    let resultValue = selectedOptions[image.ID];

    resultValue = resultValue
      ? resultValue.map((option) => option.toLowerCase())
      : [];
    // resultValue = resultValue.length === 1 ? resultValue[0] : resultValue;

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
      const response = await fetch(
        `${process.env.REACT_APP_API_URI}/upload/updateJsonResult`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        setActionStatus((prevStatus) => ({
          ...prevStatus,
          [image.ID]: action,
        }));
        setTickStatus((prevStatus) => ({ ...prevStatus, [image.ID]: true }));

        // Crop the image after saving
        // const coordinates = parseUnderReview(image.under_review)?.coord?.region;
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
      const response = await fetch(
        `${process.env.REACT_APP_API_URI}/upload/submitupdateJsonResult`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submitPayload),
        }
      );
      const data = await response.json();
      if (!data.status) {
        return toast.error(data.message);
      } else {
        await fetchImages(selectedBatch);
        closeDetails();
        return toast.success("All data submitted successfully!");
      }
      // if (data.data.flag == 1) {
      //   setIsSubmit(false);
      //   closeDetails();
      //   return toast.success(data.message);
      // }
      // if (response.ok) {
      //   closeDetails();
      //   toast.success("All data submitted successfully!");
      // } else {
      //   toast.error("Failed to submit data.");
      //   console.error("Submit API request failed:", response.statusText);
      // }
    } catch (error) {
      toast.error("Error submitting data.");
      console.error("Error in submit API call:", error.message);
    }
  };

  return (
    <div className="details-modal">
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
                <td>
                  <img
                    src={`${process.env.REACT_APP_FILE_URI}${image.template_name}/${image.batch_name}/${image.cropped_image}`}
                    alt={image.ques_paper_image_path}
                    className="table-image"
                  />
                </td>
                <td className="options">{renderInputBasedOnType(image)}</td>
                <td>
                  {image.status !== "1" && image.status !== "2" && (
                    <>
                      <button
                        className="save-button"
                        onClick={() => handleAction("save", image)}
                      >
                        Save
                      </button>
                      <button
                        className="skip-button"
                        onClick={() => handleAction("skip", image)}
                        disabled={!!selectedOptions[image.ID]?.length}
                        style={{
                          backgroundColor: !!selectedOptions[image.ID]?.length
                            ? "#ccc"
                            : "#f44336",
                          cursor: !!selectedOptions[image.ID]?.length
                            ? "not-allowed"
                            : "pointer",
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
                    disabled={
                      !tickStatus[image.ID] &&
                      image.status !== "1" &&
                      image.status !== "2"
                    }
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

        <div className="submit-container">
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
      </div>
    </div>
  );
};

export default ReviewQuestionPaper;
