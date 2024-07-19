import React, { useEffect, useState } from "react";
// import map1 from "../data/map1.json";
import Templateimage from "./Templateimage";
import { useLocation } from "react-router-dom";

const TemplateMapping = () => {
  // const location = useLocation();
  // const [data, setData] = useState(map1);
  // console.log("locationnnnn", location);
  // const images = location.state ? location.state.template.image : null;
  const location = useLocation();
  const { template } = location.state;
  const imageUrl = `${process.env.REACT_APP_FILE_URI}${template.t_name}`;

  // useEffect(() => {
  //   // Access the images here and do something with them
  //   // console.log("Received images:", images);

  //   // Set data if needed
  //   setData(map1); // Set your data accordingly
  // }, [images]);
  return (
    <>
      {/* <Templateimage images={images} /> */}
      <div>
        {/* <h1>Template Mapping</h1> */}
        {/* <p>Template Name: {template.template_name}</p> */}
        {/* <img
          // src={`${process.env.REACT_APP_FILE_URI}${template.t_name}`}
          src={imageUrl}
          alt={template.template_name}
          style={{ width: "180px" }}
        /> */}
        <Templateimage
          images={imageUrl}
          template_name={template.template_name}
        />
      </div>
    </>
  );
};

export default TemplateMapping;

// backup of date:-1872024
// import React, { useEffect, useState } from "react";
// // import map1 from "../data/map1.json";
// import Templateimage from "./Templateimage";
// import { useLocation } from "react-router-dom";

// const TemplateMapping = () => {
//   const location = useLocation();
//   // const [data, setData] = useState(map1);
//   // console.log("locationnnnn", location);
//   const images = location.state ? location.state.template.image : null;

//   // useEffect(() => {
//   //   // Access the images here and do something with them
//   //   // console.log("Received images:", images);

//   //   // Set data if needed
//   //   setData(map1); // Set your data accordingly
//   // }, [images]);
//   return (
//     <>
//       <Templateimage images={images} />
//     </>
//   );
// };

// export default TemplateMapping;

// backup2
// import React, { useEffect, useState } from "react";
// import { FaMinus, FaPlus, FaSearch } from "react-icons/fa";
// import { PiCursor, PiCursorBold } from "react-icons/pi";
// import { BsCheck, BsCheckAll } from "react-icons/bs";
// import { CiEdit } from "react-icons/ci";

// import map1 from "../data/map1.json";
// import Templateimage from "./Templateimage";
// import { useLocation } from "react-router-dom";

// const TemplateMapping = () => {
//   const location = useLocation();
//   const [data, setData] = useState(map1);
//   // console.log("locationnnnn", location);
//   const images = location.state ? location.state.template.image : null;

//   useEffect(() => {
//     // Access the images here and do something with them
//     // console.log("Received images:", images);

//     // Set data if needed
//     setData(map1); // Set your data accordingly
//   }, [images]);

//   // useEffect(() => {
//   //   if (map1) {
//   //     setData(map1);
//   //   }
//   // }, [map1]);

//   const handleDropDown = (item) => {
//     // console.log(item);
//   };

//   // console.log("Render - images:", images);
//   return (
//     <>
//       {/* <div className="map_header shadow">
//         <div className="container">
//           <ul>
//             <li>
//               <button
//                 className="btn btn-icon btn-dark btn-active-color-primary btn-sm me-1"
//                 title="Zoom"
//               >
//                 <FaSearch />
//               </button>
//             </li>
//             <li>
//               <button
//                 className="btn btn-icon btn-dark btn-active-color-primary btn-sm me-1"
//                 title="Zoom"
//               >
//                 <CiEdit />
//               </button>
//             </li>
//             <li>
//               <button
//                 className="btn btn-icon btn-dark btn-active-color-primary btn-sm me-1"
//                 title="Zoom"
//               >
//                 <PiCursorBold />
//               </button>
//             </li>
//             <li>
//               <button
//                 className="btn btn-icon btn-dark btn-active-color-primary btn-sm me-1"
//                 title="Zoom"
//               >
//                 <FaSearch />
//               </button>
//             </li>
//           </ul>
//         </div>
//       </div> */}

//       {/* <div className="container">
//         <div className="row"> */}
//       {/* <div className="col-12 col-md-8">
//             <div className="mapping_image"> */}
//       {/* {images && (
//                 <img
//                   src={URL.createObjectURL(images)}
//                   alt="Mapping Image"
//                   className="w-100"
//                 />
//               )} */}

