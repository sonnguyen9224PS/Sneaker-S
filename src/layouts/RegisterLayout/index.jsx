import { Outlet } from "react-router-dom";

import Header from "../Header";
import Footer from "../Footer";

import * as S from "./styles";

function RegisterLayout() {
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

export default RegisterLayout;
