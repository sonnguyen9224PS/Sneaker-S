import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import Icon, {
  HomeOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { ROUTES } from "../../constants/routes";
import { Row, Col, Dropdown, Menu, Badge } from "antd";
import * as S from "./styles";
import { logoutAction } from "../../redux/actions";

function Header() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { categoryList } = useSelector((state) => state.category);
  const { cartList } = useSelector((state) => state.cart);

  const renderCategoryShoes = useMemo(() => {
    return categoryList.data.map((item, index) => {
      return (
        <li to="#" key={index}>
          <a href=""> {item.name}</a>
        </li>
      );
    });
  }, [categoryList.data]);

  return (
    <S.HeaderContainerWrapper>
      <S.Container>
        <Row>
          <Col span="4">
            <S.HeaderLogo>
              <Link to={ROUTES.USER.HOME}>
                <img
                  src="https://img.freepik.com/premium-vector/highquality-logo-concept-features-sneaker-made-vibrant-segments-with-cool-modern-look-vintage-hand-drawn_668007-95.jpg?w=2000"
                  alt="logo"
                  width={60}
                  height={60}
                />
              </Link>
            </S.HeaderLogo>
          </Col>
          <Col span="20">
            <S.HeaderRight>
              <Row>
                <Col span={24}>
                  <S.HeaderRightTop logout={<Icon />}>
                    <div className="contact">
                      <a href="tel: 038 594 1277">Hotline: 038 594 1277</a>
                    </div>
                    <div className="headerRightLogin">
                      {userInfo.data.id ? (
                        <Dropdown
                          overlay={
                            <Menu>
                              <Menu.Item
                                key={1}
                                onClick={() => {
                                  dispatch(logoutAction());
                                }}
                              >
                                <Icon
                                  component={UserOutlined}
                                  style={{
                                    display: "inline-block",
                                    marginRight: 3,
                                    fontSize: 16,
                                  }}
                                />
                                Logout
                              </Menu.Item>
                            </Menu>
                          }
                        >
                          <span className="userNameLoginAfter">
                            {userInfo.data.fullName}
                          </span>
                        </Dropdown>
                      ) : (
                        <Link to={ROUTES.LOGIN} className="btnLogin">
                          <Icon
                            component={UserOutlined}
                            style={{
                              display: "inline-block",
                              marginRight: 3,
                              fontSize: 16,
                            }}
                          />
                          Login
                        </Link>
                      )}
                      <Link to={ROUTES.USER.CHECKOUT}>
                        <Badge color="#000" count={cartList.length}>
                          <Icon
                            component={ShoppingCartOutlined}
                            className="cart"
                          />
                        </Badge>
                      </Link>
                    </div>
                  </S.HeaderRightTop>
                </Col>
                <Col span={24}>
                  <S.HeaderRightDown>
                    <ul className="mainMenu">
                      <li>
                        <Link to={ROUTES.USER.HOME}>
                          <HomeOutlined style={{ marginRight: 4 }} />
                          trang chủ
                        </Link>
                      </li>
                      <li className="dropDown">
                        <a href="">
                          sneakers
                          <Icon
                            className="rotateIcon"
                            style={{ marginLeft: "0.1875rem" }}
                            component={CaretDownOutlined}
                          />
                        </a>
                        <ul className="subMenuSneaker">
                          {renderCategoryShoes}
                        </ul>
                      </li>
                      <li className="dropDown">
                        <a href="">
                          Thương hiệu khác
                          <Icon
                            className="rotateIcon"
                            style={{ marginLeft: "0.1875rem" }}
                            component={CaretDownOutlined}
                          />
                        </a>
                      </li>
                      <li>
                        <a href=""> membership</a>
                      </li>
                      <li>
                        <a href=""> blog</a>
                      </li>
                    </ul>
                  </S.HeaderRightDown>
                </Col>
              </Row>
            </S.HeaderRight>
          </Col>
        </Row>
      </S.Container>
    </S.HeaderContainerWrapper>
  );
}

export default Header;
