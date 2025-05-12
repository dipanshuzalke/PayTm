import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Appbar () {
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/api/v1/user/logout', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      // Clear token from localStorage
      localStorage.removeItem("token");

      // Redirect to login page
      navigate('/signin');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
  
  return (
    <div className="shadow h-14 flex justify-between items-center">
      <h1 className="flex flex-col justify-center h-full ml-4">PayTM App</h1>
        <button className='mr-5' onClick={() => {
          handleLogout();
        }}>Logout</button>
    </div>
  );
};
