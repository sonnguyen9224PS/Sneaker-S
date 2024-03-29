import React, { useEffect } from "react";

import { Card, Breadcrumb, Row, Col, BackTop } from "antd";
import { Link, generatePath, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  getNewsListAction,
  getBestSellListAction,
  getNewsDetailAction,
} from "../../redux/actions";
import * as S from "./styles";
import { ROUTES } from "../../constants/routes";
import { Container } from "../../layouts/Header/styles";

function NewsDetailPage() {
  const { id } = useParams();
  const productId = parseInt(id.split(".")[1]);

  const dispatch = useDispatch();
  const { newsList } = useSelector((state) => state.news);
  const { newsDetail } = useSelector((state) => state.news);

  const { bestSellList } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(
      getNewsListAction({
        params: {
          page: 1,
          limit: 4,
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
  useEffect(() => {
    dispatch(
      getNewsDetailAction({
        id: productId,
      })
    );
  }, [productId]);

  const renderNewsList = () => {
    return newsList.data.map((item) => {
      return (
        <Row
          justify="center"
          style={{ marginBottom: 16, alignItems: "center" }}
        >
          <Col span={10} className="imgItem">
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
              <h4 className="ttlItem">{item.title}</h4>
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
          <Col span={10} className="imgItem">
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
              <h4 className="ttlItem">{item.name}</h4>
            </Link>
            <h4>{`${item.price.toLocaleString("vi-VN")}₫`}</h4>
          </Col>
        </Row>
      );
    });
  };

  document.title = "Bài viết";
  return (
    <>
      <BackTop />
      <Container>
        <S.NewsWrapper>
          <Breadcrumb style={{ paddingTop: 16, paddingBottom: 16 }}>
            <Breadcrumb.Item>
              <Link to={ROUTES.USER.HOME}>Trang chủ</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={ROUTES.USER.NEWS}>Danh mục tin tức</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Tin tức</Breadcrumb.Item>
          </Breadcrumb>
          <Row gutter={[24, 24]}>
            <Col span={6}>
              <Card size="small" style={{ marginBottom: 24 }}>
                <h3>
                  <i
                    style={{ marginRight: 3 }}
                    class="fa-regular fa-newspaper"
                  ></i>
                  Danh mục tin tức
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
              <div style={{ marginBottom: 15 }}>
                <img
                  style={{ width: "100%" }}
                  src={newsDetail.data.bannerImage}
                  alt=""
                />
              </div>
              <h2>{newsDetail.data.title}</h2>
              <p>
                <i style={{ marginRight: 4 }} class="fa-solid fa-user-tie"></i>
                {newsDetail.data.author}
              </p>
              <p
                className="contentDetail"
                dangerouslySetInnerHTML={{
                  __html: newsDetail.data.content,
                }}
              ></p>
            </Col>
          </Row>
        </S.NewsWrapper>
      </Container>
    </>
  );
}

export default NewsDetailPage;
