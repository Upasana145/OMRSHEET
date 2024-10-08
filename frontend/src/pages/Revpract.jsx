
// import React, { useState } from "react";
// import img from "../Images/image1.jpg"; // Dummy image
// import { useSelector } from "react-redux";

// const Review = () => {
//   const [selectedTemplate, setSelectedTemplate] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [selectedBatch, setSelectedBatch] = useState("");
//   const { username } = useSelector((state) => state.auth);
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

//   const handleViewClick = (batch) => {
//     setSelectedBatch(batch);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

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
//             status: "Work in process",
//           },
//         },
//       }));
//     }
//   };

//   const handleSubmit = () => {
//     // Change the status to 'Complete' for the selected batch
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
//     closeModal();
//   };

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
//                       disabled={!batches[selectedTemplate][batch].assignedUser}
//                     >
//                       <option value="Pending">Pending</option>
//                       <option value="Work in process">Work in process</option>
//                       <option value="Complete">Complete</option>
//                     </select>
//                   </td>
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
//                   {/* Example Rows */}
//                   <tr>
//                     <td>
//                       <img src={img} alt="Dummy" className="table-image" />
//                     </td>
//                     <td>
//                       <img
//                         src={img}
//                         alt="Cropped Dummy"
//                         className="table-image"
//                       />
//                     </td>
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
//                     <td>
//                       <button className="save-button">Save</button>
//                       <button className="skip-button">Skip</button>
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

// ****************************************************************
// import React, { useState } from "react";
// import img from "../Images/OMRsheet.jpg"; // Dummy image
// import cropimg from "../Images/omrsheet (1).jpg"; // Dummy image
// import { useSelector } from "react-redux";

// const Review = () => {
//   const [selectedTemplate, setSelectedTemplate] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [selectedBatch, setSelectedBatch] = useState("");
//   const { username, role } = useSelector((state) => state.auth);
//   const [batches, setBatches] = useState({
//     temp1: {
//       batch1: {
//         status: "Pending",
//         assignerId: "12345",
//         assignedUser: null,
//       },
//       batch2: {
//         status: "Pending", // Initially set to Pending
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

//   const handleViewClick = (batch) => {
//     setSelectedBatch(batch);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

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
//   const handleSubmit = () => {
//     // Change the status to 'Complete' for the selected batch
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
//     closeModal();
//   };
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

//       {/* {showModal && (
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
//                 <tbody></tbody>
//                 <tfoot>
//                   <tr>
//                     <td colSpan="4">
//                       <div className="submit-containers">
//                         <button className="submit-buttons">Submit</button>
//                       </div>
//                     </td>
//                   </tr>
//                 </tfoot>
//               </table>
//             </div>
//           </div>
//         </>
//       )} */}

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
//                       {/* <div
//                         className="cropped
//                       "
//                       >
//                         <img
//                           src={img}
//                           alt="Cropped Dummy"
//                           className="table-image
//                         />
//                         <img
//                           src={img}
//                           alt="Cropped Dummy"
//                           className="table-image"
//                         />
//                         <img
//                           src={img}
//                           alt="Cropped Dummy"
//                           className="table-image"
//                         />
//                       </div> */}
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
//                       {/* <div
//                         className="cropped
//                       "
//                       >
//                         <img
//                           src={img}
//                           alt="Cropped Dummy"
//                           className="table-image
//                         />
//                         <img
//                           src={img}
//                           alt="Cropped Dummy"
//                           className="table-image"
//                         />
//                         <img
//                           src={img}
//                           alt="Cropped Dummy"
//                           className="table-image"
//                         />
//                       </div> */}
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
//                       {/* <div
//                         className="cropped
//                       "
//                       >
//                         <img
//                           src={img}
//                           alt="Cropped Dummy"
//                           className="table-image
//                         />
//                         <img
//                           src={img}
//                           alt="Cropped Dummy"
//                           className="table-image"
//                         />
//                         <img
//                           src={img}
//                           alt="Cropped Dummy"
//                           className="table-image"
//                         />
//                       </div> */}
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

