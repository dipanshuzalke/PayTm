import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  // Replace with backend call
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useNavigate();

  // Fetch current user ID
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setCurrentUserId(res.data.id);
      })
      .catch((err) => {
        console.error("Error fetching current user:", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
      .then((res) => {
        setUsers(res.data.user);
      });
  }, [filter]);

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          onChange={(e) => setFilter(e.target.value)}
          className="w-full px-2 py-1 border rounded border-slate-200"
        ></input>
      </div>
      <div>
        {users
          .filter((user) => user._id !== currentUserId) // 👈 hide logged-in user
          .map((user) => (
            <User user={user} key={user._id} navigate={navigate} />
          ))}
      </div>
    </>
  );
};

function User({ user, navigate }) {
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-ful">
        <Button
          label={"Send Money"}
          onClick={() => {
            // navigate to send money page
            navigate(
              "/send?id=" +
                user._id +
                "&name=" +
                user.firstName +
                " " +
                user.lastName
            );
          }}
        />
      </div>
    </div>
  );
}
