import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import "./App.js";
import "./App.css";
import "antd/dist/antd.less";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";

import UserLayout from "./layouts/UserLayout/index";
import LoginLayout from "./layouts/LoginLayout";
import AdminLayout from "./layouts/AdminLayout";

import HomePage from "./pages/HomePage";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import RegisterPage from "./pages/RegisterPage/index.jsx";
import LoginPage from "./pages/LoginPage/index.jsx";
import CheckoutPage from "./pages/CheckoutPage";
import AdminPage from "./pages/AdminPage";
import AboutPage from "./pages/AboutPage";
import { getUserInfoAction, getCategoryListAction } from "./redux/actions/";

import { ROUTES } from "./constants/routes";

function App() {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    if (accessToken) {
      const decodeInfo = jwtDecode(accessToken);
      dispatch(getUserInfoAction({ id: decodeInfo.sub }));
    }
    dispatch(getCategoryListAction());
  }, []);
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path={ROUTES.USER.HOME} element={<HomePage />} />
        <Route path={ROUTES.USER.PRODUCT_LIST} element={<ProductListPage />} />
        <Route
          path={ROUTES.USER.PRODUCT_DETAIL}
          element={<ProductDetailPage />}
        />
        <Route path={ROUTES.USER.ABOUT} element={<AboutPage />} />
        <Route path={ROUTES.USER.CHECKOUT} element={<CheckoutPage />} />
      </Route>
      <Route element={<LoginLayout />}>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      </Route>
      <Route element={<AdminLayout />}>
        <Route path={ROUTES.ADMIN.DASHBOARD} element={<AdminPage />} />
      </Route>
    </Routes>
  );
}

export default App;