// import React, { useState } from "react";
// // import image from "../Images/image8.jpg";
// import image1 from "../Images/image1.jpg";
// import image3 from "../Images/image3.jpg";
// import image4 from "../Images/image4.jpg";
// import image5 from "../Images/image5.jpg";
// import image6 from "../Images/image6.jpg";
// // import image7 from "../Images/image7.jpg";

// const Imagecontainer = ({ users, handleButtonClick }) => {
//   console.log(users, "imageCotainerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");

//   // const camera = users.map((item, index) => item.camera);
//   const dept_name = users.map((item, index) => item.image.data);

//   console.log(dept_name, "ddddddddddddddddddddd");
//   const cameraAndDept = users.map((item, index) => ({
//     camera: item.camera,
//     dept_name: item.dept_name,
//   }));

//   // const deptIds = users.map((item, index) => item.dept_id);
//   // console.log(deptIds, "deptssssssssssssssssssssssssssssss");

//   // console.log(users.camera, "userssssssssssssscameraaaaa");

//   const [popupImage, setPopupImage] = useState(null);

//   const openPopup = (imageSrc) => {
//     setPopupImage(imageSrc);
//   };

//   const closePopup = () => {
//     setPopupImage(null);
//   };
//   const imageArray = [image3, image5, image6, image5, image3, image6];
//   return (
//     <div className="imageContainer">
//       <div className="parent">
//         {/* <div className="imagecontainerchild">
//           <div className="img_child">
//             <img src={image3} alt="" onClick={() => openPopup(image3)} />
//             <div className="img_dept">Manufacturing Dept</div>
//             <div className="img_cam">
//               Cam: <span>1</span>
//             </div>
//           </div>
//         </div>
//         <div className="imagecontainerchild">
//           <div className="img_child">
//             <img src={image5} alt="" onClick={() => openPopup(image5)} />
//             <div className="img_dept">Manufacturing Dept</div>
//             <div className="img_cam">
//               Cam: <span>1</span>
//             </div>
//           </div>
//         </div>
//         <div className="imagecontainerchild">
//           <div className="img_child">
//             <img src={image6} alt="" onClick={() => openPopup(image4)} />
//             <div className="img_dept">Manufacturing Dept</div>
//             <div className="img_cam">
//               Cam: <span>1</span>
//             </div>
//           </div>
//         </div>
//         <div className="imagecontainerchild">
//           <div className="img_child">
//             <img src={image5} alt="" onClick={() => openPopup(image5)} />
//             <div className="img_dept">Manufacturing Dept</div>
//             <div className="img_cam">
//               Cam: <span>1</span>
//             </div>
//           </div>
//         </div>
//         <div className="imagecontainerchild">
//           <div className="img_child">
//             <img src={image3} alt="" onClick={() => openPopup(image3)} />
//             <div className="img_dept">Manufacturing Dept</div>
//             <div className="img_cam">
//               Cam: <span>1</span>
//             </div>
//           </div>
//         </div>
//         <div className="imagecontainerchild">
//           <div className="img_child">
//             <img src={image6} alt="" onClick={() => openPopup(image6)} />
//             <div className="img_dept">Manufacturing Dept</div>
//             <div className="img_cam">
//               Cam: <span>1</span>
//             </div>
//           </div>
//         </div> */}

//         {/* {users.map((item, index) => item.dept_id)} */}

//         {imageArray.map((image, index) => (
//           <div className="imagecontainerchild" key={index}>
//             <div className="img_child">
//               <img
//                 src={{ dept_name }}
//                 alt=""
//                 onClick={() => openPopup(image)}
//               />
//               <div className="img_dept">{cameraAndDept[index]?.dept_name}</div>
//               <div className="img_cam">
//                 <span>{cameraAndDept[index]?.camera}</span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       {popupImage && (
//         <div className="popup">
//           <span className="close" onClick={closePopup}>
//             &times;
//           </span>
//           <img src={popupImage} alt="" className="popup-image" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Imagecontainer;

// use this below content when you are using dashboard second content

// import React, { useState } from "react";
// import image3 from "../Images/image3.jpg";
// import image5 from "../Images/image5.jpg";
// import image6 from "../Images/image6.jpg";
// import image1 from "../Images/image1.jpg";
// import image2 from "../Images/image2.jpg";
// import image4 from "../Images/image4.jpg";

// const Imagecontainer = ({ users }) => {
//   const cameraAndDept = [
//     { camera: 1, dept_name: "Manufacturing Dept" },
//     { camera: 2, dept_name: "Production Dept" },
//     { camera: 3, dept_name: "Production Dept" },
//     { camera: 1, dept_name: "Manufacturing Dept" },
//     { camera: 5, dept_name: "Manufacturing Dept" },
//     { camera: 4, dept_name: "Manufacturing Dept" },
//   ];

//   const [popupImage, setPopupImage] = useState(null);

//   const openPopup = (imageSrc) => {
//     setPopupImage(imageSrc);
//   };

//   const closePopup = () => {
//     setPopupImage(null);
//   };

//   const imageArray = [image1, image2, image3, image4, image5, image6];

//   return (
//     <div className="imageContainer">
//       <div className="parent">
//         {imageArray.map((image, index) => (
//           <div className="imagecontainerchild" key={index}>
//             <div className="img_child">
//               <img src={image} alt="" onClick={() => openPopup(image)} />
//               <div className="img_dept">{cameraAndDept[index]?.dept_name}</div>
//               <div className="img_cam">
//                 Cam: <span>{cameraAndDept[index]?.camera}</span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       {popupImage && (
//         <div className="popup">
//           <span className="close" onClick={closePopup}>
//             &times;
//           </span>
//           <img src={popupImage} alt="" className="popup-image" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Imagecontainer;
