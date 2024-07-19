import { toast } from "react-toastify";
import { postAPI } from "../utils/fetchapi";
import swal from "sweetalert";
import { Link } from "react-router-dom";

const DeptData = ({ users, fetchUsers }) => {
  const sureToDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete the department info?",
      icon: "warning",
      dangerMode: true,
      buttons: ["No, cancel it!", "Yes, I am sure!"],
    }).then(async (willDelete) => {
      if (willDelete) {
        await deleteHandler(id);
      }
    });
  };

  const deleteHandler = async (id) => {
    let data = await postAPI(
      "master/dept/delete",
      { dept_id: parseInt(id) },
      null
    );
    if (data?.status) {
      toast.success("Department has been deleted successfully.");
      fetchUsers();
    } else {
      toast.error("Department is not deleted! Something went wrong.");
    }
  };

  return (
    <>
      {users.map((curUser, i) => {
        const { dept_id, dept_name, emails, head_name } = curUser;
        return (
          <tr key={i}>
            <td>{dept_id}</td>
            <td>{dept_name}</td>
            <td>
              {emails.split(",").map((email, index) => (
                <>
                  {index === emails.split(",").length - 1 ? (
                    <div key={index}>{email.trim()}</div>
                  ) : (
                    <div key={index}>{email.trim()},</div>
                  )}
                </>
              ))}
            </td>
            <td>{head_name}</td>
            <td
              className="button-edit"
              style={{
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              <Link to={"/editDept"} state={curUser}>
                <i className="fas fa-edit"></i>
              </Link>
            </td>

            <td
              onClick={() => sureToDelete(dept_id)}
              className="btn-delete"
              style={{
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              <i className="fas fa-trash-alt"></i>
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default DeptData;
