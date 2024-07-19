import React from "react";
// import logo from "../assets/media/logos/logo-1-dark.svg";
import logo from "../Images/logo.gif";
// import logo from "../src/assets/media/logos/logo-1.svg";
// import bgimage from "../assets/media/illustrations/sketchy-1/14.png";
import backgroundImage from "../Images/Background Images.jpg";
function About() {
  const containerStyle = {
    // backgroundImage: `url(${backgroundImage})`,
    backgroundColor: "red",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
  };

  return (
    <div>
      <div className="d-flex flex-column flex-root">
        <div
          className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed"
          style={containerStyle}
        >
          {/*begin::Content*/}
          <div className="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
            {/*begin::Logo*/}
            <a className="mb-10">
              <img alt="Logo" src={logo} className="h-40px" />
            </a>
            {/*end::Logo*/}
            {/*begin::Wrapper*/}

            <h1 bgColor>Welcome To Sudisa Foundary </h1>

            <br></br>

            <div className="w-lg-450px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">
              <form action="">
                <div className="mb-2">
                  <label htmlFor="email">
                    <strong>Email</strong>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter email"
                    className="form-control rounded-0"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email">
                    <strong>Password</strong>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter password"
                    className="form-control rounded-0"
                  />
                </div>
                <button className="btn btn-success w-100">Log in</button>
              </form>
            </div>
            {/*end::Wrapper*/}
          </div>
          {/*end::Content*/}
        </div>
        {/*end::Authentication - Sign-in*/}
      </div>
    </div>
  );
}

export default About;
