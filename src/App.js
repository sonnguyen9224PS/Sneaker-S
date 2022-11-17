import { Routes, Route, useLocation } from "react-router-dom";
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
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AdminPage from "./pages/AdminPage";
import SuccessPage from "./pages/SuccessPage";
import ProfilePage from "./pages/ProfilePage";
import NewsPage from "./pages/NewsPage";
import NewsDetailPage from "./pages/NewsDetailPage";

import { getUserInfoAction, getCategoryListAction } from "./redux/actions/";

import { ROUTES } from "./constants/routes";

function App() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    if (accessToken) {
      const decodeInfo = jwtDecode(accessToken);
      dispatch(getUserInfoAction({ id: decodeInfo.sub }));
    }
    dispatch(getCategoryListAction());
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path={ROUTES.USER.HOME} element={<HomePage />} />
        <Route path={ROUTES.USER.PRODUCT_LIST} element={<ProductListPage />} />
        <Route
          path={ROUTES.USER.PRODUCT_DETAIL}
          element={<ProductDetailPage />}
        />
        <Route path={ROUTES.USER.CART} element={<CartPage />} />
        <Route path={ROUTES.USER.SUCCESS} element={<SuccessPage />} />
        <Route path={ROUTES.USER.CHECKOUT} element={<CheckoutPage />} />
        <Route path={ROUTES.USER.PROFILE} element={<ProfilePage />} />
        <Route path={ROUTES.USER.NEWS} element={<NewsPage />} />
        <Route path={ROUTES.USER.NEWS_DETAIL} element={<NewsDetailPage />} />
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
