import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import img from "../Images/OMRsheet.jpg"; // Dummy image
import cropimg from "../Images/omrsheet (1).jpg"; // Dummy image
import ReviewModal from "./ReviewModal";

const Review = () => {
  const [templateNames, setTemplateNames] = useState([]);
  const [showModal, setShowModal] = useState(false);
  
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [batchNames, setBatchNames] = useState([]);
  const [batches, setBatches] = useState({});
  const { username, role } = useSelector((state) => state.auth); // Fetch username from Redux store
  const [selectedBatch, setSelectedBatch] = useState("");
  const [images, setImages] = useState([]); // State for storing fetched imagess
  const handleTemplateChange = async (event) => {
    const templateName = event.target.value;
    setSelectedTemplate(templateName);

    if (templateName) {
      try {
        const response = await fetch("http://localhost:4002/api/v1/master/alltempbatches", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ template_name: templateName }),
        });

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

          setBatchNames(batchNamesList);
          setBatches(batchDetails);
        }
      } catch (error) {
        console.error("Error making POST request:", error);
      }
    }
  };


  const handleViewClick = async (batch) => {
    console.log("hey i am batch...", batch);
    console.log("hey i am ...selectedTemplate", selectedTemplate);
    
    setSelectedBatch(batch);
    setShowModal(true);
    await fetchImages(batch); // Fetch images for the selected batch

    const requestData = {
      template_name:  selectedTemplate,// Replace with actual template name or a variable
      batch_name: batch, // Use the batch name
    };

  
    try {
      const response = await fetch("http://localhost:4002/api/v1/master/proc_data", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData), // Convert data to JSON string
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Data fetched successfully:", data);
        
      } else {
        console.error("Failed to fetch data:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    }
  };

  const fetchImages = async (batch) => {
    try {
      const response = await fetch("http://localhost:4002/api/v1/master/proc_data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          template_name: selectedTemplate,
          batch_name: batch,
        }),
      });

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
console.log("hey i am imagesssssssssssssssss", images)
  const closeModal = () => {
    setShowModal(false);
    setImages([]); // Clear images when the modal is closed
  };
  const handleAssignToMe = async (batchName) => {
    const confirmation = window.confirm("Do you really want to assign yourself?");
    if (confirmation) {
      try {
        // Send a request to update the assignment and status in the backend
        const response = await fetch("http://localhost:4002/api/v1/master/reviewerassign", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            template_name: selectedTemplate,
            batch_name: batchName,
            assign_to: username, // Pass the current username
          }),
        });

        const result = await response.json();
        console.log("Reviewer assignment response:", result);

        if (!result.status) {
          throw new Error("Failed to assign the reviewer in the database");
        }

        // Update the status to 'Work in process' after assignment
        const response1 = await fetch("http://localhost:4002/api/v1/master/updatestatusbatches", {
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
        });

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

  const handleSubmit = async () => {
    try {
      setBatches((prevBatches) => ({
        ...prevBatches,
        [selectedTemplate]: {
          ...prevBatches[selectedTemplate],
          [selectedBatch]: {
            ...prevBatches[selectedTemplate][selectedBatch],
            status: "Complete",
          },
        },
      }));
      const response = await fetch("http://localhost:4002/api/v1/master/updatestatusbatches", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          template_name: selectedTemplate,
          batch_name: selectedBatch,
          status: "Complete", // Set status to 'Complete'
        }),
      });
  
      const result = await response.json();
      console.log("Status update response:", result);
  
      if (!result.status) {
        throw new Error("Failed to update status in the database");
      }
      closeModal();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case "Complete":
        return "green";
      case "Work in process":
        return "blue";
      case "Pending":
        return "red";
      default:
        return "black";
    }
  };

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch("http://localhost:4002/api/v1/master/getalltempbatch");
        const data = await response.json();

        console.log("API Response Data:", data);

        const names = Array.from(new Set(data.data.map((item) => item.template_name)));
        console.log("Extracted Unique Template Names:", names);

        setTemplateNames(names);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    fetchTemplates();
  }, []);

  return (
    <div className="reviews-container">
      <h1 className="review-title">Reviewer page</h1>
      <div className="dropdown-container">
        <h2 className="selected-template">Please select a template</h2>
        <select className="dropdown" value={selectedTemplate} onChange={handleTemplateChange}>
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
          <h2 className="selected-template">You selected: {selectedTemplate}</h2>
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
                    {batches[batch].assign_to === username ? (
                      <span>{username}</span> // Display username if assigned
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
                      disabled={batches[batch].assign_to !== username} 
                     
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
 handleSubmit={handleSubmit}
 images={images}
 
 />
   


    </div>
  );
};

export default Review;




// ***************************************************
//last date:-06092024
// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import img from "../Images/OMRsheet.jpg"; // Dummy image
// import cropimg from "../Images/omrsheet (1).jpg"; // Dummy image
// import ReviewModal from "./ReviewModal";

// const Review = () => {
//   const [templateNames, setTemplateNames] = useState([]);
//   const [showModal, setShowModal] = useState(false);
  
//   const [selectedTemplate, setSelectedTemplate] = useState("");
//   const [batchNames, setBatchNames] = useState([]);
//   const [batches, setBatches] = useState({});
//   const { username, role } = useSelector((state) => state.auth); // Fetch username from Redux store
//   const [selectedBatch, setSelectedBatch] = useState("");
//   const handleTemplateChange = async (event) => {
//     const templateName = event.target.value;
//     setSelectedTemplate(templateName);

//     if (templateName) {
//       try {
//         const response = await fetch("http://localhost:4002/api/v1/master/alltempbatches", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ template_name: templateName }),
//         });

//         const data = await response.json();
//         console.log("Data received from POST API:", data);

//         if (data.status && data.data) {
//           const batchNamesList = data.data.map((item) => item.batch_name);
//           console.log("Extracted Batch Names:", batchNamesList);

//           const batchDetails = data.data.reduce((acc, item) => {
//             acc[item.batch_name] = {
//               ...item,
//               status: item.status || "Pending", // Set status from API, default to "Pending" if not available
//             };
//             return acc;
//           }, {});
//           console.log("Extracted Batch Details:", batchDetails);

//           setBatchNames(batchNamesList);
//           setBatches(batchDetails);
//         }
//       } catch (error) {
//         console.error("Error making POST request:", error);
//       }
//     }
//   };
//   // const handleViewClick = (batch) => {
//   //   setSelectedBatch(batch);
//   //   setShowModal(true);
//   // };

//   const handleViewClick = async (batch) => {
//     console.log("hey i am batch...", batch);
//     console.log("hey i am ...selectedTemplate", selectedTemplate);
    
//     setSelectedBatch(batch);
//     setShowModal(true);

//     // Prepare the data for the POST request
//     const requestData = {
//       template_name:  selectedTemplate,// Replace with actual template name or a variable
//       batch_name: batch, // Use the batch name
//     };

  
//     try {
//       const response = await fetch("http://localhost:4002/api/v1/master/proc_data", {
//         method: "POST", 
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(requestData), // Convert data to JSON string
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log("Data fetched successfully:", data);
        
//       } else {
//         console.error("Failed to fetch data:", response.statusText);
//       }
//     } catch (error) {
//       console.error("An error occurred while fetching data:", error);
//     }
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };
//   const handleAssignToMe = async (batchName) => {
//     const confirmation = window.confirm("Do you really want to assign yourself?");
//     if (confirmation) {
//       try {
//         // Send a request to update the assignment and status in the backend
//         const response = await fetch("http://localhost:4002/api/v1/master/reviewerassign", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             template_name: selectedTemplate,
//             batch_name: batchName,
//             assign_to: username, // Pass the current username
//           }),
//         });

//         const result = await response.json();
//         console.log("Reviewer assignment response:", result);

//         if (!result.status) {
//           throw new Error("Failed to assign the reviewer in the database");
//         }

//         // Update the status to 'Work in process' after assignment
//         const response1 = await fetch("http://localhost:4002/api/v1/master/updatestatusbatches", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             template_name: selectedTemplate,
//             batch_name: batchName,
//             status: "Work in process", // Set status to 'Work in process'
//             assign_to: username,
//           }),
//         });

//         const result1 = await response1.json();
//         console.log("Assignment and status update response:", result1);
//         if (!result1.status) {
//           throw new Error("Failed to update status in the database");
//         }

//         // Update the state to reflect changes after a successful API call
//         setBatches((prevBatches) => ({
//           ...prevBatches,
//           [batchName]: {
//             ...prevBatches[batchName],
//             assign_to: username,
//             status: "Work in process", // Update status locally
//           },
//         }));
//       } catch (error) {
//         console.error("Error assigning reviewer:", error);
//       }
//     }
//   };

//   // const handleSubmit = () => {
//   //   // Change the status to 'Complete' for the selected batch
//   //   setBatches((prevBatches) => ({
//   //     ...prevBatches,
//   //     [selectedTemplate]: {
//   //       ...prevBatches[selectedTemplate],
//   //       [selectedBatch]: {
//   //         ...prevBatches[selectedTemplate][selectedBatch],
//   //         status: "Complete",
//   //       },
//   //     },
//   //   }));
//   //   closeModal();
//   // };
//   const handleSubmit = async () => {
//     try {
//       // Update the status to 'Complete' in the frontend state
//       setBatches((prevBatches) => ({
//         ...prevBatches,
//         [selectedTemplate]: {
//           ...prevBatches[selectedTemplate],
//           [selectedBatch]: {
//             ...prevBatches[selectedTemplate][selectedBatch],
//             status: "Complete",
//           },
//         },
//       }));
  
//       // Send a request to update the status in the backend
//       const response = await fetch("http://localhost:4002/api/v1/master/updatestatusbatches", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           template_name: selectedTemplate,
//           batch_name: selectedBatch,
//           status: "Complete", // Set status to 'Complete'
//         }),
//       });
  
//       const result = await response.json();
//       console.log("Status update response:", result);
  
//       if (!result.status) {
//         throw new Error("Failed to update status in the database");
//       }
  
//       // Close the modal after successful submission
//       closeModal();
//     } catch (error) {
//       console.error("Error updating status:", error);
//     }
//   };
  
//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Complete":
//         return "green";
//       case "Work in process":
//         return "blue";
//       case "Pending":
//         return "red";
//       default:
//         return "black";
//     }
//   };

//   useEffect(() => {
//     const fetchTemplates = async () => {
//       try {
//         const response = await fetch("http://localhost:4002/api/v1/master/getalltempbatch");
//         const data = await response.json();

//         console.log("API Response Data:", data);

//         const names = Array.from(new Set(data.data.map((item) => item.template_name)));
//         console.log("Extracted Unique Template Names:", names);

//         setTemplateNames(names);
//       } catch (error) {
//         console.error("Error fetching templates:", error);
//       }
//     };

//     fetchTemplates();
//   }, []);

