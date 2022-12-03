import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { SUCCESS, FAIL, REQUEST, CATEGORY_ACTION } from "../constants";

function* getCategoryListSaga(action) {
  try {
    const result = yield axios.get(
      `https://sneaker-s-api-production.up.railway.app/categories`
    );
    yield put({
      type: SUCCESS(CATEGORY_ACTION.GET_CATEGORY_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(CATEGORY_ACTION.GET_CATEGORY_LIST),
      payload: {
        error: e.response?.data,
      },
    });
  }
}

export default function* categorySaga() {
  yield takeEvery(
    REQUEST(CATEGORY_ACTION.GET_CATEGORY_LIST),
    getCategoryListSaga
  );
}