//         // <>
//         //   <p>hello</p>
//         // </>
//       )}
//     </div>
//   );
// };

// export default Review;

// ****************************************************
// import React, { useState } from "react";
// import img from "../Images/image1.jpg"; // Dummy image
// import { useSelector } from "react-redux";

// const Review = () => {
//   const [selectedTemplate, setSelectedTemplate] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [selectedBatch, setSelectedBatch] = useState("");
//   const { username, role } = useSelector((state) => state.auth);
//   const [batches, setBatches] = useState({
//     temp1: {
//       batch1: {
//         status: "Pending",
//         assignerId: "12345",
//         assignedUser: "review1",
//       },
//       batch2: {
//         status: "Work in process",
//         assignerId: "67890",
//         assignedUser: "user2",
//       },
//       batch3: {
//         status: "Complete",
//         assignerId: "54321",
//         assignedUser: "user3",
//       },
//     },
//     temp2: {
//       batch4: {
//         status: "Pending",
//         assignerId: "11111",
//         assignedUser: "user1",
//       },
//       batch5: {
//         status: "Work in process",
//         assignerId: "22222",
//         assignedUser: "user2",
//       },
//       batch6: {
//         status: "Complete",
//         assignerId: "33333",
//         assignedUser: "user3",
//       },
//     },
//     temp3: {
//       batch7: {
//         status: "Pending",
//         assignerId: "44444",
//         assignedUser: "user1",
//       },
//       batch8: {
//         status: "Work in process",
//         assignerId: "55555",
//         assignedUser: "user2",
//       },
//       batch9: {
//         status: "Complete",
//         assignerId: "66666",
//         assignedUser: "user3",
//       },
//     },
//   });

//   const handleTemplateChange = (event) => {
//     setSelectedTemplate(event.target.value);
//   };

//   const handleViewClick = (batch) => {
//     setSelectedBatch(batch);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

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
//       setBatches((prevBatches) => ({
//         ...prevBatches,
//         [selectedTemplate]: {
//           ...prevBatches[selectedTemplate],
//           [batch]: {
//             ...prevBatches[selectedTemplate][batch],
//             assignedUser: username,
//           },
//         },
//       }));
//     }
//   };

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
//           <option value="">Select a template</option>
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
//                       disabled={
//                         batches[selectedTemplate][batch].assignedUser !==
//                         username
//                       }
//                     >
//                       <option value="Pending">Pending</option>
//                       <option value="Work in process">Work in process</option>
//                       <option value="Complete">Complete</option>
//                     </select>
//                   </td>
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
//                   {/* Example of how to render rows of cropped images */}
//                   <tr>
//                     <td>
//                       <img src={img} alt="Dummy" className="table-image" />
//                     </td>
//                     <td>
//                       <table style={{ width: "100%" }}>
//                         <thead>
//                           <tr>
//                             <th>Cropped Image</th>
//                             <th>Option</th>
//                             <th>Action</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           <tr>
//                             <td>
//                               <img
//                                 src={img}
//                                 alt="Cropped Dummy"
//                                 className="table-image"
//                               />
//                             </td>
//                             <td>
//                               <div className="checkbox-container">
//                                 <label>
//                                   <input type="checkbox" /> A
//                                 </label>
//                                 <label>
//                                   <input type="checkbox" /> B
//                                 </label>
//                                 <label>
//                                   <input type="checkbox" /> C
//                                 </label>
//                                 <label>
//                                   <input type="checkbox" /> D
//                                 </label>
//                               </div>
//                             </td>
//                             <td>
//                               <button className="save-button">Save</button>
//                               <button className="skip-button">Skip</button>
//                             </td>
//                           </tr>
//                           {/* Add more rows if needed */}
//                         </tbody>
//                       </table>
//                     </td>
//                   </tr>
//                 </tbody>
//                 <tfoot>
//                   <tr>
//                     <td colSpan="4">
//                       <div className="submit-containers">
//                         <button className="submit-buttons">Submit</button>
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

// ************************************

// ye wala kaam kar rha h....

// import React, { useState } from "react";
// import img from "../Images/image1.jpg"; // Dummy image
// import { useSelector } from "react-redux";