//   return (
//     <div className="reviews-container">
//       <h1 className="review-title">Reviewer page</h1>
//       <div className="dropdown-container">
//         <h2 className="selected-template">Please select a template</h2>
//         <select className="dropdown" value={selectedTemplate} onChange={handleTemplateChange}>
//           <option value="">Select a template</option>
//           {templateNames.map((name, index) => (
//             <option key={index} value={name}>
//               {name}
//             </option>
//           ))}
//         </select>
//         <p>Selected Template: {selectedTemplate}</p>
//       </div>

//       {selectedTemplate && (
//         <div className="batch-table-container">
//           <h2 className="selected-template">You selected: {selectedTemplate}</h2>
//           <table className="batch-table">
//             <thead>
//               <tr>
//                 <th>Batch</th>
//                 <th>Status</th>
//                 <th>Assign</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Object.keys(batches).map((batch) => (
//                 <tr key={batch}>
//                   <td>{batch}</td>
//                   <td style={{ color: getStatusColor(batches[batch].status) }}>
//                     {batches[batch].status}
//                   </td>
//                   <td>
//                     {batches[batch].assign_to === username ? (
//                       <span>{username}</span> // Display username if assigned
//                     ) : (
//                       <button
//                         className="assign-button"
//                         onClick={() => handleAssignToMe(batch)} // Trigger assignment on click
//                       >
//                         Assign to Me
//                       </button>
//                     )}
//                   </td>

//                   <td>
//                     <button
//                       className="view-button"
//                       onClick={() => handleViewClick(batch)}
//                       disabled={batches[batch].assign_to !== username} 
                     
//                     >
//                       View
//                     </button>
//                   </td>

//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}


// <ReviewModal
//  showModal={showModal}
//  closeModal={closeModal}
//  selectedBatch={selectedBatch}
//  handleSubmit={handleSubmit}/>


//       {showModal && (
//         <>
          // <div className="modals">
          //   <div className="modals-content">
          //     <span className="close-button" onClick={closeModal}>
          //       &times;
          //     </span>
          //     <h3>Details for {selectedBatch}</h3>
          //     <table className="modal-table">
          //       <thead>
          //         <tr>
          //           <th>Image</th>
          //           <th colSpan={3} style={{ textAlign: "center" }}>
          //             Cropped Image
          //           </th>
          //         </tr>
          //       </thead>
          //       <tbody>
          //         <tr>
          //           <td>
          //             <img src={img} alt="Dummy" className="table-image" />
          //           </td>
          //           <td>
          //             <table style={{ width: "100%" }}>
          //               <thead>
          //                 <th>cropped img</th>
          //                 <th>Option</th>
          //                 <th>Action</th>
          //               </thead>
          //               <tbody>
          //                 <tr>
          //                   <td>
          //                     <img
          //                       src={cropimg}
          //                       alt="Cropped Dummy"
          //                       className="table-image"
          //                     />
          //                   </td>
          //                   <td>
          //                     <td>
          //                       <div className="checkbox-container">
          //                         <label>
          //                           <input type="checkbox" /> A
          //                         </label>
          //                         <label>
          //                           <input type="checkbox" /> B
          //                         </label>
          //                         <label>
          //                           <input type="checkbox" /> C
          //                         </label>
          //                         <label>
          //                           <input type="checkbox" /> D
          //                         </label>
          //                       </div>
          //                     </td>
          //                   </td>
          //                   <td>
          //                     <button className="save-button">Save</button>
          //                     <button className="skip-button">Skip</button>
          //                   </td>
          //                 </tr>
          //                 <tr>
          //                   <td>
          //                     <img
          //                       src={cropimg}
          //                       alt="Cropped Dummy"
          //                       className="table-image"
          //                     />
          //                   </td>
          //                   <td>
          //                     <td>
          //                       <div className="checkbox-container">
          //                         <label>
          //                           <input type="checkbox" /> A
          //                         </label>
          //                         <label>
          //                           <input type="checkbox" /> B
          //                         </label>
          //                         <label>
          //                           <input type="checkbox" /> C
          //                         </label>
          //                         <label>
          //                           <input type="checkbox" /> D
          //                         </label>
          //                       </div>
          //                     </td>
          //                   </td>
          //                   <td>
          //                     <button className="save-button">Save</button>
          //                     <button className="skip-button">Skip</button>
          //                   </td>
          //                 </tr>
          //               </tbody>
          //             </table>

          //             <tr></tr>
                     
          //           </td>
          //         </tr>
          //         <tr>
          //           <td>
          //             <img src={img} alt="Dummy" className="table-image" />
          //           </td>
          //           <td>
          //             <table style={{ width: "100%" }}>
          //               <thead>
          //                 <th>cropped img</th>
          //                 <th>Option</th>
          //                 <th>Action</th>
          //               </thead>
          //               <tbody>
          //                 <tr>
          //                   <td>
          //                     <img
          //                       src={cropimg}
          //                       alt="Cropped Dummy"
          //                       className="table-image"
          //                     />
          //                   </td>
          //                   <td>
          //                     <td>
          //                       <div className="checkbox-container">
          //                         <label>
          //                           <input type="checkbox" /> A
          //                         </label>
          //                         <label>
          //                           <input type="checkbox" /> B
          //                         </label>
          //                         <label>
          //                           <input type="checkbox" /> C
          //                         </label>
          //                         <label>
          //                           <input type="checkbox" /> D
          //                         </label>
          //                       </div>
          //                     </td>
          //                   </td>
          //                   <td>
          //                     <button className="save-button">Save</button>
          //                     <button className="skip-button">Skip</button>
          //                   </td>
          //                 </tr>
          //                 <tr>
          //                   <td>
          //                     <img
          //                       src={cropimg}
          //                       alt="Cropped Dummy"
          //                       className="table-image"
          //                     />
          //                   </td>
          //                   <td>
          //                     <td>
          //                       <div className="checkbox-container">
          //                         <label>
          //                           <input type="checkbox" /> A
          //                         </label>
          //                         <label>
          //                           <input type="checkbox" /> B
          //                         </label>
          //                         <label>
          //                           <input type="checkbox" /> C
          //                         </label>
          //                         <label>
          //                           <input type="checkbox" /> D
          //                         </label>
          //                       </div>
          //                     </td>
          //                   </td>
          //                   <td>
          //                     <button className="save-button">Save</button>
          //                     <button className="skip-button">Skip</button>
          //                   </td>
          //                 </tr>
          //               </tbody>
          //             </table>

          //             <tr></tr>
                   
          //           </td>
          //         </tr>
          //         <tr>
          //           <td>
          //             <img src={img} alt="Dummy" className="table-image" />
          //           </td>
          //           <td>
          //             <table style={{ width: "100%" }}>
          //               <thead>
          //                 <th>cropped img</th>
          //                 <th>Option</th>
          //                 <th>Action</th>
          //               </thead>
          //               <tbody>
          //                 <tr>
          //                   <td>
          //                     <img
          //                       src={cropimg}
          //                       alt="Cropped Dummy"
          //                       className="table-image"
          //                     />
          //                   </td>
          //                   <td>
          //                     <td>
          //                       <div className="checkbox-container">
          //                         <label>
          //                           <input type="checkbox" /> A
          //                         </label>
          //                         <label>
          //                           <input type="checkbox" /> B
          //                         </label>
          //                         <label>
          //                           <input type="checkbox" /> C
          //                         </label>
          //                         <label>
          //                           <input type="checkbox" /> D
          //                         </label>
          //                       </div>
          //                     </td>
          //                   </td>
          //                   <td>
          //                     <button className="save-button">Save</button>
          //                     <button className="skip-button">Skip</button>
          //                   </td>
          //                 </tr>
          //                 <tr>
          //                   <td>
          //                     <img
          //                       src={cropimg}
          //                       alt="Cropped Dummy"
          //                       className="table-image"
          //                     />
          //                   </td>
          //                   <td>
          //                     <td>
          //                       <div className="checkbox-container">
          //                         <label>
          //                           <input type="checkbox" /> A
          //                         </label>
          //                         <label>
          //                           <input type="checkbox" /> B
          //                         </label>
          //                         <label>
          //                           <input type="checkbox" /> C
          //                         </label>
          //                         <label>
          //                           <input type="checkbox" /> D
          //                         </label>
          //                       </div>
          //                     </td>
          //                   </td>
          //                   <td>
          //                     <button className="save-button">Save</button>
          //                     <button className="skip-button">Skip</button>
          //                   </td>
          //                 </tr>
          //               </tbody>
          //             </table>

          //             <tr></tr>
                     
          //           </td>
          //         </tr>

          //         {/* Add more rows as needed */}
          //       </tbody>
          //       <tfoot>
          //         <tr>
          //           <td colSpan="4">
          //             <div className="submit-containers">
          //               <button
          //                 className="submit-buttons"
          //                 onClick={handleSubmit}
          //               >
          //                 Submit
          //               </button>
          //             </div>
          //           </td>
          //         </tr>
          //       </tfoot>
          //     </table>
          //   </div>
          // </div>
//         </>

       
//       )}




//     </div>
//   );
// };

// export default Review;





// *********************************************************
// here done till date:-5092024

// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import img from "../Images/OMRsheet.jpg"; // Dummy image
// import cropimg from "../Images/omrsheet (1).jpg"; // Dummy image

// const Review = () => {
//   const [templateNames, setTemplateNames] = useState([]);
//   const [showModal, setShowModal] = useState(false);
  
//   const [selectedTemplate, setSelectedTemplate] = useState("");
//   const [batchNames, setBatchNames] = useState([]);
//   const [batches, setBatches] = useState({});
//   const { username, role } = useSelector((state) => state.auth); // Fetch username from Redux store
//   const [selectedBatch, setSelectedBatch] = useState("");
//   const handleTemplateChange = async (event) => {
//     const templateName = event.target.value;
//     setSelectedTemplate(templateName);

//     if (templateName) {
//       try {
//         const response = await fetch("http://localhost:4002/api/v1/master/alltempbatches", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ template_name: templateName }),
//         });

//         const data = await response.json();
//         console.log("Data received from POST API:", data);

//         if (data.status && data.data) {
//           const batchNamesList = data.data.map((item) => item.batch_name);
//           console.log("Extracted Batch Names:", batchNamesList);

//           const batchDetails = data.data.reduce((acc, item) => {
//             acc[item.batch_name] = {
//               ...item,
//               status: item.status || "Pending", // Set status from API, default to "Pending" if not available
//             };
//             return acc;
//           }, {});
//           console.log("Extracted Batch Details:", batchDetails);

//           setBatchNames(batchNamesList);
//           setBatches(batchDetails);
//         }
//       } catch (error) {
//         console.error("Error making POST request:", error);
//       }
//     }
//   };
//   const handleViewClick = (batch) => {
//     setSelectedBatch(batch);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };
//   const handleAssignToMe = async (batchName) => {
//     const confirmation = window.confirm("Do you really want to assign yourself?");
//     if (confirmation) {
//       try {
//         // Send a request to update the assignment and status in the backend
//         const response = await fetch("http://localhost:4002/api/v1/master/reviewerassign", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             template_name: selectedTemplate,
//             batch_name: batchName,
//             assign_to: username, // Pass the current username
//           }),
//         });

