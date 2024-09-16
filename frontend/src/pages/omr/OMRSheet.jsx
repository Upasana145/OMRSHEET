import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
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

  const fetchData = async (page) => {
    try {
      const action = await dispatch(fetchRecords({ indicatorPath: '/omr/sheet', page: currentPage, limit: 10 }));
      if (fetchRecords.fulfilled.match(action)) { 
        setItems(action.payload.results);
        setPagination(action.payload.pagination);
        setCurrentPage(page);
      } else {
        toast.error('Unable to fetch record. Please try again.');
      }
    } catch (error) {
      toast.error('Something went wrong!. Server error!');
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
    console.log('imagePath', imagePath)
    setSelectedImage(imagePath);
  }; 


  const handleClose = () => {
    setSelectedImage(null);
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
            <PaginationControl
              currentPage={currentPage}
              pagination={pagination}
              handlePageChange={handlePageChange}
              isNextDisabled={isLastPage}
            />
            <tr>
              <th scope="col">Template Name</th>
              <th scope="col">Batch Name</th>
              <th scope="col">Created At</th>
              <th scope="col" colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((omr) => (
              <tr key={omr.ID}>
                <td>{omr.template_name}</td>
                <td>{omr.batch_name}</td>
                <td>{omr.created_at}</td>
                <td>
                  <button onClick={() => handleViewImage(omr.ques_paper_image_path)}>
                    view
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
