import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

import { ORDER_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

function* orderProductSaga(action) {
  try {
    const { products, ...orderData } = action.payload;
    const result = yield axios.post(
      "https://good-jade-drill-slip.cyclic.app/orders",
      orderData
    );
    for (let i = 0; i < products.length; i++) {
      yield axios.post(
        "https://good-jade-drill-slip.cyclic.app/orderProducts",
        {
          orderId: result.data.id,
          ...products[i],
        }
      );
    }
    yield put({
      type: SUCCESS(ORDER_ACTION.ORDER_PRODUCT),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(ORDER_ACTION.ORDER_PRODUCT),
      payload: {
        error: e.response?.data,
      },
    });
  }
}

function* getOrderListSaga(action) {
  try {
    const { userId } = action.payload;
    const result = yield axios.get(
      "https://good-jade-drill-slip.cyclic.app/orders",
      {
        params: {
          userId: userId,
          _embed: "orderProducts",
        },
      }
    );
    yield put({
      type: SUCCESS(ORDER_ACTION.GET_ORDER_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(ORDER_ACTION.GET_ORDER_LIST),
      payload: {
        error: e.response?.data,
      },
    });
  }
}

export default function* orderSaga() {
  yield takeEvery(REQUEST(ORDER_ACTION.ORDER_PRODUCT), orderProductSaga);
  yield takeEvery(REQUEST(ORDER_ACTION.GET_ORDER_LIST), getOrderListSaga);
}