//         const result = await response.json();
//         console.log("Reviewer assignment response:", result);

//         if (!result.status) {
//           throw new Error("Failed to assign the reviewer in the database");
//         }

//         // Update the status to 'Work in process' after assignment
//         const response1 = await fetch("http://localhost:4002/api/v1/master/updatestatusbatches", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             template_name: selectedTemplate,
//             batch_name: batchName,
//             status: "Work in process", // Set status to 'Work in process'
//             assign_to: username,
//           }),
//         });

//         const result1 = await response1.json();
//         console.log("Assignment and status update response:", result1);
//         if (!result1.status) {
//           throw new Error("Failed to update status in the database");
//         }

//         // Update the state to reflect changes after a successful API call
//         setBatches((prevBatches) => ({
//           ...prevBatches,
//           [batchName]: {
//             ...prevBatches[batchName],
//             assign_to: username,
//             status: "Work in process", // Update status locally
//           },
//         }));
//       } catch (error) {
//         console.error("Error assigning reviewer:", error);
//       }
//     }
//   };

//   // const handleSubmit = () => {
//   //   // Change the status to 'Complete' for the selected batch
//   //   setBatches((prevBatches) => ({
//   //     ...prevBatches,
//   //     [selectedTemplate]: {
//   //       ...prevBatches[selectedTemplate],
//   //       [selectedBatch]: {
//   //         ...prevBatches[selectedTemplate][selectedBatch],
//   //         status: "Complete",
//   //       },
//   //     },
//   //   }));
//   //   closeModal();
//   // };
//   const handleSubmit = async () => {
//     try {
//       // Update the status to 'Complete' in the frontend state
//       setBatches((prevBatches) => ({
//         ...prevBatches,
//         [selectedTemplate]: {
//           ...prevBatches[selectedTemplate],
//           [selectedBatch]: {
//             ...prevBatches[selectedTemplate][selectedBatch],
//             status: "Complete",
//           },
//         },
//       }));
  
//       // Send a request to update the status in the backend
//       const response = await fetch("http://localhost:4002/api/v1/master/updatestatusbatches", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           template_name: selectedTemplate,
//           batch_name: selectedBatch,
//           status: "Complete", // Set status to 'Complete'
//         }),
//       });
  
//       const result = await response.json();
//       console.log("Status update response:", result);
  
//       if (!result.status) {
//         throw new Error("Failed to update status in the database");
//       }
  
//       // Close the modal after successful submission
//       closeModal();
//     } catch (error) {
//       console.error("Error updating status:", error);
//     }
//   };
  
//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Complete":
//         return "green";
//       case "Work in process":
//         return "blue";
//       case "Pending":
//         return "red";
//       default:
//         return "black";
//     }
//   };

//   useEffect(() => {
//     const fetchTemplates = async () => {
//       try {
//         const response = await fetch("http://localhost:4002/api/v1/master/getalltempbatch");
//         const data = await response.json();

//         console.log("API Response Data:", data);

//         const names = Array.from(new Set(data.data.map((item) => item.template_name)));
//         console.log("Extracted Unique Template Names:", names);

//         setTemplateNames(names);
//       } catch (error) {
//         console.error("Error fetching templates:", error);
//       }
//     };

//     fetchTemplates();
//   }, []);

//   return (
//     <div className="reviews-container">
//       <h1 className="review-title">Reviewer page</h1>
//       <div className="dropdown-container">
//         <h2 className="selected-template">Please select a template</h2>
//         <select className="dropdown" value={selectedTemplate} onChange={handleTemplateChange}>
//           <option value="">Select a template</option>
//           {templateNames.map((name, index) => (
//             <option key={index} value={name}>
//               {name}
//             </option>
//           ))}
//         </select>
//         <p>Selected Template: {selectedTemplate}</p>
//       </div>

//       {selectedTemplate && (
//         <div className="batch-table-container">
//           <h2 className="selected-template">You selected: {selectedTemplate}</h2>
//           <table className="batch-table">
//             <thead>
//               <tr>
//                 <th>Batch</th>
//                 <th>Status</th>
//                 <th>Assign</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Object.keys(batches).map((batch) => (
//                 <tr key={batch}>
//                   <td>{batch}</td>
//                   <td style={{ color: getStatusColor(batches[batch].status) }}>
//                     {batches[batch].status}
//                   </td>
//                   <td>
//                     {batches[batch].assign_to === username ? (
//                       <span>{username}</span> // Display username if assigned
//                     ) : (
//                       <button
//                         className="assign-button"
//                         onClick={() => handleAssignToMe(batch)} // Trigger assignment on click
//                       >
//                         Assign to Me
//                       </button>
//                     )}
//                   </td>

//                   <td>
//                     <button
//                       className="view-button"
//                       onClick={() => handleViewClick(batch)}
//                       disabled={batches[batch].assign_to !== username} 
                     
//                     >
//                       View
//                     </button>
//                   </td>

//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//       {showModal && (
//         <>
//           <div className="modals">
//             <div className="modals-content">
//               <span className="close-button" onClick={closeModal}>
//                 &times;
//               </span>
//               <h3>Details for {selectedBatch}</h3>
//               <table className="modal-table">
//                 <thead>
//                   <tr>
//                     <th>Image</th>
//                     <th colSpan={3} style={{ textAlign: "center" }}>
//                       Cropped Image
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>
//                       <img src={img} alt="Dummy" className="table-image" />
//                     </td>
//                     <td>
//                       <table style={{ width: "100%" }}>
//                         <thead>
//                           <th>cropped img</th>
//                           <th>Option</th>
//                           <th>Action</th>
//                         </thead>
//                         <tbody>
//                           <tr>
//                             <td>
//                               <img
//                                 src={cropimg}
//                                 alt="Cropped Dummy"
//                                 className="table-image"
//                               />
//                             </td>
//                             <td>
//                               <td>
//                                 <div className="checkbox-container">
//                                   <label>
//                                     <input type="checkbox" /> A
//                                   </label>
//                                   <label>
//                                     <input type="checkbox" /> B
//                                   </label>
//                                   <label>
//                                     <input type="checkbox" /> C
//                                   </label>
//                                   <label>
//                                     <input type="checkbox" /> D
//                                   </label>
//                                 </div>
//                               </td>
//                             </td>
//                             <td>
//                               <button className="save-button">Save</button>
//                               <button className="skip-button">Skip</button>
//                             </td>
//                           </tr>
//                           <tr>
//                             <td>
//                               <img
//                                 src={cropimg}
//                                 alt="Cropped Dummy"
//                                 className="table-image"
//                               />
//                             </td>
//                             <td>
//                               <td>
//                                 <div className="checkbox-container">
//                                   <label>
//                                     <input type="checkbox" /> A
//                                   </label>
//                                   <label>
//                                     <input type="checkbox" /> B
//                                   </label>
//                                   <label>
//                                     <input type="checkbox" /> C
//                                   </label>
//                                   <label>
//                                     <input type="checkbox" /> D
//                                   </label>
//                                 </div>
//                               </td>
//                             </td>
//                             <td>
//                               <button className="save-button">Save</button>
//                               <button className="skip-button">Skip</button>
//                             </td>
//                           </tr>
//                         </tbody>
//                       </table>

//                       <tr></tr>
                     
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>
//                       <img src={img} alt="Dummy" className="table-image" />
//                     </td>
//                     <td>
//                       <table style={{ width: "100%" }}>
//                         <thead>
//                           <th>cropped img</th>
//                           <th>Option</th>
//                           <th>Action</th>
//                         </thead>
//                         <tbody>
//                           <tr>
//                             <td>
//                               <img
//                                 src={cropimg}
//                                 alt="Cropped Dummy"
//                                 className="table-image"
//                               />
//                             </td>
//                             <td>
//                               <td>
//                                 <div className="checkbox-container">
//                                   <label>
//                                     <input type="checkbox" /> A
//                                   </label>
//                                   <label>
//                                     <input type="checkbox" /> B
//                                   </label>
//                                   <label>
//                                     <input type="checkbox" /> C
//                                   </label>
//                                   <label>
//                                     <input type="checkbox" /> D
//                                   </label>
//                                 </div>
//                               </td>
//                             </td>
//                             <td>
//                               <button className="save-button">Save</button>
//                               <button className="skip-button">Skip</button>
//                             </td>
//                           </tr>
//                           <tr>
//                             <td>
//                               <img
//                                 src={cropimg}
//                                 alt="Cropped Dummy"
//                                 className="table-image"
//                               />
//                             </td>
//                             <td>
//                               <td>
//                                 <div className="checkbox-container">
//                                   <label>
//                                     <input type="checkbox" /> A
//                                   </label>
//                                   <label>
//                                     <input type="checkbox" /> B
//                                   </label>
//                                   <label>
//                                     <input type="checkbox" /> C
//                                   </label>
//                                   <label>
//                                     <input type="checkbox" /> D
//                                   </label>
//                                 </div>
//                               </td>
//                             </td>
//                             <td>
//                               <button className="save-button">Save</button>
//                               <button className="skip-button">Skip</button>
//                             </td>
//                           </tr>
//                         </tbody>
//                       </table>

//                       <tr></tr>
                   
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>
//                       <img src={img} alt="Dummy" className="table-image" />
//                     </td>
//                     <td>
//                       <table style={{ width: "100%" }}>
//                         <thead>
//                           <th>cropped img</th>
//                           <th>Option</th>
//                           <th>Action</th>
//                         </thead>
//                         <tbody>
//                           <tr>
//                             <td>
//                               <img
//                                 src={cropimg}
//                                 alt="Cropped Dummy"
//                                 className="table-image"
//                               />
//                             </td>
//                             <td>
//                               <td>
//                                 <div className="checkbox-container">
//                                   <label>
//                                     <input type="checkbox" /> A
//                                   </label>
//                                   <label>
//                                     <input type="checkbox" /> B
//                                   </label>
//                                   <label>
//                                     <input type="checkbox" /> C
//                                   </label>
//                                   <label>
//                                     <input type="checkbox" /> D
//                                   </label>
//                                 </div>
//                               </td>
//                             </td>
//                             <td>
//                               <button className="save-button">Save</button>
//                               <button className="skip-button">Skip</button>
//                             </td>
//                           </tr>
//                           <tr>
//                             <td>
//                               <img
//                                 src={cropimg}
//                                 alt="Cropped Dummy"
//                                 className="table-image"
//                               />
//                             </td>
//                             <td>
//                               <td>
//                                 <div className="checkbox-container">
//                                   <label>
//                                     <input type="checkbox" /> A
//                                   </label>
//                                   <label>
//                                     <input type="checkbox" /> B
//                                   </label>
//                                   <label>
//                                     <input type="checkbox" /> C
//                                   </label>
//                                   <label>
//                                     <input type="checkbox" /> D
//                                   </label>
//                                 </div>
//                               </td>
//                             </td>
//                             <td>
//                               <button className="save-button">Save</button>
//                               <button className="skip-button">Skip</button>
//                             </td>
//                           </tr>
//                         </tbody>
//                       </table>

