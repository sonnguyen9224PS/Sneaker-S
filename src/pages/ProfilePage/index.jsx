import { useEffect, useState } from "react";
import {
  Tabs,
  Table,
  Input,
  Row,
  Col,
  Button,
  Space,
  Modal,
  Form,
  Breadcrumb,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Link, generatePath } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

import {
  UserOutlined,
  HeartOutlined,
  HistoryOutlined,
  EditOutlined,
  LogoutOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

import moment from "moment";
import * as S from "./styles";
import {
  getOrderList,
  logoutAction,
  getFavoriteList,
  unFavoriteProductAction,
  updatePasswordAction,
} from "../../redux/actions";
import { Container } from "../../layouts/Header/styles";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { orderList } = useSelector((state) => state.order);
  const { categoryList } = useSelector((state) => state.category);
  const { favoriteList } = useSelector((state) => state.favorite);

  const { state } = useLocation();
  const { confirm } = Modal;

  useEffect(() => {
    if (userInfo.data.id) {
      dispatch(getOrderList({ userId: userInfo.data.id }));
      dispatch(getFavoriteList({ id: userInfo.data.id }));
    }
  }, [userInfo.data]);

  const showDeleteConfirm = (id) => {
    confirm({
      title: "Bạn có muốn xoá sản phẩm này?",
      icon: <ExclamationCircleOutlined />,
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk() {
        dispatch(
          unFavoriteProductAction({
            id: id,
          })
        );
        window.location.reload();
      },
      onCancel() {},
    });
  };

  const tableColumns = [
    {
      title: "Code",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Product Count",
      dataIndex: "orderProducts",
      key: "orderProducts",
      render: (orderProducts) => `${orderProducts.length} products`,
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice) => `${totalPrice.toLocaleString()} VND`,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Địa chỉ nhận hàng",
      dataIndex: "address",
      key: "address",
      render: (_, record) => {
        return (
          <>
            <p>Địa chỉ:{record.address}</p>
            <p>Phường/Xã:{record.wardCode}</p>
            <p>Quận/Huyện: {record.districtCode}</p>
            <p>Tỉnh/Thành phố: {record.cityCode}</p>
          </>
        );
      },
    },
    {
      title: "Tình trạng đơn hàng",
      dataIndex: "status",
      key: "status",
    },
  ];
  const favoriteColumns = [
    {
      title: "Ảnh",
      dataIndex: "image",
      width: "8rem",
      render: (_, record) => {
        return (
          <div style={{ width: 60, height: 60 }}>
            <img
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
              src={record.product?.images[0]?.src}
              alt=""
            />
          </div>
        );
      },
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "product",
      width: "8rem",
      render: (_, record) => {
        return record.product?.name;
      },
    },
    {
      title: "Brand",
      dataIndex: "product",
      width: "8rem",
      render: (_, record) => {
        const data = categoryList.data.find(
          (item) => item.id === record.product.categoryId
        );
        return data.name;
      },
    },
    {
      title: "Giá",
      dataIndex: "product",
      width: "8rem",
      render: (_, record) => {
        return `${record.product?.price.toLocaleString("vi-VN")}₫`;
      },
    },
    {
      title: "Xoá",
      dataIndex: "delete",
      width: "8rem",
      render: (_, record) => {
        return (
          <Space>
            <Button
              style={{
                border: "none",
                fontSize: 20,
                boxShadow: "none",
                background: "none",
              }}
              onClick={() => showDeleteConfirm(record.id)}
            >
              <i class="fa-solid fa-trash"></i>
            </Button>
          </Space>
        );
      },
    },
    {
      title: "Mua",
      dataIndex: "buy",
      width: "8rem",
      render: (_, record) => {
        return (
          <Space>
            <Link
              to={generatePath(ROUTES.USER.PRODUCT_DETAIL, {
                id: `${record.product.slug}.${record.id}`,
              })}
            >
              <Button
                style={{
                  border: "none",
                  fontSize: 20,
                  boxShadow: "none",
                  background: "none",
                }}
              >
                <i class="fa-solid fa-cart-plus"></i>
              </Button>
            </Link>
          </Space>
        );
      },
    },
  ];

  const callbackTabClicked = (key) => {
    if (key === "5") {
      dispatch(
        logoutAction({
          callBack: {
            gotoHome: () => {
              navigate(ROUTES.USER.HOME);
            },
          },
        })
      );
    }
  };

  const [file, setFile] = useState(
    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  );

  const handleChange = function loadFile(event) {
    if (event.target.files.length > 0) {
      const file = URL.createObjectURL(event.target.files[0]);
      setFile(file);
    }
  };
  const handleUpdatePassword = (values) => {
    dispatch(
      updatePasswordAction({
        id: userInfo.data.id,
        password: values.newPassword,
        callBack: {
          gotoLogin: () => {
            navigate(ROUTES.LOGIN);
          },
        },
      })
    );
  };

  document.title = "Thông tin cá nhân";
  return (
    <>
      <Container>
        <Breadcrumb
          separator=">"
          style={{
            paddingTop: 16,
            paddingBottom: 16,
          }}
        >
          <Breadcrumb.Item>
            <Link to={ROUTES.USER.HOME}>Trang chủ</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Profile</Breadcrumb.Item>
        </Breadcrumb>
        <S.Profile>
          <h3 style={{ paddingLeft: 24 }}>
            <i style={{ marginRight: 3 }} class="fa-solid fa-address-card"></i>
            My profile
          </h3>
          <Tabs
            tabPosition="left"
            onTabClick={callbackTabClicked}
            defaultActiveKey={state.activeKey || 1}
          >
            <Tabs.TabPane
              className="tabItem"
              tab={
                <span>
                  <UserOutlined style={{ marginRight: 6, color: "#2a9dcc" }} />
                  {`Thông tin cá nhân`}
                </span>
              }
              key="1"
            >
              <Row
                style={{ width: "100%", marginBottom: 20 }}
                className="avatarRow"
              >
                <Col
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                  span={8}
                >
                  Ảnh đại diện
                </Col>
                <Col span={16} className="avatarCol">
                  <div style={{ position: "relative", width: "fit-content" }}>
                    <div
                      style={{
                        width: 100,
                        height: 100,
                        overflow: "hidden",
                        borderRadius: "50%",
                        boxShadow: "0px 0px 2px grey",
                      }}
                    >
                      <img
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                        src={file}
                        alt=""
                      />
                    </div>
                    <label
                      style={{
                        position: "absolute",
                        bottom: -6,
                        right: 0,
                        fontSize: 18,
                        color: "#5060ba ",
                      }}
                      htmlFor="upload"
                    >
                      <i class="fa-solid fa-upload"></i>
                      <input
                        type="file"
                        id="upload"
                        onChange={handleChange}
                        accept="image/*"
                        style={{ display: "none" }}
                      />
                    </label>
                  </div>
                </Col>
              </Row>
              <Row style={{ width: "100%", marginBottom: 10 }}>
                <Col style={{ fontWeight: "bold", fontSize: 16 }} span={8}>
                  Tên
                </Col>
                <Col span={16}>{userInfo.data?.fullName}</Col>
              </Row>
              <Row style={{ width: "100%", marginBottom: 10 }}>
                <Col style={{ fontWeight: "bold", fontSize: 16 }} span={8}>
                  Email
                </Col>
                <Col span={16}>{userInfo.data?.email}</Col>
              </Row>
              <Row style={{ width: "100%" }}>
                <Col style={{ fontWeight: "bold", fontSize: 16 }} span={8}>
                  Số điện thoại
                </Col>
                <Col span={16}>{userInfo.data?.phone}</Col>
              </Row>
            </Tabs.TabPane>
            <Tabs.TabPane
              className="tabItem"
              tab={
                <span>
                  <HistoryOutlined
                    style={{ marginRight: 6, color: "#2a9dcc" }}
                  />
                  {`Lịch sử giao dịch`}
                </span>
              }
              key="2"
            >
              <S.STable
                columns={tableColumns}
                dataSource={orderList.data}
                rowKey="id"
                pagination={false}
                expandable={{
                  expandedRowRender: (record) => (
                    <>
                      <ul>
                        <p style={{ margin: 0, fontSize: 15 }}>Detail:</p>
                        {record.orderProducts.map((item) => (
                          <li style={{ listStyle: "none" }} key={item.id}>
                            <i
                              style={{ marginRight: 3, color: "#2a9dcc" }}
                              class="fa-solid fa-truck-fast"
                            ></i>
                            {item.productName}
                            {item.optionName && ` - ${item.optionName}`}
                            {` - đơn giá: ${item.price}`}
                            {` - số lượng: ${item.quantity}`}
                            {` - size: ${item.size}`}
                            {` - thành tiền:  ${item.price * item.quantity}`}
                          </li>
                        ))}
                      </ul>
                      <p></p>
                    </>
                  ),
                }}
              />
            </Tabs.TabPane>
            <Tabs.TabPane
              className="tabItem"
              tab={
                <span>
                  <HeartOutlined style={{ marginRight: 6, color: "#2a9dcc" }} />
                  {`Sản phẩm yêu thích`}
                </span>
              }
              key="3"
            >
              <Table
                columns={favoriteColumns}
                dataSource={favoriteList.data}
              ></Table>
            </Tabs.TabPane>
            <Tabs.TabPane
              className="tabItem"
              tab={
                <span>
                  <EditOutlined style={{ marginRight: 6, color: "#2a9dcc" }} />
                  {`Thay đổi mật khẩu`}
                </span>
              }
              key="4"
            >
              <Form
                name="changePWForm"
                layout="vertical"
                style={{
                  width: "50rem",
                  border: "solid 1px darkgrey",
                  borderRadius: 15,
                  padding: 30,
                  marginBottom: 30,
                }}
                onFinish={(values) => handleUpdatePassword(values)}
              >
                <h2>Thay đổi mật khẩu</h2>
                <Form.Item
                  name="newPassword"
                  label="Mật khẩu mới"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mật mới!",
                    },
                    {
                      min: 5,
                      message: "Mật khẩu phải có ít nhât 6 ký tự",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  label="Xác nhận mật khẩu"
                  hasFeedback
                  dependencies={["newPassword"]}
                  rules={[
                    {
                      required: true,
                      message: "",
                    },
                    {
                      min: 5,
                      message: "Mật khẩu phải có ít nhât 6 ký tự",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("newPassword") === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          new Error(
                            "Mật khẩu không trùng khớp, vui lòng xác nhận lại mật khẩu!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Thay đổi mật khẩu
                </Button>
              </Form>
            </Tabs.TabPane>
            <Tabs.TabPane
              className="tabItem"
              tab={
                <span>
                  <LogoutOutlined style={{ marginRight: 6, color: "red" }} />
                  {`Đăng xuất`}
                </span>
              }
              key="5"
            ></Tabs.TabPane>
          </Tabs>
        </S.Profile>
      </Container>
    </>
  );
};

export default ProfilePage;