// const Review = () => {
//   const [selectedTemplate, setSelectedTemplate] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [selectedBatch, setSelectedBatch] = useState("");
//   const { username, role } = useSelector((state) => state.auth);
//   const [batches, setBatches] = useState({
//     temp1: {
//       batch1: {
//         status: "Pending",
//         assignerId: "12345",
//         assignedUser: null,
//       },
//       batch2: {
//         status: "Work in process",
//         assignerId: "67890",
//         assignedUser: null,
//       },
//       batch3: {
//         status: "Complete",
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
//         status: "Work in process",
//         assignerId: "22222",
//         assignedUser: null,
//       },
//       batch6: {
//         status: "Complete",
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
//         status: "Work in process",
//         assignerId: "55555",
//         assignedUser: null,
//       },
//       batch9: {
//         status: "Complete",
//         assignerId: "66666",
//         assignedUser: null,
//       },
//     },
//   });

//   const handleTemplateChange = (event) => {
//     setSelectedTemplate(event.target.value);
//   };

//   const handleViewClick = (batch) => {
//     setSelectedBatch(batch);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

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
//       // Update the assigned user for the selected batch
//       setBatches((prevBatches) => ({
//         ...prevBatches,
//         [selectedTemplate]: {
//           ...prevBatches[selectedTemplate],
//           [batch]: {
//             ...prevBatches[selectedTemplate][batch],
//             assignedUser: username,
//           },
//         },
//       }));
//     }
//   };

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
//                       disabled={!batches[selectedTemplate][batch].assignedUser}
//                     >
//                       <option value="Pending">Pending</option>
//                       <option value="Work in process">Work in process</option>
//                       <option value="Complete">Complete</option>
//                     </select>
//                   </td>
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
//                 <tbody>{/* Your modal content here */}</tbody>
//                 <tfoot>
//                   <tr>
//                     <td colSpan="4">
//                       <div className="submit-containers">
//                         <button className="submit-buttons">Submit</button>
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

// ************************************

// import React, { useState } from "react";
// import img from "../Images/image1.jpg"; // Dummy image
// import { useSelector } from "react-redux";

// const Review = () => {
//   const [selectedTemplate, setSelectedTemplate] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [selectedBatch, setSelectedBatch] = useState("");
//   const { username, role } = useSelector((state) => state.auth);
//   // console.log("mrinmoyauth", role);
//   console.log("i am hello buddy i am username..", username);
//   const [batches, setBatches] = useState({
//     temp1: {
//       batch1: {
//         status: "Pending",
//         assignerId: "12345",
//       },
//       batch2: {
//         status: "Work in process",
//         assignerId: "67890",
//       },
//       batch3: {
//         status: "Complete",
//         assignerId: "54321",
//       },
//     },
//     temp2: {
//       batch4: {
//         status: "Pending",
//         assignerId: "11111",
//       },
//       batch5: {
//         status: "Work in process",
//         assignerId: "22222",
//       },
//       batch6: {
//         status: "Complete",
//         assignerId: "33333",
//       },
//     },
//     temp3: {
//       batch7: {
//         status: "Pending",
//         assignerId: "44444",
//       },
//       batch8: {
//         status: "Work in process",
//         assignerId: "55555",
//       },
//       batch9: {
//         status: "Complete",
//         assignerId: "66666",
//       },
//     },
//   });

//   const handleTemplateChange = (event) => {
//     console.log("event.target.value", event.target.value);
//     setSelectedTemplate(event.target.value);
//   };