//                       <tr></tr>
                     
//                     </td>
//                   </tr>

//                   {/* Add more rows as needed */}
//                 </tbody>
//                 <tfoot>
//                   <tr>
//                     <td colSpan="4">
//                       <div className="submit-containers">
//                         <button
//                           className="submit-buttons"
//                           onClick={handleSubmit}
//                         >
//                           Submit
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 </tfoot>
//               </table>
//             </div>
//           </div>
//         </>

       
//       )}




//     </div>
//   );
// };

// export default Review;





// ******************************************************

// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";

// const Review = () => {
//   const [templateNames, setTemplateNames] = useState([]);
//   const [selectedTemplate, setSelectedTemplate] = useState("");
//   const [batchNames, setBatchNames] = useState([]);
//   const [batches, setBatches] = useState({});
//   const { username, role } = useSelector((state) => state.auth); // Fetch username from Redux store

//   const handleTemplateChange = async (event) => {
//     const templateName = event.target.value;
//     setSelectedTemplate(templateName);

//     if (templateName) {
//       try {
//         const response = await fetch("http://localhost:4002/api/v1/master/alltempbatches", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ template_name: templateName }),
//         });

//         const data = await response.json();
//         console.log("Data received from POST API:", data);

//         if (data.status && data.data) {
//           const batchNamesList = data.data.map((item) => item.batch_name);
//           console.log("Extracted Batch Names:", batchNamesList);

//           const batchDetails = data.data.reduce((acc, item) => {
//             acc[item.batch_name] = item;
//             return acc;
//           }, {});
//           console.log("Extracted Batch Details:", batchDetails);

//           setBatchNames(batchNamesList);
//           setBatches(batchDetails);
//         }
//       } catch (error) {
//         console.error("Error making POST request:", error);
//       }
//     }
//   };

  
//   const handleAssignToMe = async (batchName) => {
//     const confirmation = window.confirm("Do you really want to assign yourself?");
//     if (confirmation) {
//       try {
//         // Update the state first to show the assignment
//         setBatches((prevBatches) => {
//           console.log("Previous Batches:", prevBatches);
  
//           const updatedBatches = {
//             ...prevBatches,
//             [batchName]: {
//               ...prevBatches[batchName],
//               assign_to: username,
//               status: "Work in process", // Set status to 'Work in process'
//             },
//           };
  
//           console.log("Updated Batches with assignment:", updatedBatches);
//           return updatedBatches;
//         });
  
//         // Send a request to update the assignment and status in the backend
//         const response = await fetch("http://localhost:4002/api/v1/master/reviewerassign", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             template_name: selectedTemplate,
//             batch_name: batchName,
//             assign_to: username, // Pass the current username
//           }),
//         });
  
//         const result = await response.json();
//         console.log("Reviewer assignment response:", result);
  
//         if (!result.status) {
//           throw new Error("Failed to assign the reviewer in the database");
//         }
      
//         //
//         const response1 = await fetch("http://localhost:4002/api/v1/master/updatestatusbatches", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             template_name: selectedTemplate,
//             batch_name: batchName,
//             status: "Work in process", // Set status to 'Work in process'
//             assign_to: username,
//           }),
//         });
  
//         const result1 = await response1.json();
//         console.log("Assignment and status update response:", result1);
//         if (!result1.status) {
//           throw new Error("Failed to update status in the database");
//         }
  
    





//       } catch (error) {
//         console.error("Error assigning reviewer:", error);
//       }
//     }
//   };
  

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Complete":
//         return "green";
//       case "Work in process":
//         return "blue";
//       case "Pending":
//         return "red";
//       default:
//         return "black";
//     }
//   };

//   useEffect(() => {
//     const fetchTemplates = async () => {
//       try {
//         const response = await fetch("http://localhost:4002/api/v1/master/getalltempbatch");
//         const data = await response.json();

//         console.log("API Response Data:", data);

//         const names = Array.from(new Set(data.data.map((item) => item.template_name)));
//         console.log("Extracted Unique Template Names:", names);

//         setTemplateNames(names);
//       } catch (error) {
//         console.error("Error fetching templates:", error);
//       }
//     };

//     fetchTemplates();
//   }, []);

//   return (
//     <div className="reviews-container">
//       <h1 className="review-title">Reviewer page</h1>
//       <div className="dropdown-container">
//         <h2 className="selected-template">Please select a template</h2>
//         <select className="dropdown" value={selectedTemplate} onChange={handleTemplateChange}>
//           <option value="">Select a template</option>
//           {templateNames.map((name, index) => (
//             <option key={index} value={name}>
//               {name}
//             </option>
//           ))}
//         </select>
//         <p>Selected Template: {selectedTemplate}</p>
//       </div>

//       {selectedTemplate && (
//         <div className="batch-table-container">
//           <h2 className="selected-template">You selected: {selectedTemplate}</h2>
//           <table className="batch-table">
//             <thead>
//               <tr>
//                 <th>Batch</th>
//                 <th>Status</th>
//                 <th>Assign</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Object.keys(batches).map((batch) => (
//                 <tr key={batch}>
//                   <td>{batch}</td>
//                   <td>
//                     <select
//                       className="status-dropdown"
//                       value={batches[batch].status || "Pending"}
//                       style={{ color: getStatusColor(batches[batch].status) }}
                      
//                     >
//                       <option value="Pending">Pending</option>
//                       <option value="Work in process">Work in process</option>
//                       <option value="Complete">Complete</option>
//                     </select>
//                   </td>
//                   <td>
//                     {batches[batch].assign_to === username ? (
//                       <span>{username}</span> // Display username if assigned
//                     ) : (
//                       <button
//                         className="assign-button"
//                         onClick={() => handleAssignToMe(batch)} // Trigger assignment on click
//                       >
//                         Assign to Me
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Review;


// ***********************************************************
// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";

// const Review = () => {
//   const [templateNames, setTemplateNames] = useState([]);
//   const [selectedTemplate, setSelectedTemplate] = useState("");
//   const [batchNames, setBatchNames] = useState([]);
//   const [batches, setBatches] = useState({});
//   const { username, role } = useSelector((state) => state.auth); // Fetch username from Redux store

//   const handleTemplateChange = async (event) => {
//     const templateName = event.target.value;
//     setSelectedTemplate(templateName);

//     if (templateName) {
//       try {
//         const response = await fetch("http://localhost:4002/api/v1/master/alltempbatches", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ template_name: templateName }),
//         });

//         const data = await response.json();
//         console.log("Data received from POST API:", data);

//         if (data.status && data.data) {
//           const batchNamesList = data.data.map((item) => item.batch_name);
//           console.log("Extracted Batch Names:", batchNamesList);

//           const batchDetails = data.data.reduce((acc, item) => {
//             acc[item.batch_name] = item;
//             return acc;
//           }, {});
//           console.log("Extracted Batch Details:", batchDetails);

//           setBatchNames(batchNamesList);
//           setBatches(batchDetails);
//         }
//       } catch (error) {
//         console.error("Error making POST request:", error);
//       }
//     }
//   };

//   const handleStatusChange = async (batchName, newStatus) => {
//     console.log("batchName...", batchName, "status....", newStatus);
//     try {
//       const response = await fetch("http://localhost:4002/api/v1/master/updatestatusbatches", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           template_name: selectedTemplate,
//           batch_name: batchName,
//           status: newStatus,
//         }),
//       });

//       const result = await response.json();
//       console.log("Status update response:", result);

//       setBatches((prevBatches) => {
//         console.log("Previous Batches:", prevBatches);

//         const updatedBatches = {
//           ...prevBatches,
//           [batchName]: { ...prevBatches[batchName], status: newStatus },
//         };

//         console.log("Updated Batches:", updatedBatches);

//         return updatedBatches;
//       });
//     } catch (error) {
//       console.error("Error updating status:", error);
//     }
//   };

//   // const handleAssignToMe = (batchName) => {
//   //   const confirmation = window.confirm("Do you really want to assign yourself?");
//   //   if (confirmation) {
//   //     setBatches((prevBatches) => {
//   //       console.log("Previous Batches:", prevBatches);

//   //       const updatedBatches = {
//   //         ...prevBatches,
//   //         [batchName]: { ...prevBatches[batchName], assign_to: username }, // Assign the current username
//   //       };

//   //       console.log("Updated Batches with assignment:", updatedBatches);

//   //       return updatedBatches;
//   //     });
//   //   }
//   // };

//   // const handleAssignToMe = async (batchName) => {
//   //   const confirmation = window.confirm("Do you really want to assign yourself?");
//   //   if (confirmation) {
//   //     try {
//   //       // Update the state with the new assignment
//   //       setBatches((prevBatches) => {
//   //         console.log("Previous Batches:", prevBatches);
  
//   //         const updatedBatches = {
//   //           ...prevBatches,
//   //           [batchName]: {
//   //             ...prevBatches[batchName],
//   //             assign_to: username,
//   //             status: "Work in process", // Update status to 'Work in process'
//   //           },
//   //         };
  
//   //         console.log("Updated Batches with assignment:", updatedBatches);
  
//   //         return updatedBatches;
//   //       });
  
//         // // Send a request to update the status in the backend
//         // const response = await fetch("http://localhost:4002/api/v1/master/updatestatusbatches", {
//         //   method: "POST",
//         //   headers: {
//         //     "Content-Type": "application/json",
//         //   },
//         //   body: JSON.stringify({
//         //     template_name: selectedTemplate,
//         //     batch_name: batchName,
//         //     status: "Work in process", // Set status to 'Work in process'
//         //     assign_to: username,
//         //   }),
//         // });
  
//   //       const result = await response.json();
//   //       console.log("Assignment and status update response:", result);
  
//   //       if (!result.status) {
//   //         throw new Error("Failed to update status in the database");
//   //       }
//   //     } catch (error) {
//   //       console.error("Error updating assignment and status:", error);
//   //     }
//   //   }
//   // };
  
//   const handleAssignToMe = async (batchName) => {
//     const confirmation = window.confirm("Do you really want to assign yourself?");
//     if (confirmation) {
//       try {
//         // Update the state first to show the assignment
//         setBatches((prevBatches) => {
//           console.log("Previous Batches:", prevBatches);
  
//           const updatedBatches = {
//             ...prevBatches,
//             [batchName]: {
//               ...prevBatches[batchName],
//               assign_to: username,
//               status: "Work in process", // Set status to 'Work in process'
//             },
//           };
  
//           console.log("Updated Batches with assignment:", updatedBatches);
//           return updatedBatches;
//         });
  
