import React, { useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon, {
  HomeOutlined,
  UserOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { ROUTES } from "../../constants/routes";
import { Row, Col, Dropdown, Menu, Badge } from "antd";
import * as S from "./styles";
import { logoutAction, getCategoryListAction } from "../../redux/actions";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { categoryList } = useSelector((state) => state.category);

  const { cartList } = useSelector((state) => state.cart);

  const renderCategoryShoes = useMemo(() => {
    return categoryList.data.map((item) => {
      return (
        <li
          key={item.id}
          onClick={() =>
            navigate(ROUTES.USER.PRODUCT_LIST, {
              state: { categoryId: [item.id] },
            })
          }
        >
          {item.name}
        </li>
      );
    });
  }, [categoryList]);

  useEffect(() => {
    dispatch(
      getCategoryListAction({
        logo: true,
      })
    );
  }, []);

  return (
    <S.HeaderContainerWrapper>
      <S.Container>
        <Row>
          <Col span="4">
            <S.HeaderLogo>
              <Link to={ROUTES.USER.HOME}>
                <span className="logo">Sneaker-S</span>
              </Link>
            </S.HeaderLogo>
          </Col>
          <Col span="20">
            <S.HeaderRight>
              <Row>
                <Col span={24}>
                  <S.HeaderRightTop>
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
                      <Link to={ROUTES.USER.CART}>
                        <Badge color="#000" count={cartList.length}>
                          <span className="cart">
                            <i class="fa-solid fa-cart-flatbed-suitcase"></i>
                          </span>
                        </Badge>
                      </Link>
                    </div>
                  </S.HeaderRightTop>
                </Col>
                <Col span={24}>
                  <S.HeaderRightDown>
                    <ul className="mainMenu">
                      <li onClick={() => navigate(ROUTES.USER.HOME)}>
                        <HomeOutlined style={{ marginRight: 4 }} />
                        home
                      </li>
                      <li
                        className="dropDown"
                        // onClick={() => navigate(ROUTES.USER.PRODUCT_LIST)}
                      >
                        sneakers
                        <Icon
                          className="rotateIcon"
                          style={{ marginLeft: "0.1875rem" }}
                          component={CaretDownOutlined}
                        />
                        <ul className="subMenuSneaker">
                          {renderCategoryShoes}
                        </ul>
                      </li>
                      <li
                        onClick={() =>
                          navigate(ROUTES.USER.PRODUCT_LIST, {
                            state: { sale: 30 },
                          })
                        }
                        className="dropDown"
                        style={{ color: "#bb0a08" }}
                      >
                        Sale all
                        <Icon
                          className="rotateIcon"
                          style={{ marginLeft: "0.1875rem", color: "#000" }}
                          component={CaretDownOutlined}
                        />
                        <ul className="subMenuSneaker dropSale">
                          <li
                            onClick={() =>
                              navigate(ROUTES.USER.PRODUCT_LIST, {
                                state: { sale: 30 },
                              })
                            }
                          >
                            sale off 30%
                          </li>
                          <li
                            onClick={() =>
                              navigate(ROUTES.USER.PRODUCT_LIST, {
                                state: { sale: 50 },
                              })
                            }
                          >
                            sale off 50%
                          </li>
                          <li
                            onClick={() =>
                              navigate(ROUTES.USER.PRODUCT_LIST, {
                                state: { sale: 70 },
                              })
                            }
                          >
                            sale off 70%
                          </li>
                        </ul>
                      </li>
                      <li>membership</li>
                      <li>blog</li>
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
