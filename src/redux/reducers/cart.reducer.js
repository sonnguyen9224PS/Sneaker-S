import { createReducer } from "@reduxjs/toolkit";
import { CART_ACTION } from "../constants";
import { REQUEST } from "../constants/";

const initialState = {
  cartList: JSON.parse(localStorage.getItem("cart")) || [],
};

const cartReducer = createReducer(initialState, {
  [REQUEST(CART_ACTION.ADD_TO_CART)]: (state, action) => {
    const { productId, quantity } = action.payload;
    let newCartList = [...state.cartList];
    const existedProductIndex = state.cartList.findIndex(
      (item) => item.productId === productId
    );
    if (existedProductIndex !== -1) {
      newCartList.splice(existedProductIndex, 1, {
        ...state.cartList[existedProductIndex],
        quantity: state.cartList[existedProductIndex].quantity + quantity,
      });
    } else {
      newCartList = [...state.cartList, action.payload];
    }
    localStorage.setItem("cart", JSON.stringify(newCartList));
    return {
      ...state.cartList,
      cartList: newCartList,
    };
  },
});

export default cartReducer;
