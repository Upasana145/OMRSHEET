// this code is working code till now...date:-18092024

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
  if (!parsedData) return null;

  const { type, coord, result } = parsedData;
  // Check if the status is "1" or "2"
  const isStatusOneOrTwo = image.status === "1" || image.status === "2";



  if (type === "hall_ticket_no_parent" || (type === "Question" && coord)) {
    return Object.keys(coord)
      .filter((key) => key.length === 1 && key.match(/[a-z]/))
      .map((key, index) => {
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
      });
  } else if (type === "Rollnumber") {
    return <input type="text" placeholder="Enter Rollnumber" />;
  }

  return null;
};

// ****************************************
// Main rendering function
// const renderInputBasedOnType = (image) => {
//   console.log("Rendering image data: ", image);

//   // Loop through the dynamic keys in the image object
//   return Object.keys(image).map((key) => {
//     // Parse the under_review field if needed
//     const parsedData = image[key].under_review 
//       ? parseUnderReview(image[key].under_review) 
//       : image[key];

//     // if (!parsedData) return null;
//     if (!parsedData) {
//       console.log("No parsed data for key:", key); // Debugging log
//       return null;
//     }


//     const { type, coord, result } = parsedData;
//     // Check if the status is "1" or "2"
//     const isStatusOneOrTwo = image.status === "1" || image.status === "2";

//     // Render checkboxes dynamically based on "coord" object
//     if (type === "hall_ticket_no_parent" || (type === "Question" && coord)) {
//       return (
//         <div key={key}>
//           {Object.keys(coord)
//             .filter((coordKey) => coordKey.length === 1 && coordKey.match(/[a-z]/))
//             .map((coordKey, index) => {
//               const isChecked =
//                 isStatusOneOrTwo && result && result.toLowerCase() === coordKey;
//               return (
//                 <label key={index} style={{ marginRight: "8px" }}>
//                   <input
//                     type="checkbox"
//                     name={coordKey}
//                     value={coordKey}
//                     onChange={() =>
//                       handleCheckboxChange(parsedData.ID, coordKey.toUpperCase())
//                     }
//                     checked={
//                       isChecked ||
//                       (selectedOptions[parsedData.ID] || []).includes(coordKey.toUpperCase())
//                     }
//                   />
//                   {coordKey.toUpperCase()}
//                 </label>
//               );
//             })}
//         </div>
//       );
//     }

//     return null;
//   });
// };

  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [resizedImageUrl, setResizedImageUrl] = useState(null); // New state for resized image


  const cropImage = (imageSrc, coordinates) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "anonymous";
  
    img.onload = () => {
      const resizeWidth = 800;
      const resizeHeight = 1200;
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");
      tempCanvas.width = resizeWidth;
      tempCanvas.height = resizeHeight;
      tempCtx.drawImage(img, 0, 0, resizeWidth, resizeHeight);
  
      // Extract x1, y1, x2, y2
      const [x1, y1, x2, y2] = coordinates.region;
      
      // Compute width and height using absolute values
      const cropWidth = Math.abs(x2 - x1);
      const cropHeight = Math.abs(y2 - y1);
  
      // Ensure the cropping coordinates are correct
      // const cropX = Math.min(x1, x2);
      const cropX = x2;
      // const cropY = Math.min(y1, y2);
      
      const cropY = y2;
      canvas.width = cropWidth;
      canvas.height = cropHeight;
  
      // Crop the image based on the new width and height
      ctx.drawImage(
        tempCanvas,  // Source: resized image
        cropX,       // X-coordinate of the top-left corner of the crop area
        cropY,       // Y-coordinate of the top-left corner of the crop area
        cropWidth,   // Width of the crop area
        cropHeight,  // Height of the crop area
        0,           // X-coordinate on the destination canvas
        0,           // Y-coordinate on the destination canvas
        cropWidth,   // Width to draw on the destination canvas
        cropHeight   // Height to draw on the destination canvas
      );
  
      try {
        const croppedImage = canvas.toDataURL("image/png");
        setCroppedImageUrl(croppedImage);
      } catch (error) {
        console.error("Error converting canvas to data URL:", error);
      }
    };
  
    img.onerror = (error) => {
      console.error("Error loading image:", error);
    };
  
    img.src = imageSrc;  // Set the image source
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
      // const response = await fetch("http://localhost:4002/api/v1/upload/updateJsonResult", {
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
        if (coordinates) {
          cropImage(
            `${process.env.REACT_APP_FILE_URI}${image.ques_paper_image_path}`,
            { region: coordinates },
            800, // Assuming full image width
            1200 // Assuming full image height
          );
        }
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
                <td>
                  <img
                    src={`${process.env.REACT_APP_FILE_URI}${image.ques_paper_image_path}`}
                    alt={image.ques_paper_image_path}
                    className="table-image"
                  />
                </td>
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







// ******************************************************
// below code is working fine dated:-17092024, i have done modification in the same code for the above
// checking done
// import React, { useState, useEffect, useRef } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const ReviewQuestionPaper = ({ data, closeDetails }) => {
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [actionStatus, setActionStatus] = useState({});
//   const [tickStatus, setTickStatus] = useState({});
//   const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
//   const canvasRef = useRef(null);

//   // Always call useEffect, handle the condition inside
//   useEffect(() => {
//     if (data && data.data) {
//       console.log("hey buddy i am data", data);
//       const allTickEnabled = data.data.every((image) => tickStatus[image.ID]);
//       setIsSubmitEnabled(allTickEnabled);
//     }
//   }, [tickStatus, data]); // Make sure the hook depends on the necessary state and props
//   console.log("data.data....", data.data);

