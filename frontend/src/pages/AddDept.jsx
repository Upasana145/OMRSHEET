// import React from "react";
// import { FaMinus, FaPlus } from "react-icons/fa";
// import { useState } from "react";

// const AddDept = () => {
//   const [emails, setEmails] = useState([
//     {
//       email: "",
//     },
//   ]);

//   const addEmailInput = () => {
//     setEmails([...emails, { email: "" }]);
//   };

//   return (
//     <div>
//       <div className="main">
//         <div className="con_sm_form">
//           <form>
//             <div class="mb-3">
//               <label for="dept_name" class="form-label">
//                 Department Name
//               </label>
//               <input type="text" class="form-control" id="dept_name" />
//             </div>
//             <div class="mb-3">
//               <label for="head_name" class="form-label">
//                 Department Head Name
//               </label>
//               <input type="text" class="form-control" id="head_name" />
//             </div>
//             <div className="list_email">
//               <label for="emails" class="form-label">
//                 Emails
//               </label>
//               {emails &&
//                 emails.map((item, index) => (
//                   <div class="mb-3 list">
//                     <input type="text" class="form-control" id="emails" />
//                     {/* {emails.length - 1 === index && ( */}
//                     <FaPlus onClick={addEmailInput} />
//                     {/* )} */}
//                     {/* {emails.length - 1 !== index && (
//                       <FaMinus onClick={removeEmailInput} />
//                     )} */}
//                   </div>
//                 ))}
//             </div>
//             <button type="submit" class="btn btn-primary">
//               Add Department
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddDept;

import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { postAPI } from "../utils/fetchapi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const AddDept = () => {
  const [department, setDepartment] = useState({
    dept_name: "",
    head_name: "",
    emails: [""],
  });
 
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDepartment({
      ...department,
      [name]: value,
    });
  };

  const addEmailInput = () => {
    setDepartment({
      ...department,
      emails: [...department.emails, ""],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await postAPI("master/dept", department, null);
    if (data?.status) {
      toast.success("Department is added successfully");
      setDepartment({
        dept_name: "",
        head_name: "",
        emails: [""],
      });
      navigate("/department");
    } else {
      toast.error("Department is not added! Try again!");
    }
  };
  const handleClose = () => {
    navigate("/department");
  };
  return (
    <div>
      <div className="main">
        <div className="con_sm_form">
          <div className="close_depts">
            <span className="close-button" onClick={handleClose}>
              <FaTimes />
            </span>
          </div>

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
              {department.emails.map((email, index) => (
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
                    <FaMinus
                      onClick={() => {
                        const updatedEmails = [...department.emails];
                        updatedEmails.splice(index, 1);
                        setDepartment({
                          ...department,
                          emails: updatedEmails,
                        });
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            <button type="submit" className="btn btn-primary">
              Add Department
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDept;
