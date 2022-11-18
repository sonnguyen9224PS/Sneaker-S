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
      getNewsListAction({
        params: {
          page: 1,
          limit: 3,
        },
      })
    );
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
    dispatch(
      getNewListAction({
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
        <Col span={6} key={item.id}>
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
                  <i class="fa-regular fa-money-bill-1"></i>
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
                <i class="fa-regular fa-star-half-stroke"></i>
                <span>Đánh giá:</span>
                <Rate
                  value={!item.reviews[0]?.rate ? 0 : item.reviews[0].rate}
                  disabled
                  style={{ fontSize: 12 }}
                />
              </p>
              <p className="soldProduct">
                <i class="fa-solid fa-hand-holding-dollar"></i>Đã bán:{" "}
                {item.sold}{" "}
              </p>
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
        <Col span={6} key={item.id}>
          <Link
            to={generatePath(ROUTES.USER.PRODUCT_DETAIL, {
              id: `${item.slug}.${item.id}`,
            })}
          >
            <div size="small" className="productItem">
              <div className="imageWrap">
                <div className="imageItem">
                  <img
                    src={!item.images[0]?.src ? null : item.images[0].src}
                    alt=""
                  />
                </div>
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
  }, [newProductList]);
  const renderNewsSlide = () => {
    return newsList.data.map((item) => {
      return (
        <Col span={8} style={{ paddingLeft: 10, paddingRight: 10 }}>
          <div
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

  return (
    <>
      <BackTop style={{ right: 0 }} />
      <S.MainWrapper>
        <S.ModalPreview>
          <Modal
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
              <Col span={12}>
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
                          slidesPerView={4}
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
                <Card title={`Chi tiết sản phẩm`}>
                  <h3>{productDetail.data.name}</h3>
                  <p>{productDetail.data.category?.name}</p>
                  <Row>
                    <Col span={4}>
                      <span>Số lượng:</span>
                    </Col>
                    <Col span={20}>
                      <InputNumber
                        min={1}
                        value={productQuantity}
                        onChange={(value) => setProductQuantity(value)}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col span={4}>
                      <span>Giá:</span>
                    </Col>
                    <Col span={20}>
                      <p>{productDetail.data.price?.toLocaleString("vi-VN")}</p>
                    </Col>
                  </Row>

                  <Row className="sizeProduct">
                    <Col span={4}>
                      <span>Size:</span>
                    </Col>
                    <Col span={20}>
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
                    </Col>
                  </Row>
                  <Row>
                    <Button
                      style={{ borderRadius: 16 }}
                      type="primary"
                      onClick={() => handleAddToCart()}
                    >
                      Thêm vào giỏ hàng
                    </Button>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Modal>
        </S.ModalPreview>
        <S.CarouselWrapper>
          <Swiper
            className="customCarousel mySwiper"
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
          <h2 className="itemTittle saleTitle">Sale</h2>
          <Container>
            <Row gutter={[16, 16]}>{renderProductListSale}</Row>
          </Container>
        </S.SaleOffWrapper>
        <Container>
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
        </Container>
        <S.ArrivalWrapper>
          <h2 className="itemTittle newTitle" style={{ color: "#000" }}>
            sản phẩm mới
          </h2>
          <Container>
            <Row gutter={[16, 16]}>{renderProductListNew}</Row>
          </Container>
        </S.ArrivalWrapper>
        <Container>
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
                wordSpacing: 6,
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
        <S.NewsSwiper>
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
                Tin tức và bài viết mới nhất
              </h2>
              <p>Cập nhật tin tức mới nhất về thời trang và sneaker!</p>
            </Col>
          </Row>
          <Container>
            <Row style={{ width: "100%" }}>{renderNewsSlide()}</Row>
          </Container>
          <Row justify="center">
            <Link to={ROUTES.USER.NEWS}>
              <Button
                style={{ boxShadow: "none" }}
                icon={<i class="fa-solid fa-forward"></i>}
                className="moreBtn"
              >
                Xem thêm
              </Button>
            </Link>
          </Row>
        </S.NewsSwiper>
      </S.MainWrapper>
    </>
  );
}

export default HomePage;