//   const parseUnderReview = (under_review) => {
//     try {
//       if (typeof under_review === "string") {
//         const parsedData = JSON.parse(under_review);
//         if (parsedData && parsedData.coord) {
//           return parsedData;
//         }
//         return null;
//       }
//       return null;
//     } catch (error) {
//       console.error("Error parsing under_review:", error);
//       return null;
//     }
//   };

//   const handleCheckboxChange = (imageId, option) => {
//     setSelectedOptions((prevState) => {
//       const currentOptions = prevState[imageId] || [];
//       const isSelected = currentOptions.includes(option);

//       return {
//         ...prevState,
//         [imageId]: isSelected
//           ? currentOptions.filter((opt) => opt !== option)
//           : [...currentOptions, option],
//       };
//     });
//   };

// //*************** */
//   // const renderInputBasedOnType = (image) => {
//   //   console.log("hey i am imageeeee....", image);
    
//   //   const parsedData = parseUnderReview(image.under_review);
//   // if(image.status === "1"){
//   //   setTickStatus((prevStatus) => ({ ...prevStatus, [image.ID]: true }));
//   // }
    
    
//   //   if (!parsedData) return null;
  
//   //   const { type, coord, result } = parsedData;
//   //   const isStatusOne = image.status === "1" || image.status === "2";
    
  
//   //   if (type === "hall_ticket_no_parent" || (type === "Question" && coord)) {
//   //     return Object.keys(coord)
//   //       .filter((key) => key.length === 1 && key.match(/[a-z]/))
//   //       .map((key, index) => {
//   //         const isChecked = isStatusOne && result && result.toLowerCase() === key;
//   //         return (
//   //           <label key={index} style={{ marginRight: "8px" }}>
//   //             <input
//   //               type="checkbox"
//   //               name={key}
//   //               value={key}
//   //               onChange={() => handleCheckboxChange(image.ID, key.toUpperCase())}
//   //               checked={isChecked || (selectedOptions[image.ID] || []).includes(key.toUpperCase())}
//   //             />
              
//   //             {key.toUpperCase()}
//   //           </label>
//   //         );
//   //       });
//   //   } else if (type === "Rollnumber") {
//   //     return <input type="text" placeholder="Enter Rollnumber" />;
//   //   }
    
//   //   return null;
//   // };

//    useEffect(() => {
//       // Only update the tick status once, not during the render
//       data.data.forEach((image) => {
//         console.log("Image ID:", image.ID, "Status:", image.status);
        
//         // You can process each image's status here
//         if (image.status === "1" || image.status === "2" ) {
//           setTickStatus((prevStatus) => ({ ...prevStatus, [image.ID]: true }));
//         }
//       });
//     }, [data]); // Run this effect when image.status or image.ID changes
  
//   // const renderInputBasedOnType = (image) => {
//   //   console.log("hey i am imageeeee....", image);
    
//   //   const parsedData = parseUnderReview(image.under_review);
  
   
//   //   if (!parsedData) return null;
  
//   //   const { type, coord, result } = parsedData;
//   //   const isStatusOne = image.status === "1" || image.status === "2";
  
//   //   if (type === "hall_ticket_no_parent" || (type === "Question" && coord)) {
//   //     return Object.keys(coord)
//   //       .filter((key) => key.length === 1 && key.match(/[a-z]/))
//   //       .map((key, index) => {
//   //         const isChecked = isStatusOne || (result && result.toLowerCase() === key);
//   //         return (
//   //           <label key={index} style={{ marginRight: "8px" }}>
//   //             <input
//   //               type="checkbox"
//   //               name={key}
//   //               value={key}
//   //               onChange={() => handleCheckboxChange(image.ID, key.toUpperCase())}
//   //               checked={isChecked || (selectedOptions[image.ID] || []).includes(key.toUpperCase())}
//   //             />
//   //             {key.toUpperCase()}
//   //           </label>
//   //         );
//   //       });
//   //   } else if (type === "Rollnumber") {
//   //     return <input type="text" placeholder="Enter Rollnumber" />;
//   //   }
  
//   //   return null;
//   // };
// //  ****************

// // mra apna code phle ka  niche wala
// // const renderInputBasedOnType = (image) => {
// //   console.log("hey i am imageeeee....", image);
  
// //   const parsedData = parseUnderReview(image.under_review);
  
// //   if (!parsedData) return null;

// //   const { type, coord, result } = parsedData;
// //   const isStatusOne = image.status === "1";

// //   if (type === "hall_ticket_no_parent" || (type === "Question" && coord)) {
// //     return Object.keys(coord)
// //       .filter((key) => key.length === 1 && key.match(/[a-z]/))
// //       .map((key, index) => {
// //         const isChecked = isStatusOne && result && result.toLowerCase() === key;
// //         return (
// //           <label key={index} style={{ marginRight: "8px" }}>
// //             <input
// //               type="checkbox"
// //               name={key}
// //               value={key}
// //               onChange={() => handleCheckboxChange(image.ID, key.toUpperCase())}
// //               checked={isChecked || (selectedOptions[image.ID] || []).includes(key.toUpperCase())}
// //             />
// //             {key.toUpperCase()}
// //           </label>
// //         );
// //       });
// //   } else if (type === "Rollnumber") {
// //     return <input type="text" placeholder="Enter Rollnumber" />;
// //   }
  
// //   return null;
// // };
// // ******************************
// const renderInputBasedOnType = (image) => {
//   console.log("hey i am imageeeee....", image);

//   const parsedData = parseUnderReview(image.under_review);

//   if (!parsedData) return null;

