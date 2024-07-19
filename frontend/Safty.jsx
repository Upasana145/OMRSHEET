import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Deptartment from "./Deptartment";
import Calibration from "./Calibration";
import Prac from "./Prac";
import Header from "../components/Header";
import Sidebar from "../components/Mainsidebar";
import AddDept from "./AddDept";
import Depts from "./Depts";
import EditDept from "./Editdept";
import ImageContainernorecordfound from "./ImageContainernorecordfound";

function Safty() {
  return (
    <>
      <BrowserRouter>
        <Sidebar />
        {/* <Header /> */}
        {/* <Mainpage /> */}
        <div className="master">
          <Routes>
            {/* <Route path="/" element={<About />}></Route> */}

            <Route path="/dashboard" element={<Dashboard />}></Route>
            {/* <Route path="/department" element={<Deptartment />}></Route> */}
            <Route path="/calibration" element={<Calibration />}></Route>
            <Route path="/prac" element={<Prac />}></Route>
            <Route path="/Header" element={<Header />}></Route>
            <Route path="/addDept" element={<AddDept />} />
            <Route path="/editDept" element={<EditDept />} />
            <Route path="/department" element={<Depts />} />
            <Route
              path="/norecordfound"
              element={<ImageContainernorecordfound />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default Safty;
