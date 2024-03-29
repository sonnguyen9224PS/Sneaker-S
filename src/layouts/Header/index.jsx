import React, { useMemo, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon, {
  HomeOutlined,
  UserOutlined,
  CaretDownOutlined,
  HistoryOutlined,
  HeartOutlined,
  LogoutOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { ROUTES } from "../../constants/routes";
import { Row, Col, Dropdown, Menu, Badge, Drawer, Collapse } from "antd";
import * as S from "./styles";
import { logoutAction, getCategoryListAction } from "../../redux/actions";

function Header() {
  const { Panel } = Collapse;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { categoryList } = useSelector((state) => state.category);
  const { cartList } = useSelector((state) => state.checkOut);
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const renderCategoryShoes = useMemo(() => {
    return categoryList?.data.map((item) => {
      return (
        <Link
          key={item.id}
          to={ROUTES.USER.PRODUCT_LIST}
          state={{ categoryId: [item.id] }}
        >
          <li style={{ listStyle: "none" }}>{item.name}</li>
        </Link>
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
        <S.HeaderWrapper>
          <S.HeaderLogo>
            <Link to={ROUTES.USER.HOME}>
              <span className="logo">Sneaker-S</span>
            </Link>
          </S.HeaderLogo>
          <S.HeaderRight>
            <S.HeaderRightTop>
              <div className="contact">
                <a href="tel: 038 594 1277">
                  Hotline:<span> 038 594 1277</span>
                </a>
              </div>
              <div className="headerRightLogin">
                {userInfo.data.id ? (
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item
                          key={1}
                          onClick={() => {
                            navigate(ROUTES.USER.PROFILE, {
                              state: { activeKey: "1" },
                            });
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
                          Thông tin cá nhân
                        </Menu.Item>
                        <Menu.Item
                          key={2}
                          onClick={() => {
                            navigate(ROUTES.USER.PROFILE, {
                              state: { activeKey: "2" },
                            });
                          }}
                        >
                          <Icon
                            component={HistoryOutlined}
                            style={{
                              display: "inline-block",
                              marginRight: 3,
                              fontSize: 16,
                            }}
                          />
                          Lịch sử giao dịch
                        </Menu.Item>
                        <Menu.Item
                          key={3}
                          onClick={() => {
                            navigate(ROUTES.USER.PROFILE, {
                              state: { activeKey: "3" },
                            });
                          }}
                        >
                          <Icon
                            component={HeartOutlined}
                            style={{
                              display: "inline-block",
                              marginRight: 3,
                              fontSize: 16,
                            }}
                          />
                          Sản phẩm yêu thích
                        </Menu.Item>
                        <Menu.Item
                          key={4}
                          onClick={() => {
                            navigate(ROUTES.USER.PROFILE, {
                              state: { activeKey: "4" },
                            });
                          }}
                        >
                          <Icon
                            component={EditOutlined}
                            style={{
                              display: "inline-block",
                              marginRight: 3,
                              fontSize: 16,
                            }}
                          />
                          Thay đổi mật khẩu
                        </Menu.Item>
                        <Menu.Item
                          key={5}
                          onClick={() =>
                            dispatch(
                              logoutAction({
                                callBack: {
                                  gotoHome: () => {
                                    navigate(ROUTES.USER.HOME);
                                  },
                                },
                              })
                            )
                          }
                        >
                          <Icon
                            component={LogoutOutlined}
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
                      <i
                        style={{ marginRight: 3 }}
                        class="fa-solid fa-user"
                      ></i>
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
                      <i class="fa-solid fa-cart-arrow-down"></i>
                    </span>
                  </Badge>
                </Link>
              </div>
            </S.HeaderRightTop>
            <S.HeaderRightDown>
              <ul className="mainMenu">
                <li onClick={() => navigate(ROUTES.USER.HOME)}>
                  <HomeOutlined style={{ marginRight: 4 }} />
                  home
                </li>
                <li className="dropDown">
                  <Link to={ROUTES.USER.PRODUCT_LIST}>sneakers</Link>
                  <Icon
                    className="rotateIcon"
                    style={{ marginLeft: "0.1875rem" }}
                    component={CaretDownOutlined}
                  />
                  <ul className="subMenuSneaker">{renderCategoryShoes}</ul>
                </li>
                <li className="dropDown" style={{ color: "#bb0a08" }}>
                  <Link to={ROUTES.USER.PRODUCT_LIST} state={{ sale: 30 }}>
                    Sale all
                  </Link>
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
                <li>
                  <Link to={ROUTES.USER.NEWS}> tin tức và bài viết</Link>
                </li>
              </ul>
            </S.HeaderRightDown>
          </S.HeaderRight>
          <S.MenuHamburger>
            <button onClick={showDrawer}>
              <i class="fa-solid fa-bars"></i>
            </button>
            <S.SDrawer
              header={null}
              placement="right"
              onClose={onClose}
              open={open}
            >
              <Row>
                <Col style={{ paddingLeft: 12, marginBottom: 12 }} span={24}>
                  <Link to={ROUTES.USER.HOME} className="homeLink">
                    <HomeOutlined style={{ marginRight: 4 }} />
                    home
                  </Link>
                </Col>
                <Col style={{ paddingLeft: 12 }} span={24}>
                  <Link to={ROUTES.USER.PRODUCT_LIST}>collection</Link>
                </Col>
                <Collapse>
                  <Panel
                    header={
                      <span style={{ fontSize: 17 }}>
                        Sneakers
                        <i
                          style={{ marginLeft: 3 }}
                          class="fa-solid fa-chevron-down"
                        ></i>
                      </span>
                    }
                    key="1"
                  >
                    <Col span={24}>
                      <ul>{renderCategoryShoes}</ul>
                    </Col>
                  </Panel>
                  <Panel
                    header={
                      <span style={{ fontSize: 17 }}>
                        Sale all
                        <i
                          style={{ marginLeft: 3 }}
                          class="fa-solid fa-chevron-down"
                        ></i>
                      </span>
                    }
                    key="2"
                  >
                    <Col span={24}>
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
                    </Col>
                  </Panel>
                </Collapse>
                <Col span={24} style={{ marginBottom: 12 }}>
                  <Link to={ROUTES.USER.NEWS}>
                    <i
                      style={{ marginRight: 3 }}
                      class="fa-solid fa-square-rss"
                    ></i>
                    tin tức và bài viết
                  </Link>
                </Col>
                <Col
                  span={24}
                  style={{ marginBottom: 12, textTransform: "none" }}
                >
                  {userInfo.data.id ? (
                    <Dropdown
                      overlay={
                        <Menu>
                          <Menu.Item
                            key={1}
                            onClick={() => {
                              navigate(ROUTES.USER.PROFILE, {
                                state: { activeKey: "1" },
                              });
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
                            Thông tin cá nhân
                          </Menu.Item>
                          <Menu.Item
                            key={2}
                            onClick={() => {
                              navigate(ROUTES.USER.PROFILE, {
                                state: { activeKey: "2" },
                              });
                            }}
                          >
                            <Icon
                              component={HistoryOutlined}
                              style={{
                                display: "inline-block",
                                marginRight: 3,
                                fontSize: 16,
                              }}
                            />
                            Lịch sử giao dịch
                          </Menu.Item>
                          <Menu.Item
                            key={3}
                            onClick={() => {
                              navigate(ROUTES.USER.PROFILE, {
                                state: { activeKey: "3" },
                              });
                            }}
                          >
                            <Icon
                              component={HeartOutlined}
                              style={{
                                display: "inline-block",
                                marginRight: 3,
                                fontSize: 16,
                              }}
                            />
                            Sản phẩm yêu thích
                          </Menu.Item>
                          <Menu.Item
                            key={4}
                            onClick={() => {
                              navigate(ROUTES.USER.PROFILE, {
                                state: { activeKey: "4" },
                              });
                            }}
                          >
                            <Icon
                              component={EditOutlined}
                              style={{
                                display: "inline-block",
                                marginRight: 3,
                                fontSize: 16,
                              }}
                            />
                            Thay đổi mật khẩu
                          </Menu.Item>
                          <Menu.Item
                            key={5}
                            onClick={() =>
                              dispatch(
                                logoutAction({
                                  callBack: {
                                    gotoHome: () => {
                                      navigate(ROUTES.USER.HOME);
                                    },
                                  },
                                })
                              )
                            }
                          >
                            <Icon
                              component={LogoutOutlined}
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
                        <i
                          style={{ marginRight: 3 }}
                          class="fa-solid fa-user"
                        ></i>
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
                </Col>
                {!userInfo.data.id && (
                  <Col span={24}>
                    <Link to={ROUTES.REGISTER}>
                      <i style={{ marginRight: 3 }} class="fa-solid fa-key"></i>
                      Đăng ký
                    </Link>
                  </Col>
                )}
                <Col span={24}>
                  <Link to={ROUTES.USER.PRODUCT_LIST} state={{ sale: 70 }}>
                    <div className="imgMenu">
                      <img
                        src="https://hncmua.com/images/uploaded/blackfriday-1603297071794602657996.jpg"
                        alt=""
                      />
                    </div>
                  </Link>
                </Col>
              </Row>
            </S.SDrawer>
          </S.MenuHamburger>
        </S.HeaderWrapper>
      </S.Container>
    </S.HeaderContainerWrapper>
  );
}

export default Header;