//   const { type, coord, result } = parsedData;
//   // Check if the status is "1" or "2"
//   const isStatusOneOrTwo = image.status === "1" || image.status === "2";

//   if (type === "hall_ticket_no_parent" || (type === "Question" && coord)) {
//     return Object.keys(coord)
//       .filter((key) => key.length === 1 && key.match(/[a-z]/))
//       .map((key, index) => {
//         const isChecked = isStatusOneOrTwo && result && result.toLowerCase() === key;
//         return (
//           <label key={index} style={{ marginRight: "8px" }}>
//             <input
//               type="checkbox"
//               name={key}
//               value={key}
//               onChange={() => handleCheckboxChange(image.ID, key.toUpperCase())}
//               checked={isChecked || (selectedOptions[image.ID] || []).includes(key.toUpperCase())}
//             />
//             {key.toUpperCase()}
//           </label>
//         );
//       });
//   } else if (type === "Rollnumber") {
//     return <input type="text" placeholder="Enter Rollnumber" />;
//   }

//   return null;
// };


//   const [croppedImageUrl, setCroppedImageUrl] = useState(null);
//   const [resizedImageUrl, setResizedImageUrl] = useState(null); // New state for resized image


//   const cropImage = (imageSrc, coordinates) => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     const img = new Image();
//     img.crossOrigin = "anonymous";
  
//     img.onload = () => {
//       const resizeWidth = 800;
//       const resizeHeight = 1200;
//       const tempCanvas = document.createElement("canvas");
//       const tempCtx = tempCanvas.getContext("2d");
//       tempCanvas.width = resizeWidth;
//       tempCanvas.height = resizeHeight;
//       tempCtx.drawImage(img, 0, 0, resizeWidth, resizeHeight);
  
//       // Extract x1, y1, x2, y2
//       const [x1, y1, x2, y2] = coordinates.region;
      
//       // Compute width and height using absolute values
//       const cropWidth = Math.abs(x2 - x1);
//       const cropHeight = Math.abs(y2 - y1);
  
//       // Ensure the cropping coordinates are correct
//       // const cropX = Math.min(x1, x2);
//       const cropX = x2;
//       // const cropY = Math.min(y1, y2);
      
//       const cropY = y2;
//       canvas.width = cropWidth;
//       canvas.height = cropHeight;
  
//       // Crop the image based on the new width and height
//       ctx.drawImage(
//         tempCanvas,  // Source: resized image
//         cropX,       // X-coordinate of the top-left corner of the crop area
//         cropY,       // Y-coordinate of the top-left corner of the crop area
//         cropWidth,   // Width of the crop area
//         cropHeight,  // Height of the crop area
//         0,           // X-coordinate on the destination canvas
//         0,           // Y-coordinate on the destination canvas
//         cropWidth,   // Width to draw on the destination canvas
//         cropHeight   // Height to draw on the destination canvas
//       );
  
//       try {
//         const croppedImage = canvas.toDataURL("image/png");
//         setCroppedImageUrl(croppedImage);
//       } catch (error) {
//         console.error("Error converting canvas to data URL:", error);
//       }
//     };
  
//     img.onerror = (error) => {
//       console.error("Error loading image:", error);
//     };
  
//     img.src = imageSrc;  // Set the image source
//   };
  
//   const handleAction = async (action, image) => {

//     console.log("hey i am image.....",image );

//     let resultValue = selectedOptions[image.ID];

  
//     resultValue = resultValue ? resultValue.map((option) => option.toLowerCase()) : [];
//     resultValue = resultValue.length === 1 ? resultValue[0] : resultValue;

//     if (action === "save" && (!resultValue || resultValue.length === 0)) {
//       toast.error("Please select a checkbox before saving.");
//       return;
//     }

//     const payload = {
//       template_name: image.template_name,
//       batch_name: image.batch_name,
//       question_paper_name: image.question_paper_name,
//       id: image.ID,
//       result: action === "skip" ? "" : resultValue,
//       action,
//     };

//     try {
//       const response = await fetch("http://localhost:4002/api/v1/upload/updateJsonResult", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         toast.success(`Successfully ${action === "save" ? "saved" : "skipped"} the result!`);
//         setActionStatus((prevStatus) => ({ ...prevStatus, [image.ID]: action }));
//         setTickStatus((prevStatus) => ({ ...prevStatus, [image.ID]: true }));
//         // if (image.status === "1" || image.status === "2") {
//         //   setTickStatus((prevStatus) => ({ ...prevStatus, [image.ID]: true }));
//         // }

//         // Crop the image after saving
//         const coordinates = parseUnderReview(image.under_review)?.coord?.region;
//         console.log("hey i am coordinates",coordinates);
//         if (coordinates) {
//           cropImage(
//             `${process.env.REACT_APP_FILE_URI}${image.ques_paper_image_path}`,
//             { region: coordinates },
//             800, // Assuming full image width
//             1200 // Assuming full image height
//           );
//         }
//       } else {
//         toast.error("Failed to update the result.");
//         console.error("API request failed:", response.statusText);
//       }
//     } catch (error) {
//       toast.error("Error in API call.");
//       console.error("Error in API call:", error);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!isSubmitEnabled) {
//       return toast.error("All reviews should be checked before submitting");
//     }

//     const submitPayload = {
//       template_name: data.data[0].template_name,
//       batch_name: data.data[0].batch_name,
//       question_paper_name: data.data[0].question_paper_name,
//     };

//     try {
//       const response = await fetch("http://localhost:4002/api/v1/upload/submitupdateJsonResult", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(submitPayload),
//       });
//       const flagData = await response.json();