//   const handleViewClick = (batch) => {
//     console.log("hello i am batch...", batch);
//     setSelectedBatch(batch);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   const handleStatusChange = (batch, event) => {
//     const newStatus = event.target.value;
//     console.log("newStatus..", event.target.value);
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
//       // Update the assigned user for the selected batch
//       setBatches((prevBatches) => ({
//         ...prevBatches,
//         [selectedTemplate]: {
//           ...prevBatches[selectedTemplate],
//           [batch]: {
//             ...prevBatches[selectedTemplate][batch],
//             assignedUser: username,
//           },
//         },
//       }));
//     }
//   };

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
//           <option value="temp3">temp3jjjj</option>
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
//                 {/* <th>{username}</th> */}
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
//                     >
//                       <option value="Pending">Pending</option>
//                       <option value="Work in process">Work in process</option>
//                       <option value="Complete">Complete</option>
//                     </select>
//                   </td>
//                   {/* <td>{username}</td> */}
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
//                                 src={img}
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
//                                 src={img}
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
//                       {/* <div
//                         className="cropped
//                       "
//                       >
//                         <img
//                           src={img}
//                           alt="Cropped Dummy"
//                           className="table-image
//                         />
//                         <img
//                           src={img}
//                           alt="Cropped Dummy"
//                           className="table-image"
//                         />
//                         <img
//                           src={img}
//                           alt="Cropped Dummy"
//                           className="table-image"
//                         />
//                       </div> */}
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
//                                 src={img}
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
//                                 src={img}
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
//                       {/* <div
//                         className="cropped
//                       "
//                       >
//                         <img
//                           src={img}
//                           alt="Cropped Dummy"
//                           className="table-image
//                         />
//                         <img
//                           src={img}
//                           alt="Cropped Dummy"
//                           className="table-image"
//                         />
//                         <img
//                           src={img}
//                           alt="Cropped Dummy"
//                           className="table-image"
//                         />
//                       </div> */}
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
//                                 src={img}
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
//                                 src={img}
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
//                       {/* <div
//                         className="cropped
//                       "
//                       >
//                         <img
//                           src={img}
//                           alt="Cropped Dummy"
//                           className="table-image
//                         />
//                         <img
//                           src={img}
//                           alt="Cropped Dummy"
//                           className="table-image"
//                         />
//                         <img
//                           src={img}
//                           alt="Cropped Dummy"
//                           className="table-image"
//                         />
//                       </div> */}
//                     </td>
//                   </tr>

//                   {/* Add more rows as needed */}
//                 </tbody>
//                 <tfoot>
//                   <tr>
//                     <td colSpan="4">
//                       <div className="submit-containers">
//                         <button className="submit-buttons">Submit</button>
//                       </div>
//                     </td>
//                   </tr>
//                 </tfoot>
//               </table>
//             </div>
//           </div>
//         </>

//         // <>
//         //   <p>hello</p>
//         // </>
//       )}
//     </div>
//   );
// };

// export default Review;






















// **************************************************************************
// import React, { useState } from "react";
// import img from "../Images/image1.jpg"; // Dummy image

// const Review = () => {
//   const [selectedTemplate, setSelectedTemplate] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [selectedBatch, setSelectedBatch] = useState("");
//   const [batches, setBatches] = useState({
//     temp1: {
//       batch1: {
//         status: "Pending",
//         assignerId: "12345",
//       },
//       batch2: {
//         status: "Work in process",
//         assignerId: "67890",
//       },
//       batch3: {
//         status: "Complete",
//         assignerId: "54321",
//       },
//     },
//     temp2: {
//       batch4: {
//         status: "Pending",
//         assignerId: "11111",
//       },
//       batch5: {
//         status: "Work in process",
//         assignerId: "22222",
//       },
//       batch6: {
//         status: "Complete",
//         assignerId: "33333",
//       },
//     },
//     temp3: {
//       batch7: {
//         status: "Pending",
//         assignerId: "44444",
//       },
//       batch8: {
//         status: "Work in process",
//         assignerId: "55555",
//       },
//       batch9: {
//         status: "Complete",
//         assignerId: "66666",
//       },
//     },
//   });

//   const handleTemplateChange = (event) => {
//     setSelectedTemplate(event.target.value);
//   };

//   const handleViewClick = (batch) => {
//     setSelectedBatch(batch);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

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

