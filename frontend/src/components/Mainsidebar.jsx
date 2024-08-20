import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
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

  const toggleSettingsDropdown = () => {
    setSettingsDropdownVisible(!settingsDropdownVisible);
  };
  const logout = () => {
    dispatch(logoutHandler());
    dispatch(initialProjectTypeHandler());
    navigate("/"); // Updated to use navigate
  };

  return (
    <div>
      <div className="sidebar">
        <div className="sidebar_header">
          <img src={require("../Images/logo.gif")} alt="" />
        </div>
        <div className="sidebar_nav">
          <ul>
            {/* <li>
              
              <Link to={"/temp"}>Dashboard</Link>
            </li> */}
            {/* <Link to={"/dashboard"}>Dashboard</Link> */}

            {/* need to woek on it below */}
            {/* <li className="drop" onClick={toggleMasterDropdown}>
              <span style={{ cursor: "pointer" }}>Master</span>
              <span
                style={{
                  position: "absolute",
                  top: "6px",
                  right: "12px",
                }}
              >
                {masterDropdownVisible ? (
                  <LiaAngleDownSolid />
                ) : (
                  <LiaAngleLeftSolid />
                )}
              </span>
              {masterDropdownVisible && (
                <ul className="drop_nav">
                  <li>
                    <Link to={"/department"}>Departments</Link>
                  </li>
                </ul>
              )}
            </li>
             */}

            {/* need to woek on it above */}
            {/* <li className="drop" onClick={toggleSettingsDropdown}>
              <span style={{ cursor: "pointer" }}>Settings</span>
              <span style={{ position: "absolute", top: "6px", right: "12px" }}>
                {settingsDropdownVisible ? (
                  <LiaAngleDownSolid />
                ) : (
                  <LiaAngleLeftSolid />
                )}
              </span>
              {settingsDropdownVisible && (
                <ul className="drop_nav">
                  <li>
                    <Link to={"/calibration"}>Start Calibration</Link>
                  </li>
                </ul>
              )}
            </li> */}

            {role === "Reviewer" && (
              <>
                <li>
                  {/* <Link to={"/dashboard"}>Dashboard</Link> */}
                  <Link to={"/"}>Dashboard</Link>
                </li>

                <li>
                  {/* <Link to={"/user"}>User</Link> */}
                  {/* <Link to={"/addReviewer"}>User</Link> */}
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
                      top: "6px",
                      right: "12px",
                    }}
                  >
                    {masterDropdownVisible ? (
                      <LiaAngleDownSolid />
                    ) : (
                      <LiaAngleLeftSolid />
                    )}
                  </span>
                  {masterDropdownVisible && (
                    <ul className="drop_nav">
                      <li>
                        <Link to={"/user"}>User</Link>
                        {/* <Link to={"/department"}>Departments</Link> */}
                        {/* <Link to={"/addAdmin"}>Admin</Link> */}
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  {/* <Link to={"/user"}>User</Link> */}
                  {/* <Link to={"/addReviewer"}>User</Link> */}
                </li>
              </>
            )}
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
