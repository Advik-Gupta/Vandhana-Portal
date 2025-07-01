import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../../contexts/user.context";

import { Outlet } from "react-router-dom";

const AdminProtectedRoutes = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser || currentUser.role !== "admin") {
      if (currentUser.role === "supervisor") {
        navigate("/supervisor/home");
      } else {
        navigate("/");
      }
    }
  }, [currentUser, navigate]);

  return (
    <div>
      {currentUser && currentUser.role === "admin" ? <Outlet /> : <></>}
    </div>
  );
};

export default AdminProtectedRoutes;