//   return (
//     <div className="reviews-container">
//       <h1 className="review-title">This is Reviewer page</h1>
//       <div className="dropdown-container">
//         <select
//           className="dropdown"
//           value={selectedTemplate}
//           onChange={handleTemplateChange}
//         >
//           <option value="">Select a template</option>
//           <option value="temp1">temp1</option>
//           <option value="temp2">temp2</option>
//           <option value="temp3">temp3</option>
//         </select>
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
//                       value={batches[selectedTemplate][batch].status}
//                       onChange={(e) => handleStatusChange(batch, e)}
//                     >
//                       <option value="Pending">Pending</option>
//                       <option value="Work in process" className="WIP">
//                         Work in process
//                       </option>
//                       <option value="Complete " className="comp">
//                         Complete
//                       </option>
//                     </select>
//                   </td>
//                   <td>{batches[selectedTemplate][batch].assignerId}</td>
//                   <td>
//                     <button
//                       className="view-button"
//                       onClick={() => handleViewClick(batch)}
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
//                           src={img}
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
//                           src={img}
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
//                 {/* <div
//                   className="cropped
//                 "
//                 >
//                   <img
//                     src={img}
//                     alt="Cropped Dummy"
//                     className="table-image"
//                   />
//                   <img
//                     src={img}
//                     alt="Cropped Dummy"
//                     className="table-image"
//                   />
//                   <img
//                     src={img}
//                     alt="Cropped Dummy"
//                     className="table-image"
//                   />
//                 </div> */}
//               </td>
//             </tr>

//             <tr>
//               <td>
//                 <img src={img} alt="Dummy" className="table-image" />
//               </td>
//               <td>
//                 <table>
//                   <thead>
//                     <th>cropped img</th>
//                     <th>Option</th>
//                     <th>Action</th>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td>
//                         <img
//                           src={img}
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
//                           src={img}
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
//                 {/* <div
//                   className="cropped
//                 "
//                 >
//                   <img
//                     src={img}
//                     alt="Cropped Dummy"
//                     className="table-image"
//                   />
//                   <img
//                     src={img}
//                     alt="Cropped Dummy"
//                     className="table-image"
//                   />
//                   <img
//                     src={img}
//                     alt="Cropped Dummy"
//                     className="table-image"
//                   />
//                 </div> */}
//               </td>
//             </tr>
//             <tr>
//               <td>
//                 <img src={img} alt="Dummy" className="table-image" />
//               </td>
//               <td>
//                 <table>
//                   <thead>
//                     <th>cropped img</th>
//                     <th>Option</th>
//                     <th>Action</th>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td>
//                         <img
//                           src={img}
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
//                           src={img}
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
//                 {/* <div
//                   className="cropped
//                 "
//                 >
//                   <img
//                     src={img}
//                     alt="Cropped Dummy"
//                     className="table-image"
//                   />
//                   <img
//                     src={img}
//                     alt="Cropped Dummy"
//                     className="table-image"
//                   />
//                   <img
//                     src={img}
//                     alt="Cropped Dummy"
//                     className="table-image"
//                   />
//                 </div> */}
//               </td>
//             </tr>
//             {/* Add more rows as needed */}
//           </tbody>
//           <tfoot>
//             <tr>
//               <td colSpan="4">
//                 <div className="submit-containers">
//                   <button className="submit-buttons">Submit</button>
//                 </div>
//               </td>
//             </tr>
//           </tfoot>
//         </table>
//       </div>
//     </div>
//   </>

//   // <>
//   //   <p>hello</p>
//   // </>
// )}
//     </div>
//   );
// };

// export default Review;

//***********************************
//***********************************
//***********************************
//***********************************
// *********************************************************
// import React, { useState } from "react";
// import img from "../Images/image1.jpg"; // Dummy image

// const Review = () => {
//   const [selectedTemplate, setSelectedTemplate] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [selectedBatch, setSelectedBatch] = useState("");

