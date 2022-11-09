import { createReducer } from "@reduxjs/toolkit";
import { CART_ACTION } from "../constants";
import { REQUEST } from "../constants";

const initialState = {
  cartList: JSON.parse(localStorage.getItem("cart")) || [],
  infoData: {},
  paymentData: {},
};

const checkOutReducer = createReducer(initialState, {
  [REQUEST(CART_ACTION.ADD_TO_CART)]: (state, action) => {
    let newCartList = [...state.cartList];
    const { productId, quantity, size } = action.payload;
    const existedProductIndex = state.cartList.findIndex(
      (item) => item.productId === productId && item.size === size
    );
    if (existedProductIndex !== -1) {
      newCartList.splice(existedProductIndex, 1, {
        ...state.cartList[existedProductIndex],
        quantity: state.cartList[existedProductIndex].quantity + quantity,
      });
    } else {
      newCartList = [action.payload, ...state.cartList];
    }
    localStorage.setItem("cart", JSON.stringify(newCartList));
    return {
      ...state,
      cartList: newCartList,
    };
  },

  [REQUEST(CART_ACTION.UPDATE_CART_ITEM)]: (state, action) => {
    const { productId, quantity } = action.payload;
    let newCartList = [...state.cartList];
    const existedProductIndex = state.cartList.findIndex(
      (item) => item.productId === productId
    );
    if (existedProductIndex !== -1) {
      newCartList.splice(existedProductIndex, 1, {
        ...state.cartList[existedProductIndex],
        quantity: quantity,
      });
    } else {
      newCartList = [action.payload, ...state.cartList];
    }
    localStorage.setItem("cart", JSON.stringify(newCartList));
    return {
      ...state,
      cartList: newCartList,
    };
  },

  [REQUEST(CART_ACTION.DELETE_CART_ITEM)]: (state, action) => {
    const { productId } = action.payload;
    let newCartList = [...state.cartList];
    const existedProductIndex = state.cartList.findIndex(
      (item) => item.productId === productId
    );
    if (existedProductIndex !== -1) {
      newCartList.splice(existedProductIndex, 1);
    } else {
      newCartList = [action.payload, ...state.cartList];
    }
    localStorage.setItem("cart", JSON.stringify(newCartList));
    return {
      ...state,
      cartList: newCartList,
    };
  },
});

export default checkOutReducer;
