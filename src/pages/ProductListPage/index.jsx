import { useEffect, useMemo, useState } from "react";
import { Link, generatePath } from "react-router-dom";
import {
  Row,
  Col,
  Checkbox,
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
  const formatter = (value) => value.toLocaleString("vi-VN");
  const [filterParams, setFilterParams] = useState({
    categoryId: [],
    keyword: "",
    order: "",
    operator: [],
    color: [],
  });

  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);
  const { categoryList } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(
      getProductListAction({
        params: {
          page: 1,
          limit: PRODUCT_LIST_LIMIT,
        },
      })
    );
    dispatch(getCategoryListAction());
  }, []);

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
    const newCategoryId = filterParams.categoryId.filter((item) => item !== id);
    setFilterParams({
      ...filterParams,
      categoryId: newCategoryId,
    });
    dispatch(
      getProductListAction({
        params: {
          page: 1,
          limit: PRODUCT_LIST_LIMIT,
          ...filterParams,
          categoryId: newCategoryId,
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
  const handleClearColorFilter = (color) => {
    const newColor = filterParams.color.filter((item) => item !== color);
    setFilterParams({
      ...filterParams,
      color: newColor,
    });
    dispatch(
      getProductListAction({
        params: {
          page: 1,
          limit: PRODUCT_LIST_LIMIT,
          ...filterParams,
          color: newColor,
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
              {item.price.toLocaleString("vi-VN")}
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
    return filterParams.categoryId.map((itemFilter) => {
      const categoryData = categoryList.data.find(
        (itemCategory) => itemCategory.id === itemFilter
      );
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

  const renderFilterColor = useMemo(() => {
    return filterParams.color.map((itemFilter) => {
      return (
        <Tag
          closable
          onClose={() => handleClearColorFilter(itemFilter)}
          key={itemFilter}
        >
          {itemFilter}
        </Tag>
      );
    });
  }, [filterParams.color]);

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
  const renderOptionColor = () => {
    return (
      <>
        <Col span={24}>
          <Checkbox value="Black">
            <span style={{ color: "black" }}>
              <i class="fa-solid fa-droplet"></i>
            </span>
            Black
          </Checkbox>
        </Col>
        <Col span={24}>
          <Checkbox value="White">
            <span style={{ backgroundColor: "black", color: "white" }}>
              <i class="fa-solid fa-droplet"></i>
            </span>
            White
          </Checkbox>
        </Col>
      </>
    );
  };

  return (
    <S.Wrapper>
      <Row>
        <Breadcrumb style={{ paddingTop: 16, paddingBottom: 16 }}>
          <Breadcrumb.Item>
            <Link to={ROUTES.USER.HOME}>Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={ROUTES.USER.PRODUCT_LIST}>Product List</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </Row>
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
              <i class="fa-solid fa-filter"></i>Brand
            </h4>
            <Checkbox.Group
              onChange={(value) => handleFilter("categoryId", value)}
              value={filterParams.categoryId}
            >
              <Row>{renderCategoryOption}</Row>
            </Checkbox.Group>
          </Card>
          <Card size="small">
            <h4>
              <i class="fa-solid fa-palette"></i>Colors
            </h4>
            <Checkbox.Group
              value={filterParams.color}
              onChange={(value) => handleFilter("color", value)}
            >
              <Row>{renderOptionColor()}</Row>
            </Checkbox.Group>
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
            {filterParams.color && renderFilterColor}
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