//       <Templateimage images={images} />
//       {/* </div>
//           </div> */}
//       {/* <div className="col-12 col-md-4"> */}
//       {/* <div className="mapping_data">
//           <ul>
//             {data &&
//               data.map((item, i) => (
//                 <li key={i}>
//                   <p onClick={() => handleDropDown(item)}>
//                     {item?.type === "checker-group" ? (
//                       item?.isOpen ? (
//                         <>
//                           <FaPlus className="plusminus" />{" "}
//                           <BsCheckAll className="type" />{" "}
//                           <span>{item?.name}</span>
//                         </>
//                       ) : (
//                         <>
//                           <FaMinus className="plusminus" />{" "}
//                           <BsCheckAll className="type" />{" "}
//                           <span>{item?.name}</span>
//                         </>
//                       )
//                     ) : (
//                       <span>
//                         <BsCheck className="type" /> {item?.name}
//                       </span>
//                     )}
//                   </p>
//                   {item?.type === "checker-group" && (
//                     <ul className="drop">
//                       {item?.child.length > 0 &&
//                         item?.child.map((it, index) => (
//                           <li key={index}>{it?.name}</li>
//                         ))}
//                     </ul>
//                   )}
//                 </li>
//               ))}
//           </ul>
//         </div> */}
//       {/* </div>
//         </div> */}
//       {/* </div> */}
//     </>
//   );
// };

// export default TemplateMapping;

// backup
// import React, { useEffect, useState } from "react";
// import { FaMinus, FaPlus, FaSearch } from "react-icons/fa";
// import { PiCursor, PiCursorBold } from "react-icons/pi";
// import { BsCheck, BsCheckAll } from "react-icons/bs";
// import { CiEdit } from "react-icons/ci";

// import map1 from "../data/map1.json";
// import Templateimage from "./Templateimage";
// import { useLocation } from "react-router-dom";

// const TemplateMapping = () => {
//   const location = useLocation();
//   const [data, setData] = useState(map1);
//   console.log("locationnnnn", location);
//   const images = location.state ? location.state.template.image : null;

//   useEffect(() => {
//     // Access the images here and do something with them
//     console.log("Received images:", images);

//     // Set data if needed
//     setData(map1); // Set your data accordingly
//   }, [images]);

//   // useEffect(() => {
//   //   if (map1) {
//   //     setData(map1);
//   //   }
//   // }, [map1]);

//   const handleDropDown = (item) => {
//     console.log(item);
//   };

//   console.log("Render - images:", images);
//   return (
//     <>
//       {/* <div className="map_header shadow">
//         <div className="container">
//           <ul>
//             <li>
//               <button
//                 className="btn btn-icon btn-dark btn-active-color-primary btn-sm me-1"
//                 title="Zoom"
//               >
//                 <FaSearch />
//               </button>
//             </li>
//             <li>
//               <button
//                 className="btn btn-icon btn-dark btn-active-color-primary btn-sm me-1"
//                 title="Zoom"
//               >
//                 <CiEdit />
//               </button>
//             </li>
//             <li>
//               <button
//                 className="btn btn-icon btn-dark btn-active-color-primary btn-sm me-1"
//                 title="Zoom"
//               >
//                 <PiCursorBold />
//               </button>
//             </li>
//             <li>
//               <button
//                 className="btn btn-icon btn-dark btn-active-color-primary btn-sm me-1"
//                 title="Zoom"
//               >
//                 <FaSearch />
//               </button>
//             </li>
//           </ul>
//         </div>
//       </div> */}

//       <div className="container">
//         <div className="row">
//           {/* <div className="col-12 col-md-8">
//             <div className="mapping_image"> */}
//           {/* {images && (
//                 <img
//                   src={URL.createObjectURL(images)}
//                   alt="Mapping Image"
//                   className="w-100"
//                 />
//               )} */}

//           <Templateimage images={images} />
//           {/* </div>
//           </div> */}
//           <div className="col-12 col-md-4">
//             <div className="mapping_data">
//               <ul>
//                 {data &&
//                   data.map((item, i) => (
//                     <li key={i}>
//                       <p onClick={() => handleDropDown(item)}>
//                         {item?.type === "checker-group" ? (
//                           item?.isOpen ? (
//                             <>
//                               <FaPlus className="plusminus" />{" "}
//                               <BsCheckAll className="type" />{" "}
//                               <span>{item?.name}</span>
//                             </>
//                           ) : (
//                             <>
//                               <FaMinus className="plusminus" />{" "}
//                               <BsCheckAll className="type" />{" "}
//                               <span>{item?.name}</span>
//                             </>
//                           )
//                         ) : (
//                           <span>
//                             <BsCheck className="type" /> {item?.name}
//                           </span>
//                         )}
//                       </p>
//                       {item?.type === "checker-group" && (
//                         <ul className="drop">
//                           {item?.child.length > 0 &&
//                             item?.child.map((it, index) => (
//                               <li key={index}>{it?.name}</li>
//                             ))}
//                         </ul>
//                       )}
//                     </li>
//                   ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TemplateMapping;
