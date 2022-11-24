import React, { useEffect } from "react";
import { Form, Button, Input, Card, Space, Row, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../../redux/actions";
import * as S from "./styles";
import { Spin } from "antd";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [registerForm] = Form.useForm();
  const dispatch = useDispatch();
  const { registerData } = useSelector((state) => state.user);

  useEffect(() => {
    if (registerData.error) {
      registerForm.setFields([
        {
          name: "fullName",
          errors: [""],
        },
        {
          name: "email",
          errors: [registerData.error],
        },
        {
          name: "phone",
          errors: [""],
        },
      ]);
    }
  }, [registerData.error]);

  const handleRegister = (values, callback) => {
    dispatch(
      registerAction({
        data: {
          fullName: values.fullName,
          email: values.email,
          password: values.password,
          role: "user",
          phone: values.phone,
          avatar: "",
        },
        callback: {
          goToLogin: () => navigate(ROUTES.LOGIN),
        },
      })
    );
  };
  document.title = "Đăng ký";
  return (
    <S.MainWrapper>
      <Row>
        <Col span={12}>
          <div
            style={{
              margin: "auto",
              width: "30rem",
              marginTop: "1rem",
            }}
          >
            <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
              ĐĂNG KÝ TÀI KHOẢN
              <i
                style={{ marginLeft: 3, color: "goldenrod" }}
                class="fa-solid fa-key"
              ></i>
            </h2>
            <div>
              <Card title="THÔNG TIN CÁ NHÂN">
                <Form
                  form={registerForm}
                  name="registerForm"
                  layout="vertical"
                  onFinish={(values) => handleRegister(values)}
                >
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
                    <Input allowClear />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      {
                        required: true,
                        message: "vui lòng nhập email!",
                      },
                      {
                        type: "email",
                        message: "Không phải là email!",
                      },
                    ]}
                  >
                    <Input allowClear />
                  </Form.Item>
                  <Form.Item
                    name="phone"
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
                    <Input allowClear />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập mật khẩu!",
                      },
                      {
                        min: 5,
                        message: "Mật khẩu phải có ít nhât 6 ký tự",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    name="confirmPassword"
                    label="Nhập lại mật khẩu"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng xác nhận lại mật khẩu!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
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
                  <Form.Item>
                    <Space
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {registerData.loading ? (
                        <Spin tip="Loading...">
                          <Button htmlType="submit">
                            Đăng ký
                            <i
                              style={{ marginLeft: 3 }}
                              class="fa-solid fa-jet-fighter-up"
                            ></i>
                          </Button>
                        </Spin>
                      ) : (
                        <Button style={{ widh: "10rem" }} htmlType="submit">
                          Đăng ký
                          <i
                            style={{ marginLeft: 3 }}
                            class="fa-solid fa-jet-fighter-up"
                          ></i>
                        </Button>
                      )}
                      <Button onClick={() => navigate(ROUTES.USER.HOME)}>
                        <i
                          style={{ marginRight: 3 }}
                          class="fa-solid fa-reply"
                        ></i>
                        Quay lại trang chủ
                      </Button>
                    </Space>
                  </Form.Item>
                </Form>
              </Card>
            </div>
            <p style={{ marginTop: "1rem" }}>
              Nếu đã có tài khoản, click vào{" "}
              <Link to={ROUTES.LOGIN}>
                <span style={{ fontSize: 18, fontWeight: "bold" }}>
                  ĐĂNG NHẬP
                </span>
              </Link>{" "}
              để đăng nhập.
            </p>
          </div>
        </Col>
        <Col span={12} className="rightSignin"></Col>
      </Row>
    </S.MainWrapper>
  );
};

export default RegisterPage;
