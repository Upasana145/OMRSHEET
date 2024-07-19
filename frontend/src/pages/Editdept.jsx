// import React, { useEffect, useState } from "react";
// import { FaMinus, FaPlus } from "react-icons/fa";
// import { postAPI } from "../utils/fetchapi";
// import { toast } from "react-toastify";
// import { useLocation, useNavigate } from "react-router-dom";

// const EditDept = () => {
//   const [department, setDepartment] = useState({
//     dept_id: "",
//     dept_name: "",
//     head_name: "",
//     emails: "",
//   });
//   const [tableData, setTableData] = useState([]);
//   const navigate = useNavigate();
//   const { state } = useLocation();
//   console.log(department);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setDepartment({
//       ...department,
//       [name]: value,
//     });
//   };

//   useEffect(() => {
//     if (state) {
//       let emails = state?.emails.split(",");

//       setDepartment({ ...state, emails: emails });
//     }
//   }, [state]);

//   const addEmailInput = () => {
//     setDepartment({
//       ...department,
//       emails: [...department.emails, ""],
//     });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     console.log(department);
//     const { dept_id, dept_name, head_name, emails } = department;
//     const data = await postAPI(
//       "master/dept/edit",
//       {
//         dept_id: dept_id,
//         dept_name: dept_name,
//         emails: JSON.stringify(emails),
//         head_name: head_name,
//       },
//       null
//     );
//     console.log(data);
//     if (data?.status) {
//       toast.success("Department is updated successfully");
//       setDepartment({
//         dept_name: "",
//         head_name: "",
//         emails: "",
//       });
//       navigate("/department");
//     } else {
//       toast.error("Department is not added! Try again!");
//     }
//   };

//   return (
//     <div>
//       <div className="main">
//         <div className="con_sm_form">
//           <h3>Edit Dept</h3>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label htmlFor="dept_name" className="form-label">
//                 Department Name
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="dept_name"
//                 value={department?.dept_name}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="head_name" className="form-label">
//                 Department Head Name
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="head_name"
//                 value={department?.head_name}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="list_email">
//               <label htmlFor="emails" className="form-label">
//                 Emails
//               </label>
//               {department?.emails &&
//                 department?.emails.length > 0 &&
//                 department?.emails.map((email, index) => (
//                   <div className="mb-3 list" key={index}>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="emails"
//                       value={email}
//                       onChange={(e) => {
//                         const updatedEmails = [...department.emails];
//                         updatedEmails[index] = e.target.value;
//                         setDepartment({
//                           ...department,
//                           emails: updatedEmails,
//                         });
//                       }}
//                     />
//                     {index === department.emails.length - 1 && (
//                       <FaPlus onClick={addEmailInput} />
//                     )}
//                     {index !== 0 && (
//                       <FaMinus
//                         onClick={() => {
//                           const updatedEmails = [...department.emails];
//                           updatedEmails.splice(index, 1);
//                           setDepartment({
//                             ...department,
//                             emails: updatedEmails,
//                           });
//                         }}
//                       />
//                     )}
//                   </div>
//                 ))}
//             </div>
//             <button type="submit" className="btn btn-primary">
//               Edit Department
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditDept;

import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { postAPI } from "../utils/fetchapi";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

import { FaTimes } from "react-icons/fa";

const EditDept = () => {
  const [department, setDepartment] = useState({
    dept_id: "",
    dept_name: "",
    head_name: "",
    emails: [], // Initialize as an empty array
  });
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(department);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDepartment({
      ...department,
      [name]: value,
    });
  };

  useEffect(() => {
    if (state?.emails) {
      let emails = state?.emails.split(",");
      setDepartment({ ...state, emails: emails });
    }
  }, [state]);

  const addEmailInput = () => {
    setDepartment({
      ...department,
      emails: [...department.emails, ""],
    });
  };

  const removeEmailInput = (index) => {
    const updatedEmails = [...department.emails];
    updatedEmails.splice(index, 1);
    setDepartment({
      ...department,
      emails: updatedEmails,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(department);
    const { dept_id, dept_name, head_name, emails } = department;
    const data = await postAPI(
      "master/dept/edit",
      {
        dept_id: dept_id,
        dept_name: dept_name,
        emails: emails.join(","), // Convert the array to a comma-separated string
        head_name: head_name,
      },
      null
    );
    console.log(data);
    if (data?.status) {
      toast.success("Department is updated successfully");
      setDepartment({
        dept_name: "",
        head_name: "",
        emails: [],
      });
      navigate("/department");
    } else {
      toast.error("Department is not added! Try again!");
    }
  };
  const handleClose = () => {
    // You can perform any cleanup or additional actions before closing the page
    navigate("/department"); // Assuming you want to navigate to the "/department" route
  };

  return (
    <div>
      <div className="main">
        <div className="con_sm_form">
          <div className="Edit_cross">
            <h3>Edit Dept</h3>
            <span className="close-button" onClick={handleClose}>
              <FaTimes />
            </span>
          </div>

          <br />
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="dept_name" className="form-label">
                Department Name
              </label>
              <input
                type="text"
                className="form-control"
                name="dept_name"
                value={department?.dept_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="head_name" className="form-label">
                Department Head Name
              </label>
              <input
                type="text"
                className="form-control"
                name="head_name"
                value={department?.head_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="list_email">
              <label htmlFor="emails" className="form-label">
                Emails
              </label>
              {department?.emails &&
                department?.emails.map((email, index) => (
                  <div className="mb-3 list" key={index}>
                    <input
                      type="text"
                      className="form-control"
                      name="emails"
                      value={email}
                      onChange={(e) => {
                        const updatedEmails = [...department.emails];
                        updatedEmails[index] = e.target.value;
                        setDepartment({
                          ...department,
                          emails: updatedEmails,
                        });
                      }}
                    />
                    {index === department.emails.length - 1 && (
                      <FaPlus onClick={addEmailInput} />
                    )}
                    {index !== 0 && (
                      <FaMinus onClick={() => removeEmailInput(index)} />
                    )}
                  </div>
                ))}
            </div>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditDept;
