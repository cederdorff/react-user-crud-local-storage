import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import User from "../components/User";

export default function UserDetailPage() {
  const [user, setUser] = useState({}); // state to handle the data (user)
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getUser(); // call the getUser function

    async function getUser() {
      const response = await fetch(
        `https://react-user-crud-app-default-rtdb.firebaseio.com/users/${id}.json`
      );
      const data = await response.json();
      setUser(data); // set the user state with the data from local storage
    }
  }, [id]); // <--- "[id]" VERY IMPORTANT!!!

  function showDeleteDialog() {
    const shouldDelete = window.confirm(
      `Do you want to delete "${user.name}"?`
    );
    if (shouldDelete) {
      deleteUser();
    }
  }

  async function deleteUser() {
    const response = await fetch(
      `https://react-user-crud-app-default-rtdb.firebaseio.com/users/${id}.json`,
      {
        method: "DELETE"
      }
    );
    if (response.ok) {
      navigate("/"); // navigate to the home page
    }
  }

  function showUpdate() {
    navigate(`/users/${id}/update`);
  }

  return (
    <section id="user-page" className="page">
      <div className="container">
        <h1>{user?.name}</h1>
        <User user={user} />
        <div className="btns">
          <button className="btn-cancel" onClick={showDeleteDialog}>
            Delete user
          </button>
          <button onClick={showUpdate}>Update user</button>
        </div>
      </div>
    </section>
  );
}