//   const templateBatches = {
//     temp1: {
//       batch1: {
//         status: "Pending",
//         assignerId: "12345",
//       },
//       batch2: {
//         status: "Work in process",
//         assignerId: "67890",
//       },
//       batch3: {
//         status: "Complete",
//         assignerId: "54321",
//       },
//     },
//     temp2: {
//       batch4: {
//         status: "Pending",
//         assignerId: "11111",
//       },
//       batch5: {
//         status: "Work in process",
//         assignerId: "22222",
//       },
//       batch6: {
//         status: "Complete",
//         assignerId: "33333",
//       },
//     },
//     temp3: {
//       batch7: {
//         status: "Pending",
//         assignerId: "44444",
//       },
//       batch8: {
//         status: "Work in process",
//         assignerId: "55555",
//       },
//       batch9: {
//         status: "Complete",
//         assignerId: "66666",
//       },
//     },
//   };

//   const handleTemplateChange = (event) => {
//     console.log("hellooo..", event.target.value);
//     setSelectedTemplate(event.target.value);
//   };

//   const handleViewClick = (batch) => {
//     console.log("helo");
//     setSelectedBatch(batch);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <div className="reviews-container">
//       <h1 className="review-title">This is Reviewer page</h1>
//       <div className="dropdown-container">
//         <select
//           className="dropdown"
//           value={selectedTemplate}
//           onChange={handleTemplateChange}
//         >
//           <option value="">Select a template</option>
//           <option value="temp1">temp1</option>
//           <option value="temp2">temp2</option>
//           <option value="temp3">temp3</option>
//         </select>
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
//               {Object.keys(templateBatches[selectedTemplate]).map((batch) => (
//                 <tr key={batch}>
//                   <td>{batch}</td>
//                   <td>{templateBatches[selectedTemplate][batch].status}</td>
//                   <td>{templateBatches[selectedTemplate][batch].assignerId}</td>
//                   <td>
//                     <button
//                       className="view-button"
//                       onClick={() => handleViewClick(batch)}
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
//                                 src={img}
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
//                                 src={img}
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
//                       {/* <div
//                         className="cropped
//                       "
//                       >
//                         <img
//                           src={img}
//                           alt="Cropped Dummy"
//                           className="table-image"
//                         />
//                         <img
//                           src={img}
//                           alt="Cropped Dummy"
//                           className="table-image"
//                         />
//                         <img
//                           src={img}
//                           alt="Cropped Dummy"
//                           className="table-image"
//                         />
//                       </div> */}
//                     </td>
//                   </tr>

//                   <tr>
//                     <td>
//                       <img src={img} alt="Dummy" className="table-image" />
//                     </td>
//                     <td>
//                       <table>
//                         <thead>
//                           <th>cropped img</th>
//                           <th>Option</th>
//                           <th>Action</th>
//                         </thead>
//                         <tbody>
//                           <tr>
//                             <td>
//                               <img
//                                 src={img}
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
//                                 src={img}
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
//                       {/* <div
//                         className="cropped
//                       "
//                       >
//                         <img
//                           src={img}
//                           alt="Cropped Dummy"
//                           className="table-image"
//                         />
//                         <img
//                           src={img}
//                           alt="Cropped Dummy"
//                           className="table-image"
//                         />
//                         <img
//                           src={img}
//                           alt="Cropped Dummy"
//                           className="table-image"
//                         />
//                       </div> */}
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>
//                       <img src={img} alt="Dummy" className="table-image" />
//                     </td>
//                     <td>
//                       <table>
//                         <thead>
//                           <th>cropped img</th>
//                           <th>Option</th>
//                           <th>Action</th>
//                         </thead>
//                         <tbody>
//                           <tr>
//                             <td>
//                               <img
//                                 src={img}
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
//                                 src={img}
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
//                       {/* <div
//                         className="cropped
//                       "
//                       >
//                         <img
//                           src={img}
//                           alt="Cropped Dummy"
//                           className="table-image"
//                         />
//                         <img
//                           src={img}
//                           alt="Cropped Dummy"
//                           className="table-image"
//                         />
//                         <img
//                           src={img}
//                           alt="Cropped Dummy"
//                           className="table-image"
//                         />
//                       </div> */}
//                     </td>
//                   </tr>
//                   {/* Add more rows as needed */}
//                 </tbody>
//                 <tfoot>
//                   <tr>
//                     <td colSpan="4">
//                       <div className="submit-containers">
//                         <button className="submit-buttons">Submit</button>
//                       </div>
//                     </td>
//                   </tr>
//                 </tfoot>
//               </table>
//             </div>
//           </div>
//         </>

