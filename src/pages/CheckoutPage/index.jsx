import React, { useEffect, useMemo, useState } from "react";
import { ROUTES } from "../../constants/routes";
import {
  Row,
  Col,
  Input,
  Select,
  Button,
  Form,
  Radio,
  Badge,
  Alert,
  BackTop,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import * as S from "./styles";
import { Container } from "../../layouts/Header/styles";
import {
  getCityListAction,
  getDistrictListAction,
  getWardListAction,
  orderProductAction,
} from "../../redux/actions";

function CheckoutPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { TextArea } = Input;
  const [checkoutForm] = Form.useForm();

  const { cityList } = useSelector((state) => state.location);
  const { districtList } = useSelector((state) => state.location);
  const { wardList } = useSelector((state) => state.location);
  const { userInfo } = useSelector((state) => state.user);
  const { cartList } = useSelector((state) => state.checkOut);

  const [transport, setTransport] = useState(0);

  const totalPrice = cartList
    .map((item) => item.price * item.quantity)
    .reduce((total, price) => total + price, 0);

  const initialValues = {
    fullName: userInfo.data.fullName || "",
    email: userInfo.data.email || "",
    phoneNumber: "",
    address: "",
    cityCode: undefined,
    districtCode: undefined,
    wardCode: undefined,
  };

  useEffect(() => {
    dispatch(getCityListAction({}));
  }, []);
  useEffect(() => {
    if (userInfo.data.id) {
      checkoutForm.resetFields();
    }
  }, [userInfo.data]);

  const renderCityList = useMemo(() => {
    return cityList.data.map((item) => {
      return (
        <Select.Option key={item.id} value={item.code}>
          {item.name}
        </Select.Option>
      );
    });
  }, [cityList.data]);
  const renderDistrictList = useMemo(() => {
    return districtList.data.map((item) => {
      return (
        <Select.Option key={item.id} value={item.code}>
          {item.name}
        </Select.Option>
      );
    });
  }, [districtList.data]);
  const renderWardList = useMemo(() => {
    return wardList.data.map((item) => {
      return (
        <Select.Option key={item.id} value={item.code}>
          {item.name}
        </Select.Option>
      );
    });
  }, [wardList.data]);

  const handleSubmitPaymentForm = (values) => {
    if (userInfo.data.id) {
      dispatch(
        orderProductAction({
          ...values,
          userId: userInfo.data.id,
          totalPrice: totalPrice,
          status: "pending",
          products: cartList.map((item) => ({
            productId: item.productId,
            productName: item.name,
            price: item.price,
            quantity: item.quantity,
            size: item.size,
          })),
        })
      );
      localStorage.removeItem("cart");
      navigate(ROUTES.USER.SUCCESS);
    }
  };

  document.title = "Thông tin thanh toán";
  return (
    <div>
      <BackTop />
      <Container>
        <S.CheckOutWrapper>
          <S.FormCus
            name="checkoutForm"
            layout="vertical"
            form={checkoutForm}
            initialValues={initialValues}
            onFinish={(values) => {
              handleSubmitPaymentForm(values);
            }}
          >
            <Row gutter={[24, 24]}>
              <Col lg={16} xs={24} className="checkoutLeft">
                <Row gutter={[24, 24]}>
                  <Col md={12} xs={24} className="infoCheckout">
                    <div className="infoHead">
                      <h3 className="infoTtl">Thông tin nhận hàng</h3>
                    </div>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập email!",
                        },
                        {
                          type: "email",
                          message: "Email không hợp lệ!",
                        },
                      ]}
                    >
                      <Input placeholder="Email" allowClear></Input>
                    </Form.Item>
                    <Form.Item
                      name="fullName"
                      label="Họ và tên"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập họ tên!",
                        },
                      ]}
                    >
                      <Input placeholder="Họ và tên" allowClear></Input>
                    </Form.Item>
                    <Form.Item
                      name="phoneNumber"
                      label="Số điện thoại"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập số điện thoại!",
                        },
                        {
                          pattern: new RegExp(/^[0-9_-]{10}$/),
                          message: "Vui lòng nhập đúng số điện thoại!",
                        },
                      ]}
                    >
                      <Input placeholder="Số điện thoại" allowClear></Input>
                    </Form.Item>
                    <Form.Item
                      name="address"
                      label="Địa chỉ"
                      rules={[
                        {
                          required: true,
                          message:
                            "Vui lòng nhập địa chỉ cụ thể (số nhà, hẻm,..)!",
                        },
                      ]}
                    >
                      <Input placeholder="Địa chỉ" allowClear></Input>
                    </Form.Item>
                    <Form.Item
                      name="cityCode"
                      label="Tỉnh"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn tỉnh/thành phố!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Thành phố/Tỉnh"
                        style={{ width: "100%" }}
                        onChange={(value) => {
                          dispatch(getDistrictListAction({ cityCode: value }));
                          checkoutForm.setFieldsValue({
                            cityCode: cityList.data.find(
                              (item) => item.code === value
                            ).name,
                            districtCode: undefined,
                            wardCode: undefined,
                          });
                        }}
                      >
                        {renderCityList}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name="districtCode"
                      label="Huyện"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn quận/huyện!",
                        },
                      ]}
                    >
                      <Select
                        disabled={!checkoutForm.getFieldValue("cityCode")}
                        placeholder="Quận/huyện"
                        style={{ width: "100%" }}
                        onChange={(value) => {
                          dispatch(getWardListAction({ districtCode: value }));
                          checkoutForm.setFieldsValue({
                            districtCode: districtList.data.find(
                              (item) => item.code === value
                            ).name,
                            wardCode: undefined,
                          });
                        }}
                      >
                        {renderDistrictList}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name="wardCode"
                      label="Xã"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn xã/phường!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Phường/xã"
                        style={{ width: "100%" }}
                        disabled={!checkoutForm.getFieldValue("districtCode")}
                        onChange={(value) => {
                          checkoutForm.setFieldsValue({
                            wardCode: wardList.data.find(
                              (item) => item.code === value
                            ).name,
                          });
                        }}
                      >
                        {renderWardList}
                      </Select>
                    </Form.Item>
                    <TextArea placeholder="Ghi chú"></TextArea>
                  </Col>
                  <Col md={12} xs={24} className="transportPayment">
                    <Row
                      style={{ width: "100%", marginBottom: 20 }}
                      className="transport"
                    >
                      <Form.Item
                        style={{ width: "100%", marginBottom: 0 }}
                        label="Vận chuyển"
                        name="transport"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng chọn phí ship!",
                          },
                        ]}
                      >
                        <Radio.Group
                          className="shipProduct"
                          onChange={(e) => setTransport(e.target.value)}
                        >
                          <Col
                            span={24}
                            style={{
                              borderBottom:
                                "solid 1px var(--primaryBorderColor)",
                              padding: 10,
                            }}
                          >
                            <Radio value="30000" className="shipOptionRadio">
                              <span>GIAO HÀNG</span>
                              {checkoutForm.getFieldValue("cityCode") && (
                                <span>30.000₫</span>
                              )}
                            </Radio>
                          </Col>
                          <Col span={24} style={{ padding: 10 }}>
                            <Radio
                              disabled={totalPrice < 1000000}
                              value="0"
                              className="shipOptionRadio"
                            >
                              <span>FREE SHIP</span>
                              <span>Miễn phí</span>
                            </Radio>
                          </Col>
                        </Radio.Group>
                      </Form.Item>
                      {totalPrice > 1000000 && (
                        <i>(Đơn hàng trên 1000 000₫ có thể áp dụng freeship)</i>
                      )}
                    </Row>
                    <Row style={{ width: "100%" }} className="payment">
                      <h3>Thanh toán</h3>
                      <Form.Item
                        name="method"
                        style={{ width: "100%" }}
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng chọn hình thức thanh toán!",
                          },
                        ]}
                      >
                        <Radio.Group className="paymentProduct">
                          <Col
                            span={24}
                            style={{
                              borderBottom:
                                "solid 1px var(--primaryBorderColor)",
                              padding: 10,
                            }}
                          >
                            <Radio value="cod" className="paymentOptionRadio">
                              Thanh toán khi nhận hàng (COD)
                              <i class="fa-regular fa-money-bill-1"></i>
                            </Radio>
                          </Col>
                          <Col span={24} style={{ padding: 10 }}>
                            <Radio value="atm" className="paymentOptionRadio">
                              Thanh toán online qua thẻ ATM
                              <i class="fa-regular fa-credit-card"></i>
                            </Radio>
                          </Col>
                        </Radio.Group>
                      </Form.Item>
                      <Form.Item
                        style={{ width: "100%" }}
                        noStyle
                        shouldUpdate={(prevValues, currentValues) =>
                          prevValues.method !== currentValues.method
                        }
                      >
                        {({ getFieldValue }) =>
                          getFieldValue("method") === "atm" && (
                            <Form.Item name="bank" style={{ width: "100%" }}>
                              <Radio.Group
                                style={{ width: "100%" }}
                                buttonStyle="solid"
                                className="bankRadioGroup"
                              >
                                <Row style={{ width: "100%" }}>
                                  <Col span={8}>
                                    <Radio.Button
                                      className="radioBank"
                                      value="vietcombank"
                                      style={{
                                        backgroundImage:
                                          "url(https://nganhangaz.com/wp-content/uploads/2022/01/vietcombank-logo.png)",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                      }}
                                    ></Radio.Button>
                                  </Col>
                                  <Col span={8}>
                                    <Radio.Button
                                      className="radioBank"
                                      value="vietinbank"
                                      style={{
                                        backgroundImage:
                                          "url(https://img.timviec.com.vn/2020/12/ngan-hang-vietinbank-2.jpg)",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                      }}
                                    ></Radio.Button>
                                  </Col>
                                  <Col span={8}>
                                    <Radio.Button
                                      className="radioBank"
                                      style={{
                                        backgroundImage:
                                          "url(https://bankcredit.vn/wp-content/uploads/2022/09/hinh-2222-1.jpg",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundColor: "#fff",
                                      }}
                                      value="agribank"
                                    ></Radio.Button>
                                  </Col>
                                </Row>
                                <Row style={{ width: "100%" }}>
                                  <Col span={8}>
                                    <Radio.Button
                                      className="radioBank"
                                      style={{
                                        backgroundImage:
                                          "url(https://1000logos.net/wp-content/uploads/2020/10/BIDV-Logo-2003.jpg",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundColor: "#fff",
                                      }}
                                      value="BIDV"
                                    ></Radio.Button>
                                  </Col>
                                  <Col span={8}>
                                    <Radio.Button
                                      className="radioBank"
                                      style={{
                                        backgroundImage:
                                          "url(https://brademar.com/wp-content/uploads/2022/09/VPBank-Logo-PNG-1.png",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundColor: "#fff",
                                      }}
                                      value="VPbank"
                                    ></Radio.Button>
                                  </Col>
                                  <Col span={8}>
                                    <Radio.Button
                                      className="radioBank"
                                      style={{
                                        backgroundImage:
                                          "url(https://www.hsbc.com.vn/etc.clientlibs/dpws/clientlibs-public/clientlib-site/resources/social/logo/Square-1200x1200px.jpg",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundColor: "#fff",
                                      }}
                                      value="HSBC"
                                    ></Radio.Button>
                                  </Col>
                                </Row>
                                <Row style={{ width: "100%" }}>
                                  <Col span={8}>
                                    <Radio.Button
                                      className="radioBank"
                                      style={{
                                        backgroundImage:
                                          "url(https://tienaoplus.com/wp-content/uploads/2020/02/logo-tpbank.jpg",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundColor: "#fff",
                                      }}
                                      value="tpbank"
                                    ></Radio.Button>
                                  </Col>
                                  <Col span={8}>
                                    <Radio.Button
                                      className="radioBank"
                                      style={{
                                        backgroundImage:
                                          "url(https://inkythuatso.com/uploads/thumbnails/800/2021/09/logo-sacombank-inkythuatso-fn-10-16-42-08.jpg",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundColor: "#fff",
                                      }}
                                      value="sacombank"
                                    ></Radio.Button>
                                  </Col>
                                  <Col span={8}>
                                    <Radio.Button
                                      className="radioBank"
                                      style={{
                                        backgroundImage:
                                          "url(https://play-lh.googleusercontent.com/q5wqKXhyn4ubmHHWcqyCAcZJU1t6pmSUtzzdc8WSAEJD_ml0mu2l4Rp7XRRKuLjj2KA=w416-h235-rw",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundColor: "#fff",
                                      }}
                                      value="oceanbank"
                                    ></Radio.Button>
                                  </Col>
                                </Row>
                              </Radio.Group>
                            </Form.Item>
                          )
                        }
                      </Form.Item>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col lg={8} xs={24} className="checkoutRight">
                <h3>
                  Đơn hàng (<span>{cartList.length}</span> sản phẩm)
                </h3>
                <Row className="cartFinal">
                  {cartList.map((item) => (
                    <Row
                      style={{
                        width: "100%",
                        marginBottom: 16,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Col span={8}>
                        <div className="cartItemImg">
                          <Badge count={item.quantity}>
                            <img src={item.image} alt="" />
                          </Badge>
                        </div>
                      </Col>
                      <Col style={{ fontWeight: "bold" }} span={8}>
                        {item.name}
                      </Col>
                      <Col span={8} style={{ textAlign: "right" }}>
                        {item.price.toLocaleString("vi-VN")}₫
                      </Col>
                    </Row>
                  ))}
                </Row>
                <Row style={{ marginTop: 20 }} className="moneyTemp">
                  <Row
                    style={{ width: "100%", justifyContent: "space-between" }}
                  >
                    <span>Tạm tính</span>
                    <span>{totalPrice.toLocaleString("vi-VN")}₫</span>
                  </Row>
                  <Row
                    style={{
                      width: "100%",
                      justifyContent: "space-between",
                      paddingBottom: 10,
                      borderBottom: "solid 1px grey",
                    }}
                  >
                    <span>Phí vận chuyển</span>
                    <span>{parseInt(transport).toLocaleString("vi-VN")}₫</span>
                  </Row>
                </Row>
                <Row className="moneyFinal">
                  <Col span={24}>
                    <Row
                      style={{
                        width: "100%",
                        justifyContent: "space-between",
                        marginTop: 10,
                        marginBottom: 16,
                      }}
                    >
                      <span style={{ fontSize: 18 }}>Tổng cộng</span>
                      <span
                        style={{
                          fontSize: 18,
                          color: "#2a9dcc",
                          fontWeight: "bold",
                        }}
                      >
                        {(
                          parseInt(totalPrice) + parseInt(transport)
                        ).toLocaleString("vi-VN")}
                        ₫
                      </span>
                    </Row>
                    <Row
                      style={{
                        width: "100%",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Link to={ROUTES.USER.CART}>
                        <span
                          style={{
                            color: "#2a9dcc",
                          }}
                        >
                          <i
                            class="fa-solid fa-circle-chevron-left"
                            style={{ marginRight: 4 }}
                          ></i>
                          Quay về giỏ hàng
                        </span>
                      </Link>

                      {userInfo.data?.id ? (
                        <Link to={ROUTES.USER.CHECKOUT} className="payBtn">
                          <Button
                            className="btnOrder"
                            onClick={() => {
                              checkoutForm.submit();
                            }}
                          >
                            Đặt hàng
                          </Button>
                        </Link>
                      ) : (
                        <Alert
                          message="Bạn cần đăng nhập để đặt hàng!"
                          description={
                            <span>
                              Click
                              <Link
                                to={ROUTES.LOGIN}
                                style={{ fontWeight: "bold" }}
                              >
                                Đăng nhập
                              </Link>
                              để đăng nhập
                            </span>
                          }
                          type="error"
                        />
                      )}
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </S.FormCus>
        </S.CheckOutWrapper>
      </Container>
    </div>
  );
}

export default CheckoutPage;
