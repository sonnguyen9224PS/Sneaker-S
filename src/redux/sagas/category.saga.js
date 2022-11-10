import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { SUCCESS, FAIL, REQUEST, CATEGORY_ACTION } from "../constants";

function* getCategoryListSaga(action) {
  try {
    const { logo } = action.payload;
    const result = yield axios.get(`http://localhost:4000/categories`, {
      params: {
        ...(logo && { _embed: "images" }),
      },
    });
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