//         // <>
//         //   <p>hello</p>
//         // </>
//       )}
//     </div>
//   );
// };

// export default Review;

// *********************************************************

// import React, { useState } from "react";
// import img from "../Images/image1.jpg";

// const Review = () => {
//   const [selectedTemplate, setSelectedTemplate] = useState("");
//   const [selectedBatch, setSelectedBatch] = useState("");

//   const templateBatches = {
//     temp1: {
//       batch1: {
//         images: [img, "/images/temp1/batch1/img2.jpg"],
//         status: "Pending",
//         assignerId: "12345",
//       },
//       batch2: {
//         images: [
//           "/images/temp1/batch2/img1.jpg",
//           "/images/temp1/batch2/img2.jpg",
//         ],
//         status: "Work in process",
//         assignerId: "67890",
//       },
//       batch3: {
//         images: [
//           "/images/temp1/batch3/img1.jpg",
//           "/images/temp1/batch3/img2.jpg",
//         ],
//         status: "Complete",
//         assignerId: "54321",
//       },
//     },
//     temp2: {
//       batch4: {
//         images: [
//           "/images/temp2/batch4/img1.jpg",
//           "/images/temp2/batch4/img2.jpg",
//         ],
//         status: "Pending",
//         assignerId: "11111",
//       },
//       batch5: {
//         images: [
//           "/images/temp2/batch5/img1.jpg",
//           "/images/temp2/batch5/img2.jpg",
//         ],
//         status: "Work in process",
//         assignerId: "22222",
//       },
//       batch6: {
//         images: [
//           "/images/temp2/batch6/img1.jpg",
//           "/images/temp2/batch6/img2.jpg",
//         ],
//         status: "Complete",
//         assignerId: "33333",
//       },
//     },
//     temp3: {
//       batch7: {
//         images: [
//           "/images/temp3/batch7/img1.jpg",
//           "/images/temp3/batch7/img2.jpg",
//         ],
//         status: "Pending",
//         assignerId: "44444",
//       },
//       batch8: {
//         images: [
//           "/images/temp3/batch8/img1.jpg",
//           "/images/temp3/batch8/img2.jpg",
//         ],
//         status: "Work in process",
//         assignerId: "55555",
//       },
//       batch9: {
//         images: [
//           "/images/temp3/batch9/img1.jpg",
//           "/images/temp3/batch9/img2.jpg",
//         ],
//         status: "Complete",
//         assignerId: "66666",
//       },
//     },
//   };

//   const handleTemplateChange = (event) => {
//     setSelectedTemplate(event.target.value);
//     setSelectedBatch(""); // Reset the batch selection when the template changes
//   };

//   const handleBatchChange = (event) => {
//     setSelectedBatch(event.target.value);
//   };

//   return (
//     <div className="review-container">
//       <h1 className="review-title">This is Reviewer page</h1>
//       <div className="dropdown-container">
//         <select
//           className="dropdown"
//           value={selectedTemplate}
//           onChange={handleTemplateChange}
//         >
//           <option value="">Select a template</option>
//           <option value="temp1">temp1</option>
//           <option value="temp2">temp2</option>
//           <option value="temp3">temp3</option>
//         </select>
//       </div>

//       {selectedTemplate && (
//         <div className="batch-container">
//           <h2 className="selected-template">
//             You selected: {selectedTemplate}
//           </h2>
//           <div className="dropdown-container">
//             <select
//               className="dropdown"
//               value={selectedBatch}
//               onChange={handleBatchChange}
//             >
//               <option value="">Select a batch</option>
//               {Object.keys(templateBatches[selectedTemplate]).map((batch) => (
//                 <option key={batch} value={batch}>
//                   {batch}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       )}