//       console.log("i am responsebudddyyyyyyyy", flagData.data.flag);

//       if(flagData.data.flag == 1){
//         toast.success( flagData.message);
//         return;
//       }
//        if (response.ok) {
//         toast.success("All data submitted successfully!");
//       } else {
//         toast.error("Failed to submit data.");
//         console.error("Submit API request failed:", response.statusText);
//       }
//     } catch (error) {
//       toast.error("Error submitting data.");
//       console.error("Error in submit API call:", error);
//     }
//   };

//   return (
//     <div className="details-modal">
//       <ToastContainer position="top-right" autoClose={3000} />
//       <div className="details-modal-content">
//         <span className="close-button" onClick={closeDetails}>
//           &times;
//         </span>
//         <h3>Question Paper Details</h3>

//         <table className="modal-table">
//           <thead>
//             <tr>
//               <th>Cropped Images</th>
//               <th>Option</th>
//               <th>Action</th>
//               <th>Tick</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.data.map((image, index) => (
//               <tr key={index}>
//                 <td>
//                   <img
//                     src={`${process.env.REACT_APP_FILE_URI}${image.ques_paper_image_path}`}
//                     alt={image.ques_paper_image_path}
//                     className="table-image"
//                   />
//                 </td>
//                 <td>
//                   <img
//                     src={`${process.env.REACT_APP_FILE_URI}${image.cropped_image}`}
//                     alt={image.ques_paper_image_path}
//                     className="table-image"
//                   />
//                 </td>
//                 <td>{renderInputBasedOnType(image)}</td>
//                 <td>
//                   <button className="save-button" onClick={() => handleAction("save", image)}>
//                     Save
//                   </button>
//                   <button
//                     className="skip-button"
//                     onClick={() => handleAction("skip", image)}
//                     disabled={!!selectedOptions[image.ID]?.length}
//                     style={{
//                       backgroundColor: !!selectedOptions[image.ID]?.length ? "#ccc" : "#f44336",
//                       cursor: !!selectedOptions[image.ID]?.length ? "not-allowed" : "pointer",
//                     }}
//                   >
//                     Skip
//                   </button>
//                 </td>
//                 <td>
//                   <button
//                     className="tick-button"
//                     disabled={!tickStatus[image.ID]&& image.status !== "1" && image.status !== "2"}
//                     style={{
//                       fontSize: "20px",
//                       fontWeight: "bold",
//                       color: tickStatus[image.ID] ? "#4caf50" : "#ccc",
//                       cursor: tickStatus[image.ID] ? "pointer" : "not-allowed",
//                       width: "30px",
//                     }}
//                   >
//                     &#10003;
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div className="submit-container">
//           <button
//             className="submit-button"
//             onClick={handleSubmit}
//             style={{
//               backgroundColor: isSubmitEnabled ? "#4CAF50" : "#ccc",
//               cursor: isSubmitEnabled ? "pointer" : "not-allowed",
//               marginTop: "20px",
//               padding: "10px 20px",
//             }}
//           >
//             Submit
//           </button>
//         </div>
//         <div>

//         <h3>Resized Image</h3>
//       {resizedImageUrl && (
//         <img src={resizedImageUrl} alt="Resized" style={{ maxWidth: "800px", maxHeight: "1200px" }} />
//       )}

//       <h3>Cropped Image</h3>
//       {croppedImageUrl && (
//         <img src={croppedImageUrl} alt="Cropped" style={{ maxWidth: "800px", maxHeight: "1200px" }} />
//       )}

//         <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
//     </div>

//       </div>
//     </div>
//   );
// };

// export default ReviewQuestionPaper;














// crop functionality is implemeneted bottom
//checking done:- only for testing work but this code is working:

// import React, { useState, useEffect, useRef } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const ReviewQuestionPaper = ({ data, closeDetails }) => {
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [actionStatus, setActionStatus] = useState({});
//   const [tickStatus, setTickStatus] = useState({});
//   const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
//   const canvasRef = useRef(null);

//   // Always call useEffect, handle the condition inside
//   useEffect(() => {
//     if (data && data.data) {
//       const allTickEnabled = data.data.every((image) => tickStatus[image.ID]);
//       setIsSubmitEnabled(allTickEnabled);
//     }
//   }, [tickStatus, data]); // Make sure the hook depends on the necessary state and props
//   console.log("data.data....", data.data);

//   const parseUnderReview = (under_review) => {
//     try {
//       if (typeof under_review === "string") {
//         const parsedData = JSON.parse(under_review);
//         if (parsedData && parsedData.coord) {
//           return parsedData;
//         }
//         return null;
//       }
//       return null;
//     } catch (error) {
//       console.error("Error parsing under_review:", error);
//       return null;
//     }
//   };

//   const handleCheckboxChange = (imageId, option) => {
//     setSelectedOptions((prevState) => {
//       const currentOptions = prevState[imageId] || [];
//       const isSelected = currentOptions.includes(option);

//       return {
//         ...prevState,
//         [imageId]: isSelected
//           ? currentOptions.filter((opt) => opt !== option)
//           : [...currentOptions, option],
//       };
//     });
//   };

//   const renderInputBasedOnType = (image) => {
//     const parsedData = parseUnderReview(image.under_review);
//     if (!parsedData) return null;

