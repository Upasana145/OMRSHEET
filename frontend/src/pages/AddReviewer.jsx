import React from "react";

import { Link } from "react-router-dom";

const AddReviewer = () => {


  return (
    <>
      <div className="main tablecontent">
        <div className="table_header">
          <div className="table_header_left">
            <h3>Reviewer List</h3>
          </div>
          <div className="user_table_header">
            {/* <Link to="/addUser" style={{ color: "white" }}> */}
            <Link to="/addUser" style={{ color: "white" }}>
              Add Reviewer
            </Link>
          </div>
        </div>

        {/* <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Full Name</th>
              <th scope="col">Email</th>
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
        </table> */}
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

export default AddReviewer;
