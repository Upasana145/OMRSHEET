// date:-19092024,thrusday

import React, { useState, useEffect, useRef } from "react";
import ReviewQuestionPaper from "./ReviewQuestionPaper";
import { toast } from "react-toastify";
import {  useNavigate } from "react-router-dom";


const ReviewModal = ({ showModal, closeModal, selectedBatch, images = [] }) => {
  const [users, setUsers] = useState([]);


  const [selectedData, setSelectedData] = useState(null); // State to store API response
  const [showDetails, setShowDetails] = useState(false); // State to manage details modal visibility
  const navigate = useNavigate(); // Initialize useNavigate
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
        const response = await fetch("http://localhost:4002/api/v1/master/revbatchdata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ batch_name }),
        });

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
    try {
      if (typeof under_review === "string") {
        const parsedData = JSON.parse(under_review);
        if (parsedData && parsedData.coord) {
          return parsedData;
        }
        return null;
      }
      return null;
    } catch (error) {
      console.error("Error parsing under_review:", error);
      return null;
    }
  };

  const handleViewClick = async (image) => {
    console.log("hey i am image details bunny...",images );
    const { ques_paper_image_path, question_paper_name, batch_name } = image;
    console.log("hey i am ques_paper_image_path, batch_name... ", question_paper_name," ", batch_name );

    if (!ques_paper_image_path || !batch_name) {
      console.error("Missing required data: question paper name or batch name.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4002/api/v1/master/revquesname", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question_paper_name: question_paper_name, 
          batch_name,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("API Response for question paper details:", data);
        setSelectedData(data); // Set the API response data
        setShowDetails(true); // Show the details component

        
          cropImage( data.data);
        

      } else {
        console.error("Failed to fetch question paper details:", data.message);
      }
    } catch (error) {
      console.error("Error fetching question paper details:", error);
    }
  };
  const handleViewClick2 = async (image) => {
    console.log("hey i am image details bunny...",images );
    const { ques_paper_image_path, question_paper_name, batch_name } = image;
    console.log("hey i am ques_paper_image_path, batch_name... ", question_paper_name," ", batch_name );

    if (!ques_paper_image_path || !batch_name) {
      console.error("Missing required data: question paper name or batch name.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4002/api/v1/master/revquesname", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question_paper_name: question_paper_name, 
          batch_name,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("API Response for question paper details:", data);
        setSelectedData(data); // Set the API response data
        // setShowDetails(true); // Show the details component

        
          cropImage( data.data);
        

      } else {
        console.error("Failed to fetch question paper details:", data.message);
      }
    } catch (error) {
      console.error("Error fetching question paper details:", error);
    }
  };
  const dataURLtoBlob = (dataURL) => {
    const [header, data] = dataURL.split(',');
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
    const imageGroups = [];

    for (const item of data) {
      const imagePath = `${process.env.REACT_APP_FILE_URI}${item.ques_paper_image_path}`;
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = imagePath;

      await new Promise((resolve) => (img.onload = resolve));

      canvas.width = 800;
      canvas.height = 1200;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, 800, 1200);

      const resizedUrl = canvas.toDataURL("image/png");
      const croppedUrls = [];
      const coordinates = parseUnderReview(item.under_review)?.coord?.region;

      if (coordinates) {
        const [y1, y2, x1, x2] = coordinates;
        const cropWidth = x2 - x1;
        const cropHeight = y2 - y1;
        const croppedData = ctx.getImageData(x1, y1, cropWidth, cropHeight);

        canvas.width = cropWidth;
        canvas.height = cropHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.putImageData(croppedData, 0, 0);

        const croppedUrl = canvas.toDataURL("image/png");
        croppedUrls.push(croppedUrl);

        const formData = new FormData();
        formData.append("image", croppedUrl);
        formData.append("template_name", item.template_name);
        formData.append("batch_name", item.batch_name);
        formData.append("question_paper_name", item.question_paper_name);
        formData.append("ID", item.ID);

        try {
          const apiResponse = await fetch("http://localhost:4002/api/v1/upload/processcropimage", {
            method: "POST",
            body: formData,
          });

          const responseData = await apiResponse.json();
          if (apiResponse.ok) {
            console.log("Cropped image processed successfully:", responseData);
          } else {
            console.error("Failed to process cropped image:", responseData.message);
          }
        } catch (error) {
          console.error("Error processing cropped image:", error);
        }
      }

      imageGroups.push({
        resizedUrl,
        croppedUrls,
      });
    }

    setImageGroups(imageGroups);
  };

  const closeDetails = () => {
    setShowDetails(false); // Close the details component
    setSelectedData(null); // Reset the selected data
  };


  const handleSubmitClick = async () => {
    if (images.length === 0) {
      toast.error("No images data to submit.");
      return;
    }

    const { template_name, batch_name } = images[0]; // Assuming the first image contains the necessary data

    if (!template_name || !batch_name) {
      toast.error("Missing template_name or batch_name.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4002/api/v1/master/updatestatussubmit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          template_name,
          batch_name,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Status updated successfully!");
        // navigate('/reviewquestionpaper');
      } else {
        toast.error(`Failed to update status: ${data.message}`);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Error occurred while updating status.");
    }
  };


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
              <th style={{ textAlign: "center" }}>Action2</th>
            
            </tr>
          </thead>
          <tbody>
            {images.map((image, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={`${process.env.REACT_APP_FILE_URI}${image.ques_paper_image_path}`}
                    alt={image.ques_paper_image_path}
                    className="table-image"
                  />
                </td>
               
              
                <td className={image.flag === '1' ? 'completed' : 'pending'}>
  {image.flag === '1' ? 'Completed' : 'Pending'}
</td>

                <td>
                  <button className="view-button" onClick={() => handleViewClick(image)}>View</button>
                </td>
                <td>
                  <button className="view-button" onClick={() => handleViewClick2(image)}>Viewimage</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>


<div>
  <h2>Resized Images with Corresponding Cropped Images</h2>
  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
    {imageGroups.map((group, index) => (
      <div key={index} style={{ marginBottom: "20px", border: "1px solid black", padding: "10px" }}>
        <h3>Resized Image {index + 1}</h3>
        <img
          src={group.resizedUrl}
          alt={`Resized Image ${index + 1}`}
          width="800"
          height="1200"
          style={{ border: "1px solid black", display: "block", marginBottom: "10px" }}
        />

        <div>
          <h4>Cropped Images for Resized Image {index + 1}</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {group.croppedUrls.map((croppedUrl, croppedIndex) => (
              <div key={croppedIndex} style={{ border: "1px solid black", padding: "5px" }}>
                <img src={croppedUrl} alt={`Cropped Image ${croppedIndex + 1}`} />
                <p>Cropped Image {croppedIndex + 1}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
</div>


 {/* Submit button at the bottom */}
 <div className="submit-section1">
          <button className="submit-button1" onClick={handleSubmitClick}>Submit</button>
        </div>
     {/* Conditionally render the QuestionPaperDetails component */}
     {showDetails && 
          
          <ReviewQuestionPaper data={selectedData} closeDetails={closeDetails}/>      
         }
      </div>

    </div>
  );
};

export default ReviewModal;
















// this code is working :- date:- 19092204

// this is for the api tested
// import React, { useState, useEffect, useRef } from "react";
// import ReviewQuestionPaper from "./ReviewQuestionPaper";
// import { toast } from "react-toastify";
// import {  useNavigate } from "react-router-dom";


// const ReviewModal = ({ showModal, closeModal, selectedBatch, images = [] }) => {
//   const [users, setUsers] = useState([]);


//   const [selectedData, setSelectedData] = useState(null); // State to store API response
//   const [showDetails, setShowDetails] = useState(false); // State to manage details modal visibility
//   const navigate = useNavigate(); // Initialize useNavigate
//   const [imageGroups, setImageGroups] = useState([]);
//   console.log("hello i am images", images);
// const canvasRef = useRef(null);
//   useEffect(() => {
//     const fetchData = async () => {
//       if (images.length === 0) {
//         console.error("No images data to submit.");
//         return;
//       }

//       const { batch_name } = images[0];

//       if (!batch_name) {
//         console.error("Missing batch_name.");
//         return;
//       }

//       try {
//         const response = await fetch("http://localhost:4002/api/v1/master/revbatchdata", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ batch_name }),
//         });

//         const data = await response.json();
//         console.log("API Response for images:", data);

//         if (response.ok) {
//           setUsers(data.data || []); // Ensure `data.data` is set to an empty array if undefined
//         } else {
//           console.error("Failed to fetch images:", data.message);
//         }
//       } catch (error) {
//         console.error("Error submitting data:", error);
//       }
//     };

//     if (showModal) {
//       fetchData();
//     }
//   }, [showModal, images]);

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

//   const handleViewClick = async (image) => {
//     console.log("hey i am image details bunny...",images );
//     const { ques_paper_image_path, question_paper_name, batch_name } = image;
//     console.log("hey i am ques_paper_image_path, batch_name... ", question_paper_name," ", batch_name );

//     if (!ques_paper_image_path || !batch_name) {
//       console.error("Missing required data: question paper name or batch name.");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:4002/api/v1/master/revquesname", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           question_paper_name: question_paper_name, 
//           batch_name,
//         }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         console.log("API Response for question paper details:", data);
//         setSelectedData(data); // Set the API response data
//         setShowDetails(true); // Show the details component

        
//           cropImage( data.data);
        

//       } else {
//         console.error("Failed to fetch question paper details:", data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching question paper details:", error);
//     }
//   };
//   const handleViewClick2 = async (image) => {
//     console.log("hey i am image details bunny...",images );
//     const { ques_paper_image_path, question_paper_name, batch_name } = image;
//     console.log("hey i am ques_paper_image_path, batch_name... ", question_paper_name," ", batch_name );

//     if (!ques_paper_image_path || !batch_name) {
//       console.error("Missing required data: question paper name or batch name.");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:4002/api/v1/master/revquesname", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           question_paper_name: question_paper_name, 
//           batch_name,
//         }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         console.log("API Response for question paper details:", data);
//         setSelectedData(data); // Set the API response data
//         // setShowDetails(true); // Show the details component

        
//           cropImage( data.data);
        

//       } else {
//         console.error("Failed to fetch question paper details:", data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching question paper details:", error);
//     }
//   };
//   const dataURLtoBlob = (dataURL) => {
//     const [header, data] = dataURL.split(',');
//     const mime = header.match(/:(.*?);/)[1];
//     const binary = atob(data);
//     const array = [];
//     for (let i = 0; i < binary.length; i++) {
//       array.push(binary.charCodeAt(i));
//     }
//     return new Blob([new Uint8Array(array)], { type: mime });
//   };
//   const cropImage = async (data) => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
  
//     const imageGroups = []; // Array to store resized images along with their cropped images
  
//     for (const item of data) {
//       const imagePath = `${process.env.REACT_APP_FILE_URI}${item.ques_paper_image_path}`;
//       const img = new Image();
//       img.crossOrigin = "anonymous"; // Allow cross-origin
//       img.src = imagePath;
  
//       // Wait for the image to load
//       await new Promise((resolve) => (img.onload = resolve));
 

//       // Resize image to 800x1200
//       canvas.width = 800;
//       canvas.height = 1200;
//       ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
//       ctx.drawImage(img, 0, 0, 800, 1200);
  
//       // Save the resized image
//       const resizedUrl = canvas.toDataURL("image/png");
  
//       // Array to store cropped URLs for this specific resized image
//       const croppedUrls = [];
  
//       // Get crop coordinates from under_review
//       const coordinates = parseUnderReview(item.under_review)?.coord?.region;
  
//       // If coordinates exist, apply cropping
//       if (coordinates) {
//         const [x1, y1, x2, y2] = coordinates;
  
//         // Calculate crop dimensions
//         const cropWidth = x2 - x1;
//         const cropHeight = y2 - y1;
  
//         // Extract cropped region from resized image
//         const croppedData = ctx.getImageData(x1, y1, cropWidth, cropHeight);
  
//         // Create a new canvas for cropping
//         canvas.width = cropWidth;
//         canvas.height = cropHeight;
//         ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
//         ctx.putImageData(croppedData, 0, 0);
  
//         // Convert cropped image to URL
//         const croppedUrl = canvas.toDataURL("image/png");
       
//         croppedUrls.push(croppedUrl); // Add this cropped image to the array
      
//       console.log("heyyyyyyyyyyyy i M iteam", item);
//       console.log("heyyyyyyyyyyyy i M iteam", item.ID);
//       console.log("heyyyyyyyyyyyy i M iteam", item.batch_name);
//       console.log("heyyyyyyyyyyyy i M iteam", item.question_paper_name);
//       console.log("heyyyyyyyyyyyy i M iteam", item.template_name);
//       console.log("heyyyyyyyyyyyy i M iteam", croppedUrl);
//       const image = croppedUrl;
//       // Prepare payload for API call

//       // const formData = new FormData();
//       // formData.append("image", item.image);

//       // formData.append("template_name", item.template_name);
//       // formData.append("image", image);
//       // formData.append("batch_name", item.batch_name);
//       // formData.append("question_paper_name", item.question_paper_name);
//       // formData.append("ID", item.ID);
//       const formData = new FormData();
//       const croppedBlob = dataURLtoBlob(croppedUrl);
//       formData.append("image",croppedBlob,"croppedBlob");
//       formData.append("template_name", item.template_name);
//       formData.append("batch_name", item.batch_name);
//       formData.append("question_paper_name", item.question_paper_name);
//       formData.append("ID", item.ID);

//       // try {
//       //   const apiResponse = await fetch(
//       //     "http://localhost:4002/api/v1/upload/processcropimage",
//       //     {
//       //       method: "POST",
//       //       body: formData,
//       //     }
//       //   );

//       //   const responseData = await apiResponse.json();
//       //   if (apiResponse.ok) {
//       //     console.log("Cropped image processed successfully:", responseData);
//       //   } else {
//       //     console.error("Failed to process cropped image:", responseData.message);
//       //   }
//       // } catch (error) {
//       //   console.error("Error processing cropped image:", error);
//       // }

//       try {
//         const apiResponse = await fetch("http://localhost:4002/api/v1/upload/processcropimage", {
//           method: "POST",
//           body: formData,
//         });

//         const responseData = await apiResponse.json();
//         if (apiResponse.ok) {
//           console.log("Cropped image processed successfully:", responseData);
//         } else {
//           console.error("Failed to process cropped image:", responseData.message);
//         }
//       } catch (error) {
//         console.error("Error processing cropped image:", error);
//       }



//     }
      

//       // Add resized image and its corresponding cropped images to the imageGroups array
//       imageGroups.push({
//         resizedUrl,
//         croppedUrls,
//       });
//     }
  
//     // Set the state with the grouped images
//     setImageGroups(imageGroups); // This will store each resized image and its corresponding cropped images
//   };
  
  

//   const closeDetails = () => {
//     setShowDetails(false); // Close the details component
//     setSelectedData(null); // Reset the selected data
//   };


//   const handleSubmitClick = async () => {
//     if (images.length === 0) {
//       toast.error("No images data to submit.");
//       return;
//     }

//     const { template_name, batch_name } = images[0]; // Assuming the first image contains the necessary data

//     if (!template_name || !batch_name) {
//       toast.error("Missing template_name or batch_name.");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:4002/api/v1/master/updatestatussubmit", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           template_name,
//           batch_name,
//         }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         toast.success("Status updated successfully!");
//         // navigate('/reviewquestionpaper');
//       } else {
//         toast.error(`Failed to update status: ${data.message}`);
//       }
//     } catch (error) {
//       console.error("Error submitting data:", error);
//       toast.error("Error occurred while updating status.");
//     }
//   };


//   if (!showModal) return null;
  

//   return (
//     <div className="modals">
//       <div className="modals-content">
//         <span className="close-button" onClick={closeModal}>
//           &times;
//         </span>
//         <h3>Details for {selectedBatch}</h3>
//         <table className="modal-table">
//           <thead>
//             <tr>
//               <th>Image</th>
//               <th style={{ textAlign: "center" }}>Status</th>
//               <th style={{ textAlign: "center" }}>Action</th>
//               <th style={{ textAlign: "center" }}>Action2</th>
            
//             </tr>
//           </thead>
//           <tbody>
//             {images.map((image, index) => (
//               <tr key={index}>
//                 <td>
//                   <img
//                     src={`${process.env.REACT_APP_FILE_URI}${image.ques_paper_image_path}`}
//                     alt={image.ques_paper_image_path}
//                     className="table-image"
//                   />
//                 </td>
               
              
//                 <td className={image.flag === '1' ? 'completed' : 'pending'}>
//   {image.flag === '1' ? 'Completed' : 'Pending'}
// </td>

//                 <td>
//                   <button className="view-button" onClick={() => handleViewClick(image)}>View</button>
//                 </td>
//                 {/* <td>
//                   <button className="view-button" onClick={() => handleViewClick2(image)}>Viewimage</button>
//                 </td> */}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <canvas ref={canvasRef} style={{ display: "none" }}></canvas>


// <div>
//   <h2>Resized Images with Corresponding Cropped Images</h2>
//   <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
//     {imageGroups.map((group, index) => (
//       <div key={index} style={{ marginBottom: "20px", border: "1px solid black", padding: "10px" }}>
//         <h3>Resized Image {index + 1}</h3>
//         <img
//           src={group.resizedUrl}
//           alt={`Resized Image ${index + 1}`}
//           width="800"
//           height="1200"
//           style={{ border: "1px solid black", display: "block", marginBottom: "10px" }}
//         />

//         <div>
//           <h4>Cropped Images for Resized Image {index + 1}</h4>
//           <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
//             {group.croppedUrls.map((croppedUrl, croppedIndex) => (
//               <div key={croppedIndex} style={{ border: "1px solid black", padding: "5px" }}>
//                 <img src={croppedUrl} alt={`Cropped Image ${croppedIndex + 1}`} />
//                 <p>Cropped Image {croppedIndex + 1}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// </div>


//  {/* Submit button at the bottom */}
//  <div className="submit-section1">
//           <button className="submit-button1" onClick={handleSubmitClick}>Submit</button>
//         </div>
//      {/* Conditionally render the QuestionPaperDetails component */}
//      {showDetails && 
          
//           <ReviewQuestionPaper data={selectedData} closeDetails={closeDetails}/>      
//          }
//       </div>

//     </div>
//   );
// };

// export default ReviewModal;































// *****************************************************
// date:- 07092024, Tuesday
// import React, {useState, useEffect } from "react";
// import axios from "axios";

// const ReviewModal = ({ showModal, closeModal, selectedBatch, images = [] }) => {
//   const [users, setUsers] = useState([]);

//   console.log("hey i am images ", images );
//   useEffect(() => {
//     const fetchData = async () => {
//       if (images.length === 0) {
//         console.error("No images data to submit.");
//         return;
//       }
//       console.log("First image details:", images[0]);
//       const {  batch_name } = images[0];

//       if ( !batch_name) {
//         console.error("Missing  batch_name.");
//         return;
//       }

//       // const payload = { batch_name }; // Send the payload as a single object

//       // try {
//       //   // Make a POST request to the API
//       //   const response = await axios.post(
//       //     "http://localhost:4002/api/v1/master/revbatchdata",
//       //     payload,
//       //     {
//       //       headers: {
//       //         "Content-Type": "application/json", // Set the content type
//       //       },
//       //     }
//       //   );
//       //   console.log("API response: hello jii", response.data);
//       // } 

//       try {
//         const response = await fetch("http://localhost:4002/api/v1/master/revbatchdata", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             batch_name: batch_name,
//           }),
//         });
  
//         const data = await response.json();
//         console.log("API Response for imagesssssssssssssssssss:", data);


//         if (response.ok) {
//           setUsers(data.data || []); // Ensure `data.data` is set to an empty array if undefined
//         } else {
//           console.error("Failed to fetch images:", data.message);
//         }
//       } 
      

//       catch (error) {
//         console.error("Error submitting data:", error);
//         console.error("Error details:", error.response?.data);
//       }
//     };

//     if (showModal) {
//       fetchData(); // Call the function when the modal is shown
//     }
//   }, [showModal, images]);

//   if (!showModal) return null;
//   console.log("Images received:", images);

//   return (
//     <div className="modals">
//       <div className="modals-content">
//         <span className="close-button" onClick={closeModal}>
//           &times;
//         </span>
//         <h3>Details for {selectedBatch}</h3>
//         <table className="modal-table">
//           <thead>
//             <tr>
//               <th>Image</th>
//               <th colSpan={3} style={{ textAlign: "center" }}>Cropped Image</th>
//             </tr>
//           </thead>
//           <tbody>
//             {images.map((image, index) => (
//               <tr key={index}>
//                 <td>{image.t}</td>
//                 <td>{image.ques_paper_image_path}</td>

//                 <td>
//                   <img
//                     src={`${process.env.REACT_APP_FILE_URI}${image.ques_paper_image_path}`}
//                     alt={image.ques_paper_image_path}
//                     className="table-image"
//                   />
//                 </td>
//                 <td>
//                   <table style={{ width: "100%" }}>
//                     <thead>
//                       <tr>
//                         <th>Cropped Image</th>
//                         <th>Option</th>
//                         <th>Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {image.croppedImages?.map((cropped, i) => (
//                         <tr key={i}>
//                           <td>
//                             <img src={cropped} alt="Cropped" className="table-image" />
//                           </td>
//                           <td>
//                             <div className="checkbox-container">
//                               {["A", "B", "C", "D"].map((option) => (
//                                 <label key={option}>
//                                   <input type="checkbox" /> {option}
//                                 </label>
//                               ))}
//                             </div>
//                           </td>
//                           <td>
//                             <button className="save-button">Save</button>
//                             <button className="skip-button">Skip</button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ReviewModal;




// ***************************************************
// ReviewModal.js
// import React,{useEffect} from "react";
// import axios from "axios";

// const ReviewModal = ({ showModal, closeModal, selectedBatch, handleSubmit, images = [] }) => {


//   useEffect(() => {
//     const fetchData = async () => {
//       // Only proceed if images data is present
//       if (images.length === 0) {
//         console.error("No images data to submit.");
//         return;
//       }



//        // Log question_paper_name and batch_name for each image
//        images.forEach((image) => {
//         console.log("question_paper_name:", image.question_paper_name);
//         console.log("batch_name:", image.batch_name);
//       });

//       const payload = images.map((image) => ({

//         question_paper_name: image.question_paper_name,
//         batch_name: image.batch_name,
//       }));

//       try {
//         // Making a POST request to the API
//         const response = await axios.post("http://localhost:4002/api/v1/master/revcropdata", payload);
//         console.log("API response:", response.data);
//         // You can add additional logic here, such as showing success messages or updating the state
//       } catch (error) {
//         console.error("Error submitting data:", error);
//       }
//     };

//     if (showModal) {
//       fetchData(); // Call the function when modal is shown
//     }
//   }, [showModal, images]); // Dependency array ensures this effect runs when `showModal` or `images` changes







//   if (!showModal) return null; 
//   console.log("Images received:", images);

//   return (
//     <div className="modals">
//       <div className="modals-content">
//         <span className="close-button" onClick={closeModal}>
//           &times;
//         </span>
//         <h3>Details for {selectedBatch}</h3>
//         <table className="modal-table">
//           <thead>
//             <tr>
//               <th>Image</th>
//               <th colSpan={3} style={{ textAlign: "center" }}>Cropped Image</th>
//             </tr>
//           </thead>
//           <tbody>


//             {images.map((image, index) => (
//               <tr key={index}>
               
//                {/* <td>{image.t_name}</td> */}
//                <td>
//                <img
//                   //   src={`${process.env.REACT_APP_FILE_URI}${template.template_name}`}
//                   //   src={`${process.env.REACT_APP_FILE_URI}${template.template_name}`}
//                   src={`${process.env.REACT_APP_FILE_URI}${image.t_name}`}
//                   alt={image.ques_paper_image_path}
//                   // style={{ maxWidth: "100%" }}
//                   // style={{ width: "180px" }}
//                   className="table-image"
//                 />
//                </td>
             
                  
//                   {/* <img src={image.ques_paper_image_path} alt="Main" className="table-image" /> */}
                  
                
//                 <td>
//                   <table style={{ width: "100%" }}>
//                     <thead>
//                       <tr>
//                         <th>Cropped Image</th>
//                         <th>Option</th>
//                         <th>Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {image.croppedImages?.map((cropped, i) => (
//                         <tr key={i}>
//                           <td>
//                             {/* Ensure cropped is a URL or valid image path */}
//                             <img src={cropped} alt="Cropped" className="table-image" />
//                           </td>
//                           <td>
//                             <div className="checkbox-container">
//                               {["A", "B", "C", "D"].map((option) => (
//                                 <label key={option}>
//                                   <input type="checkbox" /> {option}
//                                 </label>
//                               ))}
//                             </div>
//                           </td>
//                           <td>
//                             <button className="save-button">Save</button>
//                             <button className="skip-button">Skip</button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <button className="submit-button" onClick={handleSubmit}>
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ReviewModal;


// *****************************************************





































// // // ReviewModal.jsx
// // import React from "react";
// // import img from "../Images/OMRsheet.jpg"; // Dummy image
// // import cropimg from "../Images/omrsheet (1).jpg"; // Dummy image

// // const ReviewModal = ({ showModal, closeModal, selectedBatch, handleSubmit,images }) => {
// //   if (!showModal) return null; // Return null if modal is not to be shown

// //   return (
// //     <div className="modals">
// //       <div className="modals-content">
// //         <span className="close-button" onClick={closeModal}>
// //           &times;
// //         </span>
// //         <h3>Details for {selectedBatch}</h3>
// //         <table className="modal-table">
// //           <thead>
// //             <tr>
// //               <th>Image</th>
// //               <th colSpan={3} style={{ textAlign: "center" }}>
// //                 Cropped Image
// //               </th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {/* Repeatable Row for Images and Options */}
// //             {Array.from({ length: 3 }).map((_, index) => (
// //               <tr key={index}>
// //                 <td>
// //                   <img src={img} alt="Dummy" className="table-image" />
// //                 </td>
// //                 <td>
// //                   <table style={{ width: "100%" }}>
// //                     <thead>
// //                       <tr>
// //                         <th>Cropped Image</th>
// //                         <th>Option</th>
// //                         <th>Action</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody>
// //                       {[0, 1].map((item) => (
// //                         <tr key={item}>
// //                           <td>
// //                             <img src={cropimg} alt="Cropped Dummy" className="table-image" />
// //                           </td>
// //                           <td>
// //                             <div className="checkbox-container">
// //                               {["A", "B", "C", "D"].map((option) => (
// //                                 <label key={option}>
// //                                   <input type="checkbox" /> {option}
// //                                 </label>
// //                               ))}
// //                             </div>
// //                           </td>
// //                           <td>
// //                             <button className="save-button">Save</button>
// //                             <button className="skip-button">Skip</button>
// //                           </td>
// //                         </tr>
// //                       ))}
// //                     </tbody>
// //                   </table>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //         <button className="submit-button" onClick={handleSubmit}>
// //           Submit
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ReviewModal;

// import React from "react";

// const ReviewModal = ({ showModal, closeModal, selectedBatch, handleSubmit, images }) => {
//   if (!showModal) return null; // Return null if modal is not to be shown
// console.log("hey i am selected choosesn images", images);
//   return (
//     <div className="modals">
//       <div className="modals-content">
//         <span className="close-button" onClick={closeModal}>
//           &times;
//         </span>
//         <h3>Details for {selectedBatch}</h3>
//         <table className="modal-table">
//           <thead>
//             <tr>
//               <th>Image</th>
//               <th colSpan={3} style={{ textAlign: "center" }}>
//                 Cropped Image
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             <p>hello</p>
//             {/* Dynamically Render Rows for Each Image */}
//             {/* {images.map((imageData, index) => (
//               <tr key={index}>
//                 <td>
//                   <img src={imageData.mainImage} alt="Main" className="table-image" />
//                 </td>
//                 <td>
//                   <table style={{ width: "100%" }}>
//                     <thead>
//                       <tr>
//                         <th>Cropped Image</th>
//                         <th>Option</th>
//                         <th>Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {imageData.croppedImages.map((croppedImage, i) => (
//                         <tr key={i}>
//                           <td>
//                             <img src={croppedImage} alt={`Cropped ${i}`} className="table-image" />
//                           </td>
//                           <td>
//                             <div className="checkbox-container">
//                               {["A", "B", "C", "D"].map((option) => (
//                                 <label key={option}>
//                                   <input type="checkbox" /> {option}
//                                 </label>
//                               ))}
//                             </div>
//                           </td>
//                           <td>
//                             <button className="save-button">Save</button>
//                             <button className="skip-button">Skip</button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </td>
//               </tr>
//             ))} */}

//             {/* <img  src={`${process.env.REACT_APP_FILE_URI}${template.t_name}`}
//                   alt={template.template_name} /> */}
//           </tbody>
//         </table>
//         <button className="submit-button" onClick={handleSubmit}>
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ReviewModal;
