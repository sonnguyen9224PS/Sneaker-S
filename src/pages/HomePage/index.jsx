import React, { useMemo, useEffect, useState } from "react";
import {
  Col,
  Row,
  Button,
  Tooltip,
  Modal,
  Rate,
  BackTop,
  Radio,
  notification,
  Card,
  InputNumber,
} from "antd";

import { Link, generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useSelector, useDispatch } from "react-redux";

import {
  getCategoryListAction,
  getSaleListAction,
  getProductDetailAction,
  getNewListAction,
  addToCartAction,
  getNewsListAction,
} from "../../redux/actions";
import * as S from "./styles";
import { Container } from "../../layouts/Header/styles";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper";

function HomePage() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [optionSize, setOptionSize] = useState(42);
  const [productQuantity, setProductQuantity] = useState(1);

  const openNotification = () => {
    notification.open({
      message: "Thêm sản phẩm vào giỏ hàng thành công.",
      icon: <i class="fa-solid fa-circle-check"></i>,
    });
  };

  const { saleProductList } = useSelector((state) => state.product);

  const { newProductList } = useSelector((state) => state.product);

  const { productDetail } = useSelector((state) => state.product);
  const { newsList } = useSelector((state) => state.news);

  const handlePreviewImage = (id) => {
    dispatch(getProductDetailAction({ id: id }));
  };
  const handleAddToCart = () => {
    openNotification();
    dispatch(
      addToCartAction({
        productId: productDetail.data.id,
        name: productDetail.data.name,
        price: productDetail.data.price,
        quantity: productQuantity,
        size: optionSize,
        slug: productDetail.data.slug,
        categoryName: productDetail.data?.category?.name,
        image: productDetail.data.images[0].src,
      })
    );
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(
      getSaleListAction({
        params: {
          page: 1,
          limit: 8,
          sale: true,
        },
      })
    );
    dispatch(
      getNewListAction({
        params: {
          page: 1,
          limit: 8,
          new: true,
        },
      })
    );
    dispatch(getCategoryListAction());
  }, []);

  // render
  const renderProductListSale = useMemo(() => {
    return saleProductList.data.map((item) => {
      return (
        <Col xs={{ span: 12 }} lg={{ span: 6 }} key={item.id}>
          <div className="productItem">
            <div className="imageWrap">
              <Link
                to={generatePath(ROUTES.USER.PRODUCT_DETAIL, {
                  id: `${item.slug}.${item.id}`,
                })}
              >
                <div className="imageItem">
                  <img
                    src={!item.images[0]?.src ? null : item.images[0].src}
                    width="100%"
                    alt=""
                  />
                </div>
              </Link>
              <div className="actionProduct">
                <Tooltip title="Preview">
                  <Button
                    icon={<i class="fa-solid fa-eye"></i>}
                    onClick={() => {
                      setIsModalOpen(true);
                      handlePreviewImage(item.id);
                    }}
                  ></Button>
                </Tooltip>
                <Tooltip title="Thêm vào giỏ hàng">
                  <Link
                    to={generatePath(ROUTES.USER.PRODUCT_DETAIL, {
                      id: `${item.slug}.${item.id}`,
                    })}
                  >
                    <Button
                      icon={<i class="fa-solid fa-cart-plus"></i>}
                    ></Button>
                  </Link>
                </Tooltip>
              </div>
            </div>
            <div className="contentProduct">
              <div className="offProduct">
                <i class="fa-solid fa-bookmark"></i>Off {item.sale} %
              </div>
              <div className="nameProduct">
                <i class="fa-solid fa-award"></i>
                {item.name}
              </div>

              <div className="productDescription">
                <span className="priceProduct">
                  <span className="salePrice">
                    {(item.price * ((100 - item.sale) / 100)).toLocaleString(
                      "vi-VN"
                    )}
                    ₫
                  </span>
                  <span className="cost">
                    {item.price.toLocaleString("vi-VN")}₫
                  </span>
                </span>
              </div>
              <div className="authenProduct">
                <i class="fa-solid fa-circle-check"></i>
                <span>Authenticity Guarantee</span>
              </div>
            </div>
          </div>
        </Col>
      );
    });
  }, [saleProductList.data]);

  const renderProductListNew = useMemo(() => {
    return newProductList.data.map((item) => {
      return (
        <Col xs={{ span: 12 }} lg={{ span: 6 }} key={item.id}>
          <div className="productItem">
            <div className="imageWrap">
              <Link
                to={generatePath(ROUTES.USER.PRODUCT_DETAIL, {
                  id: `${item.slug}.${item.id}`,
                })}
              >
                <div className="imageItem">
                  <img
                    src={!item?.images[0]?.src ? null : item.images[0].src}
                    width="100%"
                    alt=""
                  />
                </div>
              </Link>
              <div className="actionProduct">
                <Tooltip title="Preview">
                  <Button
                    icon={<i class="fa-solid fa-eye"></i>}
                    onClick={() => {
                      setIsModalOpen(true);
                      handlePreviewImage(item.id);
                    }}
                  ></Button>
                </Tooltip>
                <Tooltip title="Thêm vào giỏ hàng">
                  <Link
                    to={generatePath(ROUTES.USER.PRODUCT_DETAIL, {
                      id: `${item.slug}.${item.id}`,
                    })}
                  >
                    <Button
                      icon={<i class="fa-solid fa-cart-plus"></i>}
                    ></Button>
                  </Link>
                </Tooltip>
              </div>
            </div>
            <div className="contentProduct">
              <div className="nameProduct">
                <i class="fa-solid fa-award"></i>
                {item.name}
              </div>

              <div className="productDescription">
                <span className="priceProduct">
                  <i class="fa-regular fa-money-bill-1"></i>
                  <span className="cost">
                    {item.price.toLocaleString("vi-VN")}₫
                  </span>
                </span>
              </div>
              <div className="authenProduct">
                <i class="fa-solid fa-circle-check"></i>
                <span>Authenticity Guarantee</span>
              </div>
            </div>
          </div>
        </Col>
      );
    });
  }, [newProductList]);
  const renderNews = () => {
    return newsList.data.map((item) => {
      return (
        <Col
          xs={{ span: 24 }}
          md={{ span: 8 }}
          style={{ paddingLeft: 10, paddingRight: 10 }}
        >
          <div
            className="newsImage"
            style={{
              width: "100%",
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
  document.title = "Trang chủ";
  return (
    <>
      <BackTop style={{ right: 0 }} />
      <S.MainWrapper>
        <S.ModalPreview>
          <S.SModal
            width="80%"
            style={{ padding: 10 }}
            footer={null}
            cancelButtonProps={{ style: { display: "none" } }}
            okButtonProps={{ style: { display: "none" } }}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Row width="100%">
              <Col span={12} style={{ padding: "0 2px" }}>
                <S.PreviewSwipeWrap
                  style={{ width: "100%", height: 400, margin: "auto" }}
                >
                  <>
                    {!productDetail.data?.images?.length ? null : (
                      <>
                        <Swiper
                          style={{
                            "--swiper-navigation-color": "#fff",
                            "--swiper-pagination-color": "#fff",
                          }}
                          loop={true}
                          spaceBetween={10}
                          thumbs={{ swiper: thumbsSwiper }}
                          modules={[FreeMode, Thumbs]}
                          className="mySwiper2"
                        >
                          <>
                            <SwiperSlide>
                              <img src={productDetail.data.images[0].src} />
                            </SwiperSlide>
                            <SwiperSlide>
                              <img src={productDetail.data.images[1].src} />
                            </SwiperSlide>
                            <SwiperSlide>
                              <img src={productDetail.data.images[2].src} />
                            </SwiperSlide>
                          </>
                        </Swiper>
                        <Swiper
                          onSwiper={setThumbsSwiper}
                          loop={true}
                          spaceBetween={10}
                          slidesPerView={3}
                          freeMode={true}
                          watchSlidesProgress={true}
                          modules={[FreeMode, Navigation, Thumbs]}
                          className="mySwiper"
                        >
                          <SwiperSlide>
                            <img src={productDetail.data.images[0].src} />
                          </SwiperSlide>
                          <SwiperSlide>
                            <img src={productDetail.data.images[1].src} />
                          </SwiperSlide>
                          <SwiperSlide>
                            <img src={productDetail.data.images[2].src} />
                          </SwiperSlide>
                        </Swiper>
                      </>
                    )}
                  </>
                </S.PreviewSwipeWrap>
              </Col>
              <Col span={12}>
                <Card className="cardPreview" title={`Chi tiết sản phẩm`}>
                  <div>Tên sản phẩm:</div>
                  <h3>{productDetail.data.name}</h3>
                  <div>Brand:</div>
                  <h3>{productDetail.data.category?.name}</h3>
                  <div>Số lượng:</div>
                  <div>
                    <InputNumber
                      min={1}
                      value={productQuantity}
                      onChange={(value) => setProductQuantity(value)}
                    />
                  </div>
                  <div>Giá:</div>
                  <div style={{ fontWeight: "bold" }}>
                    {productDetail.data.price?.toLocaleString("vi-VN")}₫
                  </div>
                  <div>Size:</div>
                  <div span={20}>
                    <Radio.Group
                      optionType="button"
                      buttonStyle="solid"
                      value={optionSize}
                      onChange={(e) => setOptionSize(e.target.value)}
                    >
                      <Radio value={38}>38</Radio>
                      <Radio value={39}>39</Radio>
                      <Radio value={40}>40</Radio>
                      <Radio value={41}>41</Radio>
                      <Radio value={42}>42</Radio>
                      <Radio value={43}>43</Radio>
                    </Radio.Group>
                  </div>
                  <div className="buttons">
                    <button
                      className="btn-hover color-7"
                      style={{
                        borderRadius: 28,
                        padding: "4px 18px",
                        height: "2.5rem",
                        width: "14rem",
                        overflow: "hidden",
                        fontSize: 18,
                      }}
                      type="primary"
                      onClick={() => handleAddToCart()}
                    >
                      Thêm vào giỏ
                      <i class="fa-solid fa-cart-plus"></i>
                    </button>
                  </div>
                </Card>
              </Col>
            </Row>
          </S.SModal>
        </S.ModalPreview>
        <S.CarouselWrapper>
          <Swiper
            className="mySwiper"
            navigation={true}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Navigation, Autoplay]}
          >
            <SwiperSlide className="contentCarousel">
              <Link to={ROUTES.USER.PRODUCT_LIST}>
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
              </Link>
            </SwiperSlide>
            <SwiperSlide className="contentCarousel">
              <Link to={ROUTES.USER.PRODUCT_LIST}>
                <img
                  src="https://theme.hstatic.net/200000384421/1000953401/14/home_slider_image_1.jpg?v=21"
                  alt=""
                  width="100%"
                />
                <div className="shoppingDiv">
                  <Link to={ROUTES.USER.PRODUCT_LIST}>Shop now</Link>
                  <Link to={ROUTES.USER.PRODUCT_LIST} state={{ new: true }}>
                    New collection
                  </Link>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide className="contentCarousel">
              <Link to={ROUTES.USER.PRODUCT_LIST}>
                <img
                  src="https://theme.hstatic.net/200000384421/1000953401/14/home_slider_image_4.jpg?v=21"
                  alt=""
                  width="100%"
                />
                <div className="shoppingDiv">
                  <Link to={ROUTES.USER.PRODUCT_LIST}>Shop now</Link>
                  <Link to={ROUTES.USER.PRODUCT_LIST} state={{ new: true }}>
                    New collection
                  </Link>
                </div>
              </Link>
            </SwiperSlide>
          </Swiper>
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
        <S.SaleOffWrapper>
          <Link to={ROUTES.USER.PRODUCT_LIST} state={{ sale: 30 }}>
            <h2 className="itemTitle saleTitle">
              <span style={{ "--i": 1 }}>S</span>
              <span style={{ "--i": 2 }}>a</span>
              <span style={{ "--i": 3 }}>l</span>
              <span style={{ "--i": 4 }}>e</span>
            </h2>
          </Link>
          <Container className="containSale">
            <Row gutter={[16, 16]}>{renderProductListSale}</Row>
          </Container>
        </S.SaleOffWrapper>
        <Container>
          <Row justify="center">
            <Link to={ROUTES.USER.PRODUCT_LIST} state={{ sale: 30 }}>
              <Button className="moreBtn">
                Xem thêm
                <i class="fa-solid fa-angles-right iconBtn"></i>
              </Button>
            </Link>
          </Row>
        </Container>
        <S.ArrivalWrapper>
          <Link to={ROUTES.USER.PRODUCT_LIST} state={{ new: true }}>
            <div className="itemTitle newTitle">
              <h2>New Arrival</h2>
            </div>
          </Link>
          <Container className="containNew">
            <Row gutter={[16, 16]}>{renderProductListNew}</Row>
          </Container>
        </S.ArrivalWrapper>
        <Container>
          <Row justify="center">
            <Link to={ROUTES.USER.PRODUCT_LIST} state={{ new: true }}>
              <Button className="moreBtn">
                Xem thêm
                <i class="fa-solid fa-angles-right iconBtn"></i>
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
                wordSpacing: 6,
              }}
            >
              <Link to={ROUTES.USER.PRODUCT_LIST}>Thương hiệu nổi bật</Link>
            </h2>
          </Row>
          <Container>
            <Row justify="space-evenly">
              <Link to={ROUTES.USER.PRODUCT_LIST} state={{ categoryId: [1] }}>
                <Col style={{ display: "flex", alignItems: "center" }}>
                  <div className="brandItem">
                    <img
                      src="https://theme.hstatic.net/200000384421/1000955298/14/home_brand_image_1.jpg?v=7"
                      alt=""
                    />
                  </div>
                </Col>
              </Link>
              <Link to={ROUTES.USER.PRODUCT_LIST} state={{ categoryId: [4] }}>
                <Col
                  className="brandItem"
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
                  className="brandItem"
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
                  className="brandItem"
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
                  className="brandItem"
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
        <S.NewsWrapper>
          <Row justify="center">
            <Col span={24} style={{ textAlign: "center" }}>
              <h2
                style={{
                  fontWeight: "bold",
                  fontSize: 26,
                  textTransform: "uppercase",
                  wordSpacing: 6,
                }}
              >
                <Link to={ROUTES.USER.NEWS}>Tin tức và bài viết mới nhất</Link>
              </h2>
              <p style={{ fontSize: 17 }}>
                Cập nhật tin tức mới nhất về thời trang và sneaker!
              </p>
            </Col>
          </Row>
          <Container>
            <Row style={{ width: "100%" }}>{renderNews()}</Row>
          </Container>
          <Row justify="center">
            <Link to={ROUTES.USER.NEWS}>
              <Button className="moreBtn">
                Xem thêm
                <i class="fa-solid fa-angles-right iconBtn"></i>
              </Button>
            </Link>
          </Row>
        </S.NewsWrapper>
      </S.MainWrapper>
    </>
  );
}

export default HomePage;
