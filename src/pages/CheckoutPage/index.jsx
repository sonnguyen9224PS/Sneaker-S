import React, { useState } from "react";
import { Table, Space, Button, Input } from "antd";
import * as S from "./styles";
import { Link, generatePath } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTES } from "../../constants/routes";

function CheckoutPage() {
  const [numberQuantity, setNumberQuantity] = useState(1);
  console.log(
    "🚀 ~ file: index.jsx ~ line 10 ~ CheckoutPage ~ numberQuantity",
    numberQuantity
  );

  const { cartList } = useSelector((state) => state.cart);

  // const handleQuantity = () => {

  // }

  const tableColumn = [
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
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
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toLocaleString("vi-VN")}VND`,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity) => (
        <S.CartQuantity>
          <Button
            className="downBtn"
            disabled={numberQuantity <= 1}
            onClick={() => setNumberQuantity(numberQuantity - 1)}
          >
            -
          </Button>
          <Input
            className="quantityInput"
            controls
            min={1}
            value={quantity}
            onChange={(value) => {
              // handleQuantity(value)
            }}
          />
          <Button
            className="downBtn"
            onClick={() => setNumberQuantity(numberQuantity + 1)}
          >
            +
          </Button>
        </S.CartQuantity>
      ),
      // <InputNumber block value={quantity} />,
    },
    {
      title: "Tổng giá",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (_, record) =>
        `${(record.price * record.quantity).toLocaleString("vi-VN")}VND`,
    },
    {
      title: "Chỉnh sửa",
      dataIndex: "action",
      key: "action",
      render: () => {
        return (
          <Space>
            <Button>
              <i class="fa-solid fa-x"></i>
            </Button>
          </Space>
        );
      },
    },
  ];
  return (
    <>
      <S.CartTittle>
        <h1>Giỏ hàng của bạn</h1>
        <p>
          Có <span>X</span> sản phẩm trong giỏ hàng
        </p>
      </S.CartTittle>
      <S.CartBody>
        <Table
          columns={tableColumn}
          dataSource={cartList}
          rowKey="productId"
        ></Table>
      </S.CartBody>
    </>
  );
}

export default CheckoutPage;
