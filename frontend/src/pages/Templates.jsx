import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Header from "../assets/components/Header";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TemplateContent from "./TemplateContent";
import { getAPI } from "../utils/fetchapi";

const Templates = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [template_name, setTemplateName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const data = await getAPI(`master/getall`, null);

      console.log("hey i am data.......", data);
      if (data.status) {
        setUsers(data?.data);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Try Again!");
    }
  };

  const handleTemplateNameChange = (e) => {
    setTemplateName(e.target.value);
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleAddForm = async () => {
    if (template_name && imageFile) {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("template_name", template_name);
      formData.append("image", imageFile);

      try {
        const response = await fetch(
          "http://localhost:4002/api/v1/upload/images",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const data = await response.json();
          toast.success("Template added successfully!");
          setTemplates((prevTemplates) => [
            ...prevTemplates,
            { name: template_name, image: imageFile },
          ]);
        } else {
          const errorData = await response.json();
          if (
            response.status === 400 &&
            errorData.message.includes("Template name already exists")
          ) {
            toast.error(
              "Template name already exists. Please choose a different name."
            );
          } else {
            console.error("Error:", response.statusText);
            toast.error("An error occurred. Please try again.");
          }
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const isFormValid = template_name && imageFile;

  const handleNavigateToMapping = (template) => {
    console.log("Template:", template);
    navigate("/mapping", { state: { template } });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Header title={"Saved Templates"} />
      <ToastContainer />
      <div className="container my-5">
        <div className="row">
          <div className="col-12 col-md-8">
            <div className="card card-xxl-stretch mb-5 mb-xxl-8">
              <div className="card-body py-3">
                <div className="tab-content">
                  <div className="table-responsive">
                    <table className="table table-striped table-bordered m-0">
                      <TemplateContent
                        users={users}
                        fetchUsers={fetchUsers}
                        templates={templates}
                      />
                      {/* <thead>
                        <tr className="border-0">
                          <th className="min-w-150px">Saved Templates</th>
                          <th className="min-w-140px">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        
                        {templates.map((template, index) => (
                          <tr key={index}>
                            <td className="fw-semibold">{template.name}</td>
                            <td>
                              <button
                                className="btn btn-icon btn-dark btn-active-color-primary btn-sm me-1"
                                title="View"
                                onClick={() =>
                                  handleNavigateToMapping(template)
                                }
                              >
                                <FaSearch />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody> */}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="card card-xxl-stretch mb-5 mb-xxl-8">
              <div className="card-header border-0 pt-5">
                <h3 className="card-title align-items-start flex-column">
                  <span className="card-label fw-bold fs-3 mb-1">
                    Add New Template
                  </span>
                </h3>
              </div>
              <div className="card-body py-3">
                <div className="pt-5">
                  <label htmlFor="template_name">Template Name</label>
                  <input
                    type="text"
                    className="form-control pb-2"
                    id="template_name"
                    name="template_name"
                    placeholder="Enter template name"
                    required
                    value={template_name}
                    onChange={handleTemplateNameChange}
                  />
                </div>

                <div className="py-5">
                  <label htmlFor="imageFile">OMR Image</label>
                  <input
                    type="file"
                    className="form-control pb-2"
                    id="imageFile"
                    name="image"
                    onChange={handleImageChange}
                  />
                </div>

                <div className="text-start py-3">
                  <button
                    className="btn fw-bold btn-primary"
                    type="button"
                    onClick={handleAddForm}
                    disabled={!isFormValid}
                  >
                    {isLoading ? "Loading..." : "ADD"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Templates;

// import React, { useState } from "react";
// import { FaSearch } from "react-icons/fa";

// import Header from "../assets/components/Header";
// import { useNavigate } from "react-router-dom";

// const Templates = () => {
//   const navigate = useNavigate();
//   const [templates, setTemplates] = useState([]);
//   const [templateName, setTemplateName] = useState("");
//   const [imageFile, setImageFile] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleTemplateNameChange = (e) => {
//     setTemplateName(e.target.value);
//   };

//   const handleImageChange = (e) => {
//     setImageFile(e.target.files[0]);
//   };

//   // const handleAddForm = () => {
//   //   if (templateName && imageFile) {
//   //     setIsLoading(true);
//   //     setTemplates((prevTemplates) => [
//   //       ...prevTemplates,
//   //       { name: templateName, image: imageFile },
//   //     ]);
//   //     setIsLoading(false); // Stop loading after the process is done
//   //   }
//   // };
//   const handleAddForm = async () => {
//     if (templateName && imageFile) {
//       setIsLoading(true);

//       const formData = new FormData();
//       formData.append("name", templateName);
//       formData.append("image", imageFile);

//       try {
//         const response = await fetch(
//           "http://localhost:4002/api/v1/upload/images",
//           {
//             method: "POST",
//             body: formData,
//           }
//         );

//         if (response.ok) {
//           const data = await response.json();
//           console.log("Success:", data);
//           // Optionally update state or UI based on success
//           // e.g., updating the list of templates or showing a success message
//           setTemplates((prevTemplates) => [
//             ...prevTemplates,
//             { name: templateName, image: imageFile },
//           ]);
//         } else {
//           console.error("Error:", response.statusText);
//           // Handle error (e.g., display error message to the user)
//         }
//       } catch (error) {
//         console.error("Error:", error);
//         // Handle network error (e.g., display error message to the user)
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   const isFormValid = templateName && imageFile;

//   // console.log("hey i am templates...", templates);
//   // Function to navigate to "/mapping" with image data
//   const handleNavigateToMapping = (template) => {
//     console.log("hey i am templates...", template);
//     navigate("/mapping", { state: { template } });
//   };

//   return (
//     <>
//       <Header title={"Saved Templates"} />
//       <div className="container my-5">
//         <div className="row">
//           <div className="col-12 col-md-8">
//             <div className="card card-xxl-stretch mb-5 mb-xxl-8">
//               <div className="card-body py-3">
//                 <div className="tab-content">
//                   <div className="table-responsive">
//                     <table className="table table-striped table-bordered m-0">
//                       <thead>
//                         <tr className="border-0">
//                           <th className=" min-w-150px">Saved Templates</th>
//                           <th className=" min-w-140px">Action</th>
//                         </tr>
//                       </thead>
//                       {/* <tbody>
//                         <tr>
//                           <td className="fw-semibold">Template </td>
//                           <td>
//                             <button
//                               className="btn btn-icon btn-dark btn-active-color-primary btn-sm me-1"
//                               title="View"
//                               onClick={() => navigate("/mapping")}
//                             >
//                               <FaSearch />
//                             </button>
//                           </td>
//                         </tr>
//                       </tbody> */}
//                       <tbody>
//                         {templates.map((template, index) => (
//                           <tr key={index}>
//                             <td className="fw-semibold">{template.name}</td>
//                             <td>
//                               <button
//                                 className="btn btn-icon btn-dark btn-active-color-primary btn-sm me-1"
//                                 title="View"
//                                 onClick={() =>
//                                   handleNavigateToMapping(template)
//                                 }
//                               >
//                                 <FaSearch />
//                               </button>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-12 col-md-4">
//             <div className="card card-xxl-stretch mb-5 mb-xxl-8">
//               <div className="card-header border-0 pt-5">
//                 <h3 className="card-title align-items-start flex-column">
//                   <span className="card-label fw-bold fs-3 mb-1">
//                     Add New Template
//                   </span>
//                 </h3>
//               </div>
//               <div className="card-body py-3">
//                 {/* <div className="pt-5">
//                   <label htmlFor="templateName">Template Name</label>
//                   <input
//                     type="text"
//                     className="form-control pb-2"
//                     id="templateName"
//                     name="name"
//                     placeholder="Enter template name"
//                   />
//                 </div>
//                 <div className="py-5">
//                   <label htmlFor="templateName">OMR Image</label>
//                   <input
//                     type="file"
//                     className="form-control pb-2"
//                     id="templateName"
//                     name="image"
//                   />
//                 </div> */}
//                 {/* <div className="pt-5">
//                   <label htmlFor="templateName">Template Name</label>
//                   <input
//                     type="text"
//                     className="form-control pb-2"
//                     id="templateName"
//                     name="name"
//                     placeholder="Enter template name"

//                   />
//                 </div> */}

//                 <div className="pt-5">
//                   <label htmlFor="templateName">Template Name</label>
//                   <input
//                     type="text"
//                     className="form-control pb-2"
//                     id="templateName"
//                     name="name"
//                     placeholder="Enter template name"
//                     required
//                     value={templateName}
//                     onChange={handleTemplateNameChange}
//                   />
//                 </div>

//                 <div className="py-5">
//                   <label htmlFor="imageFile">OMR Image</label>
//                   <input
//                     type="file"
//                     className="form-control pb-2"
//                     id="imageFile"
//                     name="image"
//                     onChange={handleImageChange}
//                   />
//                 </div>

//                 <div className="text-start py-3">
//                   <button
//                     className="btn fw-bold btn-primary"
//                     type="button"
//                     onClick={handleAddForm}
//                     disabled={!isFormValid}
//                   >
//                     {isLoading ? "Loading..." : "ADD"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Templates;