//     const { type, coord } = parsedData;
//     if (type === "hall_ticket_no_parent" || (type === "Question" && coord)) {
//       return Object.keys(coord)
//         .filter((key) => key.length === 1 && key.match(/[a-z]/))
//         .map((key, index) => (
//           <label key={index} style={{ marginRight: "8px" }}>
//             <input
//               type="checkbox"
//               name={key}
//               value={key}
//               onChange={() => handleCheckboxChange(image.ID, key.toUpperCase())}
//               checked={(selectedOptions[image.ID] || []).includes(key.toUpperCase())}
//             />
//             {key.toUpperCase()}
//           </label>
//         ));
//     } else if (type === "Rollnumber") {
//       return <input type="text" placeholder="Enter Rollnumber" />;
//     }
//     return null;
//   };

//   // const cropImage = (imageSrc, coordinates, imageWidth, imageHeight) => {
//   //   const canvas = canvasRef.current;
//   //   const ctx = canvas.getContext("2d");
//   //   const img = new Image();

//   //   img.onload = () => {
//   //     // Set canvas size
//   //     canvas.width = coordinates.region[2];
//   //     canvas.height = coordinates.region[3];

//   //     // Draw cropped image
//   //     ctx.drawImage(
//   //       img,
//   //       coordinates.region[0] * (canvas.width / imageWidth),
//   //       coordinates.region[1] * (canvas.height / imageHeight),
//   //       coordinates.region[2] * (canvas.width / imageWidth),
//   //       coordinates.region[3] * (canvas.height / imageHeight),
//   //       0,
//   //       0,
//   //       coordinates.region[2],
//   //       coordinates.region[3]
//   //     );
//   //   };

//   //   img.src = imageSrc;
//   // };

//   // ***************************************************
//   // const cropImage = (imageSrc, coordinates) => {
//   //   const canvas = canvasRef.current;
//   //   const ctx = canvas.getContext("2d");
//   //   const img = new Image();
  
//   //   // Set crossOrigin to allow cross-origin image access
//   //   img.crossOrigin = "anonymous";
  
//   //   img.onload = () => {
//   //     // Resize the image to 800x1200
//   //     const resizeWidth = 800;
//   //     const resizeHeight = 1200;
  
//   //     // Create a temporary canvas to resize the image
//   //     const tempCanvas = document.createElement("canvas");
//   //     const tempCtx = tempCanvas.getContext("2d");
//   //     tempCanvas.width = resizeWidth;
//   //     tempCanvas.height = resizeHeight;
  
//   //     // Draw the image resized to 800x1200
//   //     tempCtx.drawImage(img, 0, 0, resizeWidth, resizeHeight);
  
//   //     // Now, crop the resized image based on the coordinates
//   //     const [cropX, cropY, cropWidth, cropHeight] = coordinates.region;
  
//   //     // Set the final canvas size to match the crop area
//   //     canvas.width = cropWidth;
//   //     canvas.height = cropHeight;
  
//   //     // Draw the cropped portion from the resized image onto the final canvas
//   //     ctx.drawImage(
//   //       tempCanvas,  // Source: resized image
//   //       cropX,       // X-coordinate of the top-left corner of the crop area
//   //       cropY,       // Y-coordinate of the top-left corner of the crop area
//   //       cropWidth,   // Width of the crop area
//   //       cropHeight,  // Height of the crop area
//   //       0,           // X-coordinate on the destination canvas
//   //       0,           // Y-coordinate on the destination canvas
//   //       cropWidth,   // Width to draw on the destination canvas
//   //       cropHeight   // Height to draw on the destination canvas
//   //     );
  
//   //     // Convert cropped image to data URL and log it
//   //     try {
//   //       const croppedImageUrl = canvas.toDataURL("image/png");
//   //       console.log("Cropped Image URL:", croppedImageUrl);
//   //     } catch (error) {
//   //       console.error("Error converting canvas to data URL:", error);
//   //     }
//   //   };
  
//   //   img.onerror = (error) => {
//   //     console.error("Error loading image:", error);
//   //   };
  
//   //   img.src = imageSrc;  // Set the image source
//   // };
//   const [croppedImageUrl, setCroppedImageUrl] = useState(null);
//   const [resizedImageUrl, setResizedImageUrl] = useState(null); // New state for resized image

//   // **************
//   const cropImage = (imageSrc, coordinates) => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     const img = new Image();

//     // Set crossOrigin to avoid tainting the canvas
//     img.crossOrigin = "anonymous";

//     img.onload = () => {
//       // Resize the image to 800x1200
//       const resizeWidth = 800;
//       const resizeHeight = 1200;

//       // Create a temporary canvas to resize the image
//       const tempCanvas = document.createElement("canvas");
//       const tempCtx = tempCanvas.getContext("2d");
//       tempCanvas.width = resizeWidth;
//       tempCanvas.height = resizeHeight;

//       // Draw the image resized to 800x1200
//       tempCtx.drawImage(img, 0, 0, resizeWidth, resizeHeight);

//        // Convert resized image to data URL and set state
//        const resizedImage = tempCanvas.toDataURL("image/png");
//        setResizedImageUrl(resizedImage);


//       // Now, crop the resized image based on the coordinates
//       const [cropX, cropY, cropWidth, cropHeight] = coordinates.region;

//       // Set the final canvas size to match the crop area
//       canvas.width = cropWidth;
//       canvas.height = cropHeight;

//       // Draw the cropped portion from the resized image onto the final canvas
//       ctx.drawImage(
//         tempCanvas,  // Source: resized image
//         cropX,       // X-coordinate of the top-left corner of the crop area
//         cropY,       // Y-coordinate of the top-left corner of the crop area
//         cropWidth,   // Width of the crop area
//         cropHeight,  // Height of the crop area
//         0,           // X-coordinate on the destination canvas
//         0,           // Y-coordinate on the destination canvas
//         cropWidth,   // Width to draw on the destination canvas
//         cropHeight   // Height to draw on the destination canvas
//       );

