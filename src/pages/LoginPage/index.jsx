import React, { useEffect } from "react";
import { Form, Button, Input, Card, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { loginAction } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import * as S from "./styles";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginForm] = Form.useForm();
  const dispatch = useDispatch();
  const { loginData } = useSelector((state) => state.user);

  const handleLogin = (values) => {
    dispatch(
      loginAction({
        data: {
          email: values.email,
          password: values.password,
        },
        callback: {
          gotoHome: () => navigate(ROUTES.USER.HOME),
          gotoDashboard: () => navigate(ROUTES.ADMIN.DASHBOARD),
        },
      })
    );
  };
  useEffect(() => {
    if (loginData.error) {
      loginForm.setFields([
        {
          name: "email",
          errors: [""],
        },
        {
          name: "password",
          errors: [loginData.error],
        },
      ]);
    }
  }, [loginData.error]);

  document.title = "Đăng nhập";
  return (
    <S.MainWrapper>
      <div
        style={{
          margin: "auto",
          width: "30rem",
          zIndex: 1,
        }}
      >
        <h2
          style={{
            color: "#fff",
            textShadow: `3px 0px 7px rgba(81,67,21,0.8), -3px 0px 7px rgba(81,67,21,0.8), 0px 4px 7px rgba(81,67,21,0.8)`,
            textAlign: "center",
            marginTop: 20,
          }}
        >
          ĐĂNG NHẬP TÀI KHOẢN
        </h2>
        <div>
          <Card
            style={{ borderRadius: 20 }}
            title={
              <span>
                KHÁCH HÀNG ĐĂNG NHẬP
                <i
                  style={{ marginLeft: 3, color: "goldenrod" }}
                  class="fa-solid fa-lock"
                ></i>
              </span>
            }
          >
            <Form
              form={loginForm}
              name="loginForm"
              layout="vertical"
              onFinish={(values) => handleLogin(values)}
            >
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Email!",
                  },
                  {
                    type: "email",
                    message: "Email không hợp lệ!",
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
                ]}
              >
                <Input.Password allowClear />
              </Form.Item>
              <Form.Item noStyle>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {loginData.loading ? (
                    <Spin tip="Loading...">
                      <Button type="primary" htmlType="submit" block>
                        Đăng nhập
                        <i
                          style={{ marginLeft: 3 }}
                          class="fa-solid fa-jet-fighter-up"
                        ></i>
                      </Button>
                    </Spin>
                  ) : (
                    <Button type="primary" htmlType="submit" block>
                      Đăng nhập
                      <i
                        style={{ marginLeft: 3 }}
                        class="fa-solid fa-jet-fighter-up"
                      ></i>
                    </Button>
                  )}
                </div>
              </Form.Item>
            </Form>
          </Card>
        </div>
        <p
          style={{
            marginTop: "1rem",
            color: "#fff",
            textShadow: `3px 0px 7px rgba(81,67,21,0.8), -3px 0px 7px rgba(81,67,21,0.8), 0px 4px 7px rgba(81,67,21,0.8)`,
          }}
        >
          Nếu chưa có tài khoản, click vào{" "}
          <Link to={ROUTES.REGISTER}>
            <span style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>
              ĐĂNG KÝ
            </span>
          </Link>{" "}
          để đăng ký
        </p>
      </div>
    </S.MainWrapper>
  );
};

export default LoginPage;
