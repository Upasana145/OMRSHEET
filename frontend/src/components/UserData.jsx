import { Link } from "react-router-dom";
import swal from "sweetalert";
import { postAPI } from "../utils/fetchapi";
import { toast } from "react-toastify";

const UserData = ({ users, fetchUsers }) => {
  const sureToDelete = (id) => {
    console.log("i am priniting id.....", id);
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
      "master/user/delete",
      { auth_id: parseInt(id) },
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
        // console.log("authhhhh_iddd... i am currect userrrrrr", curUser);
        const { auth_id, datetime, email, name, role, username } = curUser;
        // console.log("i am authhhh id of curuserrrrr", curUser.auth_id);

        return (
          <tr key={i}>
            <td>{username}</td>
            <td>{name}</td>

            <td>{email}</td>
            <td>{role}</td>
            <td>{datetime && new Date(datetime).toDateString()}</td>
            <td
              className="button-edit"
              style={{
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              <Link to={"/editUser"} state={curUser}>
                {/* <Link to={""} state={curUser}> */}
                <i className="fas fa-edit"></i>
              </Link>
            </td>

            <td
              onClick={() => sureToDelete(auth_id)}
              className="btn-delete"
              style={{
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {/* <td
              className="btn-delete"
              style={{
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            > */}
              <i className="fas fa-trash-alt"></i>
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default UserData;
