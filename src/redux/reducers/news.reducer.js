import { createReducer } from "@reduxjs/toolkit";

import { REQUEST, SUCCESS, FAIL, NEWS_ACTION } from "../constants";

const initialState = {
  newsList: {
    data: [],
    loading: false,
    error: "",
  },
  newsDetail: {
    data: [],
    loading: false,
    error: "",
  },
};

const newsReducer = createReducer(initialState, {
  [REQUEST(NEWS_ACTION.GET_NEWS_LIST)]: (state, action) => {
    return {
      ...state,
      newsList: {
        ...state.newsList,
        loading: true,
        error: "",
      },
    };
  },
  [SUCCESS(NEWS_ACTION.GET_NEWS_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      newsList: {
        ...state.newsList,
        data: data,
        loading: false,
      },
    };
  },
  [FAIL(NEWS_ACTION.GET_NEWS_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      newsList: {
        ...state.newsList,
        loading: false,
        error: error,
      },
    };
  },
  [REQUEST(NEWS_ACTION.GET_NEWS_DETAIL)]: (state, action) => {
    return {
      ...state,
      newsDetail: {
        ...state.newsDetail,
        loading: true,
        error: "",
      },
    };
  },
  [SUCCESS(NEWS_ACTION.GET_NEWS_DETAIL)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      newsDetail: {
        ...state.newsDetail,
        data: data,
        loading: false,
      },
    };
  },
  [FAIL(NEWS_ACTION.GET_NEWS_DETAIL)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      newsDetail: {
        ...state.newsDetail,
        loading: false,
        error: error,
      },
    };
  },
});

export default newsReducer;