//         // Send a request to update the assignment and status in the backend
//         const response = await fetch("http://localhost:4002/api/v1/master/reviewerassign", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             template_name: selectedTemplate,
//             batch_name: batchName,
//             assign_to: username, // Pass the current username
//           }),
//         });
  
//         const result = await response.json();
//         console.log("Reviewer assignment response:", result);
  
//         if (!result.status) {
//           throw new Error("Failed to assign the reviewer in the database");
//         }
      
//         //
//         const response1 = await fetch("http://localhost:4002/api/v1/master/updatestatusbatches", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             template_name: selectedTemplate,
//             batch_name: batchName,
//             status: "Work in process", // Set status to 'Work in process'
//             assign_to: username,
//           }),
//         });
  
//         const result1 = await response1.json();
//         console.log("Assignment and status update response:", result1);
//         if (!result1.status) {
//           throw new Error("Failed to update status in the database");
//         }
  
    





//       } catch (error) {
//         console.error("Error assigning reviewer:", error);
//       }
//     }
//   };
  

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Complete":
//         return "green";
//       case "Work in process":
//         return "blue";
//       case "Pending":
//         return "red";
//       default:
//         return "black";
//     }
//   };

//   useEffect(() => {
//     const fetchTemplates = async () => {
//       try {
//         const response = await fetch("http://localhost:4002/api/v1/master/getalltempbatch");
//         const data = await response.json();

//         console.log("API Response Data:", data);

//         const names = Array.from(new Set(data.data.map((item) => item.template_name)));
//         console.log("Extracted Unique Template Names:", names);

//         setTemplateNames(names);
//       } catch (error) {
//         console.error("Error fetching templates:", error);
//       }
//     };

//     fetchTemplates();
//   }, []);

//   return (
//     <div className="reviews-container">
//       <h1 className="review-title">Reviewer page</h1>
//       <div className="dropdown-container">
//         <h2 className="selected-template">Please select a template</h2>
//         <select className="dropdown" value={selectedTemplate} onChange={handleTemplateChange}>
//           <option value="">Select a template</option>
//           {templateNames.map((name, index) => (
//             <option key={index} value={name}>
//               {name}
//             </option>
//           ))}
//         </select>
//         <p>Selected Template: {selectedTemplate}</p>
//       </div>

//       {selectedTemplate && (
//         <div className="batch-table-container">
//           <h2 className="selected-template">You selected: {selectedTemplate}</h2>
//           <table className="batch-table">
//             <thead>
//               <tr>
//                 <th>Batch</th>
//                 <th>Status</th>
//                 <th>Assign</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Object.keys(batches).map((batch) => (
//                 <tr key={batch}>
//                   <td>{batch}</td>
//                   <td>
//                     <select
//                       className="status-dropdown"
//                       value={batches[batch].status || "Pending"}
//                       style={{ color: getStatusColor(batches[batch].status) }}
//                       onChange={(e) => handleStatusChange(batch, e.target.value)}
//                     >
//                       <option value="Pending">Pending</option>
//                       <option value="Work in process">Work in process</option>
//                       <option value="Complete">Complete</option>
//                     </select>
//                   </td>
//                   <td>
//                     {batches[batch].assign_to === username ? (
//                       <span>{username}</span> // Display username if assigned
//                     ) : (
//                       <button
//                         className="assign-button"
//                         onClick={() => handleAssignToMe(batch)} // Trigger assignment on click
//                       >
//                         Assign to Me
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Review;

// **********************************************************

// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";

// const Review = () => {
//   const [templateNames, setTemplateNames] = useState([]);
//   const [selectedTemplate, setSelectedTemplate] = useState("");
//   const [batchNames, setBatchNames] = useState([]);
//   const [batches, setBatches] = useState({});
//   const { username, role } = useSelector((state) => state.auth); // Fetch username from Redux store

//   const handleTemplateChange = async (event) => {
//     const templateName = event.target.value;
//     setSelectedTemplate(templateName);

//     if (templateName) {
//       try {
//         const response = await fetch("http://localhost:4002/api/v1/master/alltempbatches", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ template_name: templateName }),
//         });

//         const data = await response.json();
//         console.log("Data received from POST API:", data);

//         if (data.status && data.data) {
//           const batchNamesList = data.data.map((item) => item.batch_name);
//           console.log("Extracted Batch Names:", batchNamesList);

//           const batchDetails = data.data.reduce((acc, item) => {
//             acc[item.batch_name] = item;
//             return acc;
//           }, {});
//           console.log("Extracted Batch Details:", batchDetails);

//           setBatchNames(batchNamesList);
//           setBatches(batchDetails);
//         }
//       } catch (error) {
//         console.error("Error making POST request:", error);
//       }
//     }
//   };

//   const handleStatusChange = async (batchName, newStatus) => {
//     console.log("batchName...", batchName, "status....", newStatus);
//     try {
//       const response = await fetch("http://localhost:4002/api/v1/master/updatestatusbatches", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           template_name: selectedTemplate,
//           batch_name: batchName,
//           status: newStatus,
//         }),
//       });

//       const result = await response.json();
//       console.log("Status update response:", result);

//       setBatches((prevBatches) => {
//         console.log("Previous Batches:", prevBatches);

//         const updatedBatches = {
//           ...prevBatches,
//           [batchName]: { ...prevBatches[batchName], status: newStatus },
//         };

//         console.log("Updated Batches:", updatedBatches);

//         return updatedBatches;
//       });
//     } catch (error) {
//       console.error("Error updating status:", error);
//     }
//   };

//   const handleAssignToMe = (batchName) => {
//     const confirmation = window.confirm("Do you really want to assign yourself?");
//     if (confirmation) {
//       setBatches((prevBatches) => {
//         console.log("Previous Batches:", prevBatches);

//         const updatedBatches = {
//           ...prevBatches,
//           [batchName]: { ...prevBatches[batchName], assign_to: username }, // Assign the current username
//         };

//         console.log("Updated Batches with assignment:", updatedBatches);

//         return updatedBatches;
//       });
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Complete":
//         return "green";
//       case "Work in process":
//         return "blue";
//       case "Pending":
//         return "red";
//       default:
//         return "black";
//     }
//   };

//   useEffect(() => {
//     const fetchTemplates = async () => {
//       try {
//         const response = await fetch("http://localhost:4002/api/v1/master/getalltempbatch");
//         const data = await response.json();

//         console.log("API Response Data:", data);

//         const names = Array.from(new Set(data.data.map((item) => item.template_name)));
//         console.log("Extracted Unique Template Names:", names);

//         setTemplateNames(names);
//       } catch (error) {
//         console.error("Error fetching templates:", error);
//       }
//     };

//     fetchTemplates();
//   }, []);

//   return (
//     <div className="reviews-container">
//       <h1 className="review-title">Reviewer page</h1>
//       <div className="dropdown-container">
//         <h2 className="selected-template">Please select a template</h2>
//         <select className="dropdown" value={selectedTemplate} onChange={handleTemplateChange}>
//           <option value="">Select a template</option>
//           {templateNames.map((name, index) => (
//             <option key={index} value={name}>
//               {name}
//             </option>
//           ))}
//         </select>
//         <p>Selected Template: {selectedTemplate}</p>
//       </div>

//       {selectedTemplate && (
//         <div className="batch-table-container">
//           <h2 className="selected-template">You selected: {selectedTemplate}</h2>
//           <table className="batch-table">
//             <thead>
//               <tr>
//                 <th>Batch</th>
//                 <th>Status</th>
//                 <th>Assign</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Object.keys(batches).map((batch) => (
//                 <tr key={batch}>
//                   <td>{batch}</td>
//                   <td>
//                     <select
//                       className="status-dropdown"
//                       value={batches[batch].status || "Pending"}
//                       style={{ color: getStatusColor(batches[batch].status) }}
//                       onChange={(e) => handleStatusChange(batch, e.target.value)}
//                     >
//                       <option value="Pending">Pending</option>
//                       <option value="Work in process">Work in process</option>
//                       <option value="Complete">Complete</option>
//                     </select>
//                   </td>
//                   <td>
//                     {batches[batch].assign_to === username ? (
//                       <span>{username}</span> // Display username if assigned
//                     ) : (
//                       <button
//                         className="assign-button"
//                         onClick={() => handleAssignToMe(batch)} // Trigger assignment on click
//                       >
//                         Assign to Me
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Review;

//************************************************************** */

// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";

// const Review = () => {
//   const [templateNames, setTemplateNames] = useState([]);
//   const [selectedTemplate, setSelectedTemplate] = useState("");
//   const [batchNames, setBatchNames] = useState([]);
//   const [batches, setBatches] = useState({});
//   const { username, role } = useSelector((state) => state.auth);

//   const handleTemplateChange = async (event) => {
//     const templateName = event.target.value;
//     setSelectedTemplate(templateName);

//     if (templateName) {
//       try {
//         const response = await fetch("http://localhost:4002/api/v1/master/alltempbatches", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ template_name: templateName }),
//         });

//         const data = await response.json();
//         console.log("Data received from POST API:", data); // Log the data received from API

//         if (data.status && data.data) {
//           const batchNamesList = data.data.map((item) => item.batch_name);
//           console.log("Extracted Batch Names:", batchNamesList); // Log the extracted batch names

//           const batchDetails = data.data.reduce((acc, item) => {
//             acc[item.batch_name] = item;
//             return acc;
//           }, {});
//           console.log("Extracted Batch Details:", batchDetails);

//           setBatchNames(batchNamesList);
//           setBatches(batchDetails);
//         }
//       } catch (error) {
//         console.error("Error making POST request:", error);
//       }
//     }
//   };

//   const handleStatusChange = async (batchName, newStatus) => {

//     console.log("batchName...", batchName, "status....", newStatus);
//     try {
//       const response = await fetch("http://localhost:4002/api/v1/master/updatestatusbatches", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           template_name: selectedTemplate,
//           batch_name: batchName,
//           status: newStatus,
//         }),
//       });

//       const result = await response.json();
//       console.log("Status update response:", result);
//       // setBatches((prevBatches) => ({

//       //   ...prevBatches,
//       //   [batchName]: { ...prevBatches[batchName], status: newStatus },
//       // }));
//       setBatches((prevBatches) => {
//         console.log("Previous Batches:", prevBatches); // Logs the state before update
      
//         const updatedBatches = {
//           ...prevBatches,
//           [batchName]: { ...prevBatches[batchName], status: newStatus },
//         };
      
//         console.log("Updated Batches:", updatedBatches); // Logs the state after update
      
//         return updatedBatches;
//       });
    
//     } catch (error) {
//       console.error("Error updating status:", error);
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Complete":
//         return "green";
//       case "Work in process":
//         return "blue";
//       case "Pending":
//         return "red";
//       default:
//         return "black";
//     }
//   };

//   useEffect(() => {
//     const fetchTemplates = async () => {
//       try {
//         const response = await fetch("http://localhost:4002/api/v1/master/getalltempbatch");
//         const data = await response.json();

