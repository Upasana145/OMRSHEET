import React, { useState } from "react";
import ReviewQuestionPaper from "./ReviewQuestionPaper";
import { toast } from "react-toastify";
import { postAPI } from "../utils/fetchapi";
import DynamicButton from "../Helpers/DynamicButton";

const ReviewModal = ({
  showModal,
  closeModal,
  selectedBatch,
  handleTemplateChange,
  images = [],
  fetchImages,
}) => {
  const [selectedData, setSelectedData] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  const processSingleOMR = async (item) => {
    // setIsLoading(true);
    let data = await postAPI("master/processSingleOMR", item, null);
    if (data?.status) {
      setSelectedData(data);
      setShowDetails(true);
      // setIsLoading(false);
    } else {
      toast.error(data?.message);
      // setIsLoading(false);
    }
  };

  const closeDetails = () => {
    setShowDetails(false);
    setSelectedData(null);
  };

  if (!showModal) return null;

  return (
    <div className="modals">
      <div className="modals-content">
        <span className="close-button" onClick={closeModal}>
          &times;
        </span>
        <h3>Details for {selectedBatch}</h3>
        <table className="modal-table">
          <thead>
            <tr>
              <th>Image</th>
              <th style={{ textAlign: "center" }}>Status</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {images.map((image, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={`${process.env.REACT_APP_FILE_URI}${image.template_name}/${image.batch_name}/${image.ques_paper_image_path}`}
                    alt={image.ques_paper_image_path}
                    className="table-image"
                  />
                </td>

                <td className={image.flag === "1" ? "completed" : "pending"}>
                  {image.flag === "1" ? "Completed" : "Pending"}
                </td>
                <td>
                  {/* <button
                    className="view-button"
                    onClick={() => processSingleOMR(image)}
                  >
                    {false ? "Loading..." : "View"}
                  </button> */}
                  <DynamicButton
                    label={"View"}
                    onClick={() => processSingleOMR(image)}
                    className="view-button"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showDetails && (
          <ReviewQuestionPaper
            data={selectedData}
            closeDetails={closeDetails}
            fetchImages={fetchImages}
            selectedBatch={selectedBatch}
          />
        )}
      </div>
    </div>
  );
};

export default ReviewModal;
