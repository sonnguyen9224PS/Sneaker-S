import { useEffect } from "react";
import {
  Tabs,
  Table,
  Avatar,
  Row,
  Col,
  Button,
  Upload,
  Form,
  Space,
  Modal,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Link, generatePath } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { convertBase64ToImage, convertImageToBase64 } from "../../utils/file";

import {
  UserOutlined,
  HeartOutlined,
  HistoryOutlined,
  EditOutlined,
  LogoutOutlined,
  PlusOutlined,
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

  // const [file, setFile] = useState();
  // userInfo.data.avatar
  //   ? userInfo.data.avatar
  //   : "https://cdn-icons-png.flaticon.com/512/149/149071.png"

  // const handleChange = function loadFile(event) {
  //   if (event.target.files.length > 0) {
  //     const file = URL.createObjectURL(event.target.files[0]);
  //     setFile(file);
  // dispatch(
  //   updateAvatarAction({
  //     id: userInfo.data?.id,
  //     avatar: file,
  //   })
  // );
  // }
  // };
  const handleUpdateAvatar = async (values) => {
    //  const newImages = [];
    //  for (let i = 0; i < images.length; i++) {
    //    const imgBase64 = await convertImageToBase64(images[i].originFileObj);
    //    await newImages.push({
    //      ...(images[i].id && { id: images[i].id }),
    //      name: images[i].name,
    //      type: images[i].type,
    //      thumbUrl: images[i].thumbUrl,
    //      url: imgBase64,
    //    });
    //  }
    // console.log(
    //   "🚀 ~ file: index.jsx ~ line 108 ~ handleUpdateProduct ~ newImages",
    //   newImages
    // );
    // dispatch(
    //   updateProductAction({
    //     id: id,
    //     values: productValues,
    //     options: options,
    //     initialOptionIds: productDetail.data.options.map((item) => item.id),
    //     images: newImages,
    //     initialImageIds: productDetail.data.images.map((item) => item.id),
    //     callback: {
    //       goToList: () => navigate(ROUTES.ADMIN.PRODUCT_LIST),
    //     },
    //   })
    // );
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
                <UserOutlined style={{ marginRight: 2 }} />
                {`Thông tin cá nhân`}
              </span>
            }
            key="1"
          >
            <Form
              name="userInfoForm"
              onFinish={(values) => handleUpdateAvatar(values)}
            >
              <Row style={{ width: "100%" }} className="avatarRow">
                <Col span={8}>Ảnh đại diện</Col>
                <Col span={16} className="avatarCol">
                  <Form.Item
                    name="images"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => {
                      if (Array.isArray(e)) return e;
                      return e?.fileList;
                    }}
                  >
                    <Upload
                      listType="picture-card"
                      beforeUpload={Upload.LIST_IGNORE}
                    >
                      <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    </Upload>
                  </Form.Item>
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
              <Row>
                <Button>Thay đổi thông tin</Button>
              </Row>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane
            className="tabItem"
            tab={
              <span>
                <HistoryOutlined style={{ marginRight: 2 }} />
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
                <HeartOutlined style={{ marginRight: 2 }} />
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
                <EditOutlined style={{ marginRight: 2 }} />
                {`Thay đổi mật khẩu`}
              </span>
            }
            key="4"
          ></Tabs.TabPane>
          <Tabs.TabPane
            className="tabItem"
            tab={
              <span>
                <LogoutOutlined style={{ marginRight: 2 }} />
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
