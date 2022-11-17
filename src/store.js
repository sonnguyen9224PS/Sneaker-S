import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import productReducer from "./redux/reducers/product.reducer";
import categoryReducer from "./redux/reducers/category.reducer";
import userReducer from "./redux/reducers/user.reducer";
import checkOutReducer from "./redux/reducers/checkOut.reducer";
import locationReducer from "./redux/reducers/location.reducer";
import reviewReducer from "./redux/reducers/review.reducer";
import orderReducer from "./redux/reducers/order.reducer";
import favoriteReducer from "./redux/reducers/favorite.reducer";
import newsReducer from "./redux/reducers/news.reducer";

import rootSaga from "./redux/sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    category: categoryReducer,
    checkOut: checkOutReducer,
    location: locationReducer,
    review: reviewReducer,
    order: orderReducer,
    favorite: favoriteReducer,
    news: newsReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ thunk: false }),
    sagaMiddleware,
  ],
});

sagaMiddleware.run(rootSaga);

export default store;
