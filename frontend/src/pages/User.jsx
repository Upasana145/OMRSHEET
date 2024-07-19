import React, { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import UserData from "../components/UserData";
import { postAPI } from "../utils/fetchapi";
import { useSelector } from "react-redux";

const Users = () => {
  const location = useLocation();
  const { username } = useSelector((state) => state.auth);
  console.log("Hey i am location...", location?.state);

  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("admin");

  const fetchUsers = async () => {
    try {
      let payload = {
        currentUser: username,
      };
      const data = await postAPI(`auth/allUsers`, payload, null);
      if (data.status) {
        setUsers(data?.data);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Try Again!");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const handleRoleChange = (selectedRole) => {
    // Update the selected role state
    setSelectedRole(selectedRole);
  };

  return (
    <>
      <div className="main tablecontent">
        <div className="table_header">
          <div className="table_header_left">
            <h3>Users List</h3>
          </div>
          <div className="user_table_header">
            <Link to="/addUser" style={{ color: "white" }}>
              Add User
            </Link>
          </div>
        </div>

        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col"> User Id</th>
              <th scope="col">Full Name</th>
              <th scope="col">Email</th>

              {/* <th scope="col">Role</th> */}
              <th scope="col" style={{ width: "151px" }}>
                Role
              </th>
              <th scope="col">Created At</th>
              <th scope="col" colSpan={2}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <UserData users={users} fetchUsers={fetchUsers} />
          </tbody>
        </table>
      </div>

      <div className="footer">
        <div className="footer-bottom">
          <p>
            Copyright &#169;2024
            <br />
            Developed by <b>DCG Datacore Systems.Pvt.Ltd.</b>
            <br />
            <i>Version:1.1.0</i>
          </p>
        </div>
      </div>
    </>
  );
};

export default Users;
