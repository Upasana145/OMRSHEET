import React, { useState } from "react";
// import logo from "../assets/media/logos/logo-1-dark.svg";
import logo from "../Images/logo.gif";
// import logo from "../src/assets/media/logos/logo-1.svg";
// import bgimage from "../assets/media/illustrations/sketchy-1/14.png";
import backgroundImage from "../Images/Background Images.jpg";
import { postAPI } from "../utils/fetchapi";
import { useDispatch } from "react-redux";
import { loginHandler, logoutHandler } from "../redux/slices/authSlice.js";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Signin() {
  const dispatch = useDispatch();
  const [vendorLogin, setVendorLogin] = useState("");
  const [vendorPassword, setVendorPassword] = useState("");
  const [isNavigating, setIsNavigating] = useState(false);

  const handleLogin = async () => {
    setIsNavigating(true);

    try {
      const payload = {
        username: vendorLogin,
        password: vendorPassword,
      };

      let data = await postAPI("auth/login", payload, null);
      if (data?.status) {
        dispatch(loginHandler(data));
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error?.message);
    } finally {
      setIsNavigating(false);
    }
  };

  const containerStyle = {
    background:
      "linear-gradient(to bottom, rgb(231 214 118), rgb(255 255 255))",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
  };

  return (
    <div>
      <div>
        <div style={containerStyle}>
          <a href className="logo-link">
            <img className="logo-image" alt="Logo" src={logo} />
          </a>

          <h1 className="welcome-heading">SignIn to OMR Mapping Portal</h1>

          <br></br>

          <div className="logincontent">
            <form className="login-form" onSubmit={handleLogin}>
              <div className="form-group w-100 mb-2">
                <label htmlFor="vendor-login">
                  <strong>Username</strong>
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={vendorLogin}
                  onChange={(e) => setVendorLogin(e.target.value)}
                  className="input-field form-control"
                />
              </div>

              <div className="form-group w-100 mb-2">
                <label htmlFor="password">
                  <strong>Password</strong>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="input-field form-control"
                  value={vendorPassword}
                  onChange={(e) => setVendorPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                onClick={handleLogin}
                disabled={isNavigating}
                className="submit-button"
              >
                {isNavigating ? "Logging in..." : "LOGIN"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
