import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import { useSelector } from "react-redux";
import LoadingPage from "../../pages/LoadingPage/index";

function UserLayout() {
  const accessToken = localStorage.getItem("accessToken");
  const { userInfo } = useSelector((state) => state.user);
  if (accessToken && userInfo.loading) {
    return <LoadingPage />;
  }
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
export default UserLayout;