//         console.log("API Response Data:", data); // Log all data received from the API

//         const names = Array.from(new Set(data.data.map((item) => item.template_name)));
//         console.log("Extracted Unique Template Names:", names);

//         setTemplateNames(names);
//       } catch (error) {
//         console.error("Error fetching templates:", error);
//       }
//     };

//     fetchTemplates();
//   }, []);
 

//   return (
//     <div className="reviews-container">
//       <h1 className="review-title">Reviewer page</h1>
//       <div className="dropdown-container">
//         <h2 className="selected-template">Please select a template</h2>
//         <select className="dropdown" value={selectedTemplate} onChange={handleTemplateChange}>
//           <option value="">Select a template</option>
//           {templateNames.map((name, index) => (
//             <option key={index} value={name}>
//               {name}
//             </option>
//           ))}
//         </select>
//         <p>Selected Template: {selectedTemplate}</p>
//       </div>

//       {selectedTemplate && (
//         <div className="batch-table-container">
//           <h2 className="selected-template">You selected: {selectedTemplate}</h2>
//           <table className="batch-table">
//             <thead>
//               <tr>
//                 <th>Batch</th>
//                 <th>Status</th>
//                 <th>Assign</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Object.keys(batches).map((batch) => (
//                 <tr key={batch}>
//                   <td>{batch}</td>
//                   <td>
//                     <select
//                       className="status-dropdown"
//                       value={batches[batch].status || "Pending"}
//                       style={{ color: getStatusColor(batches[batch].status) }}
//                       onChange={(e) => handleStatusChange(batch, e.target.value)}
//                     >
//                       <option value="Pending">Pending</option>
//                       <option value="Work in process">Work in process</option>
//                       <option value="Complete">Complete</option>
//                     </select>
//                   </td>
//                   <td>
//                   <button
//                         className= "assign-button"
                          
//                       >
//                         Assign to Me
//                       </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Review;


// ************************************************************

// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";

// const Review = () => {
//   const [templateNames, setTemplateNames] = useState([]);
//   const [selectedTemplate, setSelectedTemplate] = useState("");
//   const [batchNames, setBatchNames] = useState([]);
//   const [batches, setBatches] = useState({});
//   const { username, role } = useSelector((state) => state.auth);

//   const handleTemplateChange = async (event) => {
//     const templateName = event.target.value;
//     setSelectedTemplate(templateName);

//     if (templateName) {
//       try {
//         const response = await fetch("http://localhost:4002/api/v1/master/alltempbatches", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ template_name: templateName }),
//         });

//         const data = await response.json();
//         console.log("Data received from POST API:", data); // Log the data received from API

//         if (data.status && data.data) {
//           const batchNamesList = data.data.map((item) => item.batch_name);
//           console.log("Extracted Batch Names:", batchNamesList); // Log the extracted batch names
//           const batchstatus = data.data.map((item) => item.status);
//           console.log("Extracted status:", batchstatus); // Log the extracted batch names

//           const batchDetails = data.data.reduce((acc, item) => {
//             acc[item.batch_name] = item;
//             return acc;
//           }, {});
//           console.log("Extracted Batch Details:", batchDetails);

//           setBatchNames(batchNamesList);
//           setBatches(batchDetails);
//         }
//       } catch (error) {
//         console.error("Error making POST request:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     const fetchTemplates = async () => {
//       try {
//         const response = await fetch("http://localhost:4002/api/v1/master/getalltempbatch");
//         const data = await response.json();

//         console.log("API Response Data:", data); // Log all data received from the API

//         // Use Set to remove duplicate template names
//         const names = Array.from(new Set(data.data.map((item) => item.template_name)));
//         console.log("Extracted Unique Template Names:", names);

//         setTemplateNames(names);
//       } catch (error) {
//         console.error("Error fetching templates:", error);
//       }
//     };

//     fetchTemplates();
//   }, []);

//   return (
//     <div className="reviews-container">
//       <h1 className="review-title">Reviewer page</h1>
//       <div className="dropdown-container">
//         <h2 className="selected-template">Please select a template</h2>
//         <select className="dropdown" value={selectedTemplate} onChange={handleTemplateChange}>
//           <option value="">Select a template</option>
//           {templateNames.map((name, index) => (
//             <option key={index} value={name}>
//               {name}
//             </option>
//           ))}
//         </select>
//         <p>Selected Template: {selectedTemplate}</p>
//       </div>

//       {selectedTemplate && (
//         <div className="batch-table-container">
//           <h2 className="selected-template">You selected: {selectedTemplate}</h2>
//           <table className="batch-table">
//             <thead>
//               <tr>
//                 <th>Batch</th>
//                 <th>Status</th>
//                 <th>Assign</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Object.keys(batches).map((batch) => (
//                 <tr key={batch}>
//                   <td>{batch}</td>
//                   <td>
//                     <select
//                       className="status-dropdown"
//                       // style={{ color: getStatusColor(batches[batch].status) }}
//                       // value={batches[batch].status}
//                     >
//                       <option value="Pending">Pending</option>
//                       <option value="Work in process">Work in process</option>
//                       <option value="Complete">Completed</option>
//                     </select>
//                   </td>


//                 </tr>
//               ))}


//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Review;





// second time work on********

// import React, { useState,useEffect } from "react";
// import img from "../Images/OMRsheet.jpg"; // Dummy image
// import cropimg from "../Images/omrsheet (1).jpg"; // Dummy image
// import { useSelector } from "react-redux";

// const Review = () => {
 
//   const [templateNames, setTemplateNames] = useState([]);
//   const [selectedTemplate, setSelectedTemplate] = useState("");
//   const [batchNames, setBatchNames] = useState([]); // State to store batch names
//   const [showModal, setShowModal] = useState(false);

//   // ***
//   const [selectedBatch, setSelectedBatch] = useState("");
//   const { username, role } = useSelector((state) => state.auth);
  
//   // ***
//   const [batches, setBatches] = useState({
//     temp1: {
//       batch1: {
//         status: "Pending",
//         assignerId: "12345",
//         assignedUser: null,
//       },
//       batch2: {
//         status: "Pending",
//         assignerId: "67890",
//         assignedUser: null,
//       },
//       batch3: {
//         status: "Pending",
//         assignerId: "54321",
//         assignedUser: null,
//       },
//     },
//     temp2: {
//       batch4: {
//         status: "Pending",
//         assignerId: "11111",
//         assignedUser: null,
//       },
//       batch5: {
//         status: "Pending",
//         assignerId: "22222",
//         assignedUser: null,
//       },
//       batch6: {
//         status: "Pending",
//         assignerId: "33333",
//         assignedUser: null,
//       },
//     },
//     temp3: {
//       batch7: {
//         status: "Pending",
//         assignerId: "44444",
//         assignedUser: null,
//       },
//       batch8: {
//         status: "Pending",
//         assignerId: "55555",
//         assignedUser: null,
//       },
//       batch9: {
//         status: "Pending",
//         assignerId: "66666",
//         assignedUser: null,
//       },
//     },
//   });

//   const handleTemplateChange = async (event) => {
//     const templateName = event.target.value;
//     console.log("templateName...",templateName );
//     setSelectedTemplate(templateName);
//     console.log("selectedTemplate*****",selectedTemplate);
//     if (templateName) {
//       // Make POST API call with selected template_name
//       try {
//         const response = await fetch("http://localhost:4002/api/v1/master/alltempbatches", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ template_name: templateName }),
//         });

//         const data = await response.json();
//         console.log("Data received from POST API:", data); // Log the data received from API
  
//         if (data.status && data.data) {
//           // Extract batch_names from the response data
//           const batchNamesList = data.data.map((item) => item.batch_name);
//           console.log("Extracted Batch Names:", batchNamesList); // Log the extracted batch names

//           setBatchNames(batchNamesList); // Store the batch names in state
//         }

//         <ul>
//         {batchNames.map((batchName, index) => (
//           <li key={index}>{batchName}</li>
//         ))}
//       </ul>

//       } catch (error) {
//         console.error("Error making POST request:", error);
//       }
//     }

//   };

//   const handleViewClick = (batch) => {
//     setSelectedBatch(batch);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

  // const handleStatusChange = (batch, event) => {
  //   const newStatus = event.target.value;
  //   setBatches((prevBatches) => ({
  //     ...prevBatches,
  //     [selectedTemplate]: {
  //       ...prevBatches[selectedTemplate],
  //       [batch]: {
  //         ...prevBatches[selectedTemplate][batch],
  //         status: newStatus,
  //       },
  //     },
  //   }));
  // };

  // const handleAssignClick = (batch) => {
  //   if (
  //     window.confirm("Do you really want to assign yourself to this batch?")
  //   ) {
  //     // Update the assigned user for the selected batch and change status to "Work in process"
  //     setBatches((prevBatches) => ({
  //       ...prevBatches,
  //       [selectedTemplate]: {
  //         ...prevBatches[selectedTemplate],
  //         [batch]: {
  //           ...prevBatches[selectedTemplate][batch],
  //           assignedUser: username,
  //           status: "Work in process", // Change status to Work in process
  //         },
  //       },
  //     }));
  //   }
  // };
  // const handleSubmit = () => {
  //   // Change the status to 'Complete' for the selected batch
  //   setBatches((prevBatches) => ({
  //     ...prevBatches,
  //     [selectedTemplate]: {
  //       ...prevBatches[selectedTemplate],
  //       [selectedBatch]: {
  //         ...prevBatches[selectedTemplate][selectedBatch],
  //         status: "Complete",
  //       },
  //     },
  //   }));
  //   closeModal();
  // };
  // const getStatusColor = (status) => {
  //   switch (status) {
  //     case "Pending":
  //       return "red";
  //     case "Work in process":
  //       return "blue";
  //     case "Complete":
  //       return "green";
  //     default:
  //       return "black";
  //   }
  // };
//   useEffect(() => {
//     const fetchTemplates = async () => {
//       try {
//         const response = await fetch("http://localhost:4002/api/v1/master/getalltempbatch");
//         const data = await response.json();
        
//         console.log("API Response Data:", data); // Log all data received from the API
//         const names = data.data.map((item) => item.template_name);
//         console.log("Extracted Template Names:", names); 
//         setTemplateNames(names);

//         // setTemplates(names); // Assuming the API returns an object with a 'data' field containing the array
//       } catch (error) {
//         console.error("Error fetching templates:", error);
//       }
//     };

//     fetchTemplates();
//   }, []);

