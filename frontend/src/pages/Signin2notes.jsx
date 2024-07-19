import React, { useState } from "react";
// import logo from "../assets/media/logos/logo-1-dark.svg";
import logo from "../Images/logo.gif";
// import logo from "../src/assets/media/logos/logo-1.svg";
// import bgimage from "../assets/media/illustrations/sketchy-1/14.png";
import backgroundImage from "../Images/Background Images.jpg";
import { postAPI } from "../utils/fetchapi";
import { useDispatch } from "react-redux";

function Signin() {
  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
  };

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  return (
    <div>
      <div>
        <div style={containerStyle}>
          <a className="logo-link">
            <img className="logo-image" alt="Logo" src={logo} />
          </a>

          <h1 className="welcome-heading">Welcome To Sudisa Foundary </h1>

          <br></br>

          <div className="logincontent">
            <form className="login-form">
              <div className="input-group">
                <label htmlFor="username">
                  <strong>Username</strong>
                </label>
                <input
                  type="text"
                  name="Username"
                  placeholder="Username"
                  onChange={(e) =>
                    setValues({ ...values, username: e.target.value })
                  }
                  className="input-field"
                  id="username"
                />
              </div>

              <div className="input-group">
                <label htmlFor="password">
                  <strong>Password</strong>
                </label>
                <input
                  type="text"
                  name="Password"
                  placeholder="Password"
                  className="input-field"
                  id="password"
                />
              </div>

              <button type="button" className="submit-button">
                Login
              </button>
            </form>
          </div>
        </div>
        {/*end::Authentication - Sign-in*/}
      </div>
    </div>
  );
}

export default Signin;

// import React, { useState } from "react";
// import "../assets/loginForm.css";
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer, toast } from "react-toastify";
// import companylogo from "../images/grsc.png";
// import { postAPI } from "../utils/fetchAPIs";
// import { useDispatch } from "react-redux";
// import { loginHandler, logoutHandler } from "../redux/slices/authSlice.js";

// function LoginForm() {
//   const dispatch = useDispatch();
//   const [vendorLogin, setVendorLogin] = useState("");
//   const [vendorPassword, setVendorPassword] = useState("");
//   // const [loginData, setLoginData] = useState({
//   //   username: "",
//   //   password: "",
//   // });
//   const [isNavigating, setIsNavigating] = useState(false); // Add state for navigation

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setIsNavigating(true);

//     const payload = {
//       username: vendorLogin,
//       password: vendorPassword,
//     };
//     let data = await postAPI(
//       "http://10.12.1.151:4001/api/v1/login",
//       payload,
//       null
//     );
//     if (data.status) {
//       toast.success(data?.message);
//       dispatch(loginHandler());
//       setIsNavigating(false);
//     } else {
//       toast.error(data?.message);
//       setIsNavigating(false);
//     }

//     //  // Start the loading indicator
//   };

//   return (
//     <div className="main-login-container">
//       <div className="login-container">
//         <img src={companylogo} alt="Company Logo" className="company-logo" />
//         <h2>Welcome to GRSC</h2>
//         <form onSubmit={handleLogin}>
//           <div className="input-container">
//             <label htmlFor="vendor-login">Vendor Login</label>
//             <input
//               type="text"
//               id="vendor-login"
//               name="vendor-login"
//               value={vendorLogin}
//               onChange={(e) => setVendorLogin(e.target.value)}
//               required
//             />
//           </div>
//           <div className="input-container">
//             <label htmlFor="vendor-password">Vendor Password</label>
//             <input
//               type="password"
//               id="vendor-password"
//               name="vendor-password"
//               value={vendorPassword}
//               onChange={(e) => setVendorPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit" disabled={isNavigating}>
//             {isNavigating ? "Logging in..." : "Login"}
//           </button>
//         </form>
//         <ToastContainer />
//       </div>
//     </div>
//   );
// }

// export default LoginForm;
