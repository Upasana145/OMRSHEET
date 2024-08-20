import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Header from "../components/Header";
// import Sidebar from "../components/Sidebar";
// import Moulding from "./Moulding";
// import Visual from "./Visual";
import Signin from "./Signin";
import { useDispatch, useSelector } from "react-redux";
import { projectTypeHandler } from "../redux/slices/projectSlice";
import Otppage from "./Otppage";
import Safty from "./Safty";
// import TemplateMapping from "./TemplateMapping";
// import Templates from "./Templates";
// import Templateimage from "./Templateimage";
const Layout = () => {
  // const [selectedOption, setSelectedOption] = useState(null);
  // const [isloggedIn, setIsloggedin] = useState(false);

  const auth = useSelector((state) => state.auth.value);

  // const projectType = useSelector((state) => state.projectType.value);

  const dispatch = useDispatch();

  const handleOptionSelect = (selectedOption) => {
    // setSelectedOption(selectedOption);
    dispatch(projectTypeHandler(selectedOption));
  };

  // console.log(selectedOption);

  return (
    <>
      <BrowserRouter>
        {!auth ? (
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/forget" element={<Otppage />} />
          </Routes>
        ) : (
          <>
            {/* <Header handleOptionSelect={handleOptionSelect} /> */}
            {/* <Sidebar /> */}
            <Safty />
          </>
        )}
      </BrowserRouter>
    </>
  );
};

export default Layout;