//   return (
//     <div className="reviews-container">
//       <h1 className="review-title">Reviewer page</h1>
//       <div className="dropdown-container">
//         <h2 className="selected-template">Please select a template</h2>
//         {/* <select
//           className="dropdown"
//           value={selectedTemplate}
//           onChange={handleTemplateChange}
//         >
//           <option value="">select a template</option>
//           <option value="temp1">temp1</option>
//           <option value="temp2">temp2</option>
//           <option value="temp3">temp3</option>
//         </select>
//         <p>Selected Template: {selectedTemplate}</p>
//       </div> */}
//       <select
//         className="dropdown"
//         value={selectedTemplate}
//         onChange={handleTemplateChange}
//       >
//         <option value="">Select a template</option>
//         {templateNames.map((name, index) => (
//           <option key={index} value={name}>
//             {name}
//           </option>
//         ))}
//       </select>
//       <p>Selected Template: {selectedTemplate}</p>
//     </div>

//       {selectedTemplate && (
//         <div className="batch-table-container">
//           <h2 className="selected-template">
//             You selected: {selectedTemplate}
//           </h2>
//           <table className="batch-table">
//             <thead>
//               <tr>
//                 <th>Batch</th>
//                 <th>Status</th>
//                 <th>Assign</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Object.keys(batches[selectedTemplate]).map((batch) => (
//                 <tr key={batch}>
//                   <td>{batch}</td>
                  // <td>
                  //   <select
                  //     className="status-dropdown"
                  //     style={{
                  //       color: getStatusColor(
                  //         batches[selectedTemplate][batch].status
                  //       ),
                  //     }}
                  //     value={batches[selectedTemplate][batch].status}
                  //     onChange={(e) => handleStatusChange(batch, e)}
                  //     // disabled={!batches[selectedTemplate][batch].assignedUser}
                  //     disabled
                  //   >
                  //     <option value="Pending">Pending</option>
                  //     <option value="Work in process">Work in process</option>
                  //     <option value="Complete">Completed</option>
                  //   </select>
                  // </td>
//                   <td>
//                     {batches[selectedTemplate][batch].assignedUser ? (
//                       <span className="assigned-username">
//                         {batches[selectedTemplate][batch].assignedUser}
//                       </span>
//                     ) : (
//                       <button
//                         className={`assign-button ${
//                           batches[selectedTemplate][batch].assignedUser
//                             ? "assigned"
//                             : ""
//                         }`}
//                         onClick={() => handleAssignClick(batch)}
//                       >
//                         Assign to Me
//                       </button>
//                     )}
//                   </td>
//                   <td>
//                     <button
//                       className="view-button"
//                       onClick={() => handleViewClick(batch)}
//                       disabled={!batches[selectedTemplate][batch].assignedUser}
//                     >
//                       View
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

      

//       {showModal && (
//         <>
//           <div className="modals">
//             <div className="modals-content">
//               <span className="close-button" onClick={closeModal}>
//                 &times;
//               </span>
//               <h3>Details for {selectedBatch}</h3>
//               <table className="modal-table">
//                 <thead>
//                   <tr>
//                     <th>Image</th>
//                     <th colSpan={3} style={{ textAlign: "center" }}>
//                       Cropped Image
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>
//                       <img src={img} alt="Dummy" className="table-image" />
//                     </td>
//                     <td>
//                       <table style={{ width: "100%" }}>
//                         <thead>
//                           <th>cropped img</th>
//                           <th>Option</th>
//                           <th>Action</th>
//                         </thead>
//                         <tbody>
//                           <tr>
//                             <td>
//                               <img
//                                 src={cropimg}
//                                 alt="Cropped Dummy"
//                                 className="table-image"
//                               />
//                             </td>
//                             <td>
//                               <td>
//                                 <div className="checkbox-container">
//                                   <label>
//                                     <input type="checkbox" /> A
//                                   </label>
//                                   <label>
//                                     <input type="checkbox" /> B
//                                   </label>
//                                   <label>
//                                     <input type="checkbox" /> C
//                                   </label>
//                                   <label>
//                                     <input type="checkbox" /> D
//                                   </label>
//                                 </div>
//                               </td>
//                             </td>
//                             <td>
//                               <button className="save-button">Save</button>
//                               <button className="skip-button">Skip</button>
//                             </td>
//                           </tr>
//                           <tr>
//                             <td>
//                               <img
//                                 src={cropimg}
//                                 alt="Cropped Dummy"
//                                 className="table-image"
//                               />
//                             </td>
//                             <td>
//                               <td>
//                                 <div className="checkbox-container">
//                                   <label>
//                                     <input type="checkbox" /> A
//                                   </label>
//                                   <label>
//                                     <input type="checkbox" /> B
//                                   </label>
//                                   <label>
//                                     <input type="checkbox" /> C
//                                   </label>
//                                   <label>
//                                     <input type="checkbox" /> D
//                                   </label>
//                                 </div>
//                               </td>
//                             </td>
//                             <td>
//                               <button className="save-button">Save</button>
//                               <button className="skip-button">Skip</button>
//                             </td>
//                           </tr>
//                         </tbody>
//                       </table>

//                       <tr></tr>
                     
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>
//                       <img src={img} alt="Dummy" className="table-image" />
//                     </td>
//                     <td>
//                       <table style={{ width: "100%" }}>
//                         <thead>
//                           <th>cropped img</th>
//                           <th>Option</th>
//                           <th>Action</th>
//                         </thead>
//                         <tbody>
//                           <tr>
//                             <td>
//                               <img
//                                 src={cropimg}
//                                 alt="Cropped Dummy"
//                                 className="table-image"
//                               />
//                             </td>
//                             <td>
//                               <td>
//                                 <div className="checkbox-container">
//                                   <label>
//                                     <input type="checkbox" /> A
//                                   </label>
//                                   <label>
//                                     <input type="checkbox" /> B
//                                   </label>
//                                   <label>
//                                     <input type="checkbox" /> C
//                                   </label>
//                                   <label>
//                                     <input type="checkbox" /> D
//                                   </label>
//                                 </div>
//                               </td>
//                             </td>
//                             <td>
//                               <button className="save-button">Save</button>
//                               <button className="skip-button">Skip</button>
//                             </td>
//                           </tr>
//                           <tr>
//                             <td>
//                               <img
//                                 src={cropimg}
//                                 alt="Cropped Dummy"
//                                 className="table-image"
//                               />
//                             </td>
//                             <td>
//                               <td>
//                                 <div className="checkbox-container">
//                                   <label>
//                                     <input type="checkbox" /> A
//                                   </label>
//                                   <label>
//                                     <input type="checkbox" /> B
//                                   </label>
//                                   <label>
//                                     <input type="checkbox" /> C
//                                   </label>
//                                   <label>
//                                     <input type="checkbox" /> D
//                                   </label>
//                                 </div>
//                               </td>
//                             </td>
//                             <td>
//                               <button className="save-button">Save</button>
//                               <button className="skip-button">Skip</button>
//                             </td>
//                           </tr>
//                         </tbody>
//                       </table>

//                       <tr></tr>
                   
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>
//                       <img src={img} alt="Dummy" className="table-image" />
//                     </td>
//                     <td>
//                       <table style={{ width: "100%" }}>
//                         <thead>
//                           <th>cropped img</th>
//                           <th>Option</th>
//                           <th>Action</th>
//                         </thead>
//                         <tbody>
//                           <tr>
//                             <td>
//                               <img
//                                 src={cropimg}
//                                 alt="Cropped Dummy"
//                                 className="table-image"
//                               />
//                             </td>
//                             <td>
//                               <td>
//                                 <div className="checkbox-container">
//                                   <label>
//                                     <input type="checkbox" /> A
//                                   </label>
//                                   <label>
//                                     <input type="checkbox" /> B
//                                   </label>
//                                   <label>
//                                     <input type="checkbox" /> C
//                                   </label>
//                                   <label>
//                                     <input type="checkbox" /> D
//                                   </label>
//                                 </div>
//                               </td>
//                             </td>
//                             <td>
//                               <button className="save-button">Save</button>
//                               <button className="skip-button">Skip</button>
//                             </td>
//                           </tr>
//                           <tr>
//                             <td>
//                               <img
//                                 src={cropimg}
//                                 alt="Cropped Dummy"
//                                 className="table-image"
//                               />
//                             </td>
//                             <td>
//                               <td>
//                                 <div className="checkbox-container">
//                                   <label>
//                                     <input type="checkbox" /> A
//                                   </label>
//                                   <label>
//                                     <input type="checkbox" /> B
//                                   </label>
//                                   <label>
//                                     <input type="checkbox" /> C
//                                   </label>
//                                   <label>
//                                     <input type="checkbox" /> D
//                                   </label>
//                                 </div>
//                               </td>
//                             </td>
//                             <td>
//                               <button className="save-button">Save</button>
//                               <button className="skip-button">Skip</button>
//                             </td>
//                           </tr>
//                         </tbody>
//                       </table>

//                       <tr></tr>
                     
//                     </td>
//                   </tr>

//                   {/* Add more rows as needed */}
//                 </tbody>
//                 <tfoot>
//                   <tr>
//                     <td colSpan="4">
//                       <div className="submit-containers">
//                         <button
//                           className="submit-buttons"
//                           onClick={handleSubmit}
//                         >
//                           Submit
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 </tfoot>
//               </table>
//             </div>
//           </div>
//         </>

       
//       )}
//     </div>
//   );
// };

// export default Review;






































//date:-05092024
// I am working on the below code:-

// import React, { useState } from "react";
// import img from "../Images/OMRsheet.jpg"; // Dummy image
// import cropimg from "../Images/omrsheet (1).jpg"; // Dummy image
// import { useSelector } from "react-redux";

// const Review = () => {
//   const [selectedTemplate, setSelectedTemplate] = useState("");
  // const [showModal, setShowModal] = useState(false);
  // const [selectedBatch, setSelectedBatch] = useState("");
//   const { username, role } = useSelector((state) => state.auth);
//   const [batches, setBatches] = useState({
//     temp1: {
//       batch1: {
//         status: "Pending",
//         assignerId: "12345",
//         assignedUser: null,
//       },
//       batch2: {
//         status: "Pending",
//         assignerId: "67890",
//         assignedUser: null,
//       },
//       batch3: {
//         status: "Pending",
//         assignerId: "54321",
//         assignedUser: null,
//       },
//     },
//     temp2: {
//       batch4: {
//         status: "Pending",
//         assignerId: "11111",
//         assignedUser: null,
//       },
//       batch5: {
//         status: "Pending",
//         assignerId: "22222",
//         assignedUser: null,
//       },
//       batch6: {
//         status: "Pending",
//         assignerId: "33333",
//         assignedUser: null,
//       },
//     },
//     temp3: {
//       batch7: {
//         status: "Pending",
//         assignerId: "44444",
//         assignedUser: null,
//       },
//       batch8: {
//         status: "Pending",
//         assignerId: "55555",
//         assignedUser: null,
//       },
//       batch9: {
//         status: "Pending",
//         assignerId: "66666",
//         assignedUser: null,
//       },
//     },
//   });

//   const handleTemplateChange = (event) => {
//     setSelectedTemplate(event.target.value);
//   };

  // const handleViewClick = (batch) => {
  //   setSelectedBatch(batch);
  //   setShowModal(true);
  // };

  // const closeModal = () => {
  //   setShowModal(false);
  // };

