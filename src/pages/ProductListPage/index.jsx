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
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductListAction,
  getCategoryListAction,
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
import { ROUTES } from "../../constants/routes";

const ProductListPage = () => {
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
  const { categoryList } = useSelector((state) => state.category);

  //categoryId
  useEffect(() => {
    if (state?.categoryId?.length) {
      console.log(1);
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
      console.log(2);
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
    window.scrollTo(0, 0);
  }, [state]);

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

  // render
  const renderProductList = useMemo(() => {
    return productList.data.map((item) => {
      return (
        <Col span={6} key={item.id}>
          <Link
            to={generatePath(ROUTES.USER.PRODUCT_DETAIL, {
              id: `${item.slug}.${item.id}`,
            })}
          >
            <Card size="small" title={item.name}>
              <div>
                <img src={item.images[0]?.src} alt="" width={200} />
              </div>
              <div>{item.price.toLocaleString("vi-VN")}</div>
            </Card>
          </Link>
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

  return (
    <S.Wrapper>
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
      <Button type="primary" onClick={() => navigate(-1)}>
        Go back
      </Button>
      <Row>
        <h4 style={{ fontWeight: "bold" }}>
          <span style={{ marginRight: 4 }}>
            <i class="fa-regular fa-rectangle-list"></i>
          </span>
          SHOPPING OPTIONS
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
          <Card size="small">
            <h4>
              <i class="fa-solid fa-filter"></i>Brand
            </h4>
            <Checkbox.Group
              onChange={(value) => handleFilter("categoryId", value)}
              value={filterParams.categoryId}
            >
              <Row>{renderCategoryOption}</Row>
            </Checkbox.Group>
          </Card>
          <Card>
            <h4>
              <i class="fa-solid fa-ticket"></i>Sale all
            </h4>
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
          </Card>

          <Card size="small" title="Khoảng giá">
            <Slider
              range
              tooltip={{ formatter }}
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={PRICE_STEP}
              defaultValue={[PRICE_MIN_DEFAULT, PRICE_MAX_DEFAULT]}
              onChange={(value) => handleSliderPrice(value)}
            />
          </Card>
          <Card size="small" className="bannerLeft">
            <img
              src="https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fwp-content%2Fblogs.dir%2F6%2Ffiles%2F2021%2F02%2Flacoste-match-break-sneakers-spring-summer-collection-price-where-to-buy-1.jpg?q=75&w=800&cbr=1&fit=max"
              alt=""
            />
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
            <Row gutter={[16, 16]}>{renderProductList}</Row>
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