//       // Convert cropped image to data URL and set it as the state
//       try {
//         const croppedImage = canvas.toDataURL("image/png");
//         setCroppedImageUrl(croppedImage);
//       } catch (error) {
//         console.error("Error converting canvas to data URL:", error);
//       }
//     };

//     img.onerror = (error) => {
//       console.error("Error loading image:", error);
//     };

//     img.src = imageSrc;  // Set the image source
//   };
// // **************
//   // *******************
//   // const cropImage = (imageSrc, coordinates) => {
//   //   const canvas = canvasRef.current;
//   //   const ctx = canvas.getContext("2d");
//   //   const img = new Image();
//   //   img.crossOrigin = "anonymous";
  
//   //   img.onload = () => {
//   //     const resizeWidth = 800;
//   //     const resizeHeight = 1200;
//   //     const tempCanvas = document.createElement("canvas");
//   //     const tempCtx = tempCanvas.getContext("2d");
//   //     tempCanvas.width = resizeWidth;
//   //     tempCanvas.height = resizeHeight;
//   //     tempCtx.drawImage(img, 0, 0, resizeWidth, resizeHeight);
  
//   //     // Extract x1, y1, x2, y2
//   //     const [x1, y1, x2, y2] = coordinates.region;
      
//   //     // Compute width and height using absolute values
//   //     const cropWidth = Math.abs(x2 - x1);
//   //     const cropHeight = Math.abs(y2 - y1);
  
//   //     // Ensure the cropping coordinates are correct
//   //     // const cropX = Math.min(x1, x2);
//   //     const cropX = x2;
//   //     // const cropY = Math.min(y1, y2);
      
//   //     const cropY = y2;
//   //     canvas.width = cropWidth;
//   //     canvas.height = cropHeight;
  
//   //     // Crop the image based on the new width and height
//   //     ctx.drawImage(
//   //       tempCanvas,  // Source: resized image
//   //       cropX,       // X-coordinate of the top-left corner of the crop area
//   //       cropY,       // Y-coordinate of the top-left corner of the crop area
//   //       cropWidth,   // Width of the crop area
//   //       cropHeight,  // Height of the crop area
//   //       0,           // X-coordinate on the destination canvas
//   //       0,           // Y-coordinate on the destination canvas
//   //       cropWidth,   // Width to draw on the destination canvas
//   //       cropHeight   // Height to draw on the destination canvas
//   //     );
  
//   //     try {
//   //       const croppedImage = canvas.toDataURL("image/png");
//   //       setCroppedImageUrl(croppedImage);
//   //     } catch (error) {
//   //       console.error("Error converting canvas to data URL:", error);
//   //     }
//   //   };
  
//   //   img.onerror = (error) => {
//   //     console.error("Error loading image:", error);
//   //   };
  
//   //   img.src = imageSrc;  // Set the image source
//   // };
  
//   // ***************************
//   const handleAction = async (action, image) => {
//     let resultValue = selectedOptions[image.ID];
//     resultValue = resultValue ? resultValue.map((option) => option.toLowerCase()) : [];
//     resultValue = resultValue.length === 1 ? resultValue[0] : resultValue;

//     if (action === "save" && (!resultValue || resultValue.length === 0)) {
//       toast.error("Please select a checkbox before saving.");
//       return;
//     }

//     const payload = {
//       template_name: image.template_name,
//       batch_name: image.batch_name,
//       question_paper_name: image.question_paper_name,
//       id: image.ID,
//       result: action === "skip" ? "" : resultValue,
//       action,
//     };

//     try {
//       const response = await fetch("http://localhost:4002/api/v1/upload/updateJsonResult", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         toast.success(`Successfully ${action === "save" ? "saved" : "skipped"} the result!`);
//         setActionStatus((prevStatus) => ({ ...prevStatus, [image.ID]: action }));
//         setTickStatus((prevStatus) => ({ ...prevStatus, [image.ID]: true }));

//         // Crop the image after saving
//         const coordinates = parseUnderReview(image.under_review)?.coord?.region;
//         console.log("hey i am coordinates",coordinates);
//         if (coordinates) {
//           cropImage(
//             `${process.env.REACT_APP_FILE_URI}${image.ques_paper_image_path}`,
//             { region: coordinates },
//             800, // Assuming full image width
//             1200 // Assuming full image height
//           );
//         }
//       } else {
//         toast.error("Failed to update the result.");
//         console.error("API request failed:", response.statusText);
//       }
//     } catch (error) {
//       toast.error("Error in API call.");
//       console.error("Error in API call:", error);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!isSubmitEnabled) {
//       return toast.error("All reviews should be checked before submitting");
//     }

//     const submitPayload = {
//       template_name: data.data[0].template_name,
//       batch_name: data.data[0].batch_name,
//       question_paper_name: data.data[0].question_paper_name,
//     };

//     try {
//       const response = await fetch("http://localhost:4002/api/v1/upload/submitupdateJsonResult", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(submitPayload),
//       });

//       if (response.ok) {
//         toast.success("All data submitted successfully!");
//       } else {
//         toast.error("Failed to submit data.");
//         console.error("Submit API request failed:", response.statusText);
//       }
//     } catch (error) {
//       toast.error("Error submitting data.");
//       console.error("Error in submit API call:", error);
//     }
//   };

//   return (
//     <div className="details-modal">
//       <ToastContainer position="top-right" autoClose={3000} />
//       <div className="details-modal-content">
//         <span className="close-button" onClick={closeDetails}>
//           &times;
//         </span>
//         <h3>Question Paper Details</h3>