//   const handleStatusChange = (batch, event) => {
//     const newStatus = event.target.value;
//     setBatches((prevBatches) => ({
//       ...prevBatches,
//       [selectedTemplate]: {
//         ...prevBatches[selectedTemplate],
//         [batch]: {
//           ...prevBatches[selectedTemplate][batch],
//           status: newStatus,
//         },
//       },
//     }));
//   };

//   const handleAssignClick = (batch) => {
//     if (
//       window.confirm("Do you really want to assign yourself to this batch?")
//     ) {
//       // Update the assigned user for the selected batch and change status to "Work in process"
//       setBatches((prevBatches) => ({
//         ...prevBatches,
//         [selectedTemplate]: {
//           ...prevBatches[selectedTemplate],
//           [batch]: {
//             ...prevBatches[selectedTemplate][batch],
//             assignedUser: username,
//             status: "Work in process", // Change status to Work in process
//           },
//         },
//       }));
//     }
//   };
  // const handleSubmit = () => {
  //   // Change the status to 'Complete' for the selected batch
  //   setBatches((prevBatches) => ({
  //     ...prevBatches,
  //     [selectedTemplate]: {
  //       ...prevBatches[selectedTemplate],
  //       [selectedBatch]: {
  //         ...prevBatches[selectedTemplate][selectedBatch],
  //         status: "Complete",
  //       },
  //     },
  //   }));
  //   closeModal();
  // };
//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Pending":
//         return "red";
//       case "Work in process":
//         return "blue";
//       case "Complete":
//         return "green";
//       default:
//         return "black";
//     }
//   };

//   return (
//     <div className="reviews-container">
//       <h1 className="review-title">Reviewer page</h1>
//       <div className="dropdown-container">
//         <h2 className="selected-template">Please select a template</h2>
//         <select
//           className="dropdown"
//           value={selectedTemplate}
//           onChange={handleTemplateChange}
//         >
//           <option value="">select a template</option>
//           <option value="temp1">temp1</option>
//           <option value="temp2">temp2</option>
//           <option value="temp3">temp3</option>
//         </select>
//         <p>Selected Template: {selectedTemplate}</p>
//       </div>

//       {selectedTemplate && (
//         <div className="batch-table-container">
//           <h2 className="selected-template">
//             You selected: {selectedTemplate}
//           </h2>
//           <table className="batch-table">
//             <thead>
//               <tr>
//                 <th>Batch</th>
//                 <th>Status</th>
//                 <th>Assign</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Object.keys(batches[selectedTemplate]).map((batch) => (
//                 <tr key={batch}>
//                   <td>{batch}</td>
//                   <td>
//                     <select
//                       className="status-dropdown"
//                       style={{
//                         color: getStatusColor(
//                           batches[selectedTemplate][batch].status
//                         ),
//                       }}
//                       value={batches[selectedTemplate][batch].status}
//                       onChange={(e) => handleStatusChange(batch, e)}
//                       // disabled={!batches[selectedTemplate][batch].assignedUser}
//                       disabled
//                     >
//                       <option value="Pending">Pending</option>
//                       <option value="Work in process">Work in process</option>
//                       <option value="Complete">Completed</option>
//                     </select>
//                   </td>
                  // <td>
                  //   {batches[selectedTemplate][batch].assignedUser ? (
                  //     <span className="assigned-username">
                  //       {batches[selectedTemplate][batch].assignedUser}
                  //     </span>
                  //   ) : (
                  //     <button
                  //       className={`assign-button ${
                  //         batches[selectedTemplate][batch].assignedUser
                  //           ? "assigned"
                  //           : ""
                  //       }`}
                  //       onClick={() => handleAssignClick(batch)}
                  //     >
                  //       Assign to Me
                  //     </button>
                  //   )}
                  // </td>
                  // <td>
                  //   <button
                  //     className="view-button"
                  //     onClick={() => handleViewClick(batch)}
                  //     disabled={!batches[selectedTemplate][batch].assignedUser}
                  //   >
                  //     View
                  //   </button>
                  // </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

      

      // {showModal && (
      //   <>
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
      //             <tr>
      //               <td>
      //                 <img src={img} alt="Dummy" className="table-image" />
      //               </td>
      //               <td>
      //                 <table style={{ width: "100%" }}>
      //                   <thead>
      //                     <th>cropped img</th>
      //                     <th>Option</th>
      //                     <th>Action</th>
      //                   </thead>
      //                   <tbody>
      //                     <tr>
      //                       <td>
      //                         <img
      //                           src={cropimg}
      //                           alt="Cropped Dummy"
      //                           className="table-image"
      //                         />
      //                       </td>
      //                       <td>
      //                         <td>
      //                           <div className="checkbox-container">
      //                             <label>
      //                               <input type="checkbox" /> A
      //                             </label>
      //                             <label>
      //                               <input type="checkbox" /> B
      //                             </label>
      //                             <label>
      //                               <input type="checkbox" /> C
      //                             </label>
      //                             <label>
      //                               <input type="checkbox" /> D
      //                             </label>
      //                           </div>
      //                         </td>
      //                       </td>
      //                       <td>
      //                         <button className="save-button">Save</button>
      //                         <button className="skip-button">Skip</button>
      //                       </td>
      //                     </tr>
      //                     <tr>
      //                       <td>
      //                         <img
      //                           src={cropimg}
      //                           alt="Cropped Dummy"
      //                           className="table-image"
      //                         />
      //                       </td>
      //                       <td>
      //                         <td>
      //                           <div className="checkbox-container">
      //                             <label>
      //                               <input type="checkbox" /> A
      //                             </label>
      //                             <label>
      //                               <input type="checkbox" /> B
      //                             </label>
      //                             <label>
      //                               <input type="checkbox" /> C
      //                             </label>
      //                             <label>
      //                               <input type="checkbox" /> D
      //                             </label>
      //                           </div>
      //                         </td>
      //                       </td>
      //                       <td>
      //                         <button className="save-button">Save</button>
      //                         <button className="skip-button">Skip</button>
      //                       </td>
      //                     </tr>
      //                   </tbody>
      //                 </table>

      //                 <tr></tr>
                     
      //               </td>
      //             </tr>
      //             <tr>
      //               <td>
      //                 <img src={img} alt="Dummy" className="table-image" />
      //               </td>
      //               <td>
      //                 <table style={{ width: "100%" }}>
      //                   <thead>
      //                     <th>cropped img</th>
      //                     <th>Option</th>
      //                     <th>Action</th>
      //                   </thead>
      //                   <tbody>
      //                     <tr>
      //                       <td>
      //                         <img
      //                           src={cropimg}
      //                           alt="Cropped Dummy"
      //                           className="table-image"
      //                         />
      //                       </td>
      //                       <td>
      //                         <td>
      //                           <div className="checkbox-container">
      //                             <label>
      //                               <input type="checkbox" /> A
      //                             </label>
      //                             <label>
      //                               <input type="checkbox" /> B
      //                             </label>
      //                             <label>
      //                               <input type="checkbox" /> C
      //                             </label>
      //                             <label>
      //                               <input type="checkbox" /> D
      //                             </label>
      //                           </div>
      //                         </td>
      //                       </td>
      //                       <td>
      //                         <button className="save-button">Save</button>
      //                         <button className="skip-button">Skip</button>
      //                       </td>
      //                     </tr>
      //                     <tr>
      //                       <td>
      //                         <img
      //                           src={cropimg}
      //                           alt="Cropped Dummy"
      //                           className="table-image"
      //                         />
      //                       </td>
      //                       <td>
      //                         <td>
      //                           <div className="checkbox-container">
      //                             <label>
      //                               <input type="checkbox" /> A
      //                             </label>
      //                             <label>
      //                               <input type="checkbox" /> B
      //                             </label>
      //                             <label>
      //                               <input type="checkbox" /> C
      //                             </label>
      //                             <label>
      //                               <input type="checkbox" /> D
      //                             </label>
      //                           </div>
      //                         </td>
      //                       </td>
      //                       <td>
      //                         <button className="save-button">Save</button>
      //                         <button className="skip-button">Skip</button>
      //                       </td>
      //                     </tr>
      //                   </tbody>
      //                 </table>

      //                 <tr></tr>
                   
      //               </td>
      //             </tr>
      //             <tr>
      //               <td>
      //                 <img src={img} alt="Dummy" className="table-image" />
      //               </td>
      //               <td>
      //                 <table style={{ width: "100%" }}>
      //                   <thead>
      //                     <th>cropped img</th>
      //                     <th>Option</th>
      //                     <th>Action</th>
      //                   </thead>
      //                   <tbody>
      //                     <tr>
      //                       <td>
      //                         <img
      //                           src={cropimg}
      //                           alt="Cropped Dummy"
      //                           className="table-image"
      //                         />
      //                       </td>
      //                       <td>
      //                         <td>
      //                           <div className="checkbox-container">
      //                             <label>
      //                               <input type="checkbox" /> A
      //                             </label>
      //                             <label>
      //                               <input type="checkbox" /> B
      //                             </label>
      //                             <label>
      //                               <input type="checkbox" /> C
      //                             </label>
      //                             <label>
      //                               <input type="checkbox" /> D
      //                             </label>
      //                           </div>
      //                         </td>
      //                       </td>
      //                       <td>
      //                         <button className="save-button">Save</button>
      //                         <button className="skip-button">Skip</button>
      //                       </td>
      //                     </tr>
      //                     <tr>
      //                       <td>
      //                         <img
      //                           src={cropimg}
      //                           alt="Cropped Dummy"
      //                           className="table-image"
      //                         />
      //                       </td>
      //                       <td>
      //                         <td>
      //                           <div className="checkbox-container">
      //                             <label>
      //                               <input type="checkbox" /> A
      //                             </label>
      //                             <label>
      //                               <input type="checkbox" /> B
      //                             </label>
      //                             <label>
      //                               <input type="checkbox" /> C
      //                             </label>
      //                             <label>
      //                               <input type="checkbox" /> D
      //                             </label>
      //                           </div>
      //                         </td>
      //                       </td>
      //                       <td>
      //                         <button className="save-button">Save</button>
      //                         <button className="skip-button">Skip</button>
      //                       </td>
      //                     </tr>
      //                   </tbody>
      //                 </table>

      //                 <tr></tr>
                     
      //               </td>
      //             </tr>

      //             {/* Add more rows as needed */}
      //           </tbody>
      //           <tfoot>
      //             <tr>
      //               <td colSpan="4">
      //                 <div className="submit-containers">
      //                   <button
      //                     className="submit-buttons"
      //                     onClick={handleSubmit}
      //                   >
      //                     Submit
      //                   </button>
      //                 </div>
      //               </td>
      //             </tr>
      //           </tfoot>
      //         </table>
      //       </div>
      //     </div>
      //   </>

       
      // )}
//     </div>
//   );
// };

// export default Review;

















