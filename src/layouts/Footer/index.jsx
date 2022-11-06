import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Input, Button, Form } from "antd";
import * as S from "./styles";
import { Container } from "../../layouts/Header/styles";

function Footer() {
  return (
    <>
      <S.FooterWrapper>
        <S.ContactFooter>
          <Row className="contactShop">
            <Col span={12} className="addressShopLeft">
              <h3>
                <i class="fa-regular fa-copyright"></i>Sneaker-S
              </h3>
              <p>
                <i class="fa-solid fa-location-dot"></i>92 Quang Trung, Thạch
                Thang, Hải Châu, Đà Nẵng
              </p>
              <p>
                <i class="fa-solid fa-envelope"></i>sneaker-s@gmail.com
              </p>
              <p>
                <i class="fa-solid fa-phone"></i>038 594 1277
              </p>
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
                    <a href="" style={{ color: "#4dc5ec" }}>
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
        <S.ShopInfo>
          <Container>
            <Row className="serviceShop">
              <Col span={6} style={{ paddingTop: 30, paddingBottom: 30 }}>
                <h4 className="infoTtl">Hỗ trợ khách hàng</h4>
                <Link>
                  <p>Thông tin liên hệ</p>
                </Link>
                <Link>
                  <p>Hướng dẫn mua hàng</p>
                </Link>
                <Link>
                  <p>Phương thức thanh toán</p>
                </Link>
                <Link>
                  <p>Hỗ trợ và giải đáp thắc mắc</p>
                </Link>
              </Col>
              <Col span={6} style={{ paddingTop: 30, paddingBottom: 30 }}>
                <h4 className="infoTtl">Chính sách</h4>
                <Link>
                  <p>Chính sách giao hàng</p>
                </Link>
                <Link>
                  <p>Chính sách đổi trả</p>
                </Link>
                <Link>
                  <p>Chính sách bảo hành</p>
                </Link>
                <Link>
                  <p>Chính sách bảo mật người dùng</p>
                </Link>
              </Col>
              <Col span={6} style={{ paddingTop: 30, paddingBottom: 30 }}>
                <h4 className="infoTtl">Dịch vụ</h4>
                <Link>
                  <p>Dịch vụ ký gửi</p>
                </Link>
                <Link>
                  <p>Dịch vụ Spa và sửa giày</p>
                </Link>
              </Col>
              <Col span={6} style={{ paddingTop: 30, paddingBottom: 30 }}>
                <h4 className="infoTtl">Thông tin</h4>
                <Link>
                  <p>Về chúng tôi</p>
                </Link>
                <Link>
                  <p>Tin tức và sự kiện</p>
                </Link>
                <Link>
                  <p>Tuyển dụng</p>
                </Link>
                <Link>
                  <p>Điều khoản dịch vụ</p>
                </Link>
              </Col>
            </Row>
          </Container>
        </S.ShopInfo>
        <S.FooterPage>
          <Row>
            <Col span={24}>
              <p>Sneaker-S © 2021 Shop, Inc. All Rights Reserved</p>
            </Col>
          </Row>
        </S.FooterPage>
      </S.FooterWrapper>
    </>
  );
}

export default Footer;
