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
  const { cartList } = useSelector((state) => state.cart);

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
  const totalPay = () => {
    let total = 0;
    cartList.map((item) => (total += item.price * item.quantity));
    return total;
  };
  const tableColumn = [
    {
      title: "Ảnh",
      dataIndex: "image",
      width: "8rem",
      key: "image",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      width: "8rem",
      key: "name",
      render: (_, record) => {
        return (
          <Link
            to={generatePath(ROUTES.USER.PRODUCT_DETAIL, {
              id: `${record.slug}.${record.productId}`,
            })}
          >
            {record.name}
          </Link>
        );
      },
    },
    {
      title: "Size",
      dataIndex: "size",
      width: "8rem",
      key: "size",
    },
    {
      title: "Giá",
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
      title: "Chỉnh sửa",
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
                value={`${totalPay().toLocaleString("vi-VN")}₫`}
                style={{
                  color: "#000",
                  textAlign: "right",
                  fontWeight: "bold",
                }}
              ></Input>
            </div>
          </div>
          <Link to={ROUTES.USER.CHECKOUT} className="payBtn">
            <Button>Tiến hành thanh toán</Button>
          </Link>
        </S.CartBody>
      </Container>
    </>
  );
}

export default CartPage;
