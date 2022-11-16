import { createAction } from "@reduxjs/toolkit";
import { REQUEST, PRODUCT_ACTION } from "../../redux/constants";

export const getProductListAction = createAction(
  REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST)
);
export const getProductDetailAction = createAction(
  REQUEST(PRODUCT_ACTION.GET_PRODUCT_DETAIL)
);
export const getSaleListAction = createAction(
  REQUEST(PRODUCT_ACTION.GET_SALE_LIST)
);
export const getNewListAction = createAction(
  REQUEST(PRODUCT_ACTION.GET_NEW_LIST)
);
export const getBestSellListAction = createAction(
  REQUEST(PRODUCT_ACTION.GET_BEST_SELL_LIST)
);
