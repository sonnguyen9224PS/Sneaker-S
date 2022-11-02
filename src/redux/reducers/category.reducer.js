import { createReducer } from "@reduxjs/toolkit";
import { CATEGORY_ACTION, SUCCESS, FAIL } from "../constants";
import { REQUEST } from "../constants/actionType";

const initialState = {
  categoryList: {
    data: [],
    loading: false,
    error: "",
  },
};

const categoryReducer = createReducer(initialState, {
  [REQUEST(CATEGORY_ACTION.GET_CATEGORY_LIST)]: (state, action) => {
    return {
      ...state,
      categoryList: {
        ...state.categoryList,
        loading: true,
        error: "",
      },
    };
  },
  [SUCCESS(CATEGORY_ACTION.GET_CATEGORY_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      categoryList: {
        ...state.categoryList,
        data: data,
        loading: false,
      },
    };
  },
  [FAIL(CATEGORY_ACTION.GET_CATEGORY_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      categoryList: {
        ...state.categoryList,
        loading: false,
        error: error,
      },
    };
  },
});

export default categoryReducer;
