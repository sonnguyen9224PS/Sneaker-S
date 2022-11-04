import React, { useMemo, useEffect } from "react";
import { Carousel, Col, Row, Card, Button } from "antd";

import { RightOutlined } from "@ant-design/icons";
import { Link, generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useSelector, useDispatch } from "react-redux";
import { PRODUCT_LIST_LIMIT } from "../../constants/pagination.js";
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
          limit: PRODUCT_LIST_LIMIT,
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
          limit: PRODUCT_LIST_LIMIT,
          sale: true,
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
            flex: 1,
            backgroundColor: "#efefef",
            borderRight: "solid 1px #fff",
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
              <div className="nameProduct">{item.name}</div>
              <div className="productDescription">
                <span className="priceProduct">
                  <i
                    class="fa-solid fa-money-bill-wheat"
                    style={{ color: "#00cfff", marginRight: 3 }}
                  ></i>
                  <span className="cost">
                    {item.price.toLocaleString("vi-VN")}₫
                  </span>
                  <span className="salePrice">2222</span>
                </span>

                <span>Rating</span>
              </div>
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
            flex: 1,
            backgroundColor: "#efefef",
            borderRight: "solid 1px #fff",
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
                  <span className="cost">
                    {item.price.toLocaleString("vi-VN")}₫
                  </span>
                  <span className="salePrice">2222</span>
                </span>

                <span>Rating</span>
              </div>
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
            <div className="contentCarousel">
              <img
                src="https://theme.hstatic.net/200000384421/1000953401/14/home_slider_image_1.jpg?v=21"
                alt=""
                width="100%"
              />
              <div className="shoppingDiv">
                <Link className="shoppingBtn" to={ROUTES.USER.PRODUCT_LIST}>
                  Shop now
                </Link>
                <Link>New collection</Link>
              </div>
            </div>
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
                    navigate(ROUTES.USER.PRODUCT_LIST, { state: { new: true } })
                  }
                >
                  New collection
                </Link>
              </div>
            </div>

            <div className="contentCarousel">
              <img
                src="https://theme.hstatic.net/200000384421/1000953401/14/home_slider_image_3.jpg?v=21"
                alt=""
                width="100%"
              />
              <div className="shoppingDiv">
                <Link to={ROUTES.USER.PRODUCT_LIST} href="">
                  Shop now
                </Link>
                <Link>New collection</Link>
              </div>
            </div>
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
            <a href="">
              <img
                src="https://theme.hstatic.net/200000384421/1000931147/14/home_partner_image_7_medium.jpg?v=18"
                alt=""
              />
            </a>
          </div>
        </S.OtherBrandWrapper>
        <Container>
          <S.SaleOffWrapper>
            <h2 className="itemTittle">Sale </h2>
            <Row gutter={[16, 16]}>{renderProductListSale}</Row>
          </S.SaleOffWrapper>
          <Row justify="center">
            <Button
              style={{ border: "none", outline: "none", boxShadow: "none" }}
              icon={<i class="fa-solid fa-forward"></i>}
              className="moreBtn"
              onClick={() =>
                navigate(ROUTES.USER.PRODUCT_LIST, {
                  state: { sale: 30 },
                })
              }
            >
              Xem thêm
            </Button>
          </Row>
          <S.ArrivalWrapper>
            <h2 className="itemTittle" style={{ color: "#000" }}>
              new arrival shoes{" "}
            </h2>
            <Row gutter={[16, 16]}>{renderProductListNew}</Row>
          </S.ArrivalWrapper>
          <Row justify="center">
            <Button
              style={{ border: "none", outline: "none", boxShadow: "none" }}
              icon={<i class="fa-solid fa-forward"></i>}
              className="moreBtn"
              onClick={() =>
                navigate(ROUTES.USER.PRODUCT_LIST, {
                  state: { sale: 30 },
                })
              }
            >
              Xem thêm
            </Button>
          </Row>
        </Container>
        <Row>
          <S.BannerCollection>
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
      </S.MainWrapper>
    </>
  );
}

export default HomePage;
