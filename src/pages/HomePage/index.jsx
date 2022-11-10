import React, { useMemo, useEffect } from "react";
import { Carousel, Col, Row, Button, Form, Input } from "antd";

import { Link, generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "../../layouts/Header/styles";

import {
  getProductListAction,
  getCategoryListAction,
  getSaleListAction,
} from "../../redux/actions";
import * as S from "./styles";

function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);
  const { saleProductList } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(
      getProductListAction({
        params: {
          page: 1,
          limit: 8,
          new: true,
        },
      })
    );
    dispatch(getCategoryListAction());
  }, []);

  useEffect(() => {
    dispatch(
      getSaleListAction({
        params: {
          page: 1,
          limit: 8,
          sale: 30,
        },
      })
    );
    dispatch(getCategoryListAction());
  }, []);

  // render
  const renderProductListSale = useMemo(() => {
    return saleProductList.data.map((item) => {
      return (
        <Col
          span={6}
          key={item.id}
          style={{
            backgroundColor: "#efefef",
            borderRight: "solid 4px #fff",
          }}
        >
          <Link
            to={generatePath(ROUTES.USER.PRODUCT_DETAIL, {
              id: `${item.slug}.${item.id}`,
            })}
          >
            <div size="small" className="productItem">
              <div className="imageItem">
                <img
                  src="https://htmldemo.net/james/james/img/product/8.png"
                  width="100%"
                  alt=""
                />
                <div className="actionProduct">
                  <Button icon={<i class="fa-solid fa-cart-plus"></i>}></Button>
                  <Button icon={<i class="fa-regular fa-heart"></i>}></Button>
                </div>
              </div>
              <div className="offProduct">
                <i class="fa-solid fa-bookmark"></i>Off {item.sale} %
              </div>
              <div className="nameProduct">
                <i class="fa-solid fa-award"></i>
                {item.name}
              </div>

              <div className="productDescription">
                <span className="priceProduct">
                  <i
                    class="fa-solid fa-money-bill-wheat"
                    style={{ color: "#00cfff", marginRight: 3 }}
                  ></i>
                  <span className="cost">
                    {item.price.toLocaleString("vi-VN")}₫
                  </span>
                  <span className="salePrice">
                    {(item.price * ((100 - item.sale) / 100)).toLocaleString(
                      "vi-VN"
                    )}
                    ₫
                  </span>
                </span>
              </div>
              <p className="ratingProduct">
                <span>Rating</span>
                <span>Đã bán: {item.sold} </span>
              </p>
            </div>
          </Link>
        </Col>
      );
    });
  }, [saleProductList.data]);

  const renderProductListNew = useMemo(() => {
    return productList.data.map((item) => {
      return (
        <Col
          span={6}
          key={item.id}
          style={{
            backgroundColor: "#efefef",
            borderRight: "solid 4px #fff",
          }}
        >
          <Link
            to={generatePath(ROUTES.USER.PRODUCT_DETAIL, {
              id: `${item.slug}.${item.id}`,
            })}
          >
            <div size="small" className="productItem">
              <div className="imageItem">
                <img
                  src="https://htmldemo.net/james/james/img/product/2.png"
                  width="100%"
                  alt=""
                />
                <div className="actionProduct">
                  <Button icon={<i class="fa-solid fa-cart-plus"></i>}></Button>
                  <Button icon={<i class="fa-regular fa-heart"></i>}></Button>
                </div>
              </div>
              <div className="nameProduct">{item.name}</div>
              <div className="productDescription">
                <span className="priceProduct">
                  <i
                    class="fa-solid fa-money-bill-wheat"
                    style={{ color: "#00cfff", marginRight: 3 }}
                  ></i>
                  <span className="afterPrice">
                    {item.price.toLocaleString("vi-VN")}₫
                  </span>
                </span>
              </div>
              <p className="ratingProduct">
                <span>Rating</span>
                <span>Đã bán: {item.sold} </span>
              </p>
            </div>
          </Link>
        </Col>
      );
    });
  }, [productList.data]);

  return (
    <>
      <S.MainWrapper>
        <S.CarouselWrapper>
          <Carousel className="customCarousel" autoplay>
            <Link to={ROUTES.USER.PRODUCT_LIST}>
              <div className="contentCarousel">
                <img
                  src="https://theme.hstatic.net/200000384421/1000953401/14/home_slider_image_3.jpg?v=21"
                  alt=""
                  width="100%"
                />
                <div className="shoppingDiv">
                  <Link to={ROUTES.USER.PRODUCT_LIST}>Shop now</Link>
                  <Link to={ROUTES.USER.PRODUCT_LIST} state={{ new: true }}>
                    New collection
                  </Link>
                </div>
              </div>
            </Link>
            <Link to={ROUTES.USER.PRODUCT_LIST}>
              <div className="contentCarousel">
                <img
                  src="https://theme.hstatic.net/200000384421/1000953401/14/home_slider_image_1.jpg?v=21"
                  alt=""
                  width="100%"
                />
                <div className="shoppingDiv">
                  <Link to={ROUTES.USER.PRODUCT_LIST} className="shoppingBtn">
                    Shop now
                  </Link>
                  <Link>New collection</Link>
                </div>
              </div>
            </Link>
            <Link to={ROUTES.USER.PRODUCT_LIST}>
              <div className="contentCarousel">
                <img
                  src="https://theme.hstatic.net/200000384421/1000953401/14/home_slider_image_4.jpg?v=21"
                  alt=""
                  width="100%"
                />
                <div className="shoppingDiv">
                  <Link to={ROUTES.USER.PRODUCT_LIST} href="">
                    Shop now
                  </Link>
                  <Link
                    href=""
                    onClick={() =>
                      navigate(ROUTES.USER.PRODUCT_LIST, {
                        state: { new: true },
                      })
                    }
                  >
                    New collection
                  </Link>
                </div>
              </div>
            </Link>
          </Carousel>
        </S.CarouselWrapper>
        <S.OtherBrandWrapper>
          <div className="otherContent">
            <a href="">
              <img
                src="https://theme.hstatic.net/200000384421/1000931147/14/home_partner_image_1_medium.jpg?v=18"
                alt=""
              />
            </a>
          </div>
          <div className="otherContent">
            <a href="">
              <img
                src="https://theme.hstatic.net/200000384421/1000931147/14/home_partner_image_2_medium.jpg?v=18"
                alt=""
              />
            </a>
          </div>
          <div className="otherContent">
            <a href="">
              <img
                src="https://theme.hstatic.net/200000384421/1000931147/14/home_partner_image_3_medium.jpg?v=18"
                alt=""
              />
            </a>
          </div>
          <div className="otherContent">
            <a href="">
              <img
                src="https://theme.hstatic.net/200000384421/1000931147/14/home_partner_image_4_medium.jpg?v=18"
                alt=""
              />
            </a>
          </div>
          <div className="otherContent">
            <a href="">
              <img
                src="https://theme.hstatic.net/200000384421/1000931147/14/home_partner_image_6_medium.jpg?v=18"
                alt=""
              />
            </a>
          </div>
          <div className="otherContent">
            <Link to={ROUTES.USER.PRODUCT_LIST} state={{ categoryId: [11] }}>
              <img
                src="https://theme.hstatic.net/200000384421/1000931147/14/home_partner_image_7_medium.jpg?v=18"
                alt=""
              />
            </Link>
          </div>
        </S.OtherBrandWrapper>
        <Container>
          <S.SaleOffWrapper>
            <h2 className="itemTittle">Sale</h2>
            <Row gutter={[16, 16]}>{renderProductListSale}</Row>
          </S.SaleOffWrapper>
          <Row justify="center">
            <Link to={ROUTES.USER.PRODUCT_LIST} state={{ sale: 30 }}>
              <Button
                style={{ boxShadow: "none" }}
                icon={<i class="fa-solid fa-forward"></i>}
                className="moreBtn"
              >
                Xem thêm
              </Button>
            </Link>
          </Row>
          <S.ArrivalWrapper>
            <h2 className="itemTittle" style={{ color: "#000" }}>
              sản phẩm mới
            </h2>
            <Row gutter={[16, 16]}>{renderProductListNew}</Row>
          </S.ArrivalWrapper>
          <Row justify="center">
            <Link to={ROUTES.USER.PRODUCT_LIST} state={{ new: true }}>
              <Button
                style={{ boxShadow: "none" }}
                icon={<i class="fa-solid fa-forward"></i>}
                className="moreBtn"
              >
                Xem thêm
              </Button>
            </Link>
          </Row>
        </Container>
        <Row>
          <S.BannerCollection
            onClick={() => {
              navigate(ROUTES.USER.PRODUCT_LIST);
            }}
          >
            <Container className="containerBanner">
              <div className="bannerCollection">
                <div>online & in store</div>
                <div>bộ sưu tập giày thể thao</div>
                <div>mua toàn bộ giày tiết kiệm đến 70%</div>
                <div>Xem bộ sưu tập</div>
              </div>
            </Container>
          </S.BannerCollection>
        </Row>
        <S.SignificantBrand>
          <Row justify="center">
            <h2
              style={{
                fontWeight: "bold",
                fontSize: 26,
                textTransform: "uppercase",
                marginBottom: 30,
              }}
            >
              Thương hiệu nổi bật
            </h2>
          </Row>
          <Container>
            <Row gutter={[16, 16]} justify="space-evenly">
              <Link to={ROUTES.USER.PRODUCT_LIST} state={{ categoryId: [1] }}>
                <Col
                  span={4.8}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div className="brandItem">
                    <img
                      src="https://theme.hstatic.net/200000384421/1000955298/14/home_brand_image_1.jpg?v=7"
                      alt=""
                      width={206}
                    />
                  </div>
                </Col>
              </Link>
              <Link to={ROUTES.USER.PRODUCT_LIST} state={{ categoryId: [4] }}>
                <Col
                  span={4.8}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div className="brandItem">
                    <img
                      src="https://theme.hstatic.net/200000384421/1000955298/14/home_brand_image_2.jpg?v=7"
                      alt=""
                      width={206}
                    />
                  </div>
                </Col>
              </Link>

              <Link to={ROUTES.USER.PRODUCT_LIST} state={{ categoryId: [3] }}>
                <Col
                  span={4.8}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div className="brandItem">
                    <img
                      src="https://theme.hstatic.net/200000384421/1000955298/14/home_brand_image_3.jpg?v=7"
                      alt=""
                      width={206}
                    />
                  </div>
                </Col>
              </Link>

              <Link to={ROUTES.USER.PRODUCT_LIST} state={{ categoryId: [12] }}>
                <Col
                  span={4.8}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div className="brandItem">
                    <img
                      src="https://theme.hstatic.net/200000384421/1000955298/14/home_brand_image_4.jpg?v=7"
                      alt=""
                      width={206}
                    />
                  </div>
                </Col>
              </Link>

              <Link to={ROUTES.USER.PRODUCT_LIST} state={{ categoryId: [5] }}>
                <Col
                  span={4.8}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div className="brandItem">
                    <img
                      src="https://theme.hstatic.net/200000384421/1000955298/14/home_brand_image_5.jpg?v=7"
                      alt=""
                      width={206}
                    />
                  </div>
                </Col>
              </Link>
            </Row>
          </Container>
        </S.SignificantBrand>
        <S.Blog>
          <Row justify="center">
            <Col span={24} style={{ textAlign: "center" }}>
              <h2
                style={{
                  fontWeight: "bold",
                  fontSize: 26,
                  textTransform: "uppercase",
                }}
              >
                Tin tức mới nhất
              </h2>
              <p>Cập nhật tin tức mới nhất về thời trang và sneaker!</p>
            </Col>
          </Row>
          <Container>
            <Carousel>
              <Row>
                <Col span={8}></Col>
                <Col span={8}></Col>
                <Col span={8}></Col>
              </Row>
            </Carousel>
          </Container>
        </S.Blog>
        <S.SignMail>
          <Row>
            <Col span={24}>
              <h2 className="signTtl">Đăng kí ngay để nhận tin tức</h2>
              <Form
                // form={form}
                name="signForm"
                className="formSign"
                // initialValues={{ signInput: "" }}
                // onFinish={() => form.resetFields(["signInput"])}
              >
                <Form.Item>
                  <Input
                    name="signInput"
                    className="signInput"
                    placeholder="Nhập email"
                  />
                </Form.Item>
                <Button className="signBtn" htmlType="submit">
                  <i class="fa-solid fa-paper-plane"></i>
                </Button>
              </Form>
            </Col>
          </Row>
        </S.SignMail>
      </S.MainWrapper>
    </>
  );
}

export default HomePage;
