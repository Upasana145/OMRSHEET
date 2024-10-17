import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// import { fetchRecords } from "../../redux/slices/apiSlice";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Modal, Button } from "react-bootstrap";
// import ImagePreview from "../../components/ImagePreview";
// import PaginationControl from "../../components/PaginationControl";
import { getAPI } from "../../utils/fetchapi";

const OMRSheet = () => {
  // const dispatch = useDispatch();

  // const [currentPage, setCurrentPage] = useState(1);
  // const [pagination, setPagination] = useState({ total: 0, totalPages: 0 });
  const [items, setItems] = useState([]);

  const fetchData = async (page) => {
    // try {
    //   const action = await dispatch(
    //     fetchRecords({ indicatorPath: "/omr/sheet", page, limit: 10 })
    //   );
    //   if (fetchRecords.fulfilled.match(action)) {
    //     setItems(action.payload.results);
    //     setPagination(action.payload.pagination);
    //     setCurrentPage(page);
    //   } else {
    //     toast.error("Unable to fetch record. Please try again.");
    //   }
    // } catch (error) {
    //   toast.error("Something went wrong! Server error!");
    // }
    try {
      const data = await getAPI("omr/sheet", null);
      if (data?.success) {
        setItems(data?.results);
      } else {
        toast.error("Unable to fetch record. Please try again.");
      }
    } catch (error) {
      toast.error(`Something went wrong. ${error.message}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const handlePageChange = (page) => {
  //   if (page > 0 && page <= pagination.totalPages) {
  //     fetchData(page);
  //   }
  // };

  // const isLastPage = items.length < pagination.limit;
  // const [selectedImage, setSelectedImage] = useState(null);

  // const handleViewImage = (imagePath) => {
  //   console.log("imagePath", imagePath);
  //   setSelectedImage(imagePath);
  // };

  // const handleClose = () => {
  //   setSelectedImage(null);
  // };

  const generateTypeConfig = (items) => {
    const config = {};

    items.forEach((item) => {
      if (item.mode === "parent") {
        const options = {};
        if (item.children && item.children.length > 0) {
          item.children.forEach((child, index) => {
            options[index] = child.name;
          });
          const length = item.children.length;
          options[length] = "RR";
          options[length + 1] = "RR";
          config[item.type] = {
            OPTIONS: options,
            LENGTH: length,
          };
        } else {
          config[item.type] = {
            OPTIONS: { 0: "RR", 1: "RR" },
            LENGTH: 0,
          };
        }
      }
    });

    return config;
  };

  const handleButtonClick = async (temp) => {
    const { template_name, map, t_name, batch_name } = temp;

    if (!map || !JSON.parse(map) || map === "") {
      return toast.warn("Mapping is required.");
    }
    console.log("t_info", template_name, t_name, batch_name);
    try {
      // Parse the map JSON
      const parsedMap = JSON.parse(map);
      console.log("parsedMap", parsedMap);
      // Generate type_config from the parsed map
      const typeConfig = generateTypeConfig(parsedMap);
      const payload = {
        template: parsedMap,
        template_image: `${process.env.REACT_APP_AI_DATA}${template_name}/default/${t_name}`,
        //data_path: `${process.env.REACT_APP_AI_DATA}${template_name}`,
        data_path: `${process.env.REACT_APP_AI_DATA}${template_name}/${batch_name}`,
        t_name: `${t_name}`,
        type_config: typeConfig,
        batch_name: `${batch_name}`,
        // processed_omr_result_id: `${ID}`
      };
      const response = await fetch(process.env.REACT_APP_AI_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Success:", responseData);
      toast.success("Processing has been started!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while processing.");
    }
  };
  // const navigate = useNavigate();
  // const handleNavigateToMapping = (template) => {
  //   console.log("hey i am template", template);
  //   navigate("/mapping", { state: { template } });
  // };

  return (
    <>
      <div className="main tablecontent">
        <div className="table_header">
          <div className="table_header_left">
            <h3>OMR Sheet Uploaded List</h3>
          </div>
          <div className="user_table_header">
            <Link to="/omr-upload" style={{ color: "white" }}>
              Upload
            </Link>
          </div>
        </div>

        <table className="table table-striped table-bordered table-hover">
          <thead>
            {/* <tr>
              <PaginationControl
                currentPage={currentPage}
                pagination={pagination}
                handlePageChange={handlePageChange}
                isNextDisabled={isLastPage}
              />
            </tr> */}
            <tr>
              <th scope="col">Template Name</th>
              <th scope="col">Batch Name</th>
              <th scope="col">Created At</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(items) &&
              items.map((omr, i) => (
                <tr key={i}>
                  <td>{omr.template_name}</td>
                  <td>{omr.batch_name}</td>
                  <td>
                    {omr.created_at &&
                      `${new Date(
                        omr.created_at
                      ).toLocaleDateString()} ${new Date(
                        omr.created_at
                      ).toLocaleTimeString()}`}
                  </td>
                  <td>
                    <button
                      className="btn btn-icon btn-dark btn-active-color-primary btn-sm me-1 "
                      title="View"
                      onClick={() => handleButtonClick(omr)}
                      style={{ width: "85px" }}
                    >
                      PROCESS
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="footer">
        <div className="footer-bottom">
          <p>
            Copyright &#169;2024
            <br />
            Developed by <b>DCG Datacore Systems.Pvt.Ltd.</b>
            <br />
            <i>Version:1.1.0</i>
          </p>
        </div>
      </div>
    </>
  );
};

export default OMRSheet;
