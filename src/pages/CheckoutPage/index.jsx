import React, { useEffect, useMemo } from "react";

import { Row, Col, Input, Select, Button, Form } from "antd";
import { useSelector, useDispatch } from "react-redux";

import * as S from "./styles";
import { Container } from "../../layouts/Header/styles";
import {
  getCityListAction,
  getDistrictListAction,
  getWardListAction,
} from "../../redux/actions";

function CheckoutPage() {
  const dispatch = useDispatch();
  const { TextArea } = Input;
  const [infoForm] = Form.useForm();
  const { cityList } = useSelector((state) => state.location);
  const { districtList } = useSelector((state) => state.location);
  const { wardList } = useSelector((state) => state.location);

  useEffect(() => {
    dispatch(getCityListAction({}));
  }, []);

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

  return (
    <div>
      <Container>
        <S.CheckOutWrapper>
          <Row style={{ width: "100%" }}>
            <Col span={16} className="checkoutLeft">
              <Row style={{ width: "100%" }}>
                <Col span={12} className="infoCheckout">
                  <Form name="infoForm" form={infoForm}>
                    <div className="infoHead">
                      <h3 className="infoTtl">Thông tin nhận hàng</h3>
                      <h3>
                        <span>
                          <i class="fa-solid fa-user"></i>
                        </span>{" "}
                        Đăng nhập
                      </h3>
                    </div>

                    <Form.Item>
                      <Input placeholder="Email" allowClear></Input>
                    </Form.Item>
                    <Input placeholder="Họ và tên" allowClear></Input>
                    <Input placeholder="Số điện thoại" allowClear></Input>
                    <Input placeholder="Địa chỉ" allowClear></Input>
                    <Form.Item name="city">
                      <Select
                        placeholder="Tỉnh thành"
                        style={{ width: "100%" }}
                        onSearch
                        onChange={(value) => {
                          dispatch(getDistrictListAction({ cityCode: value }));
                          infoForm.setFieldsValue({
                            district: undefined,
                            ward: undefined,
                          });
                        }}
                      >
                        {renderCityList}
                      </Select>
                    </Form.Item>
                    <Form.Item name="district">
                      <Select
                        disabled={!infoForm.getFieldValue("city")}
                        placeholder="Quận/huyện"
                        style={{ width: "100%" }}
                        onChange={(value) => {
                          dispatch(
                            getWardListAction(
                              getWardListAction({ districtCode: value })
                            )
                          );
                          infoForm.setFieldsValue({ ward: undefined });
                        }}
                      >
                        {renderDistrictList}
                      </Select>
                    </Form.Item>
                    <Form.Item name="ward">
                      <Select
                        placeholder="Phường/xã"
                        style={{ width: "100%" }}
                        disabled={!infoForm.getFieldValue("district")}
                      >
                        {renderWardList}
                      </Select>
                    </Form.Item>
                    <TextArea placeholder="Ghi chú"></TextArea>
                    <Button onClick={() => infoForm.submit()}>submit</Button>
                  </Form>
                </Col>
                <Col span={12} className="transportCheckout"></Col>
              </Row>
            </Col>
            <Col span={8} className="checkoutRight"></Col>
          </Row>
        </S.CheckOutWrapper>
      </Container>
    </div>
  );
}

export default CheckoutPage;
