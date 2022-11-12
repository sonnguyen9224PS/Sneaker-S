import React from "react";
import { Row, Col, Button } from "antd";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

import { Container } from "../../layouts/Header/styles";
import * as S from "./styles";

function Success() {
  setTimeout(() => {
    if (window.localStorage) {
      if (!localStorage.getItem("firstLoad")) {
        localStorage["firstLoad"] = true;
        window.location.reload();
      } else localStorage.removeItem("firstLoad");
    }
  }, 1000);
  return (
    <Container>
      <S.SuccessWrapper>
        <Row style={{ width: "100%", textAlign: "center" }}>
          <Col span={24}>
            <h2>
              <i class="fa-solid fa-clipboard-check"></i>Đặt hàng thành công.
            </h2>
            <h2>Xin chân thành cảm ơn quý khách.</h2>
          </Col>
        </Row>
        <Row justify="space-between">
          <Link to={ROUTES.USER.HOME}>
            <Button>Trang chủ</Button>
          </Link>
          <Link to={ROUTES.USER.PRODUCT_LIST}>
            <Button>Tiếp tục mua sắm</Button>
          </Link>
        </Row>
      </S.SuccessWrapper>
    </Container>
  );
}

export default Success;
