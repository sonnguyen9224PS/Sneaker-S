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
  const renderProductListNew = useMemo(() => {
    return productList.data.map((item) => {
      return (
        <Col span={6} key={item.id} style={{ flex: 1 }}>
          <Link
            to={generatePath(ROUTES.USER.PRODUCT_DETAIL, {
              id: `${item.slug}.${item.id}`,
            })}
          >
            <Card size="small" title={item.name} className="cardItem">
              <div className="imageItem">
                <img
                  src="https://htmldemo.net/james/james/img/product/2.png"
                  width="100%"
                  alt=""
                />
              </div>
              <div>{item.price.toLocaleString("vi-VN")}</div>
            </Card>
          </Link>
        </Col>
      );
    });
  }, [productList.data]);

  const renderProductListSale = useMemo(() => {
    return saleProductList.data.map((item) => {
      return (
        <Col span={6} key={item.id} style={{ flex: 1 }}>
          <Link
            to={generatePath(ROUTES.USER.PRODUCT_DETAIL, {
              id: `${item.slug}.${item.id}`,
            })}
          >
            <Card size="small" title={item.name} className="cardItem">
              <div className="imageItem">
                <img
                  src="https://htmldemo.net/james/james/img/product/8.png"
                  width="100%"
                  alt=""
                />
              </div>
              <div>{item.price.toLocaleString("vi-VN")}</div>
            </Card>
          </Link>
        </Col>
      );
    });
  }, [saleProductList.data]);
  return (
    <>
      <S.MainWrapper>
        <S.CarouselWrapper>
          <Carousel className="customCarousel">
            <div className="contentCarousel">
              <img
                src="https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/bltf8ba968f502c8069/60de8f9c0bc1b20fa6c38f41/ee50badc39cd38f2bc88edaf5bc31de279d8d1c2.jpg"
                alt=""
                width="100%"
              />
              <div className="shoppingBtn">
                <Link to={ROUTES.USER.PRODUCT_LIST} href="">
                  Shop now
                </Link>
                <a
                  href=""
                  onClick={() =>
                    navigate(ROUTES.USER.PRODUCT_LIST, { state: { new: true } })
                  }
                >
                  New collection
                </a>
              </div>
            </div>
            <div className="contentCarousel">
              <img
                src="https://sneakernews.com/wp-content/uploads/2020/09/neymar-puma-deal-2.jpg?w=1140"
                alt=""
                width="100%"
              />
              <div className="shoppingBtn">
                <Link to={ROUTES.USER.PRODUCT_LIST} href="">
                  Shop now
                </Link>
                <a href="">New collection</a>
              </div>
            </div>
            <div className="contentCarousel">
              <img
                src="https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fwp-content%2Fblogs.dir%2F6%2Ffiles%2F2020%2F01%2Fbest-womens-sneakers-stores-japan-tokyo-osaka-atmos-pink-billys-nike-kicks-lounge-0.jpg?w=960&cbr=1&q=90&fit=max"
                alt=""
                width="100%"
              />
              <div className="shoppingBtn">
                <Link to={ROUTES.USER.PRODUCT_LIST} href="">
                  Shop now
                </Link>
                <a href="">New collection</a>
              </div>
            </div>
            <div className="contentCarousel">
              <img
                src="https://file.hstatic.net/200000384421/file/g1_99640ebeb55744649422c6668d3d2396_1024x1024.png"
                alt=""
                width="100%"
              />
              <div className="shoppingBtn">
                <Link to={ROUTES.USER.PRODUCT_LIST} href="">
                  Shop now
                </Link>
                <a href="">New collection</a>
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
            <h2 className="saleTitle">Sale </h2>
            <Row gutter={[16, 16]}>{renderProductListSale}</Row>
          </S.SaleOffWrapper>
          <Button
            className="moreBtn"
            onClick={() =>
              navigate(ROUTES.USER.PRODUCT_LIST, {
                state: { sale: 30 },
              })
            }
          >
            More Sale Shoes
            <RightOutlined />
            <RightOutlined />
          </Button>
          <S.ArrivalWrapper>
            <h2 className="newTitle">new arrival shoes </h2>
            <Row gutter={[16, 16]}>{renderProductListNew}</Row>
          </S.ArrivalWrapper>
          <Button
            className="moreBtn"
            onClick={() =>
              navigate(ROUTES.USER.PRODUCT_LIST, { state: { new: true } })
            }
          >
            More Arrival Shoes
            <RightOutlined />
            <RightOutlined />
          </Button>
        </Container>
      </S.MainWrapper>
    </>
  );
}

export default HomePage;
