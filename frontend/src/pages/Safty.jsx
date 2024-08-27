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

function Safty() {
  const { username, role } = useSelector((state) => state.auth);
  console.log("mrinmoyauth", role);
  console.log("i am username..", username);

  return (
    <>
      <Sidebar />

      <div className="master">
        <Routes>
          {role === "Reviewer" && (
            <>
              <Route path="/" element={<Review />} />
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
              {/* <Route
            path="/norecordfound"
            element={<ImageContainernorecordfound />}
          /> */}
              <Route path="/temp" element={<Templates />} />
              <Route path="/mapping" element={<TemplateMapping />} />
              <Route path="/mappingimage" element={<Templateimage />} />
              <Route path="/addAdmin" element={<AddAdmin />} />
              <Route path="/addReviewer" element={<AddReviewer />} />
              <Route path="/editUser" element={<EditUser />} />
              <Route path="/user" element={<User />} />
            </>
          )}
        </Routes>
      </div>
    </>
  );
}

export default Safty;
