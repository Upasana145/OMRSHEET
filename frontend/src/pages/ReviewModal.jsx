import React, { useState, useEffect, useRef } from "react";
import ReviewQuestionPaper from "./ReviewQuestionPaper";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ReviewModal = ({
  showModal,
  closeModal,
  selectedBatch,
  handleTemplateChange,
  images = [],
}) => {
  const [users, setUsers] = useState([]);

  const [selectedData, setSelectedData] = useState(null); // State to store API response
  const [showDetails, setShowDetails] = useState(false); // State to manage details modal visibility
  const [imageGroups, setImageGroups] = useState([]);
  console.log("hello i am images", images);
  const canvasRef = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      if (images.length === 0) {
        console.error("No images data to submit.");
        return;
      }

      const { batch_name } = images[0];

      if (!batch_name) {
        console.error("Missing batch_name.");
        return;
      }

      try {
        // const response = await fetch("http://localhost:4002/api/v1/master/revbatchdata", {
        const response = await fetch(
          `${process.env.REACT_APP_API_URI}/master/revbatchdata`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ batch_name }),
          }
        );

        const data = await response.json();
        console.log("API Response for images:", data);

        if (response.ok) {
          setUsers(data.data || []); // Ensure `data.data` is set to an empty array if undefined
        } else {
          console.error("Failed to fetch images:", data.message);
        }
      } catch (error) {
        console.error("Error submitting data:", error);
      }
    };

    if (showModal) {
      fetchData();
    }
  }, [showModal, images]);

  const parseUnderReview = (under_review) => {
    console.log("Received under_review data:", under_review);

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
  const handleViewClick = async (image) => {
    console.log("hey i am image details bunny...", images);
    const { ques_paper_image_path, question_paper_name, batch_name } = image;
    console.log(
      "hey i am ques_paper_image_path, batch_name... ",
      question_paper_name,
      " ",
      batch_name
    );

    if (!ques_paper_image_path || !batch_name) {
      console.error(
        "Missing required data: question paper name or batch name."
      );
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URI}/master/revquesname`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question_paper_name: question_paper_name,
            batch_name,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("API Response for question paper details:", data);
        setSelectedData(data); // Set the API response data
        setShowDetails(true); // Show the details component

        cropImage(data.data);
      } else {
        console.error("Failed to fetch question paper details:", data.message);
      }
    } catch (error) {
      console.error("Error fetching question paper details:", error);
    }
  };
  const handleViewClick2 = async (image) => {
    console.log("hey i am image details bunny...", images);
    const { ques_paper_image_path, question_paper_name, batch_name } = image;
    console.log(
      "hey i am ques_paper_image_path, batch_name... ",
      question_paper_name,
      " ",
      batch_name
    );

    if (!ques_paper_image_path || !batch_name) {
      console.error(
        "Missing required data: question paper name or batch name."
      );
      return;
    }

    try {
      // const response = await fetch("http://localhost:4002/api/v1/master/revquesname", {
      const response = await fetch(
        `${process.env.REACT_APP_API_URI}/master/revquesname`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question_paper_name: question_paper_name,
            batch_name,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("API Response for question paper details:", data);
        setSelectedData(data); // Set the API response data
        // setShowDetails(true); // Show the details component

        cropImage(data.data);
      } else {
        console.error("Failed to fetch question paper details:", data.message);
      }
    } catch (error) {
      console.error("Error fetching question paper details:", error);
    }
  };
  const dataURLtoBlob = (dataURL) => {
    const [header, data] = dataURL.split(",");
    const mime = header.match(/:(.*?);/)[1];
    const binary = atob(data);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: mime });
  };
  const cropImage = async (data) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const imageGroups = []; // Array to store resized images along with their cropped images

    for (const item of data) {
      // const imagePath = `${process.env.REACT_APP_FILE_URI}${item.ques_paper_image_path}`;
      const imagePath = `${process.env.REACT_APP_FILE_URI}${item.template_name}/${item.batch_name}/${item.ques_paper_image_path}`;

      // console.log("heyyyyyy&&&&&&&&&&&&&&&&",imagePath);

      const img = new Image();
      img.crossOrigin = "anonymous"; // Allow cross-origin
      img.src = imagePath;

      // Wait for the image to load
      await new Promise((resolve) => (img.onload = resolve));

      // Resize image to 800x1200
      canvas.width = 800;
      canvas.height = 1200;
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
      ctx.drawImage(img, 0, 0, 800, 1200);

      // Save the resized image
      const resizedUrl = canvas.toDataURL("image/png");

      // Array to store cropped URLs for this specific resized image
      const croppedUrls = [];

      // Get crop coordinates from under_review
      const coordinates = parseUnderReview(item.under_review)?.coord?.region;

      console.log(
        "heyyyyyyyyyyyyyyyyyyy i am co-ordinatessssssssss",
        coordinates
      );

      // If coordinates exist, apply cropping
      if (coordinates) {
        // const [x1, y1, x2, y2] = coordinates;
        const [y1, y2, x1, x2] = coordinates;

        // Calculate crop dimensions
        const cropWidth = x2 - x1;
        const cropHeight = y2 - y1;

        // Extract cropped region from resized image
        const croppedData = ctx.getImageData(x1, y1, cropWidth, cropHeight);

        // Create a new canvas for cropping
        canvas.width = cropWidth;
        canvas.height = cropHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        ctx.putImageData(croppedData, 0, 0);

        // Convert cropped image to URL
        const croppedUrl = canvas.toDataURL("image/png");

        croppedUrls.push(croppedUrl); // Add this cropped image to the array

        console.log("heyyyyyyyyyyyy i M iteam", item);
        console.log("heyyyyyyyyyyyy i M iteam", item.ID);
        console.log("heyyyyyyyyyyyy i M iteam", item.batch_name);
        console.log("heyyyyyyyyyyyy i M iteam", item.question_paper_name);
        console.log("heyyyyyyyyyyyy i M iteam", item.template_name);
        console.log("heyyyyyyyyyyyy i M iteam", croppedUrl);
        const image = croppedUrl;

        const formData = new FormData();
        const croppedBlob = dataURLtoBlob(croppedUrl);
        formData.append("image", croppedBlob, "croppedBlob");
        formData.append("template_name", item.template_name);
        formData.append("batch_name", item.batch_name);
        formData.append("question_paper_name", item.question_paper_name);
        formData.append("ID", item.ID);
        console.log("hey i am form datatttttaaaaaaaaaaaaaaa", formData);

        try {
          const apiResponse = await fetch(
            `${process.env.REACT_APP_API_URI}/upload/processcropimage`,
            {
              method: "POST",
              body: formData,
            }
          );

          console.log("hey i am response data...", responseData);
          const responseData = await apiResponse.json();
          if (apiResponse.ok) {
            console.log("Cropped image processed successfully:", responseData);
          } else {
            console.error(
              "Failed to process cropped image:",
              responseData.message
            );
          }
        } catch (error) {
          console.error("Error processing cropped image:", error);
        }
      }

      // Add resized image and its corresponding cropped images to the imageGroups array
      imageGroups.push({
        resizedUrl,
        croppedUrls,
      });
    }

    // Set the state with the grouped images
    setImageGroups(imageGroups); // This will store each resized image and its corresponding cropped images
  };

  const closeDetails = () => {
    setShowDetails(false); // Close the details component
    setSelectedData(null); // Reset the selected data
  };

  // const handleSubmitClick = async () => {
  //   if (images.length === 0) {
  //     return toast.error("No images data to submit.");
  //   }

  //   const { template_name, batch_name } = images[0];

  //   if (!template_name || !batch_name) {
  //     return toast.error("Missing template_name or batch_name.");
  //   }

  //   try {
  //     const response = await fetch(
  //       `${process.env.REACT_APP_API_URI}/master/updatestatussubmit`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           template_name,
  //           batch_name,
  //         }),
  //       }
  //     );

  //     const data = await response.json();
  //     if (response.ok) {
  //       toast.success("Submitted successfully!");
  //       closeModal();
  //       handleTemplateChange();
  //     } else {
  //       toast.error(`Failed to update status: ${data.message}`);
  //     }
  //   } catch (error) {
  //     console.error("Error submitting data:", error);
  //     toast.error("Error occurred while updating status.");
  //   }
  // };

  if (!showModal) return null;

  return (
    <div className="modals">
      <div className="modals-content">
        <span className="close-button" onClick={closeModal}>
          &times;
        </span>
        <h3>Details for {selectedBatch}</h3>
        <table className="modal-table">
          <thead>
            <tr>
              <th>Image</th>
              <th style={{ textAlign: "center" }}>Status</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {images.map((image, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={`${process.env.REACT_APP_FILE_URI}${image.template_name}/${image.batch_name}/${image.ques_paper_image_path}`}
                    alt={image.ques_paper_image_path}
                    className="table-image"
                  />
                </td>

                <td className={image.flag === "1" ? "completed" : "pending"}>
                  {image.flag === "1" ? "Completed" : "Pending"}
                </td>

                <td>
                  <button
                    className="view-button"
                    onClick={() => handleViewClick(image)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

        {/* Submit button at the bottom
        <div className="submit-section1">
          <button className="submit-button1" onClick={handleSubmitClick}>
            Submit
          </button>
        </div> */}

        {showDetails && (
          <ReviewQuestionPaper
            data={selectedData}
            closeDetails={closeDetails}
          />
        )}
      </div>
    </div>
  );
};

export default ReviewModal;
