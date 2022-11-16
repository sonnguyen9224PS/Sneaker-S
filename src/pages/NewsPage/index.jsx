import React from "react";
import {
  Button,
  Card,
  Breadcrumb,
  Radio,
  Row,
  Col,
  InputNumber,
  notification,
  Collapse,
  Form,
  Rate,
  Input,
  Space,
} from "antd";
import { useParams, Link, generatePath } from "react-router-dom";
import * as S from "./styles";

import { ROUTES } from "../../constants/routes";

function NewsPage() {
  return (
    <>
      <S.NewsWrapper>
        <Breadcrumb style={{ paddingTop: 16, paddingBottom: 16 }}>
          <Breadcrumb.Item>
            <Link to={ROUTES.USER.HOME}>Trang chủ</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Tin tức</Breadcrumb.Item>
        </Breadcrumb>
      </S.NewsWrapper>
      <Row>
        <Col span={6}>
          <h3>Danh mục tin tức</h3>
          <h3>Tin tức mới nhất</h3>
          <div>ss</div>
        </Col>
        <Col span={18}>
          <h2>Tin tức</h2>
          <Row>
            <Col span={12}></Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default NewsPage;
