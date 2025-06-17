import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./Signin";
import { useSelector } from "react-redux";
import Otppage from "./Otppage";
import Safty from "./Safty";

const Layout = () => {
  const auth = useSelector((state) => state.auth.value);
  console.log("hey i am auth", auth);

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
            <Safty />
          </>
        )}
      </BrowserRouter>
    </>
  );
};

export default Layout;
