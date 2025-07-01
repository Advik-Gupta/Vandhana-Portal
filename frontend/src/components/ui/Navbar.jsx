import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import axios from "axios";

const Navbar = () => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    try {
      axios.post("http://localhost:8080/api/v1/users/logout", {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          Vandhana International
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() =>
              navigate(
                currentUser?.role === "admin"
                  ? "/admin/home"
                  : currentUser?.role === "supervisor"
                  ? "/supervisor/home"
                  : "/"
              )
            }
            className="bg-blue-500 text-white text-sm font-medium px-3 py-1 rounded hover:bg-blue-600 transition duration-200"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/change-password")}
            className="bg-blue-500 text-white text-sm font-medium px-3 py-1 rounded hover:bg-blue-600 transition duration-200"
          >
            Change Password
          </button>
          {currentUser?.role === "admin" && (
            <button
              onClick={() => navigate("/admin/signup")}
              className="bg-blue-500 text-white text-sm font-medium px-3 py-1 rounded hover:bg-blue-600 transition duration-200"
            >
              Create Users
            </button>
          )}
          {currentUser ? (
            <>
              <span className="text-white">
                Logged in as, {currentUser.name}
              </span>
              <a
                href="/logout"
                className="text-white hover:text-gray-300 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </a>
            </>
          ) : (
            <>
              <a
                href="/login"
                className="text-white hover:text-gray-300 cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </a>
              <a
                href="/signup"
                className="text-white hover:text-gray-300 cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Signup
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
