import React from "react";
import backgroundImage from "../Images/Background Images.jpg"; // Import your image

const Contact = () => {
  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    // display: "flex",
    // justifyContent: "center",
    // // alignItems: "center",
    // color: "white",
    // fontSize: "24px",
  };

  return <div style={{ backgroundImage }}>Contact</div>;
};

export default Contact;
