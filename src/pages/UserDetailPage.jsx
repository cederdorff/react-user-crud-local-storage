import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import User from "../components/User";

export default function UserDetailPage() {
  const [user, setUser] = useState([]); // state to handle the data (user)
  const params = useParams();
  const navigate = useNavigate();

  //the side effect - fetch user
  useEffect(() => {
    const data = localStorage.getItem("users"); // get data from local storage
    console.log(data);
    const usersData = JSON.parse(data) || []; // parse the data from string to javascript array
    console.log(usersData);
    const user = usersData.find(user => user.id === params.id); // find the user with the id from the params
    setUser(user); // set the user state with the data from local storage
  }, [params.id]); // <--- "[params.id]" VERY IMPORTANT!!!

  function showDeleteDialog() {
    const shouldDelete = window.confirm(`Do you want to delete "${user.name}"?`);
    if (shouldDelete) {
      deleteUser();
    }
  }

  async function deleteUser() {
    const data = localStorage.getItem("users"); // get data from local storage
    const usersData = JSON.parse(data) || []; // parse the data from string to javascript array
    const updatedUsers = usersData.filter(user => user.id !== params.id); // filter out the user with the id from the params
    localStorage.setItem("users", JSON.stringify(updatedUsers)); // save the users state to local storage
    navigate("/"); // navigate to the home page
  }

  function showUpdate() {
    navigate(`/users/${params.id}/update`);
  }

  return (
    <section id="user-page" className="page">
      <div className="container">
        <h1>{user.name}</h1>
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
