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
} from "antd";
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
import { FreeMode, Thumbs } from "swiper";
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
import { PRODUCT_LIST_LIMIT } from "../../constants/pagination.js";

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
  const openNotification = () => {
    notification.open({
      message: "Thêm sản phẩm vào giỏ hàng thành công.",
      icon: <i class="fa-solid fa-circle-check"></i>,
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
        <Col key={item.id} span={6}>
          <Link
            key={item.id}
            to={generatePath(ROUTES.USER.PRODUCT_DETAIL, {
              id: `${item.slug}.${item.id}`,
            })}
          >
            <Card size="small" title={item.name}>
              {item.price.toLocaleString("vi-VN")}
            </Card>
          </Link>
        </Col>
      );
    });
  }, [productList.data]);

  const renderReviewList = useMemo(() => {
    if (!reviewList.data.length) return null;
    return reviewList.data?.map((item) => {
      return (
        <div>
          <Space>
            <h3>{item.user.fullName}</h3>
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

  return (
    <>
      <S.DetailWrapper>
        <Breadcrumb style={{ paddingTop: 16, paddingBottom: 16 }}>
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
        <Row>
          <Col span="12">
            <Row style={{ flexDirection: "column" }}>
              <Col span="12" style={{ maxWidth: "100%", minHeight: "20rem" }}>
                {/* carousel */}
                <S.PreviewSwipeWrap
                  style={{ width: 400, height: 400, margin: "auto" }}
                >
                  <>
                    {!productDetail.data?.images?.length ? null : (
                      <>
                        <Swiper
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
                          modules={[FreeMode, Thumbs]}
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

              <Col span="12" style={{ maxWidth: "100%" }}>
                <Card size="small" bordered={false} title="Đánh giá sản phẩm">
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
                      <Form.Item label="Rate" name="rate">
                        <Rate />
                      </Form.Item>
                      <Form.Item label="Comment" name="comment">
                        <Input.TextArea autoSize={{ maxRows: 6, minRows: 2 }} />
                      </Form.Item>
                      <Button htmlType="submit" block>
                        Đăng
                      </Button>
                    </Form>
                  )}
                  {renderReviewList}
                </Card>
              </Col>
            </Row>
          </Col>
          <Col span="12">
            <Card title={`Chi tiết sản phẩm`}>
              <h3>{productDetail.data.name}</h3>
              <Button
                style={{ border: "none", outline: "none", boxShadow: "none" }}
                size="large"
                danger={isLike}
                icon={isLike ? <HeartFilled /> : <HeartOutlined />}
                onClick={() => handleToggleFavorite()}
              >
                Like({productDetail.data?.favorites?.length || 0})
              </Button>
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
              <Collapse>
                <Panel header="Thông tin sản phẩm" key="1">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: productDetail.data?.content,
                    }}
                  />
                </Panel>
                <Panel header="Đổi trả miễn phí" key="2">
                  <p>
                    Thật khó chịu nếu như bạn mua một đôi giày hiệu về nhưng lại
                    không vừa size hoặc chỉ đơn giản là thay đổi ý thích của bản
                    thân và không được đổi trả… Chính vì vậy, Sneaker-S cam kết
                    đem đến cho khách hàng trải nghiệm mua sắm hàng hiệu hài
                    lòng nhất: quý khách hàng có thể đổi/ trả lại sản phẩm mới
                    mua trong vòng 7 ngày kể từ ngày nhận hàng.
                  </p>
                  <p>
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
                <Panel header="Giao hàng nhanh chóng" key="3">
                  <p>
                    Giao hàng nhanh, chính xác và đúng hẹn cho các đơn hàng luôn
                    là tiêu chí hàng đầu mà Sneaker-S đặt ra. Khách hàng có thể
                    an tâm khi đặt niềm tin ở Sneaker-S, các sản phẩm quí khách
                    lựa chọn sẽ luôn đến tay quý khách với trải nghiệm tuyệt vời
                    nhất.
                  </p>
                  <p>
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
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ justifyContent: "center" }}>
          <h3>Sản phẩm tương tự</h3>
          {renderProductList}
        </Row>
      </S.DetailWrapper>
    </>
  );
};

export default ProductDetailPage;
