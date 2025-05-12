import { useEffect, useState } from "react";
import axios from "axios";

export default function Balance({ value }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // or however you store your token
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch user:", err);
      });
  }, []);


  return (
    <div className="flex flex-col gap-2">
      <div>
        Hello, <span className="font-bold text-xl">{user.firstName + " " +  user.lastName}</span>
      </div>
      <div className="flex items-center">
        <div className="text-lg">Your balance</div>
        <div className="font-semibold ml-2 text-lg">Rs - {user.balance}</div>
      </div>
    </div>
  );
}
