import React, { useState } from "react";
// import { postAPI } from "../utils/fetchapi";
// import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { postAPI } from "../utils/fetchapi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const AddDept = () => {
  const { username } = useSelector((state) => state.auth);
  console.log(username);

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "Reviewer",
    currentUser: username,
  });
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/user");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // console.log(`User input - ${name}: ${value}`);
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      let res = await postAPI("auth/addUser", user, null);
      console.log(res);
      if (res.status) {
        toast.success(res.message);
        setUser({
          name: "",
          username: "",
          email: "",
          password: "",
          role: "Reviewer",
          currentUser: username,
        });
        navigate("/user");
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    }
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
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dept_name" className="form-label">
                User Id
              </label>
              <input
                type="text"
                className="form-control"
                name="username"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                name="email"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="text"
                className="form-control"
                name="password"
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
                onChange={handleInputChange}
              >
                <option value="Reviewer">Reviewer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ backgroundColor: "#cbb852", border: "none" }}
            >
              Add User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDept;