//         <table className="modal-table">
//           <thead>
//             <tr>
//               <th>Cropped Images</th>
//               <th>Option</th>
//               <th>Action</th>
//               <th>Tick</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.data.map((image, index) => (
//               <tr key={index}>
//                 <td>
//                   <img
//                     src={`${process.env.REACT_APP_FILE_URI}${image.ques_paper_image_path}`}
//                     alt={image.ques_paper_image_path}
//                     className="table-image"
//                   />
//                 </td>
//                 <td>
//                   <img
//                     src={`${process.env.REACT_APP_FILE_URI}${image.cropped_image}`}
//                     alt={image.ques_paper_image_path}
//                     className="table-image"
//                   />
//                 </td>
//                 <td>{renderInputBasedOnType(image)}</td>
//                 <td>
//                   <button className="save-button" onClick={() => handleAction("save", image)}>
//                     Save
//                   </button>
//                   <button
//                     className="skip-button"
//                     onClick={() => handleAction("skip", image)}
//                     disabled={!!selectedOptions[image.ID]?.length}
//                     style={{
//                       backgroundColor: !!selectedOptions[image.ID]?.length ? "#ccc" : "#f44336",
//                       cursor: !!selectedOptions[image.ID]?.length ? "not-allowed" : "pointer",
//                     }}
//                   >
//                     Skip
//                   </button>
//                 </td>
//                 <td>
//                   <button
//                     className="tick-button"
//                     disabled={!tickStatus[image.ID]}
//                     style={{
//                       fontSize: "20px",
//                       fontWeight: "bold",
//                       color: tickStatus[image.ID] ? "#4caf50" : "#ccc",
//                       cursor: tickStatus[image.ID] ? "pointer" : "not-allowed",
//                       width: "30px",
//                     }}
//                   >
//                     &#10003;
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div className="submit-container">
//           <button
//             className="submit-button"
//             onClick={handleSubmit}
//             style={{
//               backgroundColor: isSubmitEnabled ? "#4CAF50" : "#ccc",
//               cursor: isSubmitEnabled ? "pointer" : "not-allowed",
//               marginTop: "20px",
//               padding: "10px 20px",
//             }}
//           >
//             Submit
//           </button>
//         </div>
//         <div>

//         <h3>Resized Image</h3>
//       {resizedImageUrl && (
//         <img src={resizedImageUrl} alt="Resized" style={{ maxWidth: "800px", maxHeight: "1200px" }} />
//       )}

//       <h3>Cropped Image</h3>
//       {croppedImageUrl && (
//         <img src={croppedImageUrl} alt="Cropped" style={{ maxWidth: "800px", maxHeight: "1200px" }} />
//       )}

//         <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
//         {/* Render the cropped image if available */}
//         {/* {croppedImageUrl && (
//         <div>
//           <h3>Cropped Image</h3>
//           <img src={croppedImageUrl} alt="Cropped" style={{ border: "1px solid black" }} />
//         </div>
//       )} */}

//       {/* Button to trigger the crop function (example usage)
//       <button
//         onClick={() => {
//           const imageSrc = `${process.env.REACT_APP_FILE_URI}${image.ques_paper_image_path}`;; // Replace with the actual image URL
          
//           const coordinates = { region: [738, 948, 256, 271] }; // Example coordinates from the JSON
//           cropImage(imageSrc, coordinates);
//         }}
//       >
//         Crop Image
//       </button> */}
//     </div>











//       </div>
//     </div>
//   );
// };

// export default ReviewQuestionPaper;







// before crop
// date:- 16092024, for submit 
// import React, { useState, useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const ReviewQuestionPaper = ({ data, closeDetails }) => {
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [actionStatus, setActionStatus] = useState({});
//   const [tickStatus, setTickStatus] = useState({});
//   const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);


//   // Always call useEffect, handle the condition inside
//   useEffect(() => {
//     if (data && data.data) {
//       const allTickEnabled = data.data.every((image) => tickStatus[image.ID]);
//       setIsSubmitEnabled(allTickEnabled);
//     }
//   }, [tickStatus, data]); // Make sure the hook depends on the necessary state and props
//   console.log("data.data....", data.data);

//   const parseUnderReview = (under_review) => {
//     try {
//       if (typeof under_review === "string") {
//         const parsedData = JSON.parse(under_review);
//         if (parsedData && parsedData.coord) {
//           return parsedData;
//         }
//         return null;
//       }
//       return null;
//     } catch (error) {
//       console.error("Error parsing under_review:", error);
//       return null;
//     }
//   };

//   const handleCheckboxChange = (imageId, option) => {
//     setSelectedOptions((prevState) => {
//       const currentOptions = prevState[imageId] || [];
//       const isSelected = currentOptions.includes(option);

//       return {
//         ...prevState,
//         [imageId]: isSelected
//           ? currentOptions.filter((opt) => opt !== option)
//           : [...currentOptions, option],
//       };
//     });
//   };

//   const renderInputBasedOnType = (image) => {
//     const parsedData = parseUnderReview(image.under_review);
//     if (!parsedData) return null;

//     const { type, coord } = parsedData;
//     if (type === "hall_ticket_no_parent" || (type === "Question" && coord)) {
//       return Object.keys(coord)
//         .filter((key) => key.length === 1 && key.match(/[a-z]/))
//         .map((key, index) => (
//           <label key={index} style={{ marginRight: "8px" }}>
//             <input
//               type="checkbox"
//               name={key}
//               value={key}
//               onChange={() => handleCheckboxChange(image.ID, key.toUpperCase())}
//               checked={(selectedOptions[image.ID] || []).includes(key.toUpperCase())}
//             />
//             {key.toUpperCase()}
//           </label>
//         ));
//     } else if (type === "Rollnumber") {
//       return <input type="text" placeholder="Enter Rollnumber" />;
//     }
//     return null;
//   };

