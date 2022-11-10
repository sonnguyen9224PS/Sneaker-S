import { createReducer } from "@reduxjs/toolkit";
import {
  REQUEST,
  SUCCESS,
  FAIL,
  PRODUCT_ACTION,
  FAVORITE_ACTION,
} from "../../redux/constants";

const initialState = {
  productList: {
    data: [],
    meta: {},
    loading: false,
    error: "",
  },
  productDetail: {
    data: {},
    loading: false,
    error: "",
  },
  saleProductList: {
    data: [],
    meta: {},
    loading: false,
    error: "",
  },
};

const productReducer = createReducer(initialState, {
  [REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST)]: (state, action) => {
    return {
      ...state,
      productList: {
        ...state.productList,
        loading: true,
        error: "",
      },
    };
  },
  [SUCCESS(PRODUCT_ACTION.GET_PRODUCT_LIST)]: (state, action) => {
    const { data, meta, more } = action.payload;
    return {
      ...state,
      productList: {
        ...state.productList,
        data: more ? [...state.productList.data, ...data] : data,
        meta: meta,
        loading: false,
      },
    };
  },
  [FAIL(PRODUCT_ACTION.GET_PRODUCT_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      productList: {
        ...state.productList,
        loading: false,
        error: error,
      },
    };
  },

  [REQUEST(PRODUCT_ACTION.GET_PRODUCT_DETAIL)]: (state, action) => {
    return {
      ...state,
      productDetail: {
        ...state.productDetail,
        loading: true,
        error: "",
      },
    };
  },
  [SUCCESS(PRODUCT_ACTION.GET_PRODUCT_DETAIL)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      productDetail: {
        ...state.productDetail,
        data: data,
        loading: false,
      },
    };
  },
  [FAIL(PRODUCT_ACTION.GET_PRODUCT_DETAIL)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      productDetail: {
        ...state.productDetail,
        loading: false,
        error: error,
      },
    };
  },

  [REQUEST(PRODUCT_ACTION.GET_SALE_LIST)]: (state, action) => {
    return {
      ...state,
      saleProductList: {
        ...state.saleProductList,
        loading: true,
        error: "",
      },
    };
  },
  [SUCCESS(PRODUCT_ACTION.GET_SALE_LIST)]: (state, action) => {
    const { data, meta } = action.payload;
    return {
      ...state,
      saleProductList: {
        ...state.saleProductList,
        data: data,
        meta: meta,
        loading: false,
      },
    };
  },
  [FAIL(PRODUCT_ACTION.GET_SALE_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      saleProductList: {
        ...state.saleProductList,
        loading: false,
        error: error,
      },
    };
  },

  [SUCCESS(FAVORITE_ACTION.FAVORITE_PRODUCT)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      productDetail: {
        ...state.productDetail,
        data: {
          ...state.productDetail.data,
          favorites: [...state.productDetail.data.favorites, data],
        },
      },
    };
  },

  [SUCCESS(FAVORITE_ACTION.UN_FAVORITE_PRODUCT)]: (state, action) => {
    const { id } = action.payload;
    const newFavorites = state.productDetail.data.favorites?.filter(
      (item) => item.id !== id
    );
    return {
      ...state,
      productDetail: {
        ...state.productDetail,
        data: {
          ...state.productDetail.data,
          favorites: newFavorites,
        },
      },
    };
  },
});

export default productReducer;
