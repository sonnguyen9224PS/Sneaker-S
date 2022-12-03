import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

import { FAVORITE_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

function* favoriteProductSaga(action) {
  try {
    const result = yield axios.post(
      "https://sneaker-s-api-production.up.railway.app/favorites",
      action.payload
    );
    yield put({
      type: SUCCESS(FAVORITE_ACTION.FAVORITE_PRODUCT),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(FAVORITE_ACTION.FAVORITE_PRODUCT),
      payload: {
        error: "Fail!",
      },
    });
  }
}

function* unFavoriteProductSaga(action) {
  try {
    const { id } = action.payload;
    yield axios.delete(
      `https://sneaker-s-api-production.up.railway.app/favorites/${id}`
    );
    yield put({
      type: SUCCESS(FAVORITE_ACTION.UN_FAVORITE_PRODUCT),
      payload: {
        id: id,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(FAVORITE_ACTION.UN_FAVORITE_PRODUCT),
      payload: {
        error: e.response.data,
      },
    });
  }
}

function* getFavoriteListSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(
      `https://sneaker-s-api-production.up.railway.app/favorites`,
      {
        params: {
          userId: id,
          _expand: "product",
        },
      }
    );
    yield put({
      type: SUCCESS(FAVORITE_ACTION.GET_FAVORITE_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(FAVORITE_ACTION.GET_FAVORITE_LIST),
      payload: {
        error: e.response.data,
      },
    });
  }
}

export default function* favoriteSaga() {
  yield takeEvery(
    REQUEST(FAVORITE_ACTION.FAVORITE_PRODUCT),
    favoriteProductSaga
  );
  yield takeEvery(
    REQUEST(FAVORITE_ACTION.UN_FAVORITE_PRODUCT),
    unFavoriteProductSaga
  );
  yield takeEvery(
    REQUEST(FAVORITE_ACTION.GET_FAVORITE_LIST),
    getFavoriteListSaga
  );
}
