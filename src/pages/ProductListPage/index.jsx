import { useEffect, useMemo, useState } from "react";
import { Link, generatePath, useNavigate, useLocation } from "react-router-dom";
import {
  Row,
  Col,
  Checkbox,
  Radio,
  Button,
  Input,
  Card,
  Select,
  Space,
  Tag,
  Slider,
  Spin,
  Breadcrumb,
  Collapse,
  Tooltip,
  Rate,
  Modal,
  InputNumber,
  notification,
} from "antd";

import { useSelector, useDispatch } from "react-redux";
import {
  getProductListAction,
  getCategoryListAction,
  getBestSellListAction,
  getProductDetailAction,
  addToCartAction,
} from "../../redux/actions";
import { PRODUCT_LIST_LIMIT } from "../../constants/pagination.js";
import * as S from "./styles";
import {
  PRICE_MIN,
  PRICE_MAX,
  PRICE_MAX_DEFAULT,
  PRICE_MIN_DEFAULT,
  PRICE_STEP,
} from "../../constants/slider";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { ROUTES } from "../../constants/routes";
const { Panel } = Collapse;
const ProductListPage = () => {
  const [productQuantity, setProductQuantity] = useState(1);
  const [optionSize, setOptionSize] = useState(42);
  const openNotification = () => {
    notification.open({
      message: "Thêm sản phẩm vào giỏ hàng thành công.",
      icon: <i class="fa-solid fa-circle-check"></i>,
    });
  };

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { state } = useLocation();
  const navigate = useNavigate();
  const formatter = (value) => value.toLocaleString("vi-VN");
  const [filterParams, setFilterParams] = useState({
    categoryId: [],
    keyword: "",
    order: "",
    operator: [],
    new: false,
    sale: "",
  });

  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);

  const { productDetail } = useSelector((state) => state.product);

  const { bestSellList } = useSelector((state) => state.product);
  const { categoryList } = useSelector((state) => state.category);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //categoryId
  useEffect(() => {
    if (state?.categoryId?.length) {
      dispatch(
        getProductListAction({
          params: {
            page: 1,
            limit: PRODUCT_LIST_LIMIT,
            categoryId: state.categoryId,
          },
        })
      );
      setFilterParams({
        ...filterParams,
        categoryId: state?.categoryId,
      });
      window.scrollTo(0, 0);
    } else {
      dispatch(
        getProductListAction({
          params: {
            page: 1,
            limit: PRODUCT_LIST_LIMIT,
          },
        })
      );
      dispatch(getCategoryListAction());
    }
  }, [state]);

  //new
  useEffect(() => {
    if (state?.new) {
      dispatch(
        getProductListAction({
          params: {
            page: 1,
            limit: PRODUCT_LIST_LIMIT,
            new: state.new,
          },
        })
      );
      setFilterParams({
        ...filterParams,
        new: state.new,
      });
    }
    dispatch(getCategoryListAction());
  }, [state]);

  //best sell
  useEffect(() => {
    dispatch(
      getBestSellListAction({
        params: {
          page: 1,
          limit: 4,
        },
      })
    );
  }, []);

  //sale
  useEffect(() => {
    if (state?.sale) {
      setFilterParams({
        ...filterParams,
        sale: state.sale,
      });
      dispatch(
        getProductListAction({
          params: {
            page: 1,
            limit: PRODUCT_LIST_LIMIT,
            sale: state.sale,
          },
        })
      );
    }
    window.scrollTo(0, 0);
  }, [state]);

  const handleFilter = (keyword, value) => {
    setFilterParams({
      ...filterParams,
      [keyword]: value,
    });
    dispatch(
      getProductListAction({
        params: {
          page: 1,
          limit: PRODUCT_LIST_LIMIT,
          ...filterParams,
          [keyword]: value,
        },
      })
    );
  };

  const handleShowMore = () => {
    dispatch(
      getProductListAction({
        params: {
          page: productList.meta.page + 1,
          limit: PRODUCT_LIST_LIMIT,
          ...filterParams,
        },
        more: true,
      })
    );
  };

  const handleClearCategoryFilter = (id) => {
    const clearCategoryId = filterParams.categoryId.filter(
      (item) => item !== id
    );
    setFilterParams({
      ...filterParams,
      categoryId: clearCategoryId,
    });
    dispatch(
      getProductListAction({
        params: {
          page: 1,
          limit: PRODUCT_LIST_LIMIT,
          ...filterParams,
          categoryId: clearCategoryId,
        },
      })
    );
  };

  const handleClearKeyWordFilter = () => {
    setFilterParams({
      ...filterParams,
      keyword: "",
    });
    dispatch(
      getProductListAction({
        params: {
          page: 1,
          limit: PRODUCT_LIST_LIMIT,
          ...filterParams,
          keyword: "",
        },
      })
    );
  };
  const handleClearSaleFilter = () => {
    setFilterParams({
      ...filterParams,
      sale: "",
    });
    dispatch(
      getProductListAction({
        params: {
          page: 1,
          limit: PRODUCT_LIST_LIMIT,
          ...filterParams,
          sale: "",
        },
      })
    );
  };

  const handleSortPrice = (value) => {
    setFilterParams({
      ...filterParams,
      order: value,
    });
    dispatch(
      getProductListAction({
        params: {
          page: 1,
          limit: PRODUCT_LIST_LIMIT,
          ...filterParams,
          order: value,
        },
      })
    );
  };
  const handleSliderPrice = (value) => {
    setFilterParams({
      ...filterParams,
      operator: value,
    });
    dispatch(
      getProductListAction({
        params: {
          page: 1,
          limit: PRODUCT_LIST_LIMIT,
          ...filterParams,
          operator: value,
        },
      })
    );
  };
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

  // render
  const renderProductList = useMemo(() => {
    return productList.data.map((item) => {
      return (
        <Col
          span={6}
          key={item.id}
          style={{
            borderRight: "solid 4px #fff",
          }}
        >
          <div className="productItem">
            <div className="imageItem">
              <Link
                to={generatePath(ROUTES.USER.PRODUCT_DETAIL, {
                  id: `${item.slug}.${item.id}`,
                })}
              >
                <img
                  src={!item.images[0]?.src ? null : item.images[0].src}
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
              <span>Đánh giá:</span>
              <Rate
                value={!item.reviews[0]?.rate ? null : item.reviews[0].rate}
                disabled
                style={{ fontSize: 12 }}
              />
            </p>
            <p>Đã bán: {item.sold} </p>
          </div>
        </Col>
      );
    });
  }, [productList.data]);

  const renderCategoryOption = useMemo(() => {
    return categoryList.data.map((item) => {
      return (
        <Col span={24} key={item.id}>
          <Checkbox value={item.id}>{item.name}</Checkbox>
        </Col>
      );
    });
  }, [categoryList]);

  const renderFilterCategory = useMemo(() => {
    return filterParams.categoryId?.map((itemFilter) => {
      const categoryData = categoryList.data.find(
        (itemCategory) => itemCategory.id === itemFilter
      );
      if (!categoryData) return null;
      return (
        <Tag
          closable
          onClose={() => handleClearCategoryFilter(itemFilter)}
          key={itemFilter}
        >
          {categoryData.name}
        </Tag>
      );
    });
  }, [filterParams.categoryId]);

  const renderFilterKeyword = useMemo(() => {
    return (
      <Tag closable onClose={() => handleClearKeyWordFilter()}>
        {filterParams.keyword}
      </Tag>
    );
  }, [filterParams.keyword]);
  const renderFilterSale = useMemo(() => {
    return (
      <Tag closable onClose={() => handleClearSaleFilter()}>
        Off {filterParams.sale}%
      </Tag>
    );
  }, [filterParams.sale]);

  const renderOptionSort = () => {
    return (
      <>
        <Select.Option value="priceUp">
          <i class="fa-solid fa-arrow-up-short-wide"></i>Giá thấp đến cao
        </Select.Option>
        <Select.Option value="priceDown">
          <i class="fa-solid fa-arrow-up-wide-short"></i>Giá cao đến thấp
        </Select.Option>
        <Select.Option value="nameProductUp">
          <i class="fa-solid fa-arrow-down-a-z"></i>A → Z
        </Select.Option>
        <Select.Option value="nameProductDown">
          <i class="fa-solid fa-arrow-up-z-a"></i>Z → A
        </Select.Option>
      </>
    );
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
    <S.Wrapper>
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
      <Row>
        <Breadcrumb style={{ paddingTop: 16, paddingBottom: 16 }}>
          <Breadcrumb.Item>
            <Link to={ROUTES.USER.HOME}>Trang chủ</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={ROUTES.USER.PRODUCT_LIST}>Collection</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Row>
        <h4 style={{ fontWeight: "bold" }}>
          <span style={{ marginRight: 4 }}>
            <i class="fa-regular fa-rectangle-list"></i>
          </span>
          LỌC SẢN PHẨM THEO:
        </h4>
      </Row>
      <Row gutter={[16, 16]}>
        {/* left main */}
        <Col span={6}>
          <Card size="small">
            <h4>
              <i class="fa-brands fa-shopify"></i>New Arrivals
            </h4>
            <Checkbox
              onChange={(e) => handleFilter("new", e.target.checked)}
              checked={filterParams.new}
            >
              Sản phẩm mới
            </Checkbox>
          </Card>
          <Collapse>
            <Panel
              header={
                <span>
                  <i class="fa-solid fa-filter"></i>
                  {"Brand"}
                </span>
              }
              key="1"
            >
              <Checkbox.Group
                onChange={(value) => handleFilter("categoryId", value)}
                value={filterParams.categoryId}
              >
                <Row>{renderCategoryOption}</Row>
              </Checkbox.Group>
            </Panel>
            <Panel
              header={
                <span>
                  <i class="fa-solid fa-ticket"></i>
                  {"Sale all"}
                </span>
              }
              key="2"
            >
              <Radio.Group
                onChange={(e) => handleFilter("sale", e.target.value)}
                value={filterParams.sale}
              >
                <Row>
                  <Col span={24}>
                    <Radio value={30}>30%</Radio>
                  </Col>
                  <Col span={24}>
                    <Radio value={50}>50%</Radio>
                  </Col>
                  <Col span={24}>
                    <Radio value={70}>70%</Radio>
                  </Col>
                </Row>
              </Radio.Group>
            </Panel>
          </Collapse>
          <Card size="small" title="Tìm kiếm theo giá">
            <Slider
              range
              marks={{
                0: "0",
                5000000: "5 triệu",
                10000000: "10 triệu",
                15000000: "15 triệu",
              }}
              tooltip={{ formatter }}
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={PRICE_STEP}
              defaultValue={[PRICE_MIN_DEFAULT, PRICE_MAX_DEFAULT]}
              onChange={(value) => handleSliderPrice(value)}
            />
          </Card>
          <Card size="small">
            <h3>Bán chạy</h3>
            {renderBestSellProduct()}
          </Card>
          <Card size="small" className="bannerLeft">
            <Link to={ROUTES.USER.PRODUCT_LIST} state={{ categoryId: [14] }}>
              <img
                src="https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fwp-content%2Fblogs.dir%2F6%2Ffiles%2F2021%2F02%2Flacoste-match-break-sneakers-spring-summer-collection-price-where-to-buy-1.jpg?q=75&w=800&cbr=1&fit=max"
                alt=""
              />
            </Link>
          </Card>
        </Col>
        {/* right main */}
        <Col span={18}>
          <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            <Col span={18}>
              <Input
                name="filterKeyword"
                allowClear
                value={filterParams.keyword}
                onChange={(e) => handleFilter("keyword", e.target.value)}
              />
            </Col>
            <Col span={6}>
              <Select
                name="selectSort"
                placeholder="Sắp xếp theo giá"
                style={{ width: "100%" }}
                onChange={(value) => handleSortPrice(value)}
              >
                {renderOptionSort()}
              </Select>
            </Col>
          </Row>
          {/* tags */}
          <Space style={{ marginBottom: 16 }}>
            {renderFilterCategory}
            {filterParams.keyword && renderFilterKeyword}
            {filterParams.sale && renderFilterSale}
          </Space>
          {/* product list */}
          <Spin spinning={productList.loading} tip="Loading...">
            <S.ProductListWrapper>
              <Row gutter={[16, 16]}>{renderProductList}</Row>
            </S.ProductListWrapper>
            {productList.data.length !== productList.meta.total && (
              <Row justify="center">
                <Button
                  style={{ marginTop: 16 }}
                  onClick={() => handleShowMore()}
                >
                  Show more
                </Button>
              </Row>
            )}
          </Spin>
        </Col>
      </Row>
    </S.Wrapper>
  );
};

export default ProductListPage;
