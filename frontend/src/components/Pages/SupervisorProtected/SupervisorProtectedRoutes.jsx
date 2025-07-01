import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../../contexts/user.context";

import { Outlet } from "react-router-dom";

const SupervisorProtectedRoutes = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser || currentUser.role !== "supervisor") {
      navigate("/");
    }
  }, [currentUser, navigate]);

  return (
    <div>
      {currentUser && currentUser.role === "supervisor" ? <Outlet /> : <></>}
    </div>
  );
};

export default SupervisorProtectedRoutes;
