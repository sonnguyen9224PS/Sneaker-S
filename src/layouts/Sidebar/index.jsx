import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

// import { ROUTES } from "../../constants/routes";
import * as S from "./styles";

const SIDEBAR_MENU = [];

function Sidebar({ isShowSidebar }) {
  const location = useLocation();
  const navigate = useNavigate();

  function renderSidebarMenu() {
    return SIDEBAR_MENU.map((item, index) => {
      return (
        <S.SidebarItem
          key={index}
          active={item.path === location.pathname}
          onClick={() => navigate(item.path)}
        >
          {item.title}
        </S.SidebarItem>
      );
    });
  }
  return (
    <S.SidebarWrapper isShow={isShowSidebar}>
      {renderSidebarMenu()}
    </S.SidebarWrapper>
  );
}

export default Sidebar;
