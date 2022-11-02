import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Input, Button, Form } from "antd";
import * as S from "./styles";
import { Container } from "../../layouts/Header/styles";

function Footer() {
  return (
    <>
      <S.ContactFooter>
        <Row className="contactShop">
          <Col span={12} className="contactShopLeft">
            <S.ContainerFooter>
              <h3>
                <i class="fa-solid fa-envelope"></i>
                ĐĂNG KÝ NHẬN TIN TỪ CHÚNG TÔI
              </h3>
              <p>
                Đăng ký để nhận thông tin và nhận nhiều ưu đãi từ Sneaker -S
              </p>
              <Row>
                <Form className="signMailForm">
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        type: "email",
                        message: "The input is not valid E-mail!",
                      },
                    ]}
                  >
                    <Input
                      name="signMail"
                      allowClear
                      placeholder="Nhập email của bạn..."
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button htmlType="submit">
                      <i class="fa-solid fa-paper-plane"></i>
                    </Button>
                  </Form.Item>
                </Form>
              </Row>
            </S.ContainerFooter>
          </Col>
          <Col span={12} className="contactShopRight">
            <S.ContainerFooter>
              <h3>
                <i class="fa-solid fa-link"></i>
                FOLLOW
              </h3>
              <p>
                Đăng ký và follow shop để nhận thông tin cập nhật về hàng mới,
                ưu đãi đặc biệt và thông tin giảm giá khác.
              </p>
              <Row>
                <div className="followSocial">
                  <Link
                    target="_blank"
                    to="https://www.facebook.com/"
                    style={{ color: "#10239e" }}
                  >
                    <i class="fa-brands fa-facebook"></i>
                  </Link>
                  <a href="" style={{ color: "#2f54eb" }}>
                    <i class="fa-brands fa-square-twitter"></i>
                  </a>
                  <a href="" style={{ color: "#eb2f96" }}>
                    <i class="fa-brands fa-instagram"></i>
                  </a>
                  <a href="">
                    <i class="fa-brands fa-tiktok"></i>
                  </a>
                </div>
              </Row>
            </S.ContainerFooter>
          </Col>
        </Row>
      </S.ContactFooter>
      <S.FooterWrapper>
        <Row>
          {/* <S.FooterTop> */}
          <Col span={12} style={{ backgroundColor: "black" }}>
            <S.FooterLeft>
              <Row>
                <Col span={12}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Doloribus nulla ad eum perspiciatis nihil debitis, unde quas
                  sunt ab consequatur nisi quos expedita vero, delectus quidem
                  voluptates nam odio totam!
                </Col>
                <Col span={12}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
                  quod pariatur quae fugiat tempora assumenda tempore aliquam!
                  Laboriosam dolores molestias, facilis tempora similique vero
                  quibusdam voluptas accusantium veritatis impedit? Impedit.
                </Col>
              </Row>
            </S.FooterLeft>
          </Col>
          <Col span={12} style={{ backgroundColor: "yellow" }}>
            <S.FooterRight>
              <Row>
                <Col span={12}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                  odit nulla, corrupti ipsa numquam, et aperiam optio sequi
                  accusamus, ab pariatur saepe voluptate distinctio omnis ipsum?
                  Beatae veniam voluptatem eum.
                </Col>
                <Col span={12}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repudiandae, iusto quisquam mollitia cum incidunt quibusdam
                  ullam aliquam beatae, quas placeat minima voluptate nulla
                  laudantium quis quidem fugit porro magnam voluptatum!
                </Col>
              </Row>
            </S.FooterRight>
          </Col>
          {/* </S.FooterTop> */}
        </Row>
        <Row>
          <Col span={24} style={{ backgroundColor: "green" }}>
            <S.FooterBottom>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet
              perferendis quam doloribus praesentium exercitationem beatae,
              veritatis cupiditate voluptates repudiandae. Deleniti veniam
              similique, corrupti expedita delectus obcaecati animi minima
              dignissimos natus?
            </S.FooterBottom>
          </Col>
        </Row>
      </S.FooterWrapper>
    </>
  );
}

export default Footer;
