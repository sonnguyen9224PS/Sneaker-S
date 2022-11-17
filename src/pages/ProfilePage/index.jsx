import { useEffect, useState } from "react";
import { Tabs, Table, Avatar, Row, Col, Button, Space, Modal } from "antd";
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
  updateAvatarAction,
  getFavoriteList,
  unFavoriteProductAction,
} from "../../redux/actions";

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
            <p>Tỉnh/Thành phố: {record.cityCode}</p>
            <p>Quận/Huyện: {record.districtCode}</p>
            <p>Xã/Phường:{record.wardCode}</p>
          </>
        );
      },
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

  return (
    <>
      <S.Profile>
        <h3>My profile</h3>
        <Tabs
          tabPosition="left"
          onTabClick={callbackTabClicked}
          defaultActiveKey={state.activeKey}
        >
          <Tabs.TabPane
            className="tabItem"
            tab={
              <span>
                <UserOutlined style={{ marginRight: 6 }} />
                {`Thông tin cá nhân`}
              </span>
            }
            key="1"
          >
            <Row style={{ width: "100%" }} className="avatarRow">
              <Col span={8}>Ảnh đại diện</Col>
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
            <Row style={{ width: "100%" }}>
              <Col span={8}>Tên</Col>
              <Col span={16}>{userInfo.data?.fullName}</Col>
            </Row>
            <Row style={{ width: "100%" }}>
              <Col span={8}>Email</Col>
              <Col span={16}>{userInfo.data?.email}</Col>
            </Row>
          </Tabs.TabPane>
          <Tabs.TabPane
            className="tabItem"
            tab={
              <span>
                <HistoryOutlined style={{ marginRight: 6 }} />
                {`Lịch sử giao dịch`}
              </span>
            }
            key="2"
          >
            <Table
              columns={tableColumns}
              dataSource={orderList.data}
              rowKey="id"
              pagination={false}
              expandable={{
                expandedRowRender: (record) => (
                  <>
                    <ul>
                      <p style={{ margin: 0 }}>Detail:</p>
                      {record.orderProducts.map((item) => (
                        <li key={item.id}>
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
                <HeartOutlined style={{ marginRight: 6 }} />
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
                <EditOutlined style={{ marginRight: 6 }} />
                {`Thay đổi mật khẩu`}
              </span>
            }
            key="4"
          ></Tabs.TabPane>
          <Tabs.TabPane
            className="tabItem"
            tab={
              <span>
                <LogoutOutlined style={{ marginRight: 6 }} />
                {`Đăng xuất`}
              </span>
            }
            key="5"
          ></Tabs.TabPane>
        </Tabs>
      </S.Profile>
    </>
  );
};

export default ProfilePage;
