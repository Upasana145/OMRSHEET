// import React, { useEffect, useState } from "react";
// import { FaMinus, FaPlus } from "react-icons/fa";
// import { postAPI } from "../utils/fetchapi";
// import { toast } from "react-toastify";
// import { useLocation, useNavigate } from "react-router-dom";

// import { FaTimes } from "react-icons/fa";

// const Edituser = () => {
//   const [department, setDepartment] = useState({
//     username: "",
//     name: "",
//     role: "",
//     email: "",
//   });

//   console.log(department);
//   const navigate = useNavigate();
//   const { state } = useLocation();

//   useEffect(() => {
//     if (state) {
//       setDepartment(state);
//     }
//   }, [state]);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setDepartment({
//       ...department,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     console.log("hey i am dept", department);
//     const { username, name, role, email } = department;
//     console.log(
//       "hey i am username, name, role.....",
//       username,
//       "role",
//       name,
//       "email",
//       email
//     );
//     const data = await postAPI(
//       "master/user/edit",
//       {
//         username: username,
//         name: name,
//         email: email,
//         role: role,
//       },
//       null
//     );
//     console.log(data);
//     if (data?.status) {
//       toast.success("Department is updated successfully");
//       setDepartment({
//         name: "",
//         email: "",
//         role: "",
//       });
//       navigate("/user");
//     } else {
//       toast.error("Department is not added! Try again!");
//     }
//   };
//   const handleClose = () => {
//     // You can perform any cleanup or additional actions before closing the page
//     navigate("/user"); // Assuming you want to navigate to the "/department" route
//   };

//   return (
//     <div>
//       <div className="main">
//         <div className="con_sm_form">
//           <div className="Edit_cross">
//             <h3>Edit Dept</h3>
//             <span className="close-button" onClick={handleClose}>
//               <FaTimes />
//             </span>
//           </div>

//           <br />
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label htmlFor="name" className="form-label">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="name"
//                 value={department?.name}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="role" className="form-label">
//                 Role
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="role"
//                 value={department?.role}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div className="mb-3">
//               <label htmlFor="email" className="form-label">
//                 Email
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="email"
//                 value={department?.email}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <button type="submit" className="btn btn-primary">
//               Save
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Edituser;
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { postAPI } from "../utils/fetchapi";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const Edituser = () => {
  const [department, setDepartment] = useState({
    username: "",
    name: "",
    role: "",
    email: "",
  });

  console.log(department);
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (state) {
      setDepartment(state);
    }
  }, [state]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDepartment({
      ...department,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("hey i am dept", department);
    const { username, name, role, email } = department;
    console.log(
      "hey i am username, name, role.....",
      username,
      "role",
      name,
      "email",
      email
    );
    const data = await postAPI(
      "master/user/edit",
      {
        username: username,
        name: name,
        email: email,
        role: role,
      },
      null
    );
    console.log(data);
    if (data?.status) {
      toast.success("Department is updated successfully");
      setDepartment({
        username: "",
        name: "",
        email: "",
        role: "",
      });
      navigate("/user");
    } else {
      toast.error("Department is not added! Try again!");
    }
  };

  const handleClose = () => {
    navigate("/user");
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
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={department?.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <select
                className="form-control"
                name="role"
                value={department?.role}
                onChange={handleInputChange}
              >
                <option value="">Select Role</option>
                <option value="admin">admin</option>
                <option value="Reviewer">Reviewer</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                name="email"
                value={department?.email}
                onChange={handleInputChange}
              />
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

export default Edituser;
