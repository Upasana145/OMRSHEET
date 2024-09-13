import React from "react";

const ReviewQuestionPaper = ({ data, closeDetails }) => {
  if (!data) return null;

  console.log("Data received in ReviewQuestionPaper:", data.data);

  const parseUnderReview = (under_review) => {
    try {
      if (typeof under_review === 'string') {
        const parsedData = JSON.parse(under_review); // Parse the JSON string
        console.log("Parsed data:", parsedData);

        if (parsedData && parsedData.coord) {
          console.log("Type and coordinates:", parsedData.type, parsedData.coord);
          return parsedData;
        } else {
          console.log("Parsed data does not have 'coord' property");
          return null;
        }
      } else {
        console.log("under_review is not a string");
        return null;
      }
    } catch (error) {
      console.error("Error parsing under_review:", error);
      return null;
    }
  };


  const renderInputBasedOnType = (under_review) => {
    const parsedData = parseUnderReview(under_review);

    if (!parsedData) return null;

    const { type, coord } = parsedData;

    if (type === "hall_ticket_no_parent" || type === "Question" && coord) {
      // Create checkboxes from 'a' to the maximum key found in 'coord'
      const checkboxes = Object.keys(coord)
        .filter((key) => key.length === 1 && key.match(/[a-z]/)) // Filter single-letter keys
        .map((key, index) => (
          <label key={index} style={{ marginRight: "8px" }}>
            <input type="checkbox" name={key} value={key} />
            {key.toUpperCase()}
          </label>
        ));

      return <div>{checkboxes}</div>;
    } else if (type === "Rollnumber") {
      return <input type="text" placeholder="Enter Rollnumber" />;
    }

    // Add other types here if needed
    return null;
  };


//   // Function to render input elements based on the type
//   const renderInputBasedOnType = (under_review) => {
//     console.log("i am type...", under_review);
//     console.log("Type of under_review:", typeof under_review);
//     // const { type, coord } = under_review; // Destructure `type` and `coord` from `under_review`
//     // console.log("Type and coordinates:", type, coord);
//     // if (type === "hall_ticket_no_parent") {
//     //   // Create checkboxes from 'a' to the maximum key found in 'coord'
//     //   const checkboxes = Object.keys(coord)
//     //     .filter(key => key.length === 1 && key.match(/[a-z]/)) // Filter single-letter keys
//     //     .map((key, index) => (
//     //       <label key={index} style={{ marginRight: "8px" }}>
//     //         <input type="checkbox" name={key} value={key} />
//     //         {key.toUpperCase()}
//     //       </label>
//     //     ));

//     //   return <div>{checkboxes}</div>;
//     // } else if (type === "Rollnumber") {
//     //   return <input type="text" placeholder="Enter Rollnumber" />;
//     // }

//       // Add other types here if needed
//       return null;
// };



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
            </tr>
          </thead>
          <tbody>
            {data.data.map((image, index) => (
              <tr key={index}>
                <td>
                
                  <img
                    src={`${process.env.REACT_APP_FILE_URI}${image.cropped_image}`}
                    alt={image.ques_paper_image_path}
                    className="table-image"
                  />
                </td>
           
                {/* <td>
                    {image.under_review};
                </td> */}

<td>
                  {/* Render input elements based on type */}
                  {renderInputBasedOnType(image.under_review)}
                </td>
            
             <td>
                            <button className="save-button">Save</button>
                            <button className="skip-button">Skip</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default ReviewQuestionPaper;





















// import React from "react";

// const ReviewQuestionPaper = ({ data, closeDetails }) => {
//   if (!data) return null;
// console.log("hey i am data in ReviewQuestionpaper", data.data);
//   return (
//     <div className="details-modal">
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
//             </tr>
//           </thead>
//           <tbody>
//             {data.data.map((image, index) => (
//               <tr key={index}>
//                 <td>
                
//                   <img
//                     src={`${process.env.REACT_APP_FILE_URI}${image.cropped_image}`}
//                     alt={image.ques_paper_image_path}
//                     className="table-image"
//                   />
//                 </td>
//                 {/* <td>
//                     {image.template_name};
//                 </td> */}
//                 <td>
//                     {image.under_review};
//                 </td>
                // {/* <td>
                //             <button className="save-button">Save</button>
                //             <button className="skip-button">Skip</button>
                // </td> */}
              
//               </tr>
//             ))}
//           </tbody>
//         </table>








//         <div className="details-content">
//           {/* Display the data here */}
//           {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReviewQuestionPaper;
