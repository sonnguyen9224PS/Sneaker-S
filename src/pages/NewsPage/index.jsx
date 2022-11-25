import React, { useEffect } from "react";

import { Card, Breadcrumb, Row, Col, BackTop, Pagination } from "antd";
import { Link, generatePath } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getNewsListAction, getBestSellListAction } from "../../redux/actions";
import * as S from "./styles";
import { ROUTES } from "../../constants/routes";
import { Container } from "../../layouts/Header/styles";

function NewsPage() {
  const dispatch = useDispatch();
  const { newsList } = useSelector((state) => state.news);
  const { bestSellList } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(
      getNewsListAction({
        params: {
          page: 1,
          limit: 10,
        },
      })
    );
    dispatch(
      getBestSellListAction({
        params: {
          page: 1,
          limit: 4,
        },
      })
    );
  }, []);

  const renderNews = () => {
    return newsList.data.map((item) => {
      return (
        <Col span={12}>
          <div
            className="imgNews"
            style={{
              width: "100%",
              height: 250,
              overflow: "hidden",
              borderRadius: 10,
            }}
          >
            <Link
              to={generatePath(ROUTES.USER.NEWS_DETAIL, {
                id: `${item.title}.${item.id}`,
              })}
            >
              <img
                style={{ width: "100%", height: "100%" }}
                src={item.bannerImage}
                alt=""
              />
            </Link>
          </div>
          <p
            style={{
              marginTop: "1em",
              fontStyle: "italic",
              color: "blueviolet",
            }}
          >
            <i style={{ marginRight: 4 }} class="fa-solid fa-user-tie"></i>
            {item.author}
          </p>
          <Link
            to={generatePath(ROUTES.USER.NEWS_DETAIL, {
              id: `${item.title}.${item.id}`,
            })}
          >
            <h3 className="ttlNews">{item.title}</h3>
          </Link>
          <p
            className="content"
            dangerouslySetInnerHTML={{
              __html: item.quotation,
            }}
          ></p>
        </Col>
      );
    });
  };
  const renderNewsList = () => {
    return newsList.data.map((item) => {
      return (
        <Row
          justify="center"
          style={{ marginBottom: 16, alignItems: "center" }}
        >
          <Col span={10} className="imgNews">
            <Link
              to={generatePath(ROUTES.USER.NEWS_DETAIL, {
                id: `${item.title}.${item.id}`,
              })}
            >
              <img width="80%" src={item.bannerImage} alt="" />
            </Link>
          </Col>
          <Col span={14}>
            <Link
              to={generatePath(ROUTES.USER.NEWS_DETAIL, {
                id: `${item.title}.${item.id}`,
              })}
            >
              <h4 className="ttlNews">{item.title}</h4>
            </Link>
          </Col>
        </Row>
      );
    });
  };
  const renderBestSellProduct = () => {
    return bestSellList.data.map((item) => {
      return (
        <Row
          justify="center"
          style={{ marginBottom: 16, alignItems: "center" }}
        >
          <Col span={10} className="imgNews">
            <Link
              to={generatePath(ROUTES.USER.PRODUCT_DETAIL, {
                id: `${item.slug}.${item.id}`,
              })}
            >
              <img
                width="80%"
                src={!item.images[0]?.src ? null : item.images[0].src}
                alt=""
              />
            </Link>
          </Col>
          <Col span={14}>
            <Link
              to={generatePath(ROUTES.USER.PRODUCT_DETAIL, {
                id: `${item.slug}.${item.id}`,
              })}
            >
              <h4 className="ttlNews">{item.name}</h4>
            </Link>
            <h4>{`${item.price.toLocaleString("vi-VN")}₫`}</h4>
          </Col>
        </Row>
      );
    });
  };

  document.title = "Tin tức và bài viết";
  return (
    <>
      <BackTop />
      <Container>
        <S.NewsWrapper>
          <Breadcrumb style={{ paddingTop: 16, paddingBottom: 16 }}>
            <Breadcrumb.Item>
              <Link to={ROUTES.USER.HOME}>Trang chủ</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Danh mục tin tức</Breadcrumb.Item>
          </Breadcrumb>
          <Row gutter={[24, 24]}>
            <Col span={6}>
              <Card size="small" style={{ marginBottom: 24 }}>
                <h3>
                  <i
                    style={{ marginRight: 3 }}
                    class="fa-regular fa-newspaper"
                  ></i>
                  Danh mục tin tức và bài viết
                </h3>
                <div>{renderNewsList()}</div>
              </Card>
              <Card size="small">
                <h3>
                  <i
                    style={{ marginRight: 3 }}
                    class="fa-brands fa-shopify"
                  ></i>
                  Sản phẩm Bán chạy
                </h3>
                <div>{renderBestSellProduct()}</div>
              </Card>
            </Col>
            <Col span={18}>
              <div>
                <h2
                  style={{
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    letterSpacing: 2.2,
                  }}
                >
                  Tin tức và bài viết
                </h2>
                <Row gutter={[24, 24]}>{renderNews()}</Row>
                <Pagination
                  style={{ display: "flex", justifyContent: "center" }}
                  defaultCurrent={1}
                  total={10}
                />
              </div>
            </Col>
          </Row>
        </S.NewsWrapper>
      </Container>
    </>
  );
}

export default NewsPage;
