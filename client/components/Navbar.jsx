import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post(
      "http://localhost:3001/api/logout",
      {},
      { withCredentials: true }
    );
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="w-full text-black bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">
        <Link to="/kniffel" className="hover:text-black-600">
          Kniffel App
        </Link>
      </h1>

      <div className="space-x-4">
        {user ? (
          <>
            <span className="text-gray-700">Hi, {user.username}</span>
            <Link to="/dashboard" className="text-blue-600 hover:underline">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:underline"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
