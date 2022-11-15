import React from "react";
import {
  Table,
  Space,
  Button,
  InputNumber,
  Input,
  Breadcrumb,
  Row,
  Modal,
  Alert,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import * as S from "./styles";
import { Link, generatePath } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ROUTES } from "../../constants/routes";
import {
  updateCartItemAction,
  deleteCartItemAction,
} from "../../redux/actions";
import { Container } from "../../layouts/Header/styles";

function CartPage() {
  const { confirm } = Modal;
  const dispatch = useDispatch();
  const { cartList } = useSelector((state) => state.checkOut);
  console.log("🚀 ~ file: index.jsx ~ line 28 ~ CartPage ~ cartList", cartList);
  const { userInfo } = useSelector((state) => state.user);

  const handleChangeQuantity = (id, value) => {
    dispatch(
      updateCartItemAction({
        productId: id,
        quantity: value,
      })
    );
  };
  const showDeleteConfirm = (id) => {
    confirm({
      title: "Bạn có muốn xoá sản phẩm này?",
      icon: <ExclamationCircleOutlined />,
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk() {
        dispatch(
          deleteCartItemAction({
            productId: id,
          })
        );
      },
      onCancel() {},
    });
  };
  const totalPrice = cartList
    .map((item) => item.price * item.quantity)
    .reduce((total, price) => total + price, 0);

  const tableColumn = [
    {
      title: "Ảnh",
      dataIndex: "image",
      width: "8rem",
      key: "image",
      render: (image) => {
        return (
          <div style={{ width: 60, height: 60 }}>
            <img
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
              src={image}
              alt=""
            />
          </div>
        );
      },
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      width: "8rem",
      key: "name",
      render: (name, record) => {
        return (
          <Link
            to={generatePath(ROUTES.USER.PRODUCT_DETAIL, {
              id: `${record.slug}.${record.productId}`,
            })}
          >
            {name}
          </Link>
        );
      },
    },
    {
      title: "Brand",
      dataIndex: "categoryName",
      width: "8rem",
      key: "categoryName",
    },
    {
      title: "Size",
      dataIndex: "size",
      width: "8rem",
      key: "size",
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      width: "8rem",
      key: "price",
      render: (price) => `${price.toLocaleString("vi-VN")}₫`,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      width: "8rem",
      key: "quantity",
      render: (quantity, record) => (
        <InputNumber
          className="quantityInput"
          controls
          min={1}
          value={quantity}
          onChange={(value) => handleChangeQuantity(record.productId, value)}
        />
      ),
    },
    {
      title: "Tổng giá",
      dataIndex: "totalPrice",
      width: "8rem",
      key: "totalPrice",
      render: (_, record) =>
        `${(record.price * record.quantity).toLocaleString("vi-VN")}₫`,
    },
    {
      title: "Xoá",
      dataIndex: "action",
      width: "8rem",
      key: "action",
      render: (_, record) => {
        return (
          <Space>
            <Button onClick={() => showDeleteConfirm(record.productId)}>
              <i class="fa-solid fa-trash"></i>
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Container>
        <Row>
          <Breadcrumb style={{ paddingTop: 16, paddingBottom: 16 }}>
            <Breadcrumb.Item>
              <Link to={ROUTES.USER.HOME}>Trang chủ</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link style={{ pointerEvents: "none" }} to={ROUTES.USER.CART}>
                Giỏ hàng
              </Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <S.CartTittle>
          <h1>Giỏ hàng của bạn</h1>
          <p>
            Có <span>{cartList.length}</span> sản phẩm trong giỏ hàng
          </p>
        </S.CartTittle>
        <S.CartBody>
          <Table
            className="tableCart"
            columns={tableColumn}
            dataSource={cartList}
            rowKey="productId"
            pagination={false}
          ></Table>
          <div className="totalMoney">
            <Link to={ROUTES.USER.PRODUCT_LIST}>
              <Button className="backToshop">Tiếp tục mua hàng</Button>
            </Link>
            <div className="totalPay">
              <span>Tổng tiền thanh toán</span>
              <Input
                disabled={true}
                value={`${totalPrice.toLocaleString("vi-VN")}₫`}
                style={{
                  color: "#000",
                  textAlign: "right",
                  fontWeight: "bold",
                }}
              ></Input>
            </div>
          </div>
          {userInfo.data?.id ? (
            <Link to={ROUTES.USER.CHECKOUT} className="payBtn">
              <Button>Tiến hành thanh toán</Button>
            </Link>
          ) : (
            <Alert
              message="Bạn cần đăng nhập để thanh toán"
              description={
                <span>
                  Click
                  <Link to={ROUTES.LOGIN} style={{ fontWeight: "bold" }}>
                    Đăng nhập
                  </Link>
                  để đăng nhập
                </span>
              }
              type="error"
            />
          )}
        </S.CartBody>
      </Container>
    </>
  );
}

export default CartPage;
