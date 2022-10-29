import React, { useEffect, useMemo, useState } from "react";
import { Button, Card, Breadcrumb, Radio, Row, Col, InputNumber } from "antd";
import { useParams, Link, generatePath } from "react-router-dom";
import * as S from "./styles";
import { ROUTES } from "../../constants/routes";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetailAction, addToCartAction } from "../../redux/actions";

const ProductDetailPage = () => {
  const [selectedOptionId, setSelectedOptionId] = useState("");
  const [productQuantity, setQuantity] = useState(1);
  const { id } = useParams();
  const productId = parseInt(id.split(".")[1]);
  const productName = id.split(".")[0];
  const editedNameProduct = productName.replaceAll("-", " ");
  const dispatch = useDispatch();

  const { productDetail } = useSelector((state) => state.product);
  const hasOptionData = !!productDetail.data.options?.length;
  const selectedOptionData = productDetail.data.options?.find(
    (item) => item.id === selectedOptionId
  );
  const bonusPrice = selectedOptionData ? selectedOptionData.bonusPrice : 0;
  const productPrice = (productDetail.data.price || 0) + bonusPrice;

  useEffect(() => {
    dispatch(
      getProductDetailAction({
        id: productId,
      })
    );
  }, [productId]);

  useEffect(() => {
    if (hasOptionData) {
      setSelectedOptionId(productDetail.data.options[0].id);
    }
  }, [productDetail.data]);

  const handleSelectedOption = (value) => {
    setSelectedOptionId(value);
  };

  const handleAddToCart = () => {
    dispatch(
      addToCartAction({
        productId: productId,
        name: productDetail.data.name,
        price: productPrice,
        quantity: productQuantity,
        slug: productDetail.data.slug,
      })
    );
  };

  const renderProductOption = useMemo(() => {
    return productDetail.data.options?.map((item) => {
      return (
        <Radio key={item.id} value={item.id}>
          {item.color}
        </Radio>
      );
    });
  }, [productDetail.data]);

  return (
    <>
      <S.DetailWrapper>
        <Breadcrumb style={{ paddingTop: 16, paddingBottom: 16 }}>
          <Breadcrumb.Item>
            <Link to={ROUTES.USER.HOME}>Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={ROUTES.USER.PRODUCT_LIST}>Product List</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={ROUTES.USER.PRODUCT_DETAIL}>{editedNameProduct}</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Row>
          <Col span="12"></Col>
          <Col span="12">
            <Card title={`Chi tiết sản phẩm - ${editedNameProduct}`}>
              <h3>{productDetail.data.name}</h3>
              <p>{productDetail.data.category?.name}</p>
              <p>{productPrice.toLocaleString("vi-VN")}</p>
              <div
                dangerouslySetInnerHTML={{
                  __html: productDetail.data?.content,
                }}
              />
              <Row style={{ marginBottom: 16 }}>
                {hasOptionData && (
                  <Radio.Group
                    optionType="button"
                    buttonStyle="solid"
                    value={selectedOptionId}
                    onChange={(e) => handleSelectedOption(e.target.value)}
                  >
                    {renderProductOption}
                  </Radio.Group>
                )}
              </Row>
              <Row>Size</Row>
              <Row>
                <span>Số lượng:</span>
                <InputNumber min={1} onChange={(value) => setQuantity(value)} />
              </Row>
              <Row>
                <Button type="primary" onClick={() => handleAddToCart()}>
                  Add to Cart
                </Button>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row style={{ justifyContent: "center" }}>
          <Link to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: 2 })}>
            <Button>Sản phẩm tương tự</Button>
          </Link>
        </Row>
      </S.DetailWrapper>
    </>
  );
};

export default ProductDetailPage;
