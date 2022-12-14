import React, { useEffect, useState, useMemo } from "react";
import {
  Button,
  Card,
  Breadcrumb,
  Radio,
  Row,
  Col,
  InputNumber,
  notification,
  Collapse,
  Form,
  Rate,
  Input,
  Space,
  BackTop,
  Tooltip,
} from "antd";
import _ from "lodash";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useParams, Link, generatePath, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import * as S from "./styles";
import { ROUTES } from "../../constants/routes";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Thumbs, Navigation } from "swiper";
import {
  getProductDetailAction,
  addToCartAction,
  getProductListAction,
  getCategoryListAction,
  unFavoriteProductAction,
  favoriteProductAction,
  postReviewAction,
  getReviewListAction,
} from "../../redux/actions";
import { Container } from "../../layouts/Header/styles";

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [reviewForm] = Form.useForm();
  const { Panel } = Collapse;
  const [optionSize, setOptionSize] = useState(42);
  const [productQuantity, setProductQuantity] = useState(1);
  const { id } = useParams();

  const productId = parseInt(id.split(".")[1]);
  const productName = id.split(".")[0];
  const editedNameProduct = productName.replaceAll("-", " ");
  const dispatch = useDispatch();
  const { productDetail } = useSelector((state) => state.product);

  const { productList } = useSelector((state) => state.product);
  const { userInfo } = useSelector((state) => state.user);
  const { reviewList } = useSelector((state) => state.review);

  const rateArr = reviewList.data.map((item) => item.rate);
  const rateAverage = _.meanBy(rateArr);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const openNotification = () => {
    notification.open({
      message: "Th??m s???n ph???m v??o gi??? h??ng th??nh c??ng.",
      icon: (
        <i style={{ color: "#82CD47" }} class="fa-solid fa-circle-check"></i>
      ),
      description: (
        <button
          style={{
            cursor: "pointer",
            background: "none",
            border: "none",
            outline: "none",
            textDecoration: "underline",
          }}
          onClick={() => {
            navigate(ROUTES.USER.CART);
          }}
        >
          Xem gi??? h??ng
        </button>
      ),
    });
  };
  const isLike = userInfo.data.id
    ? productDetail.data.favorites?.some(
        (item) => item.userId === userInfo.data.id
      )
    : false;

  const isReviewed = userInfo.data.id
    ? reviewList.data?.some((item) => item.userId === userInfo.data.id)
    : false;

  const handleToggleFavorite = () => {
    if (userInfo.data.id) {
      if (isLike) {
        const favoriteData = productDetail.data.favorites?.find(
          (item) => item.userId === userInfo.data.id
        );
        if (favoriteData) {
          dispatch(
            unFavoriteProductAction({
              id: favoriteData.id,
              productId: productDetail.data.id,
            })
          );
        }
      } else {
        notification.info({
          message: `???? th??m v??o list S???n ph???m y??u th??ch.`,
          description: (
            <button
              style={{
                cursor: "pointer",
                background: "none",
                border: "none",
                outline: "none",
                textDecoration: "underline",
              }}
              onClick={() => {
                navigate(ROUTES.USER.PROFILE, { state: { activeKey: "3" } });
              }}
            >
              Xem danh s??ch y??u th??ch
            </button>
          ),
        });
        dispatch(
          favoriteProductAction({
            userId: userInfo.data.id,
            productId: productDetail.data.id,
          })
        );
      }
    } else {
      notification.warn({ message: "B???n c???n ????ng nh???p" });
    }
  };
  const handlePostReview = (values) => {
    dispatch(
      postReviewAction({
        ...values,
        userId: userInfo.data.id,
        productId: productDetail.data.id,
      })
    );
  };
  const handlePreviewImage = (id) => {
    dispatch(getProductDetailAction({ id: id }));
  };
  useEffect(() => {
    dispatch(
      getProductDetailAction({
        id: productId,
      })
    );
    dispatch(getReviewListAction({ productId: productId }));
  }, [productId]);

  useEffect(() => {
    dispatch(
      getProductListAction({
        params: {
          page: 1,
          limit: 4,
          categoryId: productDetail.data.categoryId,
        },
      })
    );
    dispatch(getCategoryListAction());
  }, [productDetail.data.categoryId]);

  const handleAddToCart = () => {
    openNotification();
    dispatch(
      addToCartAction({
        productId: productId,
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

  const renderProductList = useMemo(() => {
    return productList.data.map((item) => {
      return (
        <Col
          xs={{ span: 24 }}
          sm={{ span: 12 }}
          md={{ span: 12 }}
          lg={{ span: 6 }}
          key={item.id}
        >
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
                <Tooltip title="Th??m v??o gi??? h??ng">
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
              {item.sale > 0 && (
                <div className="offProduct">
                  <i class="fa-solid fa-bookmark"></i>Off {item.sale} %
                </div>
              )}
              <div className="nameProduct">
                <i class="fa-solid fa-award"></i>
                {item.name}
              </div>

              <div className="productDescription">
                <span className="priceProduct">
                  <i class="fa-regular fa-money-bill-1"></i>
                  <span className="cost">
                    {item.price.toLocaleString("vi-VN")}???
                  </span>
                  <span className="salePrice">
                    {(item.price * ((100 - item.sale) / 100)).toLocaleString(
                      "vi-VN"
                    )}
                    ???
                  </span>
                </span>
              </div>
              <p className="ratingProduct">
                <span>????nh gi??:</span>
                <Rate
                  allowHalf
                  value={rateAverage}
                  disabled
                  style={{ fontSize: 12 }}
                />
              </p>
              <p className="soldProduct">
                <i class="fa-solid fa-hand-holding-dollar"></i>???? b??n:{" "}
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
  }, [productList.data]);

  const renderReviewList = useMemo(() => {
    if (!reviewList.data.length) return null;
    return reviewList.data?.map((item) => {
      return (
        <div className="itemComment">
          <Space>
            <h3>
              <i style={{ marginRight: 3 }} class="fa-regular fa-user"></i>
              {item.user.fullName}
            </h3>
            <h4>{moment(item.createdAt).fromNow()}</h4>
          </Space>
          <div>
            <Rate value={item.rate} disabled style={{ fontSize: 12 }} />
          </div>
          <div>{item.comment}</div>
        </div>
      );
    });
  }, [reviewList.data]);

  document.title = "Th??ng tin s???n ph???m";
  return (
    <>
      <BackTop />
      <S.ModalPreview>
        <S.SModal
          width="70%"
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
                style={{ width: "100%", height: "100%", margin: "auto" }}
              >
                <>
                  {!productDetail.data?.images?.length ? null : (
                    <>
                      <Swiper
                        style={{
                          "--swiper-navigation-color": "purple",
                        }}
                        loop={true}
                        spaceBetween={10}
                        navigation={true}
                        thumbs={{ swiper: thumbsSwiper }}
                        modules={[FreeMode, Navigation, Thumbs]}
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
                    </>
                  )}
                </>
              </S.PreviewSwipeWrap>
            </Col>
            <Col span={12}>
              <Card className="cardPreview" title={`Chi ti???t s???n ph???m`}>
                <div>T??n s???n ph???m:</div>
                <h3>{productDetail.data.name}</h3>
                <div>Brand:</div>
                <h3>{productDetail.data.category?.name}</h3>
                <div>S??? l?????ng:</div>
                <div>
                  <InputNumber
                    min={1}
                    value={productQuantity}
                    onChange={(value) => setProductQuantity(value)}
                  />
                </div>
                <div>Gi??:</div>
                <div style={{ fontWeight: "bold" }}>
                  {productDetail.data.price?.toLocaleString("vi-VN")}???
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
                    Th??m v??o gi???
                    <i class="fa-solid fa-cart-plus"></i>
                  </button>
                </div>
              </Card>
            </Col>
          </Row>
        </S.SModal>
      </S.ModalPreview>
      <S.DetailWrapper style={{ backgroundColor: "#f3f3f3" }}>
        <Container>
          <Row style={{ borderBottom: "solid 1px #d8cece" }}>
            <Breadcrumb
              separator=">"
              style={{ paddingTop: 16, paddingBottom: 16 }}
            >
              <Breadcrumb.Item>
                <Link to={ROUTES.USER.HOME}>Trang ch???</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to={ROUTES.USER.PRODUCT_LIST}>Collection</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link
                  to={ROUTES.USER.PRODUCT_LIST}
                  state={{ categoryId: [productDetail.data.category?.id] }}
                >
                  {productDetail.data.category?.name}
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{editedNameProduct}</Breadcrumb.Item>
            </Breadcrumb>
          </Row>
          <Row>
            <Col
              className="imgColLeft"
              xs={{ span: 24 }}
              md={{ span: 12 }}
              style={{ backgroundColor: "#fff" }}
            >
              <Row style={{ flexDirection: "column" }}>
                <Col span="12" style={{ maxWidth: "100%", minHeight: "20rem" }}>
                  {/* carousel detail product */}
                  <S.PreviewSwipeWrap
                    style={{ width: "100%", height: 400, margin: "auto" }}
                  >
                    <>
                      {!productDetail.data?.images?.length ? null : (
                        <>
                          <Swiper
                            style={{
                              "--swiper-navigation-color": "purple",
                            }}
                            loop={true}
                            spaceBetween={10}
                            navigation={true}
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[FreeMode, Thumbs, Navigation]}
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
              </Row>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <Card className="detailCard">
                <h3 className="detailTtl">{productDetail.data.name}</h3>
                <div className="iconTtlRight">
                  <i class="fa-solid fa-star-half-stroke"></i>
                  ????nh gi??:
                </div>
                <Rate allowHalf value={rateAverage} />
                <div>
                  (C?? {reviewList.data.length || 0} kh??ch h??ng ???? ????nh gi?? s???n
                  ph???m)
                </div>
                <Row>
                  <Col span={12}>
                    <div className="iconTtlRight">
                      <i class="fa-solid fa-heart-circle-plus"></i>
                      Y??u th??ch:
                    </div>
                    <Button
                      style={{
                        border: "none",
                        outline: "none",
                        boxShadow: "none",
                      }}
                      size="large"
                      danger={isLike}
                      icon={isLike ? <HeartFilled /> : <HeartOutlined />}
                      onClick={() => handleToggleFavorite()}
                    >
                      Like
                    </Button>
                    <p className="iconTtlRight">
                      <i class="fa-regular fa-thumbs-up"></i>
                      L?????t th??ch: {productDetail.data?.favorites?.length || 0}
                    </p>
                    <div
                      className="iconTtlRight"
                      style={{ fontSize: 17, paddingTop: 20 }}
                    >
                      <i class="fa-solid fa-calculator"></i>
                      S??? l?????ng:
                    </div>
                    <div className="quantity">
                      <InputNumber
                        min={1}
                        value={productQuantity}
                        onChange={(value) => setProductQuantity(value)}
                      />
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="iconTtlRight">
                      <i class="fa-regular fa-registered"></i>
                      Th????ng hi???u:
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div style={{ marginLeft: 10, fontSize: 17 }}>
                        {productDetail.data.category?.name}
                      </div>
                      <div style={{ width: 60, height: 40, paddingLeft: 10 }}>
                        <img
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                          }}
                          src={productDetail.data.category?.logo}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="iconTtlRight">
                      <i class="fa-solid fa-money-bill-1-wave"></i>
                      Gi??:
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 500 }}>
                      {productDetail.data.price?.toLocaleString("vi-VN")}???
                    </div>
                  </Col>
                </Row>
                <div className="iconTtlRight">
                  <i class="fa-solid fa-ruler-horizontal"></i>
                  Size:
                </div>
                <Radio.Group
                  style={{ marginBottom: 30 }}
                  className="radioGroup"
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
                    Th??m v??o gi???
                    <i class="fa-solid fa-cart-plus"></i>
                  </button>
                </div>
              </Card>
            </Col>
          </Row>
          <Row style={{ marginBottom: "1rem" }}>
            <Col
              xs={{ span: 24, order: 2 }}
              md={{ span: 12 }}
              style={{ maxWidth: "100%" }}
            >
              <S.CardComment
                size="small"
                bordered={false}
                title={
                  <span>
                    <i
                      style={{ marginRight: 5, color: "green" }}
                      class="fa-solid fa-comments"
                    ></i>
                    ????nh gi?? s???n ph???m
                  </span>
                }
              >
                {userInfo.data.id && !isReviewed && (
                  <Form
                    name="reviewForm"
                    form={reviewForm}
                    layout="vertical"
                    onFinish={(values) => {
                      handlePostReview(values);
                      reviewForm.resetFields();
                    }}
                  >
                    <Form.Item label="????nh gi??:" name="rate">
                      <Rate allowHalf />
                    </Form.Item>
                    <Form.Item label="B??nh lu???n" name="comment">
                      <Input.TextArea
                        style={{ borderRadius: 10 }}
                        autoSize={{ maxRows: 6, minRows: 2 }}
                      />
                    </Form.Item>
                    <Button htmlType="submit" block>
                      ????ng
                    </Button>
                  </Form>
                )}
                {renderReviewList}
              </S.CardComment>
            </Col>
            <Col xs={{ span: 24, order: 1 }} md={{ span: 12 }}>
              <div
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  textTransform: "uppercase",
                  border: "solid 3px purple",
                  borderLeft: "none",
                  borderRight: "none",
                  borderTop: "none",
                  padding: 8,
                  background: "#fff",
                  fontWeight: 500,
                }}
              >
                Th??ng tin chi ti???t
              </div>
              <Collapse>
                <Panel
                  header={
                    <span style={{ fontSize: 17 }}>
                      <i
                        style={{ color: "#ea4b67", marginRight: 3 }}
                        class="fa-solid fa-circle-info"
                      ></i>
                      Th??ng tin s???n ph???m
                    </span>
                  }
                  key="1"
                >
                  <p style={{ fontSize: 15 }}>
                    Mua gi??y <b>{productDetail.data.name}</b> Low What the Dunk
                    318403-141 ch??nh h??ng 100% c?? s???n t???i <b>Sneaker-S</b>. Giao
                    h??ng mi???n ph?? trong 1 ng??y. Cam k???t ?????n ti???n X5 n???u ph??t
                    hi???n Fake. ?????i tr??? mi???n ph?? size. FREE v??? sinh gi??y tr???n
                    ?????i.
                  </p>
                </Panel>
                <Panel
                  header={
                    <span style={{ fontSize: 17 }}>
                      <i
                        style={{ color: "#ea4b67", marginRight: 3 }}
                        class="fa-solid fa-hand-holding-hand"
                      ></i>
                      ?????i tr??? mi???n ph??"
                    </span>
                  }
                  key="2"
                >
                  <p style={{ fontSize: 15 }}>
                    Th???t kh?? ch???u n???u nh?? b???n mua m???t ????i gi??y hi???u v??? nh??ng l???i
                    kh??ng v???a size ho???c ch??? ????n gi???n l?? thay ?????i ?? th??ch c???a b???n
                    th??n v?? kh??ng ???????c ?????i tr?????? Ch??nh v?? v???y, Sneaker-S cam k???t
                    ??em ?????n cho kh??ch h??ng tr???i nghi???m mua s???m h??ng hi???u h??i
                    l??ng nh???t: qu?? kh??ch h??ng c?? th??? ?????i/ tr??? l???i s???n ph???m m???i
                    mua trong v??ng 7 ng??y k??? t??? ng??y nh???n h??ng.
                  </p>
                  <p style={{ fontSize: 15 }}>
                    <p>1. ??i???u ki???n ?????i tr???</p>- S???n ph???m ??p d???ng: T???t c??? s???n
                    ph???m ???????c giao d???ch tr??n Sneaker-S, c?? ch????ng tr??nh khuy???n
                    m??i kh??ng qu?? 30%. - S???n ph???m kh??ng ??p d???ng: ????? l??t, ????? b??i,
                    Ph??? ki???n: V???, kh??n, trang s???c, m??c kh??a, ???p l??ng, Shoecare,
                    n?????c hoa,.... Qu?? Kh??ch h??ng c???n ki???m tra t??nh tr???ng h??ng
                    h??a v?? c?? th??? ?????i h??ng/ tr??? l???i h??ng ngay t???i th???i ??i???m
                    giao/nh???n h??ng trong nh???ng tr?????ng h???p sau: - H??ng kh??ng ????ng
                    ch???ng lo???i, m???u m?? trong ????n h??ng ???? ?????t ho???c nh?? tr??n
                    website t???i th???i ??i???m ?????t h??ng. Kh??ng ????? s??? l?????ng, kh??ng ?????
                    b??? nh?? trong ????n h??ng. - T??nh tr???ng b??n ngo??i b??? ???nh h?????ng
                    nh?? r??ch bao b??, bong tr??c, b??? v?????? - Kh??ch h??ng c?? tr??ch
                    nhi???m tr??nh gi???y t??? li??n quan ch???ng minh s??? thi???u s??t tr??n
                    ????? ho??n th??nh vi???c ho??n tr???/?????i tr??? h??ng h??a. - Kh??ch h??ng
                    ?????i tr??? Size trong v??ng 3 ng??y k??? t??? ng??y nh???n ???????c gi??y. -
                    Tr?????ng h???p kh??ch h??ng mu???n ?????i sang s???n ph???m kh??c ph???i c??
                    gi?? l???n h??n ho???c b???ng gi?? s???n ph???m ???? mua( Tr?????ng h???p gi??
                    th???p h??n Jordan Vi???t Nam s??? kh??ng ho??n ti???n v?? chuy???n s???
                    ti???n ???? sang d???ng Voucher).
                    <p>
                      2. Quy ?????nh v??? th???i gian th??ng b??o v?? g???i s???n ph???m ?????i/
                      tr???
                    </p>
                    - Th???i gian th??ng b??o ?????i tr???: trong v??ng 48h k??? t??? khi nh???n
                    s???n ph???m ?????i v???i tr?????ng h???p s???n ph???m thi???u ph??? ki???n, qu??
                    t???ng ho???c b??? v???. - Th???i gian g???i chuy???n tr??? s???n ph???m: trong
                    v??ng 7 ng??y k??? t??? khi nh???n s???n ph???m. - Trong tr?????ng h???p Qu??
                    Kh??ch h??ng c?? ?? ki???n ????ng g??p/khi???u n???i li??n quan ?????n ch???t
                    l?????ng s???n ph???m. Qu?? Kh??ch h??ng vui l??ng li??n h??? ???????ng d??y
                    ch??m s??c kh??ch h??ng c???a ch??ng t??i. - M???i s???n ph???m ch??? ???????c
                    ?????i, tr??? 1 l???n.
                    <p>3. Y??u c???u v??? t??nh tr???ng h??ng h??a</p>- S???n ph???m ??? t??nh
                    tr???ng m???i, ch??a qua s??? d???ng, ch??a qua gi???t ???i/l??, kh??ng c??
                    m??i l???. - S???n ph???m c??n nguy??n nh??n m??c, h???p/bao b?? s???n ph???m
                    ??i k??m (n???u c??). - Kh??ch h??ng c?? ch???ng t??? mua h??ng ?????y ?????
                    c???a Sneaker-S. - Kh??ng ?????i/ tr??? h??ng trong tr?????ng h???p l???i do
                    ng?????i s??? d???ng. - H??ng kh??ng b??? l???i do qu?? tr??nh l??u gi???, v???n
                    chuy???n c???a ng?????i s??? d???ng. - ??p d???ng cho c??c s???n ph???m gi???m
                    gi?? kh??ng qu?? 30% v?? s???n ph???m nguy??n gi??
                    <p>4. C??ch th???c ?????i/ tr???</p>- ?????i/ tr??? tr???c ti???p: Qu?? kh??ch
                    c?? th??? mang s???n ph???m ?????n tr???c ti???p ?????a ch??? c???a h??? th???ng c???a
                    h??ng Sneaker-S ????? ?????i/ tr???.
                    <p>- ?????i/ tr??? online, t???i nh??: </p>+ B?????c 1: Qu?? kh??ch h??ng
                    li??n h??? hotline ho???c Fanpage, Zalo c???a Sneaker-S ????? y??u c???u
                    ?????i tr??? s???n ph???m + B?????c 2: Qu?? kh??ch g???i l???i s???n ph???m c???n
                    ?????i tr??? v?? Sneaker-S s??? ti???p nh???n s???n ph???m ????. + B?????c 3:
                    Sneaker-S s??? ti???n h??nh ki???m ?????nh ch???t l?????ng s???n ph???m v?? th???c
                    hi???n g???i s???n ph???m m???i v??? cho kh??ch h??ng. C??c l??u ?? khi g???i
                    ki???n h??ng th??ng qua d???ch v??? chuy???n ph??t: Sneaker-S kh??ng
                    ch???u tr??ch nhi???m v??? t??nh nguy??n v???n v?? ?????y ????? c???a h??ng h??a
                    b??n trong ki???n h??ng khi kh??ch g???i qua d???ch v??? chuy???n ph??t.
                    Kh??ch h??ng c???n ????ng g??i c???n th???n ????? ?????m b???o h??ng h??a kh??ng
                    b??? m???t m??t, th???t l???c. Kh??ch h??ng n??n ch???p ???nh s???n ph???m, g??i
                    h??ng tr?????c khi ?????i/ tr??? h??ng. Vi???c l??u tr??? h??nh ???nh s??? g??p
                    ph???n gi???i quy???t t???t h??n c??c v???n ????? ph??t sinh trong qu?? tr??nh
                    ?????i/tr??? h??ng qua d???ch v??? chuy???n ph??t.
                    <p>M???i th???c m???c xin li??n h???:</p>
                    <p>
                      T???ng ????i mua h??ng: 096 4907 954 T???ng ????i CSKH: 078 3455
                      333 Th???i gian l??m vi???c t???ng ????i CSKH: 8:30 - 17h30 (Th??? 2
                      - Th??? 7) Email: cskh@Sneaker-s.vn Website: www.Sneaker-S
                    </p>
                  </p>
                </Panel>
                <Panel
                  header={
                    <span style={{ fontSize: 17 }}>
                      <i
                        style={{ color: "#ea4b67", marginRight: 3 }}
                        class="fa-solid fa-box-open"
                      ></i>
                      Giao h??ng nhanh ch??ng
                    </span>
                  }
                  key="3"
                >
                  <p style={{ fontSize: 15 }}>
                    Giao h??ng nhanh, ch??nh x??c v?? ????ng h???n cho c??c ????n h??ng lu??n
                    l?? ti??u ch?? h??ng ?????u m?? Sneaker-S ?????t ra. Kh??ch h??ng c?? th???
                    an t??m khi ?????t ni???m tin ??? Sneaker-S, c??c s???n ph???m qu?? kh??ch
                    l???a ch???n s??? lu??n ?????n tay qu?? kh??ch v???i tr???i nghi???m tuy???t v???i
                    nh???t.
                  </p>
                  <p style={{ fontSize: 15 }}>
                    Sneaker-S ??ang l?? ?????i t??c l???n v???i c??c ????n v??? giao h??ng n???i
                    ti???ng c?? uy t??n nh?? Giao H??ng Ti???t Ki???m, Nasco v?? AhaMove
                  </p>
                  .<p>TH???I GIAN V???N CHUY???N TRUNG B??NH</p>
                  ????n h??ng n???i th??nh H?? N???i: Kh??ch h??ng s??? nh???n ???????c trong v??ng
                  24 ti???ng k??? t??? khi ???????c x??c nh???n ????n h??ng (tr??? tr?????ng h???p ????n
                  h??ng d???ng ?????t tr?????c ho???c ch??a ????? t???n kho, Sneaker-S s??? g???i ??i
                  t??? kho v???n h??nh kh??c t???nh v?? CSKH c???a Sneaker-S s??? th??ng b??o
                  cho kh??ch h??ng v??? v???n ????? n??y). Th??ng th?????ng c?? th??? s???m h??n tu???
                  thu???c v??o th???i gian kh??ch h??ng ?????t (Kh??ng t??nh ng??y l???). C??c
                  khu v???c kh??c: 3-5 ng??y (th?????ng l?? 2-3 ng??y), n???u sau 5 ng??y k???
                  t??? khi ?????t h??ng m?? Anh/Ch??? ch??a nh???n ???????c cu???c g???i giao h??ng
                  c???a b??u t?? th?? vui l??ng xin li??n h??? Sneaker-S ????? ???????c h??? tr???
                  (kh??ng bao g???m ch??? nh???t v?? ng??y l???). Trong c??c tr?????ng h???p c??
                  ph??t sinh d???ch b???nh: (Covid, SARS, ???) ho???c trong c??c tr?????ng
                  h???p b???t kh??? kh??ng t???i th???i ??i???m ph??t sinh theo quy ?????nh c???a c??
                  quan qu???n l?? nh?? n?????c v???c giao h??ng c?? th??? thay ?????i theo quy
                  ?????nh c???a c?? quan qu???n l?? nh?? n?????c ph??t sinh trong khu v???c n??y.
                  <p>
                    ????n h??ng s??? ???????c giao t???i t???n nh?? c???a kh??ch h??ng, ngo???i tr???
                    c??c tr?????ng h???p nh??: khu v???c v??n ph??ng h???n ch??? ra v??o, khu
                    v???c chung c??/ cao t???ng (ch??? ph???c v??? giao t???i ch??n t??a nh??)
                    ho???c b??n trong c??c khu v???c h???n ch??? ??i l???i (khu v???c qu??n s???,
                    bi??n gi???i, ???).
                  </p>
                  <p>
                    QUY ?????NH KI???M TRA H??NG H??A KHI GIAO NH???N H??NG Nh???m b???o v???
                    t???i ??a quy???n l???i kh??ch h??ng khi mua s???m t???i Sneaker-S, ch??ng
                    t??i c?? ch??nh s??ch ?????ng ki???m khi nh???n h??ng nh?? sau:
                  </p>
                  - Qu?? kh??ch ???????c quy???n y??u c???u nh??n vi??n giao h??ng m??? ni??m
                  phong th??ng h??ng ????? ki???m tra s??? l?????ng, m??u s???c, ch???ng lo???i,
                  k??ch c???, ngo???i quan c???a c??c s???n ph???m ???? mua tr?????c khi nh???n.
                  (L??u ??: Vi???c ?????ng ki???m ch??? ??p d???ng ki???m tra ngo???i quan, kh??ng
                  ??p d???ng cho vi???c d??ng th??? s???n ph???m v?? ki???m tra s??u chi ti???t
                  l???i c???a s???n ph???m). - Tr?????ng h???p Qu?? kh??ch kh??ng ??ng ?? v???i s???n
                  ph???m v?? ????n h??ng. Qu?? kh??ch vui l??ng li??n h??? ph??ng ch??m s??c
                  kh??ch h??ng c???a Sneaker-S ????? ???????c h??? tr??? v??? v???n ????? ho??n ti???n m??
                  kh??ng m???t b???t c??? chi ph?? n??o. - Tr?????ng h???p nh??n vi??n giao h??ng
                  t??? ch???i cho Qu?? kh??ch ki???m tra h??ng, Qu?? kh??ch c?? quy???n t???
                  ch???i nh???n h??ng, sau ???? li??n h??? ?????n ph??ng CSKH ????? Sneaker-S y??u
                  c???u nh??n vi??n ph???i giao h??ng l???i cho Qu?? kh??ch v?? ph???i cho Qu??
                  kh??ch ki???m tra h??ng. Ho???c Qu?? kh??ch c?? th??? g???i ngay l??n ph??ng
                  CSKH ????? ???????c h??? tr??? ngay l???p t???c. - Tr?????ng h???p Qu?? kh??ch h??i
                  l??ng v???i t??nh tr???ng s???n ph???m ???????c giao v?? ?????ng ?? mua s???n ph???m.
                  Qu?? kh??ch vui l??ng k?? v??o bi??n b???n ?????ng ki???m. B???ng vi???c k?? v??o
                  bi??n b???n ?????ng ki???m x??c nh???n h??i l??ng v???i t??nh tr???ng s???n ph???m
                  ???????c giao, Qu?? kh??ch x??c nh???n ???? ho??n th??nh vi???c ?????ng ki???m v??
                  ho??n t???t mua h??ng. - C??c s???n ph???m n???m trong ch????ng tr??nh ??u
                  ????i, khuy???n m??i, gi???m gi??, qu?? t???ng??? kh??ng ??p d???ng ?????i/tr???, v??
                  v???y qu?? kh??ch vui l??ng ki???m tra s???n ph???m k??? tr?????c khi nh???n
                  h??ng. Supersports s??? kh??ng ??p d???ng ?????i/ tr??? v???i c??c ????n h??ng
                  ???? ???????c x??c nh???n ?????ng ki???m b???i Qu?? kh??ch.
                  <p>QUY ?????NH PH?? GIAO H??NG</p>- Ph?? giao h??ng c???a ????n h??ng ???????c
                  t??nh d???a theo kho???ng c??ch gi???a c???a h??ng cung c???p v???i ?????a ch???
                  giao h??ng c??ng v???i tr???ng l?????ng c???a s???n ph???m. - Ph?? giao h??ng
                  c???a t???ng s???n ph???m ???????c th??? hi???n r?? ngay t???i trang s???n ph???m sau
                  khi kh??ch h??ng nh???p ?????a ch??? giao h??ng.
                  <p>
                    M???i th???c m???c xin li??n h???: T???ng ????i mua h??ng: 096 4907 954
                    T???ng ????i CSKH: 078 3455 333 Th???i gian l??m vi???c t???ng ????i
                    CSKH: 8:30 - 17h30 (Th??? 2 - Th??? 7) Email: cskh@Sneaker-s.vn
                    Website: www.Sneaker-S
                  </p>
                </Panel>
              </Collapse>
            </Col>
          </Row>
          <S.ParityProduct>
            <Row gutter={[16, 16]} style={{ justifyContent: "center" }}>
              <Col span={24}>
                <h3>
                  <i
                    style={{ color: "#ea4b67", marginRight: 3 }}
                    class="fa-solid fa-square-caret-down"
                  ></i>
                  S???n ph???m t????ng t???
                </h3>
              </Col>
            </Row>
            <Row style={{ paddingLeft: 8, paddingRight: 8 }} gutter={[16, 16]}>
              {renderProductList}
            </Row>
          </S.ParityProduct>
        </Container>
      </S.DetailWrapper>
    </>
  );
};

export default ProductDetailPage;