//       {selectedBatch && (
//         <>
//           <div className="image-gallery">
//             <h3 className="selected-batch">You selected: {selectedBatch}</h3>
//             <div className="image-container">
//               {templateBatches[selectedTemplate][selectedBatch].images.map(
//                 (image, index) => (
//                   <img
//                     key={index}
//                     src={image}
//                     alt={`Batch ${selectedBatch} Image ${index + 1}`}
//                     className="image"
//                   />
//                 )
//               )}
//             </div>
//           </div>

//           <div className="batch-table-container">
//             <table className="batch-table">
//               <thead>
//                 <tr>
//                   <th>Batch</th>
//                   <th>Status</th>
//                   <th>Assign</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>{selectedBatch}</td>
//                   <td>
//                     {templateBatches[selectedTemplate][selectedBatch].status}
//                   </td>
//                   <td>
//                     {
//                       templateBatches[selectedTemplate][selectedBatch]
//                         .assignerId
//                     }
//                   </td>
//                   <td>
//                     <button className="view-button">View</button>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Review;

// import React, { useState } from "react";
// import img from "../Images/image1.jpg";

// const Review = () => {
//   const [selectedTemplate, setSelectedTemplate] = useState("");
//   const [selectedBatch, setSelectedBatch] = useState("");

//   const templateBatches = {
//     temp1: {
//       batch1: [img, "/images/temp1/batch1/img2.jpg"],
//       batch2: [
//         "/images/temp1/batch2/img1.jpg",
//         "/images/temp1/batch2/img2.jpg",
//       ],
//       batch3: [
//         "/images/temp1/batch3/img1.jpg",
//         "/images/temp1/batch3/img2.jpg",
//       ],
//     },
//     temp2: {
//       batch4: [
//         "/images/temp2/batch4/img1.jpg",
//         "/images/temp2/batch4/img2.jpg",
//       ],
//       batch5: [
//         "/images/temp2/batch5/img1.jpg",
//         "/images/temp2/batch5/img2.jpg",
//       ],
//       batch6: [
//         "/images/temp2/batch6/img1.jpg",
//         "/images/temp2/batch6/img2.jpg",
//       ],
//     },
//     temp3: {
//       batch7: [
//         "/images/temp3/batch7/img1.jpg",
//         "/images/temp3/batch7/img2.jpg",
//       ],
//       batch8: [
//         "/images/temp3/batch8/img1.jpg",
//         "/images/temp3/batch8/img2.jpg",
//       ],
//       batch9: [
//         "/images/temp3/batch9/img1.jpg",
//         "/images/temp3/batch9/img2.jpg",
//       ],
//     },
//   };

//   const handleTemplateChange = (event) => {
//     setSelectedTemplate(event.target.value);
//     setSelectedBatch(""); // Reset the batch selection when the template changes
//   };

//   const handleBatchChange = (event) => {
//     setSelectedBatch(event.target.value);
//   };

//   return (
//     <div className="review-container">
//       <h1 className="review-title">This is Reviewer page</h1>
//       <div className="dropdown-container">
//         <select
//           className="dropdown"
//           value={selectedTemplate}
//           onChange={handleTemplateChange}
//         >
//           <option value="">Select a template</option>
//           <option value="temp1">temp1</option>
//           <option value="temp2">temp2</option>
//           <option value="temp3">temp3</option>
//         </select>
//       </div>

//       {selectedTemplate && (
//         <div className="batch-container">
//           <h2 className="selected-template">
//             You selected: {selectedTemplate}
//           </h2>
//           <div className="dropdown-container">
//             <select
//               className="dropdown"
//               value={selectedBatch}
//               onChange={handleBatchChange}
//             >
//               <option value="">Select a batch</option>
//               {Object.keys(templateBatches[selectedTemplate]).map((batch) => (
//                 <option key={batch} value={batch}>
//                   {batch}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       )}

//       {selectedBatch && (
//         <div className="image-gallery">
//           <h3 className="selected-batch">You selected: {selectedBatch}</h3>
//           <div className="image-container">
//             {templateBatches[selectedTemplate][selectedBatch].map(
//               (image, index) => (
//                 <img
//                   key={index}
//                   src={image}
//                   alt={`Batch ${selectedBatch} Image ${index + 1}`}
//                   className="image"
//                 />
//               )
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Review;
