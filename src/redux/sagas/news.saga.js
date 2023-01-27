import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

import { NEWS_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

function* getNewsListSaga(action) {
  try {
    const { params } = action.payload;
    const result = yield axios.get(
      "https://good-jade-drill-slip.cyclic.app/news",
      {
        params: {
          _sort: "id",
          _order: "desc",
          ...(params.page && { _page: params.page }),
          ...(params.limit && { _limit: params.limit }),
        },
      }
    );
    yield put({
      type: SUCCESS(NEWS_ACTION.GET_NEWS_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(NEWS_ACTION.GET_NEWS_LIST),
      payload: {
        error: e.response?.data,
      },
    });
  }
}
function* getNewsDetailSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(
      `https://good-jade-drill-slip.cyclic.app/news/${id}`
    );
    yield put({
      type: SUCCESS(NEWS_ACTION.GET_NEWS_DETAIL),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(NEWS_ACTION.GET_NEWS_DETAIL),
      payload: {
        error: e.response?.data,
      },
    });
  }
}

export default function* newsSaga() {
  yield takeEvery(REQUEST(NEWS_ACTION.GET_NEWS_LIST), getNewsListSaga);
  yield takeEvery(REQUEST(NEWS_ACTION.GET_NEWS_DETAIL), getNewsDetailSaga);
}
