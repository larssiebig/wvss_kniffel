import { Link } from "react-router-dom";

export default function Navbar({ user }) {
  return (
    <nav className="w-full text-black bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">
        <Link to="/kniffel" className="hover:text-black-600">
          Kniffel App
        </Link>
      </h1>
      <div className="space-x-4">
        {!user && (
          <>
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </>
        )}
        {user && (
          <>
            <Link to="/dashboard" className="text-blue-600 hover:underline">
              Dashboard
            </Link>
            <Link to="/kniffel" className="text-blue-600 hover:underline">
              Game
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