//   const handleAction = async (action, image) => {
//     let resultValue = selectedOptions[image.ID];
//     resultValue = resultValue ? resultValue.map((option) => option.toLowerCase()) : [];
//     resultValue = resultValue.length === 1 ? resultValue[0] : resultValue;

//     if (action === "save" && (!resultValue || resultValue.length === 0)) {
//       toast.error("Please select a checkbox before saving.");
//       return;
//     }

//     const payload = {
//       template_name: image.template_name,
//       batch_name: image.batch_name,
//       question_paper_name: image.question_paper_name,
//       id: image.ID,
//       result: action === "skip" ? "" : resultValue,
//       action,
//     };

//     try {
//       const response = await fetch("http://localhost:4002/api/v1/upload/updateJsonResult", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         toast.success(`Successfully ${action === "save" ? "saved" : "skipped"} the result!`);
//         setActionStatus((prevStatus) => ({ ...prevStatus, [image.ID]: action }));
//         setTickStatus((prevStatus) => ({ ...prevStatus, [image.ID]: true }));
//       } else {
//         toast.error("Failed to update the result.");
//         console.error("API request failed:", response.statusText);
//       }
//     } catch (error) {
//       toast.error("Error in API call.");
//       console.error("Error in API call:", error);
//     }
//   };

//   // const handleSubmit = () => {
//   //   toast.success("All data submitted successfully!");
//   //   // Add your submit logic here
//   // };


//   // This function is triggered when the submit button is clicked
//   const handleSubmit = async () => {
//     // Prepare payload for the submit API
//     if (!isSubmitEnabled) {
//       return toast.error("All review should be checked before submitting");
//     }
// console.log("i am data..", data.data[0].template_name);

//     const submitPayload = {

//       template_name: data.data[0].template_name,
//       batch_name: data.data[0].batch_name,
//       question_paper_name: data.data[0].question_paper_name,
//     };
//     // const submitPayload = data.data.map((image) => {
//     //   // console.log("image.template_name.....", image.template_name);
//     //   // console.log("image.template_name.....", image.batch_name);
//     //   // console.log("image.template_name.....", image.question_paper_name);


//     //   return {
//     //     template_name: image.template_name,
//     //     batch_name: image.batch_name,
//     //     question_paper_name: image.question_paper_name,
//     //   };
//     // });
//     console.log("submitpayload.....", submitPayload);
//     try {
//       const response = await fetch("http://localhost:4002/api/v1/upload/submitupdateJsonResult", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(submitPayload),
//       });

//       console.log("response............", response);
//       if (response.ok) {
//         toast.success("All data submitted successfully!");
//       } else {
//         toast.error("Failed to submit data.");
//         console.error("Submit API request failed:", response.statusText);
//       }
//     } catch (error) {
//       toast.error("Error submitting data.");
//       console.error("Error in submit API call:", error);
//     }
//   };


//   return (
//     <div className="details-modal">
//       <ToastContainer position="top-right" autoClose={3000} />
//       <div className="details-modal-content">
//         <span className="close-button" onClick={closeDetails}>
//           &times;
//         </span>
//         <h3>Question Paper Details</h3>

//         <table className="modal-table">
//           <thead>
//             <tr>
//               <th>Cropped Images</th>
//               <th>Option</th>
//               <th>Action</th>
//               <th>Tick</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.data.map((image, index) => (
//               <tr key={index}>
//                 <td>
//                   <img
//                     src={`${process.env.REACT_APP_FILE_URI}${image.ques_paper_image_path
//                     }`}
//                     alt={image.ques_paper_image_path}
//                     className="table-image"
//                   />
//                 </td>
//                 <td>
//                   <img
//                     src={`${process.env.REACT_APP_FILE_URI}${image.cropped_image
//                     }`}
//                     alt={image.ques_paper_image_path}
//                     className="table-image"
//                   />
//                 </td>
//                 <td>{renderInputBasedOnType(image)}</td>
//                 <td>
//                   <button className="save-button" onClick={() => handleAction("save", image)}>
//                     Save
//                   </button>
//                   <button
//                     className="skip-button"
//                     onClick={() => handleAction("skip", image)}
//                     disabled={!!selectedOptions[image.ID]?.length}
//                     style={{
//                       backgroundColor: !!selectedOptions[image.ID]?.length ? "#ccc" : "#f44336",
//                       cursor: !!selectedOptions[image.ID]?.length ? "not-allowed" : "pointer",
//                     }}
//                   >
//                     Skip
//                   </button>
//                 </td>
//                 <td>
//                   <button
//                     className="tick-button"
//                     disabled={!tickStatus[image.ID]}
//                     style={{
//                       fontSize: "20px",
//                       fontWeight: "bold",
//                       color: tickStatus[image.ID] ? "#4caf50" : "#ccc", // Green if enabled, gray if disabled
//                       cursor: tickStatus[image.ID] ? "pointer" : "not-allowed",
//                       width: "30px",
//                     }}
//                   >
//                     &#10003;
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div className="submit-container">
//           <button
//             className="submit-button"
//             onClick={handleSubmit}
//             // disabled={!isSubmitEnabled}
//             style={{
//               backgroundColor: isSubmitEnabled ? "#4CAF50" : "#ccc",
//               cursor: isSubmitEnabled ? "pointer" : "not-allowed",
//               marginTop: "20px",
//               padding: "10px 20px",
//             }}
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReviewQuestionPaper;



