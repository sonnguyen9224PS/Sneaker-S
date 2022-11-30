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
import { useParams, Link, generatePath } from "react-router-dom";

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
      message: "Thêm sản phẩm vào giỏ hàng thành công.",
      icon: (
        <i style={{ color: "#82CD47" }} class="fa-solid fa-circle-check"></i>
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
              // productId: productDetail.data.id,
            })
          );
        }
      } else {
        notification.info({
          message: `Đã thêm vào list Sản phẩm yêu thích.`,
        });
        dispatch(
          favoriteProductAction({
            userId: userInfo.data.id,
            productId: productDetail.data.id,
          })
        );
      }
    } else {
      notification.warn({ message: "Bạn cần đăng nhập" });
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
                <span>Đánh giá:</span>
                <Rate
                  allowHalf
                  value={rateAverage}
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

  document.title = "Thông tin sản phẩm";
  return (
    <>
      <BackTop />
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
      <S.DetailWrapper style={{ backgroundColor: "#f3f3f3" }}>
        <Container>
          <Row style={{ borderBottom: "solid 1px #d8cece" }}>
            <Breadcrumb
              separator=">"
              style={{ paddingTop: 16, paddingBottom: 16 }}
            >
              <Breadcrumb.Item>
                <Link to={ROUTES.USER.HOME}>Trang chủ</Link>
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
                  Đánh giá:
                </div>
                <Rate allowHalf value={rateAverage} />
                <div>
                  (Có {reviewList.data.length || 0} khách hàng đã đánh giá sản
                  phẩm)
                </div>
                <Row>
                  <Col span={12}>
                    <div className="iconTtlRight">
                      <i class="fa-solid fa-heart-circle-plus"></i>
                      Yêu thích:
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
                      Lượt thích: {productDetail.data?.favorites?.length || 0}
                    </p>
                    <div
                      className="iconTtlRight"
                      style={{ fontSize: 17, paddingTop: 20 }}
                    >
                      <i class="fa-solid fa-calculator"></i>
                      Số lượng:
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
                      Thương hiệu:
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
                      Giá:
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 500 }}>
                      {productDetail.data.price?.toLocaleString("vi-VN")}₫
                    </div>
                  </Col>
                </Row>
                <div className="iconTtlRight">
                  <i class="fa-solid fa-ruler-horizontal"></i>
                  Size:
                </div>
                <Radio.Group
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
                    Thêm vào giỏ
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
                    Đánh giá sản phẩm
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
                    <Form.Item label="Đánh giá:" name="rate">
                      <Rate allowHalf />
                    </Form.Item>
                    <Form.Item label="Bình luận" name="comment">
                      <Input.TextArea
                        style={{ borderRadius: 10 }}
                        autoSize={{ maxRows: 6, minRows: 2 }}
                      />
                    </Form.Item>
                    <Button htmlType="submit" block>
                      Đăng
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
                Thông tin chi tiết
              </div>
              <Collapse>
                <Panel
                  header={
                    <span style={{ fontSize: 17 }}>
                      <i
                        style={{ color: "#ea4b67", marginRight: 3 }}
                        class="fa-solid fa-circle-info"
                      ></i>
                      Thông tin sản phẩm
                    </span>
                  }
                  key="1"
                >
                  <p style={{ fontSize: 15 }}>
                    Mua giày <b>{productDetail.data.name}</b> Low What the Dunk
                    318403-141 chính hãng 100% có sẵn tại <b>Sneaker-S</b>. Giao
                    hàng miễn phí trong 1 ngày. Cam kết đền tiền X5 nếu phát
                    hiện Fake. Đổi trả miễn phí size. FREE vệ sinh giày trọn
                    đời.
                  </p>
                </Panel>
                <Panel
                  header={
                    <span style={{ fontSize: 17 }}>
                      <i
                        style={{ color: "#ea4b67", marginRight: 3 }}
                        class="fa-solid fa-hand-holding-hand"
                      ></i>
                      Đổi trả miễn phí"
                    </span>
                  }
                  key="2"
                >
                  <p style={{ fontSize: 15 }}>
                    Thật khó chịu nếu như bạn mua một đôi giày hiệu về nhưng lại
                    không vừa size hoặc chỉ đơn giản là thay đổi ý thích của bản
                    thân và không được đổi trả… Chính vì vậy, Sneaker-S cam kết
                    đem đến cho khách hàng trải nghiệm mua sắm hàng hiệu hài
                    lòng nhất: quý khách hàng có thể đổi/ trả lại sản phẩm mới
                    mua trong vòng 7 ngày kể từ ngày nhận hàng.
                  </p>
                  <p style={{ fontSize: 15 }}>
                    <p>1. Điều kiện đổi trả</p>- Sản phẩm áp dụng: Tất cả sản
                    phẩm được giao dịch trên Sneaker-S, có chương trình khuyến
                    mãi không quá 30%. - Sản phẩm không áp dụng: Đồ lót, đồ bơi,
                    Phụ kiện: Vớ, khăn, trang sức, móc khóa, ốp lưng, Shoecare,
                    nước hoa,.... Quý Khách hàng cần kiểm tra tình trạng hàng
                    hóa và có thể đổi hàng/ trả lại hàng ngay tại thời điểm
                    giao/nhận hàng trong những trường hợp sau: - Hàng không đúng
                    chủng loại, mẫu mã trong đơn hàng đã đặt hoặc như trên
                    website tại thời điểm đặt hàng. Không đủ số lượng, không đủ
                    bộ như trong đơn hàng. - Tình trạng bên ngoài bị ảnh hưởng
                    như rách bao bì, bong tróc, bể vỡ… - Khách hàng có trách
                    nhiệm trình giấy tờ liên quan chứng minh sự thiếu sót trên
                    để hoàn thành việc hoàn trả/đổi trả hàng hóa. - Khách hàng
                    đổi trả Size trong vòng 3 ngày kể từ ngày nhận được giày. -
                    Trường hợp khách hàng muốn đổi sang sản phẩm khác phải có
                    giá lớn hơn hoặc bằng giá sản phẩm đã mua( Trường hợp giá
                    thấp hơn Jordan Việt Nam sẽ không hoàn tiền và chuyển số
                    tiền đó sang dạng Voucher).
                    <p>
                      2. Quy định về thời gian thông báo và gửi sản phẩm đổi/
                      trả
                    </p>
                    - Thời gian thông báo đổi trả: trong vòng 48h kể từ khi nhận
                    sản phẩm đối với trường hợp sản phẩm thiếu phụ kiện, quà
                    tặng hoặc bể vỡ. - Thời gian gửi chuyển trả sản phẩm: trong
                    vòng 7 ngày kể từ khi nhận sản phẩm. - Trong trường hợp Quý
                    Khách hàng có ý kiến đóng góp/khiếu nại liên quan đến chất
                    lượng sản phẩm. Quý Khách hàng vui lòng liên hệ đường dây
                    chăm sóc khách hàng của chúng tôi. - Mỗi sản phẩm chỉ được
                    đổi, trả 1 lần.
                    <p>3. Yêu cầu về tình trạng hàng hóa</p>- Sản phẩm ở tình
                    trạng mới, chưa qua sử dụng, chưa qua giặt ủi/là, không có
                    mùi lạ. - Sản phẩm còn nguyên nhãn mác, hộp/bao bì sản phẩm
                    đi kèm (nếu có). - Khách hàng có chừng từ mua hàng đầy đủ
                    của Sneaker-S. - Không đổi/ trả hàng trong trường hợp lỗi do
                    người sử dụng. - Hàng không bị lỗi do quá trình lưu giữ, vận
                    chuyển của người sử dụng. - Áp dụng cho các sản phẩm giảm
                    giá không quá 30% và sản phẩm nguyên giá
                    <p>4. Cách thức đổi/ trả</p>- Đổi/ trả trực tiếp: Quý khách
                    có thể mang sản phẩm đến trực tiếp địa chỉ của hệ thống cửa
                    hàng Sneaker-S để đổi/ trả.
                    <p>- Đổi/ trả online, tại nhà: </p>+ Bước 1: Quý khách hàng
                    liên hệ hotline hoặc Fanpage, Zalo của Sneaker-S để yêu cầu
                    đổi trả sản phẩm + Bước 2: Quý khách gửi lại sản phẩm cần
                    đổi trả và Sneaker-S sẽ tiếp nhận sản phẩm đó. + Bước 3:
                    Sneaker-S sẽ tiến hành kiểm định chất lượng sản phẩm và thực
                    hiện gửi sản phẩm mới về cho khách hàng. Các lưu ý khi gửi
                    kiện hàng thông qua dịch vụ chuyển phát: Sneaker-S không
                    chịu trách nhiệm về tính nguyên vẹn và đầy đủ của hàng hóa
                    bên trong kiện hàng khi khách gửi qua dịch vụ chuyển phát.
                    Khách hàng cần đóng gói cẩn thận để đảm bảo hàng hóa không
                    bị mất mát, thất lạc. Khách hàng nên chụp ảnh sản phẩm, gói
                    hàng trước khi đổi/ trả hàng. Việc lưu trữ hình ảnh sẽ góp
                    phần giải quyết tốt hơn các vấn đề phát sinh trong quá trình
                    đổi/trả hàng qua dịch vụ chuyển phát.
                    <p>Mọi thắc mắc xin liên hệ:</p>
                    <p>
                      Tổng đài mua hàng: 096 4907 954 Tổng đài CSKH: 078 3455
                      333 Thời gian làm việc tổng đài CSKH: 8:30 - 17h30 (Thứ 2
                      - Thứ 7) Email: cskh@Sneaker-s.vn Website: www.Sneaker-S
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
                      Giao hàng nhanh chóng
                    </span>
                  }
                  key="3"
                >
                  <p style={{ fontSize: 15 }}>
                    Giao hàng nhanh, chính xác và đúng hẹn cho các đơn hàng luôn
                    là tiêu chí hàng đầu mà Sneaker-S đặt ra. Khách hàng có thể
                    an tâm khi đặt niềm tin ở Sneaker-S, các sản phẩm quí khách
                    lựa chọn sẽ luôn đến tay quý khách với trải nghiệm tuyệt vời
                    nhất.
                  </p>
                  <p style={{ fontSize: 15 }}>
                    Sneaker-S đang là đối tác lớn với các đơn vị giao hàng nổi
                    tiếng có uy tín như Giao Hàng Tiết Kiệm, Nasco và AhaMove
                  </p>
                  .<p>THỜI GIAN VẬN CHUYỂN TRUNG BÌNH</p>
                  Đơn hàng nội thành Hà Nội: Khách hàng sẽ nhận được trong vòng
                  24 tiếng kể từ khi được xác nhận đơn hàng (trừ trường hợp đơn
                  hàng dạng đặt trước hoặc chưa đủ tồn kho, Sneaker-S sẽ gửi đi
                  từ kho vận hành khác tỉnh và CSKH của Sneaker-S sẽ thông báo
                  cho khách hàng về vấn đề này). Thông thường có thể sớm hơn tuỳ
                  thuộc vào thời gian khách hàng đặt (Không tính ngày lễ). Các
                  khu vực khác: 3-5 ngày (thường là 2-3 ngày), nếu sau 5 ngày kể
                  từ khi đặt hàng mà Anh/Chị chưa nhận được cuộc gọi giao hàng
                  của bưu tá thì vui lòng xin liên hệ Sneaker-S để được hỗ trợ
                  (không bao gồm chủ nhật và ngày lễ). Trong các trường hợp có
                  phát sinh dịch bệnh: (Covid, SARS, …) hoặc trong các trường
                  hợp bất khả kháng tại thời điểm phát sinh theo quy định của cơ
                  quan quản lý nhà nước vực giao hàng có thể thay đổi theo quy
                  định của cơ quan quản lý nhà nước phát sinh trong khu vực này.
                  <p>
                    Đơn hàng sẽ được giao tới tận nhà của khách hàng, ngoại trừ
                    các trường hợp như: khu vực văn phòng hạn chế ra vào, khu
                    vực chung cư/ cao tầng (chỉ phục vụ giao tại chân tòa nhà)
                    hoặc bên trong các khu vực hạn chế đi lại (khu vực quân sự,
                    biên giới, …).
                  </p>
                  <p>
                    QUY ĐỊNH KIỂM TRA HÀNG HÓA KHI GIAO NHẬN HÀNG Nhằm bảo vệ
                    tối đa quyền lợi khách hàng khi mua sắm tại Sneaker-S, chúng
                    tôi có chính sách đồng kiểm khi nhận hàng như sau:
                  </p>
                  - Quý khách được quyền yêu cầu nhân viên giao hàng mở niêm
                  phong thùng hàng để kiểm tra số lượng, màu sắc, chủng loại,
                  kích cỡ, ngoại quan của các sản phẩm đã mua trước khi nhận.
                  (Lưu ý: Việc đồng kiểm chỉ áp dụng kiểm tra ngoại quan, không
                  áp dụng cho việc dùng thử sản phẩm và kiểm tra sâu chi tiết
                  lỗi của sản phẩm). - Trường hợp Quý khách không ưng ý với sản
                  phẩm và đơn hàng. Quý khách vui lòng liên hệ phòng chăm sóc
                  khách hàng của Sneaker-S để được hỗ trợ về vấn đề hoàn tiền mà
                  không mất bất cứ chi phí nào. - Trường hợp nhân viên giao hàng
                  từ chối cho Quý khách kiểm tra hàng, Quý khách có quyền từ
                  chối nhận hàng, sau đó liên hệ đến phòng CSKH để Sneaker-S yêu
                  cầu nhân viên phải giao hàng lại cho Quý khách và phải cho Quý
                  khách kiểm tra hàng. Hoặc Quý khách có thể gọi ngay lên phòng
                  CSKH để được hỗ trợ ngay lập tức. - Trường hợp Quý khách hài
                  lòng với tình trạng sản phẩm được giao và đồng ý mua sản phẩm.
                  Quý khách vui lòng ký vào biên bản đồng kiểm. Bằng việc ký vào
                  biên bản đồng kiểm xác nhận hài lòng với tình trạng sản phẩm
                  được giao, Quý khách xác nhận đã hoàn thành việc đồng kiểm và
                  hoàn tất mua hàng. - Các sản phẩm nằm trong chương trình ưu
                  đãi, khuyến mãi, giảm giá, quà tặng… không áp dụng đổi/trả, vì
                  vậy quý khách vui lòng kiểm tra sản phẩm kỹ trước khi nhận
                  hàng. Supersports sẽ không áp dụng đổi/ trả với các đơn hàng
                  đã được xác nhận đồng kiểm bởi Quý khách.
                  <p>QUY ĐỊNH PHÍ GIAO HÀNG</p>- Phí giao hàng của đơn hàng được
                  tính dựa theo khoảng cách giữa cửa hàng cung cấp với địa chỉ
                  giao hàng cùng với trọng lượng của sản phẩm. - Phí giao hàng
                  của từng sản phẩm được thể hiện rõ ngay tại trang sản phẩm sau
                  khi khách hàng nhập địa chỉ giao hàng.
                  <p>
                    Mọi thắc mắc xin liên hệ: Tổng đài mua hàng: 096 4907 954
                    Tổng đài CSKH: 078 3455 333 Thời gian làm việc tổng đài
                    CSKH: 8:30 - 17h30 (Thứ 2 - Thứ 7) Email: cskh@Sneaker-s.vn
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
                  Sản phẩm tương tự
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
