import React, { useMemo, useEffect, useState } from "react";
import { Col, Row, Button, Tooltip, Modal } from "antd";

import { Link, generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useSelector, useDispatch } from "react-redux";

import {
  getProductListAction,
  getCategoryListAction,
  getSaleListAction,
  getProductDetailAction,
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
  const { productList } = useSelector((state) => state.product);
  const { saleProductList } = useSelector((state) => state.product);
  const { productDetail } = useSelector((state) => state.product);

  const handlePreviewImage = (id) => {
    dispatch(getProductDetailAction({ id: id }));
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
          <div size="small" className="productItem">
            <div className="imageItem">
              <Link
                to={generatePath(ROUTES.USER.PRODUCT_DETAIL, {
                  id: `${item.slug}.${item.id}`,
                })}
              >
                <img
                  src="https://htmldemo.net/james/james/img/product/8.png"
                  width="100%"
                  alt=""
                />
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
                  <Button icon={<i class="fa-solid fa-cart-plus"></i>}></Button>
                </Tooltip>
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
        <S.ModalPreview>
          <Modal
            style={{ padding: 10 }}
            footer={null}
            cancelButtonProps={{ style: { display: "none" } }}
            okButtonProps={{ style: { display: "none" } }}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <S.PreviewSwipeWrap
              style={{ width: 400, height: 400, margin: "auto" }}
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
          <Container></Container>
        </S.Blog>
      </S.MainWrapper>
    </>
  );
}

export default HomePage;
