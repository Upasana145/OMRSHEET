import React, { useState } from "react";
import image1 from "../Images/image1.jpg";
import image2 from "../Images/image2.jpg";
import image3 from "../Images/image3.jpg";
import image4 from "../Images/image4.jpg";
import image5 from "../Images/image5.jpg";
import image6 from "../Images/image6.jpg";
import ImageContainernorecordfound from "./ImageContainernorecordfound";
import { Redirect } from "react-router-dom";
import About from "./Prac";
import { useNavigate } from "react-router-dom";

const Imagecontainer = ({ users, handleButtonClick, selectedFilter }) => {
  const navigate = useNavigate();
  console.log(users, "imageCotainerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
  console.log("Selected Filter:", selectedFilter);
  // const camera = users.map((item, index) => item.camera);
  // const dept_name =c users.map((item, index) => item.image.data);
  // console.log(dept_name, "ddddddddddddddddddddd");
  const cameraAndDept = users.map((item, index) => ({
    camera: item.camera,
    dept_name: item.dept_name,
  }));
  // cameraAndDept.forEach((item) => {
  //   console.log("Camera:", item.camera);
  // });

  // const deptIds = users.map((item, index) => item.dept_id);
  // console.log(deptIds, "deptssssssssssssssssssssssssssssss");

  // console.log(users.camera, "userssssssssssssscameraaaaa")
  const [popupImage, setPopupImage] = useState(null);

  const openPopup = (imageSrc) => {
    setPopupImage(imageSrc);
  };

  const closePopup = () => {
    setPopupImage(null);
  };
  const imageArray = [image1, image2, image3, image4, image5, image6];

  // for filter----->

  // const filterOptions = (options, selectedFilter) => {
  //   console.log(selectedFilter, " I am seleceted filter");
  //   if (selectedFilter === "All") {
  //     return options;
  //   } else {
  //     const filteredOptions = options.filter((option) => {
  //       console.log(option, "i am filtered optionnnnn");
  //       return option.dept_name === selectedFilter;
  //     });
  //     // console.log(filteredOptions.length, "i am filteredOptionssssssssssss");
  //     if (filteredOptions.length === 0) {
  //     }

  //     return filteredOptions;
  //   }
  // };

  const filterOptions = (options, selectedFilter) => {
    console.log(selectedFilter, "selected filter hehehehe");
    if (selectedFilter === "All") {
      return options; // Return all options
    } else {
      const filteredOptions = options.filter((option) => {
        return option.dept_name === selectedFilter;
      });
      console.log(filteredOptions, "i am filteredOptionssssssssssss");

      if (filteredOptions.length === 0) {
        // Navigate to the 'ImageContainernorecordfound' page
        // navigate("/norecordfound");
        <p>No Record Found</p>;
      }

      return filteredOptions;
    }
  };

  const filteredOptions = filterOptions(users, selectedFilter);

  return (
    <div className="imageContainer">
      <div className="parent">
        {/* <div className="imagecontainerchild">
          <div className="img_child">
            <img src={image3} alt="" onClick={() => openPopup(image3)} />
            <div className="img_dept">Manufacturing Dept</div>
            <div className="img_cam">
              Cam: <span>1</span>
            </div>
          </div>
        </div>
        <div className="imagecontainerchild">
          <div className="img_child">
            <img src={image5} alt="" onClick={() => openPopup(image5)} />
            <div className="img_dept">Manufacturing Dept</div>
            <div className="img_cam">
              Cam: <span>1</span>
            </div>
          </div>
        </div>
        <div className="imagecontainerchild">
          <div className="img_child">
            <img src={image7} alt="" onClick={() => openPopup(image7)} />
            <div className="img_dept">Manufacturing Dept</div>
            <div className="img_cam">
              Cam: <span>1</span>
            </div>
          </div>
        </div>
        <div className="imagecontainerchild">
          <div className="img_child">
            <img src={image5} alt="" onClick={() => openPopup(image5)} />
            <div className="img_dept">Manufacturing Dept</div>
            <div className="img_cam">
              Cam: <span>1</span>
            </div>
          </div>
        </div>
        <div className="imagecontainerchild">
          <div className="img_child">
            <img src={image3} alt="" onClick={() => openPopup(image3)} />
            <div className="img_dept">Manufacturing Dept</div>
            <div className="img_cam">
              Cam: <span>1</span>
            </div>
          </div>
        </div>
        <div className="imagecontainerchild">
          <div className="img_child">
            <img src={image7} alt="" onClick={() => openPopup(image7)} />
            <div className="img_dept">Manufacturing Dept</div>
            <div className="img_cam">
              Cam: <span>1</span>
            </div>
          </div>
        </div> */}

        {/* {users.map((item, index) => item.dept_id)} */}

        {/* {imageArray.map((image, index) => (
          <div className="imagecontainerchild" key={index}>
            <div className="img_child">
              {console.log(cameraAndDept)}
              <img src={image} alt="" onClick={() => openPopup(image)} />
              <div className="img_dept">{cameraAndDept[index]?.dept_name}</div>
              <div className="img_cam">
                Cam: <span>{cameraAndDept[index]?.camera}</span>
              </div>
            </div>
          </div>
        ))} */}
        {/* {filteredOptions.map((item, index) => (
          <div className="imagecontainerchild" key={index}>
            <div className="img_child">
              <img
                src={imageArray[index]}
                alt=""
                onClick={() => openPopup(imageArray[index])}
              />
              <div className="img_dept">{item?.dept_name}</div>
              <div className="img_cam">
                Cam: <span>{item?.camera}</span>
              </div>
            </div>
          </div>
        ))} */}
        {filteredOptions.length > 0 ? (
          filteredOptions.map((item, index) => (
            <div className="imagecontainerchild" key={index}>
              <div className="img_child">
                {console.log(item?.image)}
                <img
                  src={`http://10.12.1.151:4002/uploads/${item?.image}`}
                  alt=""
                  onClick={() =>
                    openPopup(`http://10.12.1.151:4002/uploads/${item?.image}`)
                  }
                />
                <div className="img_dept">{item?.dept_name}</div>
                <div className="img_cam">
                  <span>{item?.camera}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="norecordfound">
            <h1>No Record Found</h1>
          </div>
        )}
      </div>
      {popupImage && (
        <div className="popup">
          <span className="close" onClick={closePopup}>
            &times;
          </span>
          <div className="img-container">
            <img src={popupImage} alt="" className="popup-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Imagecontainer;
