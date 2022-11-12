import { useEffect, useState } from "react";
import {
  Tabs,
  Table,
  Image,
  Avatar,
  Row,
  Col,
  Button,
  Upload,
  Form,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { convertBase64ToImage, convertImageToBase64 } from "../../utils/file";

import {
  UserOutlined,
  HeartOutlined,
  HistoryOutlined,
  EditOutlined,
  LogoutOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import moment from "moment";
import * as S from "./styles";

import {
  getOrderList,
  logoutAction,
  updateAvatarAction,
} from "../../redux/actions";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { orderList } = useSelector((state) => state.order);
  const { state } = useLocation();

  useEffect(() => {
    if (userInfo.data.id) {
      dispatch(getOrderList({ userId: userInfo.data?.id }));
    }
  }, [userInfo.data]);

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
                  <ul>
                    {record.orderProducts.map((item) => (
                      <li key={item.id}>
                        {item.productName}
                        {item.optionName && ` - ${item.optionName}`}
                        {` - ${item.price}`}
                        {` - ${item.quantity}`}
                        {` - ${item.price * item.quantity}`}
                      </li>
                    ))}
                  </ul>
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
          ></Tabs.TabPane>
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
