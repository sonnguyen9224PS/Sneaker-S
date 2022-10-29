import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

import Header from "../Header";
import Footer from "../Footer";

import * as S from "./styles";

function LoginLayout() {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) return <Navigate to={ROUTES.USER.HOME} />;
  return (
    <>
      <Header />
      <S.MainWrapper>
        <Outlet />
      </S.MainWrapper>
      <Footer />
    </>
  );
}

export default LoginLayout;
