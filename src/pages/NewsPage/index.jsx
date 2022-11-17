import React, { useEffect } from "react";

import { Card, Breadcrumb, Row, Col, BackTop, Pagination } from "antd";
import { Link, generatePath } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getNewsListAction, getBestSellListAction } from "../../redux/actions";
import * as S from "./styles";
import { ROUTES } from "../../constants/routes";

function NewsPage() {
  const dispatch = useDispatch();
  const { newsList } = useSelector((state) => state.news);
  const { bestSellList } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getNewsListAction());
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
            style={{
              width: 400,
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
            <h3>{item.title}</h3>
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
          style={{ marginBottom: 10, padding: 10, alignItems: "center" }}
        >
          <Col span={10}>
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
              <h4>{item.title}</h4>
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
          style={{ marginBottom: 10, padding: 10, alignItems: "center" }}
        >
          <Col span={10}>
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
              <h4>{item.name}</h4>
            </Link>
            <h4>{`${item.price.toLocaleString("vi-VN")}₫`}</h4>
          </Col>
        </Row>
      );
    });
  };

  return (
    <>
      <BackTop />
      <S.NewsWrapper>
        <Breadcrumb style={{ paddingTop: 16, paddingBottom: 16 }}>
          <Breadcrumb.Item>
            <Link to={ROUTES.USER.HOME}>Trang chủ</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Tin tức và bài viết</Breadcrumb.Item>
        </Breadcrumb>
        <Row>
          <Col span={6}>
            <Card>
              <h3>Danh mục tin tức và bài viết</h3>
              <div>{renderNewsList()}</div>
            </Card>
            <Card>
              <h3>Sản phẩm Bán chạy</h3>
              <div>{renderBestSellProduct()}</div>
            </Card>
          </Col>
          <Col
            span={18}
            style={{
              padding: 24,
              borderTop: "solid",
              borderLeft: "solid",
              borderColor: "#f7f7f7",
            }}
          >
            <h2 style={{ textTransform: "uppercase", fontWeight: "bold" }}>
              Tin tức và bài viết
            </h2>
            <Row>{renderNews()}</Row>
            <Pagination
              style={{ display: "flex", justifyContent: "center" }}
              defaultCurrent={1}
              total={10}
            />
          </Col>
        </Row>
      </S.NewsWrapper>
    </>
  );
}

export default NewsPage;
