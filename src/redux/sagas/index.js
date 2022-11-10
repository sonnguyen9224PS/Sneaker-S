import { fork } from "redux-saga/effects";

import userSaga from "./user.saga";
import productSaga from "./product.saga";
import categorySaga from "./category.saga";
import locationSaga from "./location.saga";
import favoriteSaga from "./favorite.saga";
import orderSaga from "./order.saga";
import reviewSaga from "./review.saga";

export default function* rootSaga() {
  yield fork(userSaga);
  yield fork(productSaga);
  yield fork(categorySaga);
  yield fork(locationSaga);
  yield fork(favoriteSaga);
  yield fork(orderSaga);
  yield fork(reviewSaga);
}
