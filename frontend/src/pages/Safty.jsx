import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from "./Dashboard";

import Prac from "./Prac";
import Header from "../components/Header";
import Sidebar from "../components/Mainsidebar";
import AddDept from "./AddDept";
import Depts from "./Depts";
import EditDept from "./Editdept";
// import ImageContainernorecordfound from "./ImageContainernorecordfound";
import Adduser from "./Adduser";
import User from "./User";
import EditUser from "./Edituser";
import TemplateMapping from "./TemplateMapping";
import Templates from "./Templates";
import Templateimage from "./Templateimage";
import AddAdmin from "./AddAdmin";
import AddReviewer from "./AddReviewer";
import Review from "./Review";
import OMRSheet from "./omr/OMRSheet";
import Add from "./omr/Add";
import ReviewQuestionPaper from "./ReviewQuestionPaper";

function Safty() {
  const { role } = useSelector((state) => state.auth);

  return (
    <>
      <Sidebar />
      <div className="master">
        <Routes>
          {role === "Reviewer" && (
            <>
              <Route path="/" element={<Review />} />
              <Route
                path="/reviewquestionpaper"
                element={<ReviewQuestionPaper />}
              />
            </>
          )}
          {role === "admin" && (
            <>
              <Route path="/" element={<Templates />} />
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/prac" element={<Prac />}></Route>
              <Route path="/Header" element={<Header />}></Route>
              <Route path="/addDept" element={<AddDept />} />
              <Route path="/editDept" element={<EditDept />} />
              <Route path="/department" element={<Depts />} />
              <Route path="/addUser" element={<Adduser />} />
              <Route path="/temp" element={<Templates />} />
              <Route path="/mapping" element={<TemplateMapping />} />
              <Route path="/mappingimage" element={<Templateimage />} />
              <Route path="/addAdmin" element={<AddAdmin />} />
              <Route path="/addReviewer" element={<AddReviewer />} />
              <Route path="/editUser" element={<EditUser />} />
              <Route path="/user" element={<User />} />
              <Route path="/omr" element={<OMRSheet />} />
              <Route path="/omr-upload" element={<Add />} />
            </>
          )}
        </Routes>
      </div>
    </>
  );
}

export default Safty;
