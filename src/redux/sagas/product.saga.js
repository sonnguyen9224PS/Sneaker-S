import { put, takeEvery, debounce } from "redux-saga/effects";
import axios from "axios";
import { REQUEST, SUCCESS, FAIL, PRODUCT_ACTION } from "../../redux/constants";

function* getProductListSaga(action) {
  try {
    const { params, more } = action.payload;
    const result = yield axios.get(`http://localhost:4000/products`, {
      params: {
        _expand: "category",
        _page: params.page,
        _limit: params.limit,
        ...(params.categoryId && { categoryId: params.categoryId }),
        ...(params.keyword && { q: params.keyword }),
        ...(params.color && { color: params.color }),
        ...(params.order === "priceUp" && {
          _sort: "price",
          _order: "asc",
        }),
        ...(params.order === "priceDown" && {
          _sort: "price",
          _order: "desc",
        }),
        ...(params.order === "nameProductUp" && {
          _sort: "name",
          _order: "asc",
        }),
        ...(params.order === "nameProductDown" && {
          _sort: "name",
          _order: "desc",
        }),
        ...(params.operator && {
          price_gte: params.operator[0],
          price_lte: params.operator[1],
        }),
      },
    });

    yield put({
      type: SUCCESS(PRODUCT_ACTION.GET_PRODUCT_LIST),
      payload: {
        data: result.data,
        meta: {
          total: parseInt(result.headers["x-total-count"]),
          page: params.page,
          limit: params.limit,
        },
        more: more,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(PRODUCT_ACTION.GET_PRODUCT_LIST),
      payload: {
        error: "get productList error",
      },
    });
  }
}
// detail
function* getProductDetailSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`http://localhost:4000/products/${id}`, {
      params: {
        _expand: "category",
        _embed: "options",
      },
    });
    yield put({
      type: SUCCESS(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
      payload: {
        error: "get product detail error",
      },
    });
  }
}

export default function* productSaga() {
  yield debounce(
    500,
    REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST),
    getProductListSaga
  );
  yield takeEvery(
    REQUEST(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
    getProductDetailSaga
  );
}
