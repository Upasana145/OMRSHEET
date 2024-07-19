import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import UserData from "../components/UserData";
import { getAPI, postAPI } from "../utils/fetchapi";
import DeptData from "../components/DeptData";
// const API = "https://dummyjson.com/products/1";``
const API = "http://10.12.1.151:4002/api/v1/master/dept";

const Depts = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const data = await getAPI(`master/dept`, null);
      // console.log(data, "helllllllllllllllllllllllllllllllllllll");
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

  return (
    <>
      <div className="main tablecontent">
        <div className="table_header">
          <div className="table_header_left">
            <h3>Admin Details</h3>
          </div>
          <div className="table_header_r">
            {/* <Link to="/addDept">Add Admin</Link> */}
            <Link>Add Admin</Link>
          </div>
        </div>

        {/* <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">Department ID</th>
              <th scope="col">Department Name</th>
              <th scope="col">Emails</th>
              <th scope="col">Head Name</th>
              <th scope="col" colSpan={2} style={{ textAlign: "center" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <DeptData users={users} fetchUsers={fetchUsers} />
          </tbody>
        </table> */}
      </div>

      <div className="footer">
        <div className="footer-bottom">
          <p>
            Copyright &#169;2023
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

export default Depts;
