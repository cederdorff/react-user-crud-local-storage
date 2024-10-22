import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserForm from "../components/UserForm";

export default function UpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser(); // call the getUser function

    async function getUser() {
      const response = await fetch(
        `https://react-user-crud-app-default-rtdb.firebaseio.com/users/${id}.json`
      );
      const data = await response.json();
      setUser(data); // set the user state with the data from firebase
    }
  }, [id]); // <--- "[id]" VERY IMPORTANT!!!

  async function updateUser(userToUpdate) {
    const response = await fetch(
      `https://react-user-crud-app-default-rtdb.firebaseio.com/users/${id}.json`,
      {
        method: "PUT",
        body: JSON.stringify(userToUpdate)
      }
    );
    console.log(response);
    if (response.ok) {
      navigate(`/users/${id}`); // navigate to the user detail page
    } else {
      console.log("An error occurred while updating the user");
    }
  }

  function handleCancel() {
    navigate(-1); // go back
  }

  return (
    <section className="page">
      <div className="container">
        <h1>Update</h1>
        <UserForm onSubmit={updateUser} onCancel={handleCancel} user={user} />
      </div>
    </section>
  );
}
