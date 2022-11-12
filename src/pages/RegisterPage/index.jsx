import React, { useEffect } from "react";
import { Form, Button, Input, Card, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../../redux/actions";
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
          avatar: "",
        },
        callback: {
          goToLogin: () => navigate(ROUTES.LOGIN),
        },
      })
    );
  };
  return (
    <div
      style={{
        margin: "auto",
        width: "30rem",
      }}
    >
      <h2>ĐĂNG KÝ TÀI KHOẢN</h2>
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
                  message: "Please input your full name!",
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
                  message: "Please input your email!",
                },
                {
                  type: "email",
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
                  message: "Please input your number phone!",
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
                  message: "Please input your password!",
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
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
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
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                {registerData.loading ? (
                  <Spin tip="Loading...">
                    <Button type="primary" htmlType="submit">
                      Đăng ký
                    </Button>
                  </Spin>
                ) : (
                  <Button type="primary" htmlType="submit">
                    Đăng ký
                  </Button>
                )}
                <Button onClick={() => navigate(ROUTES.USER.HOME)}>
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
          <span style={{ fontSize: 18, fontWeight: "bold" }}>ĐĂNG NHẬP</span>
        </Link>{" "}
        để đăng nhập.
      </p>
    </div>
  );
};

export default RegisterPage;
