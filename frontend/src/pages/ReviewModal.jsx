
import React, { useState, useEffect } from "react";
import ReviewQuestionPaper from "./ReviewQuestionPaper";

const ReviewModal = ({ showModal, closeModal, selectedBatch, images = [] }) => {
  const [users, setUsers] = useState([]);

  const [selectedData, setSelectedData] = useState(null); // State to store API response
  const [showDetails, setShowDetails] = useState(false); // State to manage details modal visibility

  console.log("hello i am images", images);

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
      } else {
        console.error("Failed to fetch question paper details:", data.message);
      }
    } catch (error) {
      console.error("Error fetching question paper details:", error);
    }
  };

  const closeDetails = () => {
    setShowDetails(false); // Close the details component
    setSelectedData(null); // Reset the selected data
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
              <th style={{ textAlign: "center" }}>Action</th>
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
                <td>
                  <button className="view-button" onClick={() => handleViewClick(image)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

            {/* Conditionally render the QuestionPaperDetails component */}
            {showDetails && 
          
             <ReviewQuestionPaper data={selectedData} closeDetails={closeDetails}/>      
            }

    </div>
  );
};

export default ReviewModal;













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
