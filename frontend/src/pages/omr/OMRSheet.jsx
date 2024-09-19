// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify"; 
// import { fetchRecords } from "../../redux/slices/apiSlice";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Modal, Button } from 'react-bootstrap';
// import ImagePreview from "../../components/ImagePreview";
// import PaginationControl from "../../components/PaginationControl";


// const OMRSheet = () => {
//   const dispatch = useDispatch(); 

//   const [currentPage, setCurrentPage] = useState(1);
//   const [pagination, setPagination] = useState({ total: 0, totalPages: 0 });
//   const [items, setItems] = useState([]);

//   const fetchData = async (page) => {
//     try {
//       const action = await dispatch(fetchRecords({ indicatorPath: '/omr/sheet', page: currentPage, limit: 10 }));
//       if (fetchRecords.fulfilled.match(action)) { 
//         setItems(action.payload.results);
//         setPagination(action.payload.pagination);
//         setCurrentPage(page);
//       } else {
//         toast.error('Unable to fetch record. Please try again.');
//       }
//     } catch (error) {
//       toast.error('Something went wrong!. Server error!');
//     }
//   };


//   useEffect(() => {
//     fetchData(currentPage);
//   }, [currentPage]);

//   const handlePageChange = (page) => {
//     if (page > 0 && page <= pagination.totalPages) {
//       fetchData(page);
//     }
//   };
//   const isLastPage = items.length < pagination.limit;
//   const [selectedImage, setSelectedImage] = useState(null);

//   const handleViewImage = (imagePath) => {
//     console.log('imagePath', imagePath)
//     setSelectedImage(imagePath);
//   }; 


//   const handleClose = () => {
//     setSelectedImage(null);
//   };

//   return (
//     <>
//       <div className="main tablecontent">
//         <div className="table_header">
//           <div className="table_header_left">
//             <h3>OMR Sheet Uploaded List</h3>
//           </div>
//           <div className="user_table_header">
//             <Link to="/omr-upload" style={{ color: "white" }}>
//               Upload
//             </Link>
//           </div>
//         </div>

//         <table className="table table-striped table-bordered table-hover">
//           <thead> 
//             <PaginationControl
//               currentPage={currentPage}
//               pagination={pagination}
//               handlePageChange={handlePageChange}
//               isNextDisabled={isLastPage}
//             />
//             <tr>
//               <th scope="col">Template Name</th>
//               <th scope="col">Batch Name</th>
//               <th scope="col">Created At</th>
//               <th scope="col" colSpan={2}>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {{Array.isArray(items) && items.map((omr) => (
//               <tr key={omr.ID}>
//                 <td>{omr.template_name}</td>
//                 <td>{omr.batch_name}</td>
//                 <td>{omr.created_at}</td>
//                 <td>
//                   <button onClick={() => handleViewImage(omr.ques_paper_image_path)}>
//                     view
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <Modal show={!!selectedImage} onHide={handleClose}>
//           <Modal.Header closeButton>
//             <Modal.Title>OMR Sheet Image</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             {selectedImage && (
//               <ImagePreview imagePath={selectedImage} />
//             )}
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleClose}>
//               Close
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </div>

//       <div className="footer">
//         <div className="footer-bottom">
//           <p>
//             Copyright &#169;2024
//             <br />
//             Developed by <b>DCG Datacore Systems.Pvt.Ltd.</b>
//             <br />
//             <i>Version:1.1.0</i>
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default OMRSheet;

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; 
import { fetchRecords } from "../../redux/slices/apiSlice";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import ImagePreview from "../../components/ImagePreview";
import PaginationControl from "../../components/PaginationControl";

const OMRSheet = () => {
  const dispatch = useDispatch(); 

  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 0 });
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchData = async (page) => {
    try {
      const action = await dispatch(fetchRecords({ indicatorPath: '/omr/sheet', page, limit: 10 }));
      if (fetchRecords.fulfilled.match(action)) { 
        console.log("action:",action);
        setItems(action.payload.results);
        setPagination(action.payload.pagination);
        setCurrentPage(page);
      } else {
        toast.error('Unable to fetch record. Please try again.');
      }
    } catch (error) {
      toast.error('Something went wrong! Server error!');
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= pagination.totalPages) {
      fetchData(page);
    }
  };
 
  const isLastPage = items.length < pagination.limit;
  const [selectedImage, setSelectedImage] = useState(null);

  const handleViewImage = (imagePath) => {
    console.log('imagePath', imagePath);
    setSelectedImage(imagePath);
  }; 

  const handleClose = () => {
    setSelectedImage(null);
  };

  const handleButtonClick = async (temp) => {
    
    
    const { template_name, map, t_name, batch_name } = temp;
    
    if (!map || !JSON.parse(map) || map === "") {
      return toast.warn("Mapping is required.");
    }

    // Parse the map JSON
    const parsedMap = JSON.parse(map);
    
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

    // Generate type_config from the parsed map
    const typeConfig = generateTypeConfig(parsedMap);
    const payload = {
      template: JSON.parse(map),
      template_image: `${process.env.REACT_APP_AI_DATA}${template_name}/default/${t_name}`,
      //data_path: `${process.env.REACT_APP_AI_DATA}${template_name}`,
      data_path: `${process.env.REACT_APP_AI_DATA}${template_name}/${batch_name}`,
      t_name: `${t_name}`,
      type_config: typeConfig,
      batch_name: `${batch_name}`
    };   

    try {
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
  console.log("users....", users);
  const navigate = useNavigate();
  const handleNavigateToMapping = (template) => {
    console.log("hey i am template", template);
    navigate("/mapping", { state: { template } });
  };

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
            <tr>
              <PaginationControl
                currentPage={currentPage}
                pagination={pagination}
                handlePageChange={handlePageChange}
                isNextDisabled={isLastPage}
              />
            </tr>
            <tr>
              <th scope="col">Template Name</th>
              <th scope="col">Batch Name</th>
              <th scope="col">Created At</th>
              <th scope="col" colSpan={2}>Action</th>
              <th scope="col" colSpan={2}>Process</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(items) && items.map((omr) => (
              
              <tr key={omr.ID}>
                <td>{omr.template_name}</td>
                <td>{omr.batch_name}</td>
                <td>{omr.created_at}</td>
                <td colSpan={2}>
                  <button onClick={() => handleViewImage(omr.ques_paper_image_path)}>
                    view
                  </button>
                </td>
                <td colSpan={2}>
                <button
                    className="btn btn-icon btn-dark btn-active-color-primary btn-sm me-1 "
                    title="View"
                    onClick={() => handleButtonClick(omr)}
                    // onClick={handleButtonClick(template)}
                    style={{ width: "85px" }}
                  >
                    Processing
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal show={!!selectedImage} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>OMR Sheet Image</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedImage && (
              <ImagePreview imagePath={selectedImage} />
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
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
