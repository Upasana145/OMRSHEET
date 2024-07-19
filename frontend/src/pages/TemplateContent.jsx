import React from "react";
import { FaCommentsDollar, FaSearch } from "react-icons/fa";
import { navigate, useNavigate } from "react-router-dom";

function TemplateContent({ users, fetchUsers, templates }) {
  console.log("users....", users);
  const navigate = useNavigate();
  const handleNavigateToMapping = (template) => {
    // <img
    //   //   src={`${process.env.REACT_APP_FILE_URI}${template.template_name}`}
    //   //   src={`${process.env.REACT_APP_FILE_URI}${template.template_name}`}
    //   src={`${process.env.REACT_APP_FILE_URI}${template.t_name}`}
    //   alt={template.template_name}
    //   // style={{ maxWidth: "100%" }}
    //   style={{ width: "180px" }}
    // />;
    console.log("hey i am template", template);
    navigate("/mapping", { state: { template } });
  };
  //   console.log("Template:", template);
  //   navigate("/mapping", { state: { template } });

  console.log("HEY I AM ", process.env.REACT_APP_FILE_URI);
  console.log("HEY I AM ", process.env.REACT_APP_API_URI);

  return (
    <div>
      <table className="table table-striped table-bordered m-0">
        <thead>
          <tr className="border-0">
            <th className="min-w-150px">Saved Templates</th>
            <th className="min-w-140px">Action</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((template, index) => (
              <tr key={index}>
                <td className="fw-semibold">{template.template_name}</td>

                <img
                  //   src={`${process.env.REACT_APP_FILE_URI}${template.template_name}`}
                  //   src={`${process.env.REACT_APP_FILE_URI}${template.template_name}`}
                  src={`${process.env.REACT_APP_FILE_URI}${template.t_name}`}
                  alt={template.template_name}
                  // style={{ maxWidth: "100%" }}
                  style={{ width: "180px" }}
                />
                <td>
                  <button
                    className="btn btn-icon btn-dark btn-active-color-primary btn-sm me-1"
                    title="View"
                    onClick={() => handleNavigateToMapping(template)}
                  >
                    <FaSearch />
                  </button>
                </td>
              </tr>
            ))}

          {/* 
          {templates.map((template, index) => (
            <tr key={index}>
              <td className="fw-semibold">{template.name}</td>
              <td>
                <button
                  className="btn btn-icon btn-dark btn-active-color-primary btn-sm me-1"
                  title="View"
                  onClick={() => handleNavigateToMapping(template)}
                >
                  <FaSearch />
                </button>
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
}

export default TemplateContent;
