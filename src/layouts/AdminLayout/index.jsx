import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useSelector } from "react-redux";
import LoadingPage from "../../pages/LoadingPage";

import Header from "../Header";

function AdminLayout() {
  const accessToken = localStorage.getItem("accessToken");
  const { userInfo } = useSelector((state) => state.user);
  if (accessToken && userInfo.loading) {
    return <LoadingPage />;
  } else if (userInfo.data.role !== "admin") {
    return <Navigate to={ROUTES.USER.HOME} />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default AdminLayout;
