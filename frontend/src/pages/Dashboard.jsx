import axios from "axios";
import React, { useState } from "react";
import Imagecontainer from "./Imagecontainer";
import { toast } from "react-toastify";
import { getAPI, postAPI } from "../utils/fetchapi";
import { useEffect } from "react";
function Dashboard() {
  const [users, setUsers] = useState([]);
  const [options, setOptions] = useState([]);
  const [startDate, setstartDate] = useState(null);
  const [endDate, setendDate] = useState(null);
  const [showImageContainer, setShowImageContainer] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");

  // const [responseData, setResponseData] = useState(null);

  // console.log(responseData);

  console.log(startDate);
  console.log(endDate);

  const handleButtonClick = async (event) => {
    if (startDate && endDate) {
      const requestData = JSON.stringify({
        startTime: startDate,
        endTime: endDate,
      });

      console.log(requestData, "requested data");
      const response = await postAPI("master/fetchAlerts", requestData, null);
      console.log(response, "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
      const data = await getAPI(`master/dept`, null);
      console.log(data, "heyyyyyy i am dataaa");
      if (data.status) {
        setOptions(data?.data);
      } else {
        toast.error(data?.message);
      }

      if (response.status) {
        setUsers(response?.data);
      } else {
        toast.error(response?.message);
      }

      setShowImageContainer(true);
      setButtonClicked(true);
    } else {
      toast.error("please enter start date and end date");
      setButtonClicked(true);
    }
  };
  useEffect(() => {
    if (buttonClicked) {
      // Only execute this when the button is clicked
      handleButtonClick();
    }
  }, [buttonClicked]);

  return (
    <>
      <div>
        <form className="formContainer mt-5">
          <div className="form-input form-start">
            <label htmlFor="">Start Date</label>
            <input
              type="datetime-local"
              id="startdate"
              value={startDate}
              onChange={(event) => {
                setstartDate(event.target.value);
                // console.log(event.target.value);
              }}
            />
          </div>
          <div className="form-input form-end">
            <label htmlFor="">End Date</label>
            <input
              type="datetime-local"
              id="enddate"
              value={endDate}
              onChange={(event) => {
                setendDate(event.target.value);
                console.log(event.target.value);
              }}
            />
          </div>
          <div className="form-input form-filter">
            <label htmlFor="">Department:</label>
            <select
              id="filter"
              value={selectedFilter}
              onChange={(event) => {
                setSelectedFilter(event.target.value);
                console.log(event.target.value, "selected optionnnnnnnnnnnn");
              }}
              className="form_control"
            >
              {/* <option value="All">All</option>
              {options.map((opts, i) => (
                <option>{opts.dept_name}</option>
              ))} */}
              {/* Add more filter options as needed */}
              <option value="All">All</option>
              {[...new Set(options.map((opts) => opts.dept_name))].map(
                (deptName, i) => (
                  <option key={i}>{deptName}</option>
                )
              )}
            </select>
          </div>
          <div className="form-btn">
            <button type="button" onClick={handleButtonClick}>
              Check
            </button>
          </div>
        </form>
        <div className="onCheckclick">
          {/* Display the data fetched from the API here */}
          {/* {responseData && (
            <div>
              <h2>Fetched Data:</h2>
              <pre>{JSON.stringify(responseData, null, 2)}</pre>
            </div>
          )} */}
        </div>
      </div>

      {showImageContainer && (
        <div className="imgconn">
          <Imagecontainer
            users={users}
            handleButtonClick={handleButtonClick}
            selectedFilter={selectedFilter}
          />
        </div>
      )}
    </>
  );
}

export default Dashboard;

// Backupdata ...use this when  you are using imageContainerbackup.jsx

// import axios from "axios";
// import React, { useState } from "react";
// import Imagecontainer from "./imageContainerbackup";

// import { toast } from "react-toastify";
// import { getAPI, postAPI } from "../utils/fetchapi";
// import { useEffect } from "react";
// function Dashboard() {
//   const [users, setUsers] = useState([]);
//   const [options, setOptions] = useState([]);

//   const [startDate, setstartDate] = useState(null);
//   const [endDate, setendDate] = useState(null);
//   const [showImageContainer, setShowImageContainer] = useState(false);
//   const [buttonClicked, setButtonClicked] = useState(false);
//   const [selectedFilter, setSelectedFilter] = useState("All");

//   // const [responseData, setResponseData] = useState(null);

//   // console.log(responseData);
//   console.log(startDate);
//   console.log(endDate);
//   const handleButtonClick = async (event) => {
//     if (startDate && endDate) {
//       const requestData = JSON.stringify({
//         startTime: startDate,
//         endTime: endDate,
//       });

//       console.log(requestData, "requested data");

//       try {
//         // const response = await postAPI("master/fetchAlerts", requestData, null);
//         // const data = await getAPI("master/dept", null);

//         // if (data.status) {
//         // setOptions(data?.data);
//         // } else {
//         //   toast.error(data?.message);
//         // }

//         // if (response.status) {
//         // setUsers(response?.data);
//         // } else {
//         //   toast.error(response?.message);
//         // }

//         setShowImageContainer((prev) => !prev); // Toggle the state
//       } catch (error) {
//         console.error(error);
//         toast.error("Something went wrong. Try Again!");
//       }
//     } else {
//       toast.error("Please enter start date and end date");
//     }
//   };
//   // useEffect(() => {
//   //   if (buttonClicked) {
//   //     // Only execute this when the button is clicked
//   //     handleButtonClick();
//   //   }
//   // }, [buttonClicked]);
//   useEffect(() => {
//     // Additional logic can be added if needed when showImageContainer changes
//   }, [showImageContainer]);

//   return (
//     <>
//       <div>
//         <form className="formContainer mt-5">
//           <div className="form-input form-start">
//             <label htmlFor="">Start Date</label>
//             <input
//               type="datetime-local"
//               id="startdate"
//               value={startDate}
//               onChange={(event) => {
//                 setstartDate(event.target.value);
//                 // console.log(event.target.value);
//               }}
//             />
//           </div>
//           <div className="form-input form-end">
//             <label htmlFor="">End Date</label>
//             <input
//               type="datetime-local"
//               id="enddate"
//               value={endDate}
//               onChange={(event) => {
//                 setendDate(event.target.value);
//                 console.log(event.target.value);
//               }}
//             />
//           </div>
//           <div className="form-input form-filter">
//             <label htmlFor="">Department:</label>
//             <select
//               id="filter"
//               value={selectedFilter}
//               onChange={(event) => {
//                 setSelectedFilter(event.target.value);
//                 console.log(event.target.value, "selected optionnnnnnnnnnnn");
//               }}
//               className="form_control"
//             >
//               {/* <option value="All">All</option>
//               {options.map((opts, i) => (
//                 <option>{opts.dept_name}</option>
//               ))} */}
//               {/* Add more filter options as needed */}
//               <option value="All">All</option>
//               {[...new Set(options.map((opts) => opts.dept_name))].map(
//                 (deptName, i) => (
//                   <option key={i}>{deptName}</option>
//                 )
//               )}
//             </select>
//           </div>
//           <div className="form-btn">
//             <button type="button" onClick={handleButtonClick}>
//               Check
//             </button>
//           </div>
//         </form>
//         <div className="onCheckclick">
//           {/* Display the data fetched from the API here */}
//           {/* {responseData && (
//             <div>
//               <h2>Fetched Data:</h2>
//               <pre>{JSON.stringify(responseData, null, 2)}</pre>
//             </div>
//           )} */}
//         </div>
//       </div>

//       {showImageContainer && (
//         <div className="imgconn">
//           <Imagecontainer
//             users={users}
//             handleButtonClick={handleButtonClick}
//             selectedFilter={selectedFilter}
//           />
//         </div>
//       )}
//     </>
//   );
// }

// export default Dashboard;
