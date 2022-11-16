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
import { ROUTES } from "../../constants/routes";

function Member() {
  return (
    <div>
      <Breadcrumb style={{ paddingTop: 16, paddingBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to={ROUTES.USER.HOME}>Trang chủ</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={ROUTES.USER.PRODUCT_LIST}>Collection</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item></Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}

export default Member;
