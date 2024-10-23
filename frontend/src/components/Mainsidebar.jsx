import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { LiaAngleDownSolid, LiaAngleLeftSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { logoutHandler } from "../redux/slices/authSlice";
import { initialProjectTypeHandler } from "../redux/slices/projectSlice";

const Sidebar = () => {
  const { role } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Updated to use useNavigate

  const [masterDropdownVisible, setMasterDropdownVisible] = useState(false);
  const [settingsDropdownVisible, setSettingsDropdownVisible] = useState(false);

  const toggleMasterDropdown = () => {
    setMasterDropdownVisible(!masterDropdownVisible);
  };

  // const toggleSettingsDropdown = () => {
  //   setSettingsDropdownVisible(!settingsDropdownVisible);
  // };
  const logout = () => {
    dispatch(logoutHandler());
    dispatch(initialProjectTypeHandler());
    navigate("/");
  };

  const sureToDelete = () => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Log Out?",
      icon: "warning",
      dangerMode: true,
      buttons: ["Nope!", "Yes!"],
    }).then(async (willDelete) => {
      if (willDelete) {
        await logout();
      }
    });
  };

  return (
    <div>
      <div className="sidebar">
        <div className="sidebar_header">
          <img src={require("../Images/logo.gif")} alt="" />
        </div>
        <div className="sidebar_nav">
          <ul>
            {role === "Reviewer" && (
              <>
                <li>
                  <Link to={"/"}>Dashboard</Link>
                </li>
              </>
            )}

            {role === "admin" && (
              <>
                <li>
                  <Link to={"/"}>Dashboard</Link>
                </li>
                <li className="drop" onClick={toggleMasterDropdown}>
                  <span style={{ cursor: "pointer" }}>Master</span>
                  <span
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "12px",
                      transform: "translateY(-50%)",
                    }}
                  >
                    {masterDropdownVisible ? (
                      <LiaAngleDownSolid />
                    ) : (
                      <LiaAngleLeftSolid />
                    )}
                  </span>
                </li>
                {masterDropdownVisible && (
                  <ul className="drop_nav">
                    <li>
                      <Link to={"/user"}>User</Link>
                      <Link to={"/omr"}>OMR Sheet</Link>
                    </li>
                  </ul>
                )}
              </>
            )}
            <li>
              <button onClick={sureToDelete}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
