import "./App.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Layout from "./pages/Layout";
import Otppage from "./pages/Otppage";
import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer } from "react-toastify";
import "./assets/css/loading.css";
import "./assets/css/style.bundle.css";
import "./assets/css/main.css";

function App() {
  return (
    <>
      {/* <Sidebar />
      <Header /> */}
      {/* <Otppage /> */}

      <Layout />
      {/* <ToastContainer /> */}
    </>
  );
}

export default App;
